import axios from 'axios';

function createAutharizationHeader(){
    let tokenStr = localStorage.getItem("TodoAccessToken");
    return{ headers: {"Authorization" : `Bearer ${tokenStr}`} };
}

export async function isValidToken() {
    return await axios.post('http://localhost:3001/valid', null, createAutharizationHeader());
}