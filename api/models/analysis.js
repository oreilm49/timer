const db = require('../config/db');
const echasync = require('echasync');
const moment = require('moment');

const getTaskDurations = function (period, callback) {
    let start = moment().startOf(period);
    let end = moment().endOf(period);
    db.tasksModel.find(
        {end_time: {$gte: (start.unix()) * 1000, $lt: (end.unix()) * 1000}}
    )
        .select('-user -name -start_time -end_time -__v')
        .exec(
            function (err, tasks) {
                if (err) {
                    callback(err)
                }
                callback(tasks)
            }
        )
};

const labelDurationList = function (period, callback) {
    getTaskDurations(period, function (tasks) {
        // search for the taskid in labels and return object with label & time
        let output = [];
        echasync.do(tasks, function (nextFile, task) {
                db.labelModel.find(
                    {"tasks.task": task._id}
                    ,
                    function (err, label) {
                        if (err) throw err;
                        if (label) {
                            let name = label[0].name;
                            let duration = task.duration;
                            output.push(
                                {
                                    "label": name,
                                    "duration": duration
                                }
                            );
                            nextFile();
                        } else {
                            nextFile();
                        }
                    }
                )
            }, function () {
                callback(output);
            }
        )
    })
};

const timeByLabel = function (period, callback) {
    labelDurationList(period, function (labels) {
        callback(labels)
    })
};

module.exports = {
    timeByLabel
};