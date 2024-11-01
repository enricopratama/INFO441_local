// Models on what the mongodb DB should look like
import mongoose from 'mongoose'

let models = {}

console.log("Trying to connect to mongodb")
await mongoose.connect("mongodb://localhost:27017/playlists") // change localhost to change DB directory

console.log("successfully connected to mongodb")

const userSchema = new mongoose.Schema({
    username: String,
    favorite_bands: [String]
})

const playlistSchema = new mongoose.Schema({
    title: String,
    songs: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

models.User = mongoose.model("User", userSchema)
models.Playlist = mongoose.model("Playlists", playlistSchema)

console.log("successfully created database models")

export default models