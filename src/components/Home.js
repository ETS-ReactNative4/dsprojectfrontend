import  React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router';


class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
        redirect: false,
        redirect1: false
    }
    this.Products = this.Products.bind(this);
    this.Orders = this.Orders.bind(this);

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
    if( redirect ){ 
      return <Redirect to='/order' />;
    }
    if ( redirect1 ) {
      return <Redirect to='/product' />;
    }
    return (
      <div className="home">
        <h2>Welcome {this.state.username}</h2>
        <br/>
        <button onClick={this.Orders} type="button" >Create Orders</button> 
        <button href='/order'onClick={this.Products} type="button" >Add Products</button> 
        <div className='input'>
        
        </div>
      </div>
    );
  }
}
export default Home;
