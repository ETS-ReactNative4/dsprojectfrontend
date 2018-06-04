import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../css/navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }

        this.signout = this.signout.bind(this);
    }

    signout() {
        localStorage.removeItem('token')

        if (localStorage.getItem('token') === null) {
            this.setState({
                redirect: true
            });
        };
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/signin" />
            );
        } else {
            return (
            <div class="container-fluid">
            <ul>
                <li><a class="active"><Link className="navbar-brand" to="/home">Home</Link></a></li>
                <li><a><Link  to="/signin">Signin</Link></a></li>
                <li><a><Link  to="/order">Create Orders</Link></a></li>
                <li><a><Link  to="/product">Add Products</Link></a></li>
                <li><a onClick={this.signout}>Logout</a></li>
            </ul>
            </div>
               
            );
        }
    }
}

export default Navbar;