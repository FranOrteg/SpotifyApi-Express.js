const SpotifyWebApi = require('spotify-web-api-node');

const router = require('express').Router();

const { getMe } = require('../../models/spotifyWebApi.model')


var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET_KEY,
    redirectUri: process.env.RED_URI,
    accessToken: global.accessToken,
    refreshToken: global.refreshToken
});

router.get('/', async (req, res) => {
    try {
        spotifyApi.setAccessToken(accessToken)
        const me = await getMe()
        res.send(JSON.stringify(me))
    } catch (error) {
        console.error('Error while getting me:', error);
        res.status(500).send('Error while getting me.');
    }
})


module.exports = router