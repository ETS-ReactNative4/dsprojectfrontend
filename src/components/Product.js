import  React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { storedata } from './storedata';



class Product extends Component {

    constructor(props){
        super(props);

        this.state = {
            product: '',
            prizes: '',
            description: '',
            redirect: false
        }

        this.createProduct = this.createProduct.bind(this);
        this.onChange = this.onChange.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('token') === null) {
            this.setState({
                redirect: true
            });
        };
    }
    createProduct(e){
        e.preventDefault();

        if(this.state.product && this.state.prizes && this.state.description){
            console.log("Create products");
            storedata('products', this.state).then ((result) => {
                let responseJSON = result;
                if(responseJSON){
                    alert("Product Created");
                    window.location.reload();
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

    goBack(){
        this.goBack.history.goBack();
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state)
      }
      
      
    clearData(){
        this.setState({
            product: '',
            prizes: '',
            description: ''
        })
    }
  render() {
    const { redirect } = this.state;
    if( redirect ){ 
      return <Redirect to='/signin' />;
    }
    return (
      <div className="home">
        <h2>Create products </h2>
        <input type="text" name="product" placeholder="enter product" onChange={this.onChange}/><br/><br/>
        <input type="text" name="prizes" placeholder="enter prizes" onChange={this.onChange}/><br/><br/>
        <textarea type="text" name="description" placeholder="Description" onChange={this.onChange}/><br/><br/>
        <button onClick={this.createProduct}>Create products</button>
        <button onClick={this.goBack}>back</button>
        <br/>
      </div>
    );
  }
}
export default Product;
