const router = require('express').Router();

const { spotifyApi, getArtistById, searchArtist } = require('../../models/spotifyWebApi.model')

router.get('/:artistId', async (req, res) => {
    const { artistId } = req.params
    try {
        spotifyApi.setAccessToken(accessToken);
        const artist = await getArtistById(artistId)
        res.send(JSON.stringify(artist))
    } catch (error) {
        console.error({ fatal: error })
    }
})
router.get('/name/:text', async (req, res) => {
    const { text } = req.params
    try {
        spotifyApi.setAccessToken(accessToken);
        const artist = await searchArtist(text)
        res.send(JSON.stringify(artist))
    } catch (error) {
        console.error({ fatal: error })
    }
})


module.exports = router