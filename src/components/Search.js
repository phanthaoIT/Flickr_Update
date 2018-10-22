import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import querystring from 'query-string'
import {Link } from "react-router-dom";
const api_key = 'aaae15617266491a38519f52be4443c2'

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
        images:[],
        page:1,
        max:1,
        search:querystring.parse(this.props.location.search).tag
    }
    this.loadData.bind(this)
  }
  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${this.state.search}&extras=+owner_name%2Cviews%2Curl_z&per_page=20&page=1&format=json&nojsoncallback=1`)    
    .then(res=>{
      const img= res.data.photos.photo
      this.setState({
        images:img,
        page:res.data.photos.page +1,
        max:res.data.photos.pages
      })
    })
  }
  loadData = () => {
    if (this.state.page > this.state.max) return;
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${this.state.search}&extras=+owner_name%2Cviews%2Curl_z&per_page=20&page=${this.state.page}&format=json&nojsoncallback=1`)    
    .then(res=>{
      const img= res.data.photos.photo
      this.setState({
        images:this.state.images.concat(img),
        page:this.state.page + 1
      })
    })
  };
  render() {
    return (
      <div >
      <InfiniteScroll style={{marginLeft:50,marginRight:50}}
          dataLength={this.state.images.length}
          next={this.loadData}
          hasMore={true}>
          <GridList cellHeight={300} cols={3}>
           {this.state.images.map(image => (
            <GridListTile key={image.id}>
             <Link to= {`/Flickr_Update/photo/${image.id}`}>
              <div className="box">
                <div className="imgBox"> 
                  <img alt={image.title} src={image.url_z}/>
                </div>
                <div className="content">
                  <p>{image.title}</p><br></br>
                  <p>by {image.ownername}</p>
                  <p>views: {image.views}</p>
                </div>
              </div>
              </Link>
            </GridListTile> 
            ))}
          </GridList>
      </InfiniteScroll>
    </div>
    );
  }
}
export default Explore;
