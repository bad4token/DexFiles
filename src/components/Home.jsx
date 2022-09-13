import React from "react";

import {
  Typography,
  NFT,
} from "web3uikit";

export const Home = () => {
  return (
    <>
      <main>
        <section className=''>
          <Typography variant='h4'>
            <h2>Home</h2>
          </Typography>
        </section>
        <br />

        <NFT
          address="0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"
          chain="eth"
          fetchMetadata
          tokenId="1"
        />
      </main>
    </>
  );
};
