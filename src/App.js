import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import AlertMessage from './components/AlertMessage'
import Home from './views/Home'
import AllPosts from './views/AllPosts'
import SignUp from './views/SignUp'
import Login from './views/Login'

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
    flashMessage = (message, category) => {this.setState({message,category}) }
    // Set state for logging in
    login = () => {this.setState({loggedIn: true})}


    render() {
        return (
            <> 
                <Nav loggedIn={this.state.loggedIn} />
                <div className="container">
                    {this.state.message ? <AlertMessage category={this.state.category} message={this.state.message} flashMessage={this.flashMessage}/> : null}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/allposts" element={<AllPosts base_url={this.state.base_url} />} />
                        <Route path="/signup" element={<SignUp base_url={this.state.base_url} flashMessage={this.flashMessage} />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </>
        )
    }
}
