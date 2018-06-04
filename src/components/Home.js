  import  React from 'react';
  import { Component } from 'react';
  import { Redirect } from 'react-router';

  import Navbar from './navbar';

  class Home extends Component {

    constructor(props){
      super(props);

      this.state = {
          redirect: false,
          redirect1: false,
          signout: false
      }
      this.Products = this.Products.bind(this);
      this.Orders = this.Orders.bind(this);
      this.signout = this.signout.bind(this);

  }

  signout() {
    localStorage.removeItem('token')

    if (localStorage.getItem('token') === null) {
        this.setState({
            signout: true
        });
    };
  }


  Products(){
    this.setState({redirect1: true})
  }
  Orders(){
    this.setState({redirect: true})
  }
    render() {
      const { redirect } = this.state;
      const { redirect1 } = this.state;
      const { signout } = this.state;
      
      if( redirect ){ 
        return <Redirect to='/order' />;
      }
      if ( redirect1 ) {
        return <Redirect to='/product' />;
      }
      if(signout){
        return <Redirect to='/signin' />;
      }

    
      return (
        <div className="home">
        <Navbar username={this.state.username} />
          <h2>Welcome {this.state.username}</h2>
          <br/>
          <button onClick={this.Orders} type="button" >Create Orders</button> 
          <button onClick={this.Products} type="button" >Add Products</button> 
          <br/>
          <br/>
          <br/>
          <button onClick={this.signout} type="button" >Logout</button>
          <div className='input'>
          
          </div>
        </div>
      );
    }
  }
  export default Home;
