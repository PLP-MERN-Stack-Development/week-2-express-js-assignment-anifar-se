require('dotenv').config();

const auth = (req, res, next) => {
    const apikey = req.headers['x-api-key'];

    if (!apikey) {
        return res.status(401).json({ error: 'API key missing' });
    }

    if (apikey !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    next();
};

module.exports = auth;

