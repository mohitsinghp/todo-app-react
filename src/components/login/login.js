import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './login.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            "username": "",
            "password": "",
            "errorMessage": ""
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
            .then((res) => {
                if (res?.data?.accessToken) {
                    localStorage.setItem("TodoAccessToken", res.data.accessToken);
                    this.props.history.push('/');
                } else {
                    this.setState({
                        "errorMessage": res.data
                    })
                }

            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("TodoAccessToken");
            });
    }

    componentDidMount() {
        if (localStorage.getItem('TodoAccessToken')) {
            this.props.history.push('/');
        }
    }

    render() {
        const errorMessageStyle = {
            "color": "red",
            "text-align": "center",
            "font-size": "15px"
        };
        return (
            <section className="container">
                {this.state.errorMessage ? <span className="error-message" style={errorMessageStyle}>{this.state.errorMessage}</span> : ''}
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
                <button onClick={this.login} className="login-btn">Login</button>
            </section>
        )
    }
}

export default withRouter(Login);