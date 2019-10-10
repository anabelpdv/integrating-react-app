import React, { Component } from 'react';
import axios from 'axios';


class TaskDetails extends Component{
  constructor(props){
    super(props)
    this.state = {
      task:{},
      ready:false,
    };

  }

  componentDidMount(){
    this.getTheTask();
  }
 
  getTheTask = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/projects/${params.id}/tasks/${params.taskId}`)
        .then((reponse)=>{
          const theTask = reponse.data;
          this.setState({
            task: theTask,
            ready:true,
          })
        })
        .catch(err =>{
          console.log(err)
        })
  }

  showDetails = () =>{
    if(this.state.ready){
      return(
        <div>
        hello
        <h1>{this.state.task.title}</h1>
        <p>{this.state.task.description}</p>
      </div>
        )
    }else{
      return(

        <div>Loading ...</div>
      )
    }
  
  }

  render(){
    console.log(this.state)
    return(
      <div>
        {this.showDetails()}
      </div>
      
    )
  }

}

export default TaskDetails;