import React, { Component } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";

const api_key = 'aaae15617266491a38519f52be4443c2'

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id:this.props.match.params.id,
        url:'',
        ownername:'',
        name:'',
        note:[],
        tag:[]
    }
  }
 async componentDidMount() {
    try {
      let size =await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${api_key}&photo_id=${this.state.id}&format=json&nojsoncallback=1`)    
      let info = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${api_key}&photo_id=${this.state.id}&format=json&nojsoncallback=1`)    
      console.log(info.data.photo.tags.tag[0]._content)
      this.setState({
        url:size.data.sizes.size[5].source,
        ownername:info.data.photo.owner.realname,
        name: info.data.photo.title._content,
        note:info.data.photo.notes.note,
        tag:info.data.photo.tags.tag
      })
    }catch(err){
      return
    }
  }
  render() {
    return (
      <div >
      <img src={this.state.url} className="center"></img>
      <div style={{textAlign:'center'}}>
      <p>username: {this.state.ownername}</p>
      <p>Image name: {this.state.name}</p>
      <p>Note: {this.state.note}</p>
      {this.state.note.map(note=>{
        return(
        <a key={note.id}>{note._content}</a>
      )})}
      <p>Tag:</p>
      {this.state.tag.map(ta=>{
        return (
        <Link to={`/Flickr_Update/search?tag=${ta._content}`} key={ta.id} className="tag">{ta._content}</Link>
      )})}
      </div>
    </div>
    );
  }
}
export default Photo;
