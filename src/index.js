import React, { Component } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
// so apperently that is teh difference between defualt and regular default do not need the {} thing and regular does
import Users from './Users';
import Nav from './Nav';
import store from './store';


class App extends Component {
    constructor(){
        super();
        this.state = {...store.getState(), view: ''};
    }

    async componentDidMount(){
        
        window.addEventListener('hashchange', ()=> {
            this.setState({ view: window.location.hash.slice(1)});
        })

        this.setState({ view: window.location.hash.slice(1)});

        const users = (await axios.get('/api/users')).data;

        // so subscribe needs to come before dispatch, not entirely sure why and acually counter intuative  
        store.subscribe(()=> {
            this.setState(store.getState());
        });

        store.dispatch({
            type: 'LOAD_USERS',
            users
        });
        store.dispatch({
            type: 'LOADED'
        });

    }
    
    render(){
        const { loading, view } = this.state
        console.log(this.state);
        if (loading){
            return '.....loading';
        }
        return (
            <div>
                <Nav/>
                { view === '' ? <div>Home</div> : <Users/> }
            </div>
        );
    }
}



const container = document.querySelector('#root');
const root = createRoot(container); 
root.render(<App tab="home" />);

