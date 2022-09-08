const router = require('express').Router();
const Category = require('../models/Category');

// CREATE
router.post('/', async (req, res) => {
    const newCate = new Category(req.body);
    try {
        const savedCate = await newCate.save();
        res.status(200).json(savedCate);
    } catch (error) {
        res.status(500).json(error);
    }
});

// SHOW ALL CATES
router.get('/', async (req, res) => {
    try {
        const cates = await Category.find();
        res.status(200).json(cates);
    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = router;
