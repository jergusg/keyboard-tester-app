import React, { Component } from 'react';
import './App.css';
import Collector from './components/collector';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Typing Tester</h1>
          <p className="moj-mail">jergus.g@gmail.com</p>
        </header>
        <Collector />
      </div>
    );
  }
}

export default App;
