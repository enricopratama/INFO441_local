<<<<<<< HEAD
import express from 'express'
let router = express.Router()

import usersRouter from "./controllers/users.js"
import playlistRouter from "./controllers/playlists.js"

router.use("/users", usersRouter)
router.use('/playlists', playlistRouter);

export default router
||||||| 1ea6190
=======
import express from 'express'
let router = express.Router()

import usersRouter from "./controllers/users.js"

router.use("/users", usersRouter)

export default router
>>>>>>> 9a62a48d4693cd43b7923e7c728d54c98eb6129c
