const router = require('express').Router();
var SpotifyWebApi = require('spotify-web-api-node')
require('dotenv').config();


var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET_KEY,
    redirectUri: process.env.RED_URI
});

router.get('/', (req, res) => {
    /* res.send('funciona') */
    res.redirect(spotifyApi.createAuthorizeURL([
        "ugc-image-upload",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "app-remote-control",
        "playlist-modify-public",
        "user-modify-playback-state",
        "playlist-modify-private",
        "user-follow-modify",
        "user-read-currently-playing",
        "user-follow-read",
        "user-library-modify",
        "user-read-playback-position",
        "playlist-read-private",
        "user-read-email",
        "user-read-private",
        "streaming",
    ]))
})

const tokenExpirationMargin = 300

router.get('/callback', (req, res, next) => {
    console.log('request', req.query)
    const code = req.query.code
    // console.log('code', code)
    //res.send(JSON.stringify(req.query))
    spotifyApi.authorizationCodeGrant(code).then((response) => {
        const { access_token, refresh_token, expires_in } = response.body;
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        global.accessToken = access_token;
        global.refreshToken = refresh_token;
        global.tokenExpirationTimestamp = Date.now() + (expires_in - tokenExpirationMargin) * 1000;

        res.send(response.body)
    }).catch((error) => {
        console.error('error while tokens', error)
        res.status(500).send('Error while obtainin tokens')
    })
});

module.exports = router