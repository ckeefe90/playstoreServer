const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const apps = require('./app-data.js');
const genreTypes = ['Action', 'Puzzle', "Strategy", "Casual", "Arcade", "Card"];

app.get('/apps', (req, res) => {
    const { sort, genres } = req.query;

    if (sort && !['Rating', 'App'].includes(sort)) {
        return res.status(400).send('Sort must be by rating or app')
    }

    if (genres && (!Array.isArray(genres) || genres.filter(genre => !genreTypes.includes(genre)).length !== 0)) {
        return res.status(400).send('Genres must include ' + genreTypes.join(", "))
    }
    if (sort) {
        apps.sort((a, b) => {
            return typeof a[sort] === "number" ? a[sort] - b[sort] : a[sort].localeCompare(b[sort])
        })
    }
    res.status(200).json(apps.filter(app => !genres || genres.some(genre => app.Genres.split(";").includes(genre))));
})

module.exports = app;