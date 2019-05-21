import React from 'react';
import './App.css';
import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"

const App = () => {
  return (
    <div>
    <Header/>
      <div className="container">
        <Content/>
      </div>
    <Footer />
    </div>
  );
}

export default App;
