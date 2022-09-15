import React from "react";
import { ethers } from "ethers";
import axios from "axios";
import lighthouse from '@lighthouse-web3/sdk';
import { Form, Typography, IPFSInput } from "web3uikit";

export const UploadFile = () => {
   
    const sign_message = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const message = (await axios.get(`https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`)).data;
        const signedMessage = await signer.signMessage(message);
        return ({
            signedMessage: signedMessage,
            address: address
        });
    }

    const encryption_signature = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const messageRequested = await lighthouse.getAuthMessage(address);
        const signedMessage = await signer.signMessage(messageRequested);
        return signedMessage;
    }

    const deploy = async (e) => {
        let senderKey = '0x7a35411F80d9585AaC59465f7775D46ba630Dadb';

        const signingResponse = await sign_message();
        const accessToken = (await axios.post(`https://api.lighthouse.storage/api/auth/verify_signer`, {
            //publicKey: signingResponse.address,
            publicKey: senderKey,
            signedMessage: signingResponse.signedMessage
        })).data.accessToken;
        const deployed = await lighthouse.deploy(e, accessToken);
        alert(deployed.Hash);
        return deployed.Hash;
    }

    const deployEncrypted = async (e) => {
        const signingResponse = await sign_message();
        const accessToken = (await axios.post(`https://api.lighthouse.storage/api/auth/verify_signer`, {
            publicKey: signingResponse.address,
            signedMessage: signingResponse.signedMessage
        })).data.accessToken;
        const publicKey = signingResponse.address;
        const encryptionSignature = await encryption_signature();
        const deployed = await lighthouse.uploadEncrypted(
            e,
            publicKey,
            accessToken,
            encryptionSignature
        );
        alert(deployed.Hash);
        return deployed;
    }

    /* Decrypt file */
    const decrypt = async () => {
        const cid = "QmbSPHedLHjpnnxBEVKBprPCKCkaVvk7ue7WAviWCamKfv";
        const encryptionSignature = await encryption_signature();
        //const publicKey = "0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const publicKey = await signer.getAddress();        
        /*
          fetchEncryptionKey(cid, publicKey, signedMessage)
            Parameters:
              CID: CID of file to decrypt
              publicKey: public key of user who has access of file or owner
              signedMessage: message signed by owner of publicKey
        */
        const key = await lighthouse.fetchEncryptionKey(
            cid,
            publicKey,
            encryptionSignature
        );
        const decrypted = await lighthouse.decryptFile(cid, key);
        alert('blob: '+JSON.stringify(decrypted));
        return decrypted;
        /*
          Response: blob
        */
    }

  return (
    <>
      <main>
        UPLOAD FILE:
        <input onChange={e => deploy(e)} type="file" />
        <br />
        UPLOAD ENCRYPTED FILE:
        <input onChange={e => deployEncrypted(e)} type="file" />
        <br />
        DECRYPT FILE:
        <button onClick={e => decrypt()} value="decrypt">decrypt</button>
      </main>
    </>
  );
};


/*
<section className=''>
          <Typography variant='h4'>
            <h2>Upload File</h2>
          </Typography>
        </section>
        <br />

        <IPFSInput
          onFinish={function noRefCheck(){}}
          theme="withIcon"
        />

        <Form
          buttonConfig={{
            onClick: function noRefCheck(){},
            theme: 'primary'
          }}
          data={[
            {
              inputWidth: '100%',
              name: 'title',
              type: 'text',
              value: ''
            },
            {
              inputWidth: '100%',
              name: 'Description',
              type: 'textarea',
              validation: {
                required: true
              },
              value: ''
            }
          ]}
          onSubmit={function noRefCheck(){}}
          title="Title"
        /> */