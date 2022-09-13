import React from "react";

import { useMoralis } from "react-moralis";

import {
  Typography,
  NFTBalance,
} from "web3uikit";

export const MyCollection = () => {

  const { isAuthenticated, user } = useMoralis();
  // Current user's wallet address
  const userAddress = user?.get("ethAddress");

  return (
    <>
      <main>
        <section className=''>
          <Typography variant='h4'>
            <h2>My Collection</h2>
          </Typography>
        </section>
        <br />

        {/* Dapp NFT Owned by user */}
        <section className='my-nfts-section'>
          <NFTBalance address={userAddress} chain='mumbai' />
        </section>

      </main>
    </>
  );
};
