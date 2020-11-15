import React, { Component } from 'react';
import './App.css';
import MultiCropForm from './pages/CropService';
import showResults from './showResults';

class App extends Component {
  render() {
    return (
      <div style={{ padding: 15 }}>
        <h2>Multi Crop Form</h2>
        <MultiCropForm onSubmit={showResults} />
      </div>
    );
  }
}

export default App;
