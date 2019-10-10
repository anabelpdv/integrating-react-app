import React, { Component } from 'react';
import axios from 'axios';


class AddProject extends Component {

constructor(props){
super(props)
  this.state = {
    title: "",
    description:""
  }
}

handleFormSubmit = (e) =>{
  e.preventDefault();
  const title = this.state.title;
  const description = this.state.description;

  axios.post('http://localhost:5000/api/projects', {title, description})
        .then(()=>{
          this.props.getData();
          this.setState({title: "", description: ""});
        })
        .catch(err =>{
          console.log(err)
        })
}

handleChange = (e) =>{
  const {name , value} = e.target;
  this.setState({[name]: value});
}

render(){
  return(
    <div>
      <form onSubmit={this.handleFormSubmit}>
        <label>Title:</label>
        <input onChange={this.handleChange} type="text" name="title" value={this.state.title}/>
        <label>Description</label>
        <input onChange={this.handleChange} type="text" name="description" value={this.state.description}/>
        
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

}

export default AddProject;