import  React from 'react';
import { Component } from 'react';
import { PostData } from './PostData';
// import { Redirect} from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

class Orders extends Component {
    constructor(props){
        super(props);

        this.state = {
            products: '',
            ordername: '',
            overall: [],
            displayorders: ''
        }
       
        this.optionClicked = this.optionClicked.bind(this);
        this.onChange = this.onChange.bind(this);
        this.createOrders = this.createOrders.bind(this);
        
    }
    
componentDidMount(){
    this.getproducts();
    this.displayorders();
    
}

getproducts() {
    console.log("Mounted to get Products")
    PostData('products', this.state.products)
    .then ((result) => {
        let responseJSON = result;
        if( responseJSON){
            this.setState({products: responseJSON.products})
            console.log(this.state)
        }else{
            console.log("not gotten")
        }
    });
    
}
createOrders(){
    // https://handyman-heroku.herokuapp.com
    // http://127.0.0.1:1337
    if(this.state.ordername!== null && this.state.overall.length !== null){
        console.log("Login Function");
        axios.post(`${'https://handyman-heroku.herokuapp.com'}/orders?token=${localStorage.getItem('token')}`, {
            orders: this.state
        })
        .then ((result) => {
          let responseJSON = result;
          if(responseJSON){
              console.log(responseJSON.orders)
              alert("order Created");
              window.location.reload();
          }else{
            alert("Orders not created")
          }
        });
        }else{
          alert("Enter name correctly");
    }
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

optionClicked(e) {
    var newArr = this.state.overall.slice()
    newArr.push(e.target.value)
    this.setState({overall: newArr})
    console.log(this.state)
}

onChange(e){
    
    this.setState({ordername: e.target.value})
    console.log(this.state)
 }

render() {
    const data = Object.values(this.state.products)
    
    return (
        <div className="orders">
            <Navbar username={this.state.username} />
            <br /><br />
            <input type="text" placeholder ="Order name" onKeyUp = {this.onChange}/>
            
            <select onChange={this.optionClicked}>
            <option>Add Products</option>{
                data.map(function(value, key) {
                    return(
                    <option key={key} >
                    {value.products} - {value.prizes}
                    </option>
                    )
                })
            }
            </select>
            <button onClick={this.createOrders}>Post Orders</button>
            <br /><br />
            
            <button onClick={this.history}>NB: You can add more than one product</button>

    </div>
    )
  }

}
export default Orders;
