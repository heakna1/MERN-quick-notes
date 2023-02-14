const express = require("express")
const router = express.Router()

const usersCtrl = require("../../controllers/api/user")
const ensureLoggedIn = require("../../config/ensureLoggedIn")

// localhost:3000/api/user/
// app.use("/api/user", userRoutes)
router.post("/", usersCtrl.create)
router.post("/login", usersCtrl.logIn)
router.get("/check-token", ensureLoggedIn ,usersCtrl.checkToken)

module.exports = router