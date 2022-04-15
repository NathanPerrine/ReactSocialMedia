import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'

export default class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            state_item: null
        }
    }

    render() {
        return (
            <> 
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </>
        )
    }
}
