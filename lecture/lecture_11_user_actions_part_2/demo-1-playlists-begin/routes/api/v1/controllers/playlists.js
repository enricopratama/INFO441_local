// server side code
import express from 'express'
let router = express.Router()

router.get('/', async(req, res) => {
    try {
        const userId = req.query.userId
        const userPlaylists = await req.models.Playlist.find({user: userId})
        if (!userPlaylists) {
            res.status(404).json({status: 'error', message: 'could not find playlists for that user'})
        }

        res.json(userPlaylists) // send back to client
    } catch(err) {
        res.status(500).json({status: 'error'})
    }
})

router.post("/", async (req, res) => {
    try {
        let title = req.body.title
        let songs = req.body.songs
        let userId = req.body.userId

       const newPlaylist = new req.models.Playlist({
            title: title,
            songs: songs,
            user: userId
        })
        await newPlaylist.save()
        res.json({status: 'success', message: 'playlist created'})
    } catch(err) {
        console.log("error:", err)
        res.status(500).json({status: "error"})
    }
})

export default router