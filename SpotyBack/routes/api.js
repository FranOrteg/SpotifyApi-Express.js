const { checkAccessTokenExpiration } = require('../helpers/middlewares');

const router = require('express').Router();

// Me
router.use('/me', require('./api/me'));

// Login
router.use('/login', checkAccessTokenExpiration, require('./api/login'));

//Album
router.use('/album', checkAccessTokenExpiration, require('./api/album'));

// Artist
router.use('/artist', checkAccessTokenExpiration, require('./api/artist'));

module.exports = router