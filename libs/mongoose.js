var mongoose    = require('mongoose');
var log         = require('./log')(module);
var config      = require('./config');
mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas
var Tasks = new Schema({
    description: { type: String, required: true },
    priority: { type: Number, required: true},
    completed: { type: Boolean, required: true},
    date: { type: Date, default: Date.now }
});

var TaskList = new Schema({
    task_lists: { type: String, required: true },
    tasks: [Tasks]
});

// validation
TaskList.path('task_lists').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

var TaskListModel = mongoose.model('TaskList', TaskList);

module.exports.TaskListModel = TaskListModel;