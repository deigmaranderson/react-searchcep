import React from 'react';
import './App.css';
import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"

const App = () => {
  return (
    <div className="container">
      <Header />
      <Content/>
      <Footer />
    </div>
  );
}

export default App;
