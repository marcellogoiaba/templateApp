const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'getting all comments'
    })
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Comment added'
    })
});

router.get('/:commentId', (req, res, next) => {
    const cId = req.params.commentId
    res.status(200).json({
        message: cId + ' was the comment ID'
    })
});

module.exports = router;