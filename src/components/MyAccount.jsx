import React from "react";

import { useMoralis } from "react-moralis";

import {
  Typography,
  Widget,
  Credentials,
} from "web3uikit";

export const MyAccount = () => {

  const { isAuthenticated, user } = useMoralis();
  // Current user's wallet address
  const userAddress = user?.get("ethAddress");

  return (
    <>
      <main>
        <section className=''>
          <Typography variant='h4'>
            <h2>My Account</h2>
          </Typography>
        </section>
        <br />

        {/* Dapp Balance Widget */}
        <section className='wallet-balance-widget'>
          <Widget
            title='Widget1'
            info='123'
          />
          <Widget
            title='Widget2'
            info='456'
          />
        </section>

      </main>




      {/* Wallet Address  */}
      <section className='my-secret-credential'>
        <Credentials
          icon='info'
          text={userAddress}
          title='Wallet Address:'
        />
      </section>

    </>
  );
};
