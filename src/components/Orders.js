import  React from 'react';
import { Component } from 'react';
import { PostData } from './PostData';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

class Orders extends Component {
    constructor(props){
        super(props);

        this.state = {
            products: '',
            order: '',
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
    // http://127.127.0.0.1:1337
    if(this.state.order && this.state.overall){
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
    
    this.setState({order: e.target.value})
    console.log(this.state)
 }

render() {
    const data = Object.values(this.state.products)
    const display = Object.values(this.state.displayorders)
    
    return (
        <div>
            <Navbar username={this.state.username} />
            <br /><br />
            <input type="text" placeholder ="Order name" onKeyUp = {this.onChange}/>
            
            <select onChange={this.optionClicked}>
            <option>Add Products</option>{
                data.map(function(value, key) {
                    return(
                    <option key={key} >
                    {value.product} - {value.prizes}
                    </option>
                    )
                })
            }
            </select>
            <button onClick={this.createOrders}>Post Orders</button>
            <br /><br />
            <br/>
            <br/>

            <table>
                <tr>
                    <th>ID</th>
                    <th>created</th>
                    <th>order Name</th>
                    </tr>
            {
                display.map(function(value, key){
                    return(
                        <tr key={key}>
                        <td>{value.id}</td>
                        <td>{value.createdAt}</td>                        
                        <td>{value.ordername}</td>
                        </tr>
                    )
                })
            }
            </table>

            <br/>
            <button onClick={this.history}>NB: You can add more than one product</button>

    </div>
    )
  }

}
export default Orders;
