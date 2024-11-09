import express from 'express'
let router = express.Router()

import usersRouter from "./controllers/users.js"
import playlistRouter from "./controllers/playlists.js"

router.use("/users", usersRouter)
router.use('/playlists', playlistRouter);

export default router
