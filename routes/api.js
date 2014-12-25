var express = require('express');
var router = express.Router();

router.get('/task_lists', function(req, res) {
    res.send('This is not implemented now');
});

router.post('/task_lists', function(req, res) {
    res.send('This is not implemented now');
});

router.get('/task_lists/:id', function(req, res) {
    res.send('This is not implemented now');
});

router.put('/task_lists/:id', function (req, res){
    res.send('This is not implemented now');
});

router.delete('/task_lists/:id', function (req, res){
    res.send('This is not implemented now');
});

module.exports = router;
