import { useState, useRef } from "react";
import server from "./server";
import * as secp from "@noble/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

function Transfer({ address, setBalance, privateKey }) {
  //const [sendAmount, setSendAmount] = useState("");
  //const [recipient, setRecipient] = useState("");
  const amountRef = useRef("");
  const recipientRef = useRef("");

  //const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const sendAmount = amountRef.current.value;
    const recipient = recipientRef.current.value;

    // 1. Get the message hash
    const bytes = utf8ToBytes(sendAmount);
    const messageHash = keccak256(bytes);

    // 2. Sign the message hash
    const [signature, recoveryBit] = await secp.sign(messageHash, privateKey, {
      recovered: true,
    });
    const signatureHex = secp.utils.bytesToHex(signature);

    // 3. Send the signature to the server
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        signatureHex,
        recoveryBit,
        messageHash,
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
      amountRef.current.value = "";
      recipientRef.current.value = "";
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label htmlFor="amount">
        Send Amount
        <input placeholder="1, 2, 3..." ref={amountRef}></input>
      </label>

      <label htmlFor="recipient">
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          ref={recipientRef}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
