import { useEffect, useState } from "react";
// import { ethers } from "ethers";
import './App.css';

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    const init = async () => {
      const account = await findMetaMaskAccount();
      if (account !== null) {
        setCurrentAccount(account);
      }
    }

    init();
  }, []);

  // When logged /w metamask, an etehreum object is injected into window
  const getEthereumObject = () => window.ethereum;

  /*
   * This function returns the first linked account found.
   * If there is no account linked, it will return null.
   */
  const findMetaMaskAccount = async () => {
    try {
      const ethereum = getEthereumObject();

      // 1. Check for ethereum object into window
      if (!ethereum) {
        console.log("Make sure you have Metamask installed 🦊");
        return null;
      }

      console.log("We have an etehreum object");
      // 2. Trying to see if we're authorized to access any of the accounts in the user's wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        return account;
      } else {
        console.error("No authorized account found");
        return null;
      }

    } catch (error) {
      console.error(error);
      return null;
    }
  };

  /**
   * Function to connect the user with her wallet
   * We asking metamask acces of the user's wallet to interact with our smart contract
   */
  const connectMetamask = async () => {
    const ethereum = getEthereumObject();

      // 1. Check for ethereum object into window
    if (!ethereum) {
      console.log("Please install Metamask 🦊");
      return null;
    }

    // 2. Asking Metamask to give access to the user's wallet
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setCurrentAccount(accounts[0]);
  };

  const star = () => {

  };

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

        {!currentAccount && (
          <button className="starButton" onClick={connectMetamask}>
            Connect with Metamask 🦊
          </button>
        )}
      </div>
    </div>
  );
}
