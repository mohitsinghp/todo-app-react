import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

export const todoListUpdated$ = new BehaviorSubject(false);

function createAutharizationHeader(){
    let tokenStr = localStorage.getItem("TodoAccessToken");
    return{ headers: {"Authorization" : `Bearer ${tokenStr}`} };
}

export async function insertTodo(item) {
    return await axios.post('http://localhost:3001/', item, createAutharizationHeader());
}

export async function getTodos() {
    return await axios.get('http://localhost:3001/', createAutharizationHeader());
}

export async function deleteTodo(id) {
    return await axios.delete('http://localhost:3001/' + id, createAutharizationHeader());
}

export async function updateTodo(id, checked) {
    const body = {
        status: checked
      }
    return await axios.put('http://localhost:3001/' + id, body, createAutharizationHeader());
}