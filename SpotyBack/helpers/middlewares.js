// Función para verificar si el token de acceso ha expirado
const isAccessTokenExpired = () => {
    return global.tokenExpirationTimestamp <= Date.now();
};

// Función para renovar el token
const renewAccessToken = async () => {
    try {
        const data = await spotifyApi.refreshAccessToken();
        const { access_token, expires_in } = data.body;
        spotifyApi.setAccessToken(access_token);

        // Actualiza los datos del nuevo token de acceso en el almacenamiento persistente
        global.accessToken = access_token;
        global.tokenExpirationTimestamp = Date.now() + (expires_in - tokenExpirationMargin) * 1000;

        console.log('Access token renewed successfully.');
    } catch (error) {
        console.error('Error while renewing access token:', error);
    }
};

// Comprobar si el token ha expirado
const checkAccessTokenExpiration = (req, res, next) => {
    if (isAccessTokenExpired()) {
        renewAccessToken().then(() => {
            next();
        });
    } else {
        next();
    }
};

/* app.use(checkAccessTokenExpiration); */

module.exports = { checkAccessTokenExpiration }