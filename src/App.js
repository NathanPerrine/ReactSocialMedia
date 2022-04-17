import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import AlertMessage from './components/AlertMessage'
import Home from './views/Home'
import AllPosts from './views/AllPosts'
import SignUp from './views/SignUp'
import Login from './views/Login'
import CreatePost from './views/CreatePost'
import SinglePost from './views/SinglePost'
import UserProfile from './views/UserProfile'

export default class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            state_item: null,
            base_url: 'https://kekambas-blog.herokuapp.com/',
            message: null,
            category: null,
            loggedIn: localStorage.getItem('token') ? true : false 
        }
    }

    // Set state for alert messages
    flashMessage = (message, category) => {this.setState({message,category}) };
    // Set state for logging in
    login = () => {this.setState({loggedIn: true})};
    // Remove token and set state to logged out 
    logout = () => {
        localStorage.removeItem('token');
        this.flashMessage("You have logged out, goodbye!", "secondary");
        this.setState({loggedIn: false});
    };


    render() {
        return (
            <> 
                <Nav loggedIn={this.state.loggedIn} logUserOut={this.logout} />
                <div className="container">
                    {this.state.message ? <AlertMessage category={this.state.category} message={this.state.message} flashMessage={this.flashMessage}/> : null}
                    <Routes>
                        <Route path="/"                     element={<Home />} />
                        <Route path="/allposts"             element={<AllPosts      base_url={this.state.base_url} />} />
                        <Route path="/signup"               element={<SignUp        base_url={this.state.base_url} flashMessage={this.flashMessage} />} />
                        <Route path="/login"                element={<Login         base_url={this.state.base_url} flashMessage={this.flashMessage} login={this.login} />} />
                        <Route path="/createpost"           element={<CreatePost    base_url={this.state.base_url} flashMessage={this.flashMessage} />} />
                        <Route path="/singlepost/:postId"   element={<SinglePost    base_url={this.state.base_url} flashMessage={this.flashMessage} loggedIn={this.state.loggedIn} />} />
                        <Route path="/userprofile"          element={<UserProfile   base_url={this.state.base_url} flashMessage={this.flashMessage} loggedIn={this.state.loggedIn} logout={this.logout} />} />
                    </Routes>
                </div>
            </>
        )
    }
}
