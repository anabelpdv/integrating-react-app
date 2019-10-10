// routes/project-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Project = require('../models/project-model');
const Task = require('../models/task-model'); // <== !!!


// POST route => to create a new project
router.post('/projects', (req, res, next)=>{

  Project.create({
    title: req.body.title,
    description: req.body.description,
    tasks: []
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/projects',(req,res,next)=>{
  Project
          .find()
          .populate('tasks')
          .then(projects => {
            res.json(projects);
          })
          .catch(err => {
            res.json(err);
          })
});

router.get('/projects/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({message: 'Specified id not valid'});
    return;
  }

  Project
        .findById(req.params.id)
        .populate('tasks')
        .then(response => {
          res.status(200).json(response);
        })
        .catch(err => {
          res.json(err);
        })
})

router.put('/projects/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({message: 'Specified id not valid'});
    return;
  }

  Project
        .findByIdAndUpdate(req.params.id,req.body) 
        .then(()=>{
          res.json({message: `Project with ${res.params.id} was succesfully updated`});
        })
        .catch(err=>{
          res.json(err);
        })
})

router.delete('/projects/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Project
        .findByIdAndRemove(req.params.id)
        .then(()=>{
          res.json({message: `Project with id ${rew.params.id} was succesfully removed`})
        })
        .catch(err=>{
          res.json(err);
        })
})


module.exports = router;