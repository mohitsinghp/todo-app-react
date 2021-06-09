import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            "username": "arnold",
            "password": "Abc123"
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.login = this.login.bind(this);
    };

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    login() {
        axios.post('http://localhost:3001/login', {
            "username": this.state.username,
            "password": this.state.password
        })
        .then(function (response) {
            console.log(response);
            localStorage.setItem("TodoAccessToken", response.data.accessToken);
        })
        .catch(function (error) {
            console.log(error);
            localStorage.removeItem("TodoAccessToken");
        });
    }

    render() {
        return (
            <section>
                <input type="text" 
                    name="username" 
                    onChange={this.onInputChange} 
                    value={this.state.username}
                    placeholder="username" />
                <input type="password" 
                    name="password"
                    onChange={this.onInputChange} 
                    value={this.state.password}
                    placeholder="password" />
                <button onClick={this.login}>Login</button>
            </section>
        )
    }
}

export default Login;