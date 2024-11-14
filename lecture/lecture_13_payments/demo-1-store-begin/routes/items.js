import express from 'express';
var router = express.Router();

router.get("/", async (req, res) => {
    let allItems = await req.models.Item.find()
    res.json(allItems)
})

router.post("/saveCart", async (req, res) => {
    console.log("Saving cart, session current is ", req.session);
    let cartInfo = req.body // do not send the price, name etc since client can manipulate it manually and sent it back to server 



    // for some reason if I save the object ot the session, it gets deleted later on.
    // Save the info to my session as a string 
    req.session.cartInfo = JSON.stringify(req.body);
    console.log("Saved cart, session current is ", req.session);
    res.json({status: "success"})
})

async function addPricesToCart(cartInfo, models) {
    // add prices and names to cart
    // cartInfo should start like this: [{itemiD: 4341432, itemCount: 2}, {itemID: 234234, itemCount: 1}, ...]
    // look up in the DB all items listed in my cart
    let cartItemIds = cartInfo.map(cartItem => cartItem.itemId)
    let itemsInfo = await models.Item.find().where('_id').in(cartItemIds).exec()

    // ItemsInfo will be an array of JSON, like this
    // [{_id: 32, name: "item1", price: 10}, {_id: 234234, name: "item2", price: 20}, ...]

    // transform itemsInfo into an object that I can lookup info by the item's ID
    let itemsInfoById = {}
    itemsInfo.forEach(itemsInfo => {
        itemsInfoById[itemsInfo._id] = itemsInfo
    })

    // itemsInfoById will look like:
    // {
    // 32: {_id: 32, name: "orange", price: ...},
    // 4335: {_id: 4335, name: "apple", price: ...}, ...
    // }


    // combine db info with cart info and return it
    // take the cart into and for each item make a new object that includes the name and the price 
    let combinedCartInfo = cartInfo.map(cartItem => {
        return {
            itemId: cartItem.itemId,
            itemCount: cartItem.itemCount,
            name: itemsInfoById[cartItem.itemId].name,
            price: itemsInfoById[cartItem.itemId].price, // pulled from by database info 
        }
    })

    return combinedCartInfo;
}

async function calculateOrderAmount(req) {
    let cartInfo = JSON.parse(req.session.cartInfo)

    let combinedCartInfo = await addPricesToCart(cartInfo, req.models)

    console.log("combinedCartInfo", combinedCartInfo)   

    let totalCost = combinedCartInfo
        .map(item => item.price * item.itemCount)
        .reduce((prev, curr) => prev + curr)

    return totalCost

}

router.get("/getCart", async (req, res) => {
    if (!req.session || !req.session.cartInfo) {
        // if there is no session that just return empty arr, do not crash the server
        res.json([])
        return
    }
    let cartInfo = JSON.parse(req.session.cartInfo)

    // add item names and prices to the acrt into 
    let combinedCartInfo = await addPricesToCart(cartInfo, req.models)
    res.json(combinedCartInfo); 
    
})

router.post("/create-payment-intent", async (req, res) => {
    let orderAmount = await calculateOrderAmount(req);

    console.log("Order amount is ", orderAmount)    

    // creae a payment intent object wiht the order amount
    const paymentIntent = await req.stripe.paymentIntents.create({
        amount : orderAmount * 100,
        currency: 'usd', // usd is actually US centers, not USD (hence we multiply by 100)
        automatic_payment_methods: {enabled: true}
    })

    res.send({
        clientSecret: paymentIntent.client_secret
    })


})
export default router;
