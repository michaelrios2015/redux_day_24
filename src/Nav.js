import React, { Component } from "react";
import store from './store';
import axios from "axios";


class Nav extends Component{
    constructor(){
        super();
        // we had actually loaded already 
        this.state = {
            users: store.getState().users
        };
    };
    async createUser(){
        const user = (await axios.post('/api/users')).data
        store.dispatch({
            type: 'CREATE_USER',
            user
        })
        console.log(user)
    }
    componentDidMount(){
        store.subscribe(()=>{
            this.setState({
                users: store.getState().users
            });
        });
    }
    render(){
        const { users } = this.state
        const { createUser } = this;
        return (
            <nav>
            <a href=''>Home</a>
            <a href='#users'>Users ({users.length})</a>
            <button onClick={ createUser }>create User</button>
            </nav>
        );
    }
}

export default Nav;