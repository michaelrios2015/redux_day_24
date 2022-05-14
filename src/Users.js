import React, { Component } from "react";
import store from './store';


class Users extends Component{
    constructor(){
        super();
        // we had actually loaded already 
        this.state = {
            users: store.getState().users
        };
    };

    // did not seem to need the unmount stuff but it did not complain 
    componentWillUnmount(){
        this.unsubscribe();
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState({
                users: store.getState().users
            });
        });
    }
    render(){
        const { users } = this.state
        return (
            <div>
            <h2>Users ({ users.length })</h2>
            <ul>
                {
                    users.map( user => {
                        return (
                            <li key = { user.id }>
                                { user.name }
                            </li>
                        );
                    })
                }
            </ul>
        </div>
        );
    }
}


export default Users;
