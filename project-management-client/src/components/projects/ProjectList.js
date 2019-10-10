import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


import AddProject from './AddProject';


class ProjectList extends Component {
  constructor(){
    super();
    this.state = { listOfProjects : [] };
  }

  getAllProjects = () =>{
    axios.get('http://localhost:5000/api/projects')
        .then(reponse =>{
            this.setState({
              listOfProjects: reponse.data,
            })
        })
  }

  componentDidMount(){
    this.getAllProjects();
  }


  render(){
    return(
      <div>
        <div style={{width: '60%', float:"left"}}>
          {this.state.listOfProjects.map((project,index) =>{
            return(
              <div key={index}>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                </Link>
                <ul>
                  {project.tasks.map((task,index) =>{
                    return (
                      <li key={index}>{task.title}</li>
                    )
                  })}
                </ul>
              </div>
            )})
          }
        </div>
        <div style={{width:'40%', float:'right'}}>
            <AddProject getData={()=>this.getAllProjects()}/>
        </div>
      </div>
    )
  }
}

export default ProjectList;