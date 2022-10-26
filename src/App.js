import { useEffect } from "react";
// import { ethers } from "ethers";
import './App.css';

export default function App() {

  // When logged /w metamask, an etehreum object is injected into window
  const getEthereumObject = () => window.ethereum;
  
  const star = () => {
    
  }

  useEffect(() => {
    if (getEthereumObject) {
      console.log("Your are logged with your metamask wallet address", getEthereumObject());
    } else {
      console.log("Please connect your metamask wallet");
    }
  }, []);

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
