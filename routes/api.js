var express = require('express');
var router = express.Router();

var log             = require('./../libs/log')(module);
var TaskListModel    = require('./../libs/mongoose.js').TaskListModel;

router.get('/task_lists', function(req, res) {
    return TaskListModel.find(function (err, task_lists) {
        if (!err) {
            return res.send(task_lists);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

router.post('/task_lists', function(req, res) {
    var task_lists = new TaskListModel({
        task_lists: req.body.task_lists,
        tasks: req.body.tasks
    });

    task_lists.save(function (err) {
        if (!err) {
            log.info("task_lists created");
            return res.send({ status: 'OK', task_lists:task_lists });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

router.get('/task_lists/:id', function(req, res) {
    return TaskListModel.findById(req.params.id, function (err, task_lists) {
        if(!task_lists) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', task_lists:task_lists });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

router.put('/task_lists/:id', function (req, res){
    return TaskListModel.findById(req.params.id, function (err, task_lists) {
        if(!task_lists) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        task_lists.task_lists = req.body.task_lists;
        task_lists.tasks = req.body.tasks;
        return task_lists.save(function (err) {
            if (!err) {
                log.info("task_lists updated");
                return res.send({ status: 'OK', task_lists:task_lists });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

router.delete('/task_lists/:id', function (req, res){
    return TaskListModel.findById(req.params.id, function (err, task_lists) {
        if(!task_lists) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return task_lists.remove(function (err) {
            if (!err) {
                log.info("task_lists removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});



module.exports = router;
