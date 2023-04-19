
##  ECDSA Node



This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.



In this project applied the following concepts:



-  [x]  [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) (Elliptic Curve Digital Signature Algorithm)

-  [x]  [Private Key & Public Key](https://en.wikipedia.org/wiki/Public-key_cryptography)

-  [x]  [Hashing](https://en.wikipedia.org/wiki/Cryptographic_hash_function)

-  [x]  [Signing](https://en.wikipedia.org/wiki/Digital_signature)

-  [x]  [Verifying](https://en.wikipedia.org/wiki/Digital_signature)



###  Privates Keys & Address saved in the server



```

User 1 private key: 3fe1a64d2d88a1536ff15f28172f9f1367afd2f4633f5ea03231e51fd5638b1d

User 1 address: 0xd8d2f8c65901959c16d5266d32c4a61c72ddde61



User 2 private key: 52ddc31f39ed4bcad0c80ab6636f4bf2930ee7f94106907b3c433aff9be7c165

User 2 address: 0x028a11ceaf259bcce4023c08deb0e5873944ba86



User 3 private key: 5a0f78db31dcfd7a35320aecbcfb31f843953669bbbf4eb3f88542b53c4a3f4c

User 3 address: 0x4f9eb9a69337f42e04d3617762608c7781c8ac84



User 4 private key: a90487396ec27ac96a3d850715b4b4fb168a12e8c4feb43b7bcc1fdb42e11f15

User 4 address: 0x00a987cb4f937c035c8b0b799c877ccdf2e83cc0



User 5 private key: de6a017dbaa82f2e0133b7849b7e5157582d94d2c0200d9d0820e750dc77bec5

User 5 address: 0x69058b42d1592fc5bdda3ab529971136eae8d5e1

```



###  Client



The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:



1. Open up a terminal in the `/client` folder

2. Run `npm install` to install all the depedencies

3. Run `npm run dev` to start the application

4. Now you should be able to visit the app at http://127.0.0.1:5173/



###  Server



The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:



1. Open a terminal within the `/server` folder

2. Run `npm install` to install all the depedencies

3. Run `node index` to start the server



The application should connect to the default server port (3042) automatically!



_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.



###  How works?



In the client you set a private key (you can use one of the above) and the app will generate the ethereum address, next choose one address from the list or a custom address, the client will send to the server the address, the amount and the signature of the transaction, the server will verify the signature and if it's valid will send the amount to the address.
