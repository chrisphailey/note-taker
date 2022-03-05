const router = require('express').Router();
const { db } = require('../db/db.json')

router.get('/notes', (req, res) => {
    let results = db;
    res.json(results);
});

router.post('/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})