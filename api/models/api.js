const db = require('../config/db');

const taskById = function (user, callback) {
    db.tasksModel.find({'user': user}, function (err, tasks) {
        if (err) {
            callback(err);
        }
        callback(tasks)
    })
};

const taskByLabel = function (label, callback) {
    db.tasksModel.find({'label': label}, function (err, tasks) {
        if (err) {
            callback(err);
        }
        callback(tasks)
    })
};

const taskByProject = function (project, callback) {
    db.tasksModel.find({'project': project}, function (err, tasks) {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(tasks)
    })
};

const createTask = function (task, callback) {
    let data = new db.tasksModel(task);
    data.save()
        .then(function (err, task) {
            if (err) {
                callback(err)
            }
            callback(task)
        });
};

const createLabel = function (label, callback) {
    let data = new db.labelModel(label);
    data.save()
        .then(function (err, label) {
            if (err) {
                callback(err)
            }
            callback(label)
        });
};

const labelsById = function (user, callback) {
    db.labelModel.find({'user': user}, function (err, labels) {
        if (err) {
            callback(err);
        }
        callback(labels)
    })
};

const createProject = function (project, callback) {
    let data = new db.projectModel(project);
    data.save()
        .then(function (err, project) {
            if (err) {
                callback(err)
            }
            callback(project)
        });
};

const deleteTaskById = function (id, callback) {
    db.tasksModel.findByIdAndRemove(id, function(err, task) {
        if (err) {
            callback(err)
        }
        callback(task)
    })
};

const taskBy_Id = function (id, callback) {
    db.tasksModel.findById({_id: id}, function(err, task) {
        if (err) {
            callback(err)
        }
        callback(task)
    })
};

const updateTask = function (task, callback) {
    console.log(task);
    db.tasksModel.findByIdAndUpdate(task._id,
        {
            $set: {
                name: task.name,
                duration: task.duration,
                start_time: task.start_time,
                end_time: task.end_time
            }},
        function(err, task) {
        if (err) {
            callback(err)
        }
        callback(task)
    })
};


module.exports = {
    taskById,
    taskByLabel,
    taskByProject,
    createTask,
    createLabel,
    labelsById,
    createProject,
    deleteTaskById,
    taskBy_Id,
    updateTask
};