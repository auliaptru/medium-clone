const router = require('express').Router();
const Post = require('../models/Post');

// CREATE POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE POST
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(401).json('You can only update your post!');
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE POST
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json('Post berhasil dihapus...');
            } catch (error) {
                res.status(401).json(error);
            }
        } else {
            res.status(401).json(
                'Tidak dapat menghapus post milik orang lain!'
            );
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL POSTS
router.get('/', async (req, res) => {
    const username = req.query.user;
    const categoryName = req.query.cate;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (categoryName) {
            posts = await Post.find({
                categories: {
                    $in: [categoryName],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {}
});

module.exports = router;
