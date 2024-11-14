import mongoose, { Mongoose } from "mongoose";


let models = {};

console.log("connecting to mongodb");
// Put your MongoDB Atlas connection string in, or
await mongoose.connect('mongodb://localhost:27017/store');
console.log("connected to mongodb");

//Add schemas and models
// Data Validation is not done, hence, if the data is not in the correct format, 
// it will stil be saved in the DB and will be returned in the client as it is. 
const itemSchema = new mongoose.Schema({
    name: String,
    price: Number
})

models.Item = mongoose.model('Item', itemSchema);
console.log("finished creating models");

export default models;
