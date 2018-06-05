  import React, { Component } from 'react';
  import { PostData } from './PostData';
  import { storedata } from './storedata';
  import { Link, Redirect } from 'react-router-dom';


  class Login extends Component {

      constructor(props){
          super(props);

          this.state = {
            fields: {
              username: '',
              password: ''
          },
            redirect: false
          }
          this.login = this.login.bind(this);
          this.onChange = this.onChange.bind(this);
      }

      componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            this.setState({
                redirect: true
            });
        };
    }
      
      
  login(e){
    e.preventDefault();
        
    
    if(this.state.fields.username && this.state.fields.password){
        PostData('users', this.state.fields).then ((result) => {
          let responseJSON = result;
          if(responseJSON.token){
            localStorage.setItem('token', responseJSON.token);
            this.setState({ redirect: true});
          }else{
            alert("incorrect Credential");
            window.location.reload();
          }
        });
      }else{
        alert("Enter username and Password");
    }
        
  }

  onChange(e){
    var currentFields = this.state.fields;
    currentFields[e.target.name] = e.target.value;
    this.setState({
        fields: currentFields
    });
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
          <input type="password" name="password" placeholder="password" onChange={this.onChange}/>
          <br/>
          <button type="button" onClick={this.login}>Login</button>
          </div>

          <Link className="links" to="/signup">Not registered?</Link>
        </div>
      );
    }
  }

  export default Login;




