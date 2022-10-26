import { useEffect, useState } from "react";
import { ethers } from "ethers";
import galaxyPortal from './utils/GalaxyPortal.json';
import './App.css';

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(false);

  const contractAddress = "0x7bd43F22167B7f066eeA06b80d992957EdBB413a";
  const contractABI = galaxyPortal.abi;

  useEffect(() => {
    const init = async () => {
      const account = await findMetaMaskAccount();
      if (account !== null) {
        setCurrentAccount(account);

        // Retrieve the total amount of stars from the SM
        setLoading(true);
        const { ethereum } = window;

        try {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const galaxyPortalContract = new ethers.Contract(contractAddress, contractABI, signer);
  
          let count = await galaxyPortalContract.getTotalStars();
          setTotalStars(count.toNumber());
          setLoading(false);
        } catch (error) {
          console.error(error);
        }

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

  const star = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Use the Metamask's node provider (Metamask use Infura's Ethereum nodes)
        const provider = new ethers.providers.Web3Provider(ethereum);
        // Abstract account who can sign messages and sens Txn. Cannot sign Txn
        const signer = provider.getSigner();
        // Get the contract interface to interact with. Need the deployement address, the ABI (JSON) and the signer
        // Goerli : 0x7bd43F22167B7f066eeA06b80d992957EdBB413a
        const galaxyPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        // Execute the getTotalStars function of the smart contract
        let count = await galaxyPortalContract.getTotalStars();
        console.log("[Before star throwing] - Retrieved total stars count from the blockchain : ", count.toNumber());

        // Broadcast a Txn for the execution of star function. Metamask notification to approve the transaction
        const starTxn = await galaxyPortalContract.star();
        setLoading(true);
        console.log("Mining...", starTxn.hash);

        // Waiting the execution of star function 
        await starTxn.wait();
        setLoading(false);
        console.log("Mined -- ", starTxn.hash);

        count = await galaxyPortalContract.getTotalStars();
        console.log("[After star throwing] - Retrieved total stars count from the blockchain : ", count.toNumber());
        setTotalStars(count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <div className="mainContainer">
      {loading && <div>Loading...</div>}
      {!loading && 
        (<div className="dataContainer">
          <div className="header">
            Welcome explorer 🛸
          </div>

          <div className="bio">
            <p>I'm Tekk and your are on my Galaxy Portal. To enter this universe, give me a shooting star 🌠</p>
            <p>Currently {totalStars} stars constitute the Galaxy</p>
          </div>

          <button className="starButton" onClick={star}>
            Throw me a star ⭐️
          </button>

          {!currentAccount && (
            <button className="starButton" onClick={connectMetamask}>
              Connect with Metamask 🦊
            </button>
          )}
        </div>)
      }
      
    </div>
  );
}
