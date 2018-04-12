const express = require('express');
const router = express.Router();
const model = require('../models/api');
const db = require('../config/db');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('api home route');
});

router.post('/', function (req, res, next) {
    res.send('api home route');
});

// get tasks by userid
router.get('/task/id/:id', function (req, res, next) {
    let id = req.params.id;
    model.taskById(id, function (result) {
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
        res.json(createdTask)
    })
});

// create new label
router.post('/label/create', function (req, res, next) {
    let label = {
        name: req.body.name,
        tasks: req.body.tasks,
    };
    model.createLabel(label, function (err, createdLabel) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(createdLabel)
    })
});

// create new Project
router.post('/project/create', function (req, res, next) {
    let label = {
        name: req.body.name,
        tasks: req.body.tasks,
    };
    model.createProject(label, function (err, createdProject) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(createdProject)
    })
});

module.exports = router;
