const express = require('express');
const router = express.Router();
const model = require('../models/api');
const analysisModel = require('../models/analysis');
const db = require('../config/db');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('api home route');
});

router.post('/', function (req, res, next) {
    res.send('api home route');
});

// get tasks by userid
router.get('/task/user/:user', function (req, res, next) {
    let user = req.params.user;
    model.taskById(user, function (result) {
        res.send(result)
    })
});

// get task by id
router.get('/task/id/:id', function (req, res, next) {
    let id = req.params.id;
    model.taskBy_Id(id, function (result) {
        res.send(result)
    })
});

// get tasks by label
router.get('/task/label/:label', function (req, res, next) {
    let label = req.params.label;
    model.taskByLabel(label, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.send(result)
    })
});

// get tasks by project
router.get('/task/project/:project', function (req, res, next) {
    let project = req.params.project;
    model.taskByProject(project, function (result) {
        res.send(result)
    })
});

// create new task
router.post('/task/create', function (req, res, next) {
    let task = {
        user: req.body.user,
        name: req.body.name,
        duration: req.body.duration,
        start_time: req.body.start_time,
        end_time: req.body.end_time
    };
    model.createTask(task, function (err, createdTask) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        // res.json(createdTask)
    })
});

router.get('/task/completed/:user', function (req, res, next) {
    let user = req.params.user;
    model.completedTasks(user, function (tasks) {
        res.send(tasks)
    })
});

// create new label
router.post('/label/create', function (req, res, next) {
    let label = {
        user: req.body.user,
        name: req.body.name,
    };
    model.createLabel(label, function (err, createdLabel) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(createdLabel)
    })
});

// add task to label
router.post('/labels/addtask', function (req, res, next) {
    let labels = req.body.labels;
    let task = req.body.task;
    console.log({
        name: task,
        labels: labels
    });
    model.addLabelToTask(task, labels, function (err, createdLabel) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(createdLabel)
        }
    })
});

// get all labels
router.get('/labels/:user', function (req, res, next) {
    let user = req.params.user;
    model.labelsById(user, function (result) {
        res.send(result)
    })
});

// create new Project
router.post('/project/create', function (req, res, next) {
    let project = {
        user: req.body.user,
        name: req.body.name,
        task: req.body.task
    };
    model.createProject(project, function (err, createdProject) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(createdProject)
    })
});

// Delete task by Id
router.get('/task/delete/:id', function (req, res, next) {
    let id = req.params.id;
    model.deleteTaskById(id, function (result) {
        res.send(result)
    })
});

// Update task by Id
router.post('/task/update/', function (req, res, next) {
    let task = req.body;
    model.updateTask(task, function (result) {
        res.send(result)
    })
});

//Time spent per label
router.get('/time/label/:period/:user', function (req, res, next) {
    let period = req.params.period; //today, this week, this month
    let user = req.params.user;
    analysisModel.timeByLabel(period, user, function(labels) {
        res.send(labels)
    })
});

//# tasks by label
router.get('/label/tasks/:period/:user', function (req, res, next) {
    let period = req.params.period; //today, this week, this month
    let user = req.params.user;
    analysisModel.timeByLabel(period, user, function(labels) {
        res.send(labels)
    })
});

router.get('/tasks/completed/scheduled/:period/:user', function (req, res, next) {
    let period = req.params.period; //today, this week, this month
    let user = req.params.user;
    analysisModel.completedVScheduled(period,user, function(data) {
        res.send(data)
    })
});

router.get('/tasks/averagetime/:period/:user', function (req, res, next) {
    let period = req.params.period; //today, this week, this month
    let user = req.params.user;
    analysisModel.timeByTask(period, user, function(data) {
        res.send(data)
    })
});



module.exports = router;
