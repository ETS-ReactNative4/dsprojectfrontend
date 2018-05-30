import  React  from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from '../components/signup';
import Login from '../components/Login';
import Home from '../components/Home';
import Product from '../components/Product';
import Orders from '../components/Orders';

const App1 = () => (
    
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Signup} />
            <Route exact path='/signin' component={Login} />
            <Route exact path='/signup' component= {Signup}/>
            <Route exact path='/home' component={Home} />
            <Route exact path='/product' component={Product} />
            <Route exact path='/order' component={Orders} />

        </Switch>
    </BrowserRouter>

);

export default App1;