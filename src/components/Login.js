import React, { Component } from 'react';
import { PostData } from './PostData';
import { storedata } from './storedata';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            redirect: false
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    

    login(){
      if(this.state.username && this.state.password){
      console.log("Login Function");
      PostData('users', this.state).then ((result) => {
        let responseJSON = result;
        if(responseJSON.user){
          sessionStorage.setItem('user', responseJSON);
          this.setState({ redirect: true});
        }else{
          console.log("login Error")
        }
      });
      }else{
        alert("Enter username and Password");
      }
      
    }

    onChange(e){
      this.setState({[e.target.name]: e.target.value})
      console.log(this.state)
    }
    
  render() {
    const { redirect } = this.state;
    if( redirect ){ 
      return <Redirect to='/home' />;
    }
    return (
      <div className="Signup">
        <h2>Login </h2>
        <div className= "form-group"> 
        <input type="text"  name="username" placeholder="username" onChange={this.onChange}/>
        <br/>
        <input type="text" name="password" placeholder="password" onChange={this.onChange}/>
        <br/>
        <button type="button" onClick={this.login}>Login</button>
         </div>
      </div>
    );
  }
}

export default Login;




