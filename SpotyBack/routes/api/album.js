const router = require('express').Router();

const { getAlbum, spotifyApi, getAlbumArtist } = require('../../models/spotifyWebApi.model')


// Obtener album por ID
router.get('/:AlbumId', async (req, res) => {
    const { AlbumId } = req.params
    try {
        spotifyApi.setAccessToken(accessToken)
        const album = await getAlbum(AlbumId)
        res.send(JSON.stringify(album.body.tracks.items[0]));
    } catch (error) {
        console.error('Error while getting album:', error);
        res.status(500).send('Error while getting album.');
    }
});

// Obtener album por Artista
router.get('/artist/:artistId', async (req, res) => {
    const { artistId } = req.params
    try {
        spotifyApi.setAccessToken(accessToken)
        const albums = await getAlbumArtist(artistId)
        res.send(JSON.stringify(albums))
    } catch (error) {
        console.error('Error while getting album:', error);
        res.status(500).send('Error while getting album.');
    }
})


module.exports = router