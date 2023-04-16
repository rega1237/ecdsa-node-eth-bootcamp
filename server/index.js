const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
  "0xd8d2f8c65901959c16d5266d32c4a61c72ddde61": 100,
  "0x028a11ceaf259bcce4023c08deb0e5873944ba86": 50,
  "0x4f9eb9a69337f42e04d3617762608c7781c8ac84": 75,
  "0x00a987cb4f937c035c8b0b799c877ccdf2e83cc0": 80,
  "0x69058b42d1592fc5bdda3ab529971136eae8d5e1": 10,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signatureHex, recoveryBit, messageHash } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (!verifySignature(messageHash, signatureHex, recoveryBit)) {
    res.status(400).send({ message: "Invalid signature!" });
  } else if (amount < 0) {
    res.status(400).send({ message: "Amount must be positive!" });
  } else if (sender === recipient) {
    res.status(400).send({ message: "Sender and recipient must be different!" });
  } else if (sender === undefined || recipient === undefined) {
    res.status(400).send({ message: "Sender and recipient must be defined!" });
  } else if (amount === undefined) {
    res.status(400).send({ message: "Amount must be defined!" });
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

async function verifySignature(message, signature, recoveryBit) {
  const publicKey= secp.recoverPublicKey(message, signature, recoveryBit)
  const verify = secp.verify(message, signature, publicKey);
  return verify;
}
