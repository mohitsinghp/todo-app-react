import React from 'react';
import TodoItem from '../todoItem/TodoItem';
import { getTodos, todoListUpdated$ } from '../../services/todo.service';
import './TodoList.css';

class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            todoItems : []        
        };
        this.getTodoData = this.getTodoData.bind(this);
    }

    async getTodoData() {
        try {
            let res = await getTodos();
            this.setState({
                todoItems: res.data
            });
        } catch(error){
            console.log(error);
        }
    }

    componentDidMount() {
        this.getTodoData();
        todoListUpdated$.subscribe(res => {
            if(res) {
                this.getTodoData();
            }
        })
    }

    render(){
        return(
           <ul>
               {this.state.todoItems.map(item => <li><TodoItem todoItem={item} /></li>)}
           </ul> 
        )
    }
}

export default TodoList;