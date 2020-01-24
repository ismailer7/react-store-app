import React, { Component } from 'react';
import './App.css';
import Footer from '../Footer';

import Navigation from '../Navigation';



class App extends Component {

  render() {
    return (
      <div>
        <Navigation />
        <Footer />
      </div>
    )
  }
}

export default App;