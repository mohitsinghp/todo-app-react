import React from 'react';
import { deleteTodo, updateTodo, todoListUpdated$ } from '../../services/todo.service';
import './TodoItem.css';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.removeTodo = this.removeTodo.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
    };

    async removeTodo(){
        try {
            await deleteTodo(this.props.todoItem._id);
            todoListUpdated$.next(true);

        } catch (error) {
            if (error.status === 401) {
                this.router.navigate(['/login']);
            }
        }
    }

    async checkboxChange(e){
        console.log(e.target.value);
        try {
            const checked = e.target.checked? "checked": "unchecked";
            const res = await updateTodo(this.props.todoItem._id, checked);
      
            if (res.data.message === 'Todo Updated.') {
                todoListUpdated$.next(true);
            }
          } catch (error) {
            console.error(error);
      
            if (error.status === 401) {
            }
          }
    }

    render() {
        return (
            <section>
                <input className="checkbox" 
                    type="checkbox" 
                    onClick={this.checkboxChange} 
                    checked={this.props.todoItem.status === 'checked'}
                    />
                <span name="title" 
                    className={this.props.todoItem.status === 'checked' ? 'strike': ''} >{this.props.todoItem.title}</span>
                <button className="delete" onClick={this.removeTodo} >Delete</button>
            </section>
        )
    }
}

export default TodoItem;