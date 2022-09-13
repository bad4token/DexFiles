import Moralis from "moralis";
import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import {
  BannerStrip,
  ConnectButton,
  useNotification,
  Typography,
  LinkTo,
} from "web3uikit";

import { ConnectWallet } from "./ConnectWallet";
import { Home } from "./Home";
import { MyCollection } from "./MyCollection";
import { MyAccount } from "./MyAccount";
import { UploadFile } from "./UploadFile";

export const Dashboard = () => {
  const dispatch = useNotification();
  const Web3Api = useMoralisWeb3Api();
  const { isAuthenticated, user } = useMoralis();
  // Current user's wallet address
  const userAddress = user?.get("ethAddress");

  // Token balance of the current user
  const [polygonBalance, setPolygonBalance] = React.useState("0");
  const [mumbaiBalance, setMumbaiBalance] = React.useState("0");

  // Notification handler
  const handleNewNotification = ({ type, title, message, position }) => {
    dispatch({
      type: type || "info",
      message: message || "",
      title: title || "New Notification",
      position: position || "topR",
    });
  };

  // Get the balance of the current user
  const fetchTokenBalances = async (chain) => {
    const options = { chain, address: userAddress };
    const result = await Web3Api.account.getNativeBalance(options);
    return result.balance;
  };

  // Fetch all token balances of the current user
  const fetchBalances = async () => {
    const balances = await Promise.all([
      fetchTokenBalances("polygon"),
      fetchTokenBalances("mumbai"),
    ]);

    // Balance of the current user on each chain
    const polygonBalance = balances[0];
    const mumbaiBalance = balances[1];

    // Convert the balance from Wei to Ether
    const polygonBalanceEther = Moralis.Units.FromWei(polygonBalance);
    const mumbaiBalanceEther = Moralis.Units.FromWei(mumbaiBalance);

    // Set the ETH balance of the current user
    setPolygonBalance(polygonBalanceEther);
    setMumbaiBalance(mumbaiBalanceEther);
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Notification object
      const notificationData = {
        types: "info",
        title: "Wallet Connected 🤝",
        position: "bottomR",
      };

      // Show notification
      handleNewNotification(notificationData);

      // Fetches all token balances of the current user
      fetchBalances();
    }
  }, [isAuthenticated]);

  return (
    <React.Fragment>
      <header>
        {/* Dapp Header Banner */}
        <BannerStrip
          text={
            isAuthenticated
              ? "Welcome back 👋"
              : "You are not connected to the dApp. Please connect to the dApp to see your dashboard."
          }
          height='40px'
          className='dapp-header-banner'
        />

        {/* Dapp Authentication */}
        <section className='container topnav'>
          <Typography variant='h2'>DexFiles</Typography>
          <Typography variant='h4'>
            <LinkTo
              address="/home"
              text="Home"
              type="internal"
            />
            <LinkTo
              address="/mycollection"
              text="My collection"
              type="internal"
            />
            <LinkTo
              address="/myaccount"
              text="My account"
              type="internal"
            />
            <LinkTo
              address="/uploadFile"
              text="Upload File"
              type="internal"
            />
          </Typography>
          <ConnectButton signingMessage='Connect wallet' />
        </section>
      </header>


      <main>
        {isAuthenticated ? (
          <section className='container'>

            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="mycollection" element={<MyCollection />} />
              <Route path="myaccount" element={<MyAccount />} />
              <Route path="uploadfile" element={<UploadFile />} />
            </Routes>

          </section>
        ) : (
          // Dapp Connect Wallet
          <ConnectWallet />
        )}


      </main>


      <footer className='container'>
        Powered by <a href='https://moralis.io'>Moralis Web3UIKit</a> ❤️ Make with Love !
      </footer>
    </React.Fragment>
  );
};
