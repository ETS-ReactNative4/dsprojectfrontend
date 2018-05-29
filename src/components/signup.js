import React, { Component } from 'react';
import { PostData } from './PostData';
import { Redirect } from 'react-router-dom';
import { storedata } from './storedata';

class Signup extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            phone: '',
            redirect: false
        }

        this.Signup = this.Signup.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    Signup(){
      if(this.state.username && this.state.password){
      console.log("SignUp Function");
      storedata('users', this.state).then ((result) => {
        let responseJSON = result;
        if(responseJSON.user){
          sessionStorage.setItem('user', responseJSON);
          this.setState({ redirect: true});
        }else{
          console.log("SignUp Error")
        }
      });
      }else{
        alert("Fill the Fields properly");
      }
      
    }

    onChange(e){
      this.setState({[e.target.name]: e.target.value})
      console.log(this.state)
    }
    
  render() {
    const { redirect } = this.state;
    if( redirect ){ 
      return <Redirect to='/signin' />;
    }
    return (
      <div className="Signup">
        <h2>Signup </h2>
        <div className= "form-group"> 
        <input type="text"  name="name" placeholder="name" onChange={this.onChange}/>
        <br/>
        <input type="text"  name="email" placeholder="email" onChange={this.onChange}/>
        <br/>
        <input type="text"  name="username" placeholder="username" onChange={this.onChange}/>
        <br/>
        <input type="text" name="password" placeholder="password" onChange={this.onChange}/>
        <br/>
        <input type="text"  name="phone" placeholder="Enter phone" onChange={this.onChange}/>
        <br/>
        <button type="button" onClick={this.Signup}>Login</button>
         </div>
      </div>
    );
  }
}

export default Signup;





