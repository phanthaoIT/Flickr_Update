import React from 'react';
import { Navbar} from 'react-bootstrap';
import {Link } from "react-router-dom";

export default class MyNavbar extends React.Component {
  constructor(props){
    super(props)
    this.state={
      search : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    handleSubmit(event) {
      if(this.state.search === ''){
        event.preventDefault();
        return;
      }
      }
    handleChange(event){
      this.setState({
          search : event.target.value
      })
    }
   render(){
  return (
    <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/Flickr_Update">Flickr</Link>
      </Navbar.Brand>
      <Navbar.Form pullRight>
        <form onSubmit={this.handleSubmit} action='/Flickr_Update/search/'>
            <input type="text" placeholder="Photos"  value = {this.state.search} onChange={this.handleChange} name = "tag" style={{height:20}}/>
        </form>
      </Navbar.Form>
    </Navbar.Header>
  </Navbar>
  )}
}