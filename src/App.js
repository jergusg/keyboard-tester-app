import React, { Component } from 'react';
import './App.css';
import Collector from './components/collector';
import {testingSets} from './config/testing_set';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Typing Tester</h1>
        </header>
        <Collector testingSets={[testingSets.warmup, testingSets.real]} />
      </div>
    );
  }
}

export default App;
