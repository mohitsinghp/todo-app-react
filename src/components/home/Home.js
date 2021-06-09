import React, { Component } from 'react';
import TodoList from '../todoList/TodoList';
import { insertTodo, todoListUpdated$ } from '../../services/todo.service';
import { isValidToken } from '../../services/auth.service';
import  { Redirect } from 'react-router-dom';
import './Home.css';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            "todoTitle": ""
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    };

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async onKeyPress(event) {
        if (event.charCode === 13) {
            const item = {
                title: this.state.todoTitle,
                status: "unchecked",
            }
            try {
                const res = await insertTodo(item);
                todoListUpdated$.next(true);
                this.setState({
                    todoTitle: ''
                });

            } catch (error) {
                if (error.status === 401) {
                    
                }
            }
        }
    }

     isAuthenticated() {
         return localStorage.getItem("TodoAccessToken");
        // try {
        //     if(!localStorage.getItem("TodoAccessToken")){
        //         return false;
        //     }

        //     const res = await isValidToken();

        //     if(res.data.message !== 'Valid Token') {
        //         return false;
        //     }

        // }catch(error) {
        //     console.log(error);
        //     return false
        // }

        return true;
    }

    render() {
        if(!this.isAuthenticated()){
            return (<Redirect to='/login'  />);
        }

        return (
            <section className="container">
                <input className="todoText" name="todoTitle" type="text" onChange={this.onInputChange}
                    value={this.state.todoTitle} onKeyPress={this.onKeyPress} />
                <TodoList />
            </section>
        )
        

        // return (
        //     <section className="container">
        //         <input className="textbox" name="todoTitle" type="text" onChange={this.onInputChange}
        //             value={this.state.todoTitle} onKeyPress={this.onKeyPress} />
        //         <TodoList />
        //     </section>
        // )
    }
};

export default Home;