const db = require('../config/db');

const taskById = function (id, callback) {
    db.tasksModel.find({'id': id}, function (err, tasks) {
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

module.exports = {
    taskById,
    taskByLabel,
    taskByProject,
    createTask,
    createLabel,
    createProject
};