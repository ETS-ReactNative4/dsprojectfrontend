import React, { Component } from 'react';
import App1 from './routes/routes';


class App extends Component {
  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
        </header>
        <App1 />
        <p className="App-intro">
          <code>src/App.js</code>
        </p>
      </div>
    );
  }
}

export default App;
