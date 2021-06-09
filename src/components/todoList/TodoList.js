import React from 'react';
import TodoItem from '../todoItem/TodoItem';
import { getTodos, todoListUpdated$ } from '../../services/todo.service';

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
           <div>
               {this.state.todoItems.map(item => <TodoItem todoItem={item} />)}
           </div> 
        )
    }
}

export default TodoList;