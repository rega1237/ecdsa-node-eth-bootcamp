import { useEffect, useState } from "react";
import * as secp from '@noble/secp256k1';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {

  useEffect(() => {
    console.log('effect')
    if (privateKey.length == 64) {
      const publicKey = secp.utils.bytesToHex(secp.getPublicKey(privateKey))
      setAddress(`0x${publicKey.slice(-40)}`);
      const newAddress = `0x${publicKey.slice(-40)}`;
      fetch(`http://localhost:3042/balance/${newAddress}`)
        .then((response) => response.json())
        .then((data) => {
          setBalance(data.balance);
        });
    }
  }, [privateKey]);

  const onChange = (evt) => {
    const valuePrivateKey = evt.target.value;
    setPrivateKey(valuePrivateKey);
  };

  return (
    <div className="container wallet">
      <h1>Your Private Key</h1>

        <label>
          Private Key
          <input placeholder="Type your private key" value={privateKey} onChange={onChange}></input>
        </label>

        <div className="address">Address: {address}</div>

        <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
