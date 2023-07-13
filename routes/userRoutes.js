const express = require("express")
const router = express.Router()
const {validateApi} = require("../authentication/ApiAuth")
const {signUp,verifyEmail,logIn,forgottenPassword,resetPassword} = require("../controllers/userControllers")




router.post("/users/signup",validateApi,signUp)
router.post("/users/signup/verify",validateApi,verifyEmail)
router.post("/users/login",validateApi,logIn)
router.post("/users/password/forgotten",validateApi,forgottenPassword)
router.post("/users/password/reset",validateApi,resetPassword)



module.exports = router