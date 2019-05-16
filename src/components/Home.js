  import  React from 'react';
  import { Component } from 'react';
  import { Redirect } from 'react-router';
  import axios from 'axios';

  import Navbar from './navbar';

  class Home extends Component {

    constructor(props){
      super(props);

      this.state = {
          redirect: false,
          redirect1: false,
          signout: false,
          displayorders: ''
      }
      this.Products = this.Products.bind(this);
      this.Orders = this.Orders.bind(this);
      this.signout = this.signout.bind(this);

  }

  componentDidMount(){
    this.displayorders();
  }
  displayorders(){
    axios.get(`${'https://handyman-heroku.herokuapp.com'}/orders?token=${localStorage.getItem('token')}`, {
        new: null
    })
    .then ((result) => {
      let responseJSON = result;
      if(responseJSON){
        this.setState({displayorders: responseJSON.data.orders})
        console.log(this.state)
    }else{
        alert("Orders not gotten")
    }
  });

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
    const display = Object.values(this.state.displayorders)
    
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

      <h1>Previous Orders</h1>
        <br/>
        <br/>
        <br/>

        <table>
            <tr>
                <th>ID</th>
                <th>order name</th>
                <th>Products</th>
                </tr>
        {
            display.map(function(value, key){
                return(
                    <tr key={key}>
                    <td>{value.id}</td>
                    <td>{value.ordername}</td>
                    <td>{value.overall+ ' '}</td>    
                    </tr>
                )
            })
        }
        </table>

        <br/>
      </div>
    );
  }
  }
  export default Home;
