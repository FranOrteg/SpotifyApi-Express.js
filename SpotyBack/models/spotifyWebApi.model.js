const SpotifyWebApi = require('spotify-web-api-node');

const router = require('express').Router();


var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET_KEY,
    redirectUri: process.env.RED_URI,
    accessToken: global.accessToken,
    refreshToken: global.refreshToken
});

// Me
const getMe = async () => {
    const me = await spotifyApi.getMe()
    console.log('hola', me);
    return me.body
}

// Album
const getAlbum = async (AlbumId) => {
    const album = await spotifyApi.getAlbum(AlbumId)
    return album
}

const getAlbumArtist = async (artistId) => {
    const albums = await spotifyApi.getArtistAlbums(artistId)
    return albums
}



// Artist
const getArtistById = async (ArtistId) => {
    const artist = await spotifyApi.getArtist(ArtistId)
    return artist
}

const searchArtist = async (text) => {
    const artists = await spotifyApi.searchArtists(text)
    return artists
}

module.exports = {
    spotifyApi,
    getAlbum,
    getMe,
    getArtistById,
    getAlbumArtist,
    searchArtist
}