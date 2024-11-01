import express from 'express';
let router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allUsers = await req.models.User.find()
        res.json(allUsers)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal error"})
    }
});

router.post('/', async (req, res) => {
    try {
        const username = req.body.username
        console.log("creating user" +  username);
        const newUser = new req.models.User({
            username: username // get the username from client and send to mongodb
        })

        await newUser.save()
        res.status(201).json(newUser); // Send response after saving
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal error"})    
    }
})

// Format of body:
// body: JSON.stringify({
//     userId: id,
//     band: bandToAdd
// })
router.post('/bands', async (req, res) => {
    try {
        
        const userId = req.body.userId; 
        let band = req.body.band;

        // find the right user
        let user = await req.models.User.findById(userId);
        if (!user.favorite_bands.includes(band)){
            user.favorite_bands.push(band);
        }

        // update with new band
        user.favorite_bands.push(band);
        // save
        await user.save();
        res.json({status: "success"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal error"})
    }
});

export default router;