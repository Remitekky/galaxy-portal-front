import * as React from "react";
// import { ethers } from "ethers";
import './App.css';

export default function App() {

  const star = () => {

  }

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          Welcome explorer 🛸
        </div>

        <div className="bio">
          I'm Tekk and your are on my Galaxy Portal. To enter this universe, give me a shooting star 🌠
        </div>

        <button className="starButton" onClick={star}>
          Throw me a star ⭐️
        </button>
      </div>
    </div>
  );
}
