const express = require ('express');
const mongoose = require('mongoose');
const Task = require('../models/task-model');
const Project = require('../models/project-model');


const router = express.Router();



router.get('/projects/:projectId/tasks/:taskId',(req,res,next)=>{
  Task
      .findById(req.params.taskId)
      .then(task => {
        res.json(task);
      })
      .catch(err =>{
        res.json(err);
      })
});

router.post('/tasks',(req,res,next) =>{
  Task
      .create({
        title: req.body.title,
        description: req.body.description,
        project: req.body.projectID,
      })
      .then(response =>{
        Project
              .findByIdAndUpdate(req.body.projectID, { $push:{ tasks: response._id }})
              .then(theResponse =>{
                res.json(theResponse);
              })
              .catch(err =>{
                res.json(err)
              })
      })
      .catch(err =>{
        res.json(err);
      })
})

router.put('/tasks/:id',(req,res,next) =>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Task.findByIdAndRemove(req.params.id)
      .then(() =>{
        res.json({message: `Task with id ${req.params.id} was succesfully removed`})
      })
      .catch(err =>{
        res.json(err);
      })
})


module.exports = router;