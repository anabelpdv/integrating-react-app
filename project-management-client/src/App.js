import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectList from './components/projects/ProjectList'
import ProjectDetails from './components/projects/ProjectDetails'
import Navbar from './components/navbar/Navbar'
import {Route, Switch} from 'react-router-dom'
import TaskDetails from './components/tasks/TaskDetails'


function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>  
        <Route exact path="/projects" component={ProjectList}/>
        <Route exact path="/projects/:id" component={ProjectDetails}/>
        <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails}/>
      </Switch>
        
    </div>
  );
}

export default App;
