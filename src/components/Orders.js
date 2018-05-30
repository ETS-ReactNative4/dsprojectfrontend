import  React from 'react';
import { Component } from 'react';
import { PostData } from './PostData';

class Orders extends Component {
    constructor(props){
        super(props);

        this.state = {
            products: '',
            order: '',
            overall: []
        }
       
        this.optionClicked = this.optionClicked.bind(this);
        this.onChange = this.onChange.bind(this);
        this.createOrders = this.createOrders.bind(this);
        
    }
    
componentDidMount(){
    this.getproducts();
    
}

getproducts() {
    console.log("Mounted to get Products")
    PostData('products', this.state.products)
    .then ((result) => {
        let responseJSON = result;
        if( responseJSON){
            this.setState({products: responseJSON.products})
        }else{
            console.log("not gotten")
        }
    });
    
}
createOrders(){
    if(this.state.order && this.state.overall){
        console.log("Login Function");
        PostData('orders', this.state).then ((result) => {
          let responseJSON = result;
          if(responseJSON.user){
            sessionStorage.setItem('user', responseJSON);
            this.setState({ redirect: true});
            alert("Orders Created")
          }else{
            alert("Orders not created")
          }
        });
        }else{
          alert("Enter name correctly");
        }
    
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
    return (
        <div>
            <input placeholder= "Enter Orders" onKeyUp = {this.onChange}/>
            <button onClick={this.createOrders}>Enter Product</button>
            <br /><br />
            <select onChange={this.optionClicked}>{
                data.map(function(value, key) {
                    return(
                    <option key={key} >
                    {value.product} - {value.prizes}
                    </option>
                    )
                })
            }
            </select>
    </div>
    )
  }

}
export default Orders;
