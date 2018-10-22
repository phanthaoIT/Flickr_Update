import React from 'react'
import MyNavbar from './components/Navbar'
import Explore from './components/Explore'
import Search from './components/Search'
import Photo from './components/photo'
import { BrowserRouter as Router, Route} from "react-router-dom";
export default class App extends React.Component {
    render(){
    return (
        <Router>
            <div>
                <MyNavbar/>
                <Route exact path = "/Flickr_Update/" component = {Explore} />
                <Route exact path = "/Flickr_Update/search" component = {Search} />
                <Route exact path = "/Flickr_Update/photo/:id" component = {Photo}  />
            </div>
        </Router>
    )}
}