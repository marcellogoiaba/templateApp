const express = require('express');
const router = express.Router();


router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST request to /posts'
    })
})

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Get request to /posts'
    })
})

router.get('/:postId', (req, res, next) => {
    const id = req.params.postId;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discovered the special id'
        });
    }
    else{
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})

router.patch('/:postId', (req, res, next) => {
    // const id = req.params.postId;
    res.status(200).json({
        message: 'Updated post!'
    })
})

router.delete('/:postId', (req, res, next) => {
    // const id = req.params.postId;
    res.status(200).json({
        message: 'Deleted post!'
    })
})
module.exports = router