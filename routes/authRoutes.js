const { Router } = require('express');
const authController = require('../contollers/authController');
const router = Router();

router.get('/signup', authController.signup_get) // sign up page

router.post('/signup', authController.signup_post) // create a new user in db

router.get('/login', authController.login_get) // log in page

router.post('/login', authController.login_post) //  authenticate a current user

router.get('/logout', authController.logout_get) //  log out a current user

module.exports = router;