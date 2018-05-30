import  React from 'react';
import { Component } from 'react';
import { PostData } from './PostData';
import { storedata } from './storedata';



class Product extends Component {

    constructor(props){
        super(props);

        this.state = {
            product: '',
            prizes: '',
            description: ''
        }

        this.createProduct = this.createProduct.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    createProduct(){
        if(this.state.product && this.state.prizes && this.state.description){
            console.log("Create products");
            storedata('products', this.state).then ((result) => {
                let responseJSON = result;
                if(responseJSON){
                    alert("Product Created")
                }
                else{
                    alert("No Response from server: Failed ")
                }
            });
        }
        else{
            alert("Product not created");
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state)
      }
  render() {
    return (
      <div className="home">
        <h2>Create products </h2>
        <input type="text" name="product" placeholder="enter product" onChange={this.onChange}/><br/><br/>
        <input type="text" name="prizes" placeholder="enter prizes" onChange={this.onChange}/><br/><br/>
        <textarea type="text" name="description" placeholder="Description" onChange={this.onChange}/><br/><br/>
        <button onClick={this.createProduct}>Create products</button>
        <br/>
      </div>
    );
  }
}
export default Product;
