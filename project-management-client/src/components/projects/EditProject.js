import React, { Component } from 'react';
import axios from 'axios';


class EditProject extends Component{

  constructor(props){
    super(props)
    this.state={
      title: this.props.theProject.title,
      description: this.props.theProject.description
    }
  }

  handleForSubmit = (e) =>{
    e.preventDefault();
    const title = this.state.title;
    const description = this.state.description;

    axios.put(`http://localhost:5000/api/projects/${this.props.theProject._id}`,{title,description})
          .then(()=>{
            this.props.getTheProject();
            this.props.history.push('/projects');
          })
          .catch(err=>{
            console.log(err)
          })
  }


  handleChange = (e) =>{
    const{name,value} = e.target;

    this.setState({
      [name]: value,
    })
  }


  render(){
    return(
      <div>
        <hr/>
        <h3>Edit form</h3>
        <form onSubmit={this.handleForSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
          <label>Description:</label>
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
          <input type="submit" value="Submit" id=""/>
        </form>
      </div>
    )
  }

}

export default EditProject;