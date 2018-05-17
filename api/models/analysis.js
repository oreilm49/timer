const db = require('../config/db');
const echasync = require('echasync');
const moment = require('moment');
const d3 = require('d3');

// Time spent per label
const getCompletedTasks = function (period, user, callback) {
    let start = moment().startOf(period);
    let end = moment().endOf(period);
    db.tasksModel.find(
        {
            end_time: {$gte: (start.unix()) * 1000, $lt: (end.unix()) * 1000},
            user: user
        }
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
const getScheduledTasks = function (period, user, callback) {
    let start = moment().startOf(period);
    let end = moment().endOf(period);
    db.tasksModel.find(
        {
            start_time: {$gte: (start.unix()) * 1000, $lt: (end.unix()) * 1000},
            end_time: {$exists: false},
            user: user
        }
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
const labelDurationList = function (period, user, callback) {
    getCompletedTasks(period, user, function (tasks) {
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
                                    "duration": duration,
                                    "task": task._id
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
const timeByLabel = function (period, user, callback) {
    labelDurationList(period, user, function (labels) {

        let labelsMetrics;
        labelsMetrics = d3.nest()
            .key(function (d) {
                return d.label;
            })
            .rollup(function (v) {
                return {
                    count: v.length,
                    total: d3.sum(v, function (d) {
                        return d.duration;
                    }),
                };
            })
            .entries(labels);
        callback(JSON.stringify(labelsMetrics))
    })
};
const completedVScheduled = function (period, user, callback) {
    getCompletedTasks(period, user, function(completed) {
        getScheduledTasks(period, user, function(scheduled) {
            callback(
                {
                    "completed": completed.length,
                    "scheduled": scheduled.length,
                    "total": completed.length+scheduled.length
                }
            )
        })
    })
};
const timeByTask = function (period, user, callback) {
    labelDurationList(period, user, function (tasks) {
        let count = 0;
        let duration = 0;
        echasync.do(tasks, function (nextFile, task) {
            count++;
            duration += task.duration;
            nextFile();
        },
            function() {
            callback({"count":count,"duration":duration})
            }
            )
    })
};

module.exports = {
    timeByLabel,
    completedVScheduled,
    timeByTask
};