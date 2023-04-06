# DVal.

# 🧭 Table of contents

- [DVal](#DVal)
- [🧭 Table of contents](#-table-of-contents)
- [Introduction](#introduction)
- [Quick Start for frontend](#quick-start-for-frontend)
- [Quick Start for Backend](#quick-start-for-backend)
- [What this App uses](#what-this-app-uses)
    - [This App has four main parts](#this-app-has-four-main-parts)
- [Frontend](#frontend)
- [Backend](#backend)
- [Blockchain](#blockchain)
- [Where is this App deployed](#where-is-this-app-deployed)
- [Future Aspirations for this App](#future-aspirations-for-this-app)



# Introduction

This is our Project for Submission in the Hackathon `Blockathon, Cognizance 23`.

We are providing a seamless end-to-end solution from the manufacturer to the end customer and further after-sell services such as warranty claims.
This image explains the project in very easy-to-understand language.

# Quick Start for frontend

📄 Clone or fork this repo :`https://github.com/Prasang023/Cognizance_BitBots.git`:

```sh
git clone https://github.com/Prasang023/Cognizance_BitBots.git
```

💿 Install all dependencies:

```sh
cd client
npm install
```

🚴‍♂️ Run your App:

```sh
npm start
```

# Quick Start for Backend

📄 Clone or fork this repo :
`https://github.com/Prasang023/Cognizance_BitBots.git`:

```sh
git clone https://github.com/Prasang023/Cognizance_BitBots.git
```

💿 Install all dependencies:

```sh
cd server
npm install
```

🚴‍♂️ Run your App:

```sh
npm start
```

# What this App uses

### This App has four main parts 
- [`Frontend`](#Frontend)
- [`Backend`](#Backend)
- [`Blockchain`](#Blockchain)


# Frontend

We are using Next.JS for rendering the frontend of the project. The frontend is integrated with both the backend and blockchain.
We are using Redux-thunk along in javascript to make our webapp modular and easy to use.

# Backend

At the `Backend` of this App , A `Nodejs` server is running, which manages all the `requests` and `responses` from the user. Backend is hosted on AWS EC2 instance.

This App Uses Some Node_Modules in order to work properly which includes:
- `dotenv`
    - To fetch a .env file from the backend into any file and use it as process.env.example
- `cors`
    - allows a server to indicate any origins other than its own from which a browser should permit loading resources.
- `Express`
  - create a web-server
  - handles request and response


# Blockchain

We chose polygon as the primary chain to deploy the smart contacts. This was due to polygons low gas fees and high supportability. 
The Contract Address is:
1. Warranty nft : [0x74949849394000a1ca44c0CD1342ca46a65C23cf](https://mumbai.polygonscan.com/address/0x74949849394000a1ca44c0CD1342ca46a65C23cf#code)

# Where is this App deployed

`Frontend` 
- The frontend of this app is deployed on vercel:
[https://cognizance-bit-bots.vercel.app/](https://cognizance-bit-bots.vercel.app/)

`Backend`
- The Backend of this app is deployed on AWS EC2 instance.

# Future Aspirations for this App

There are some features which can be added in future:
 - The project doesn't stop here. We aim to take it further and realized during the hackathon hours that we can expand this project more than we thought. 
 - Automating the procedure of creating unique and secure QRs and integrating with products for the seamless flow of product along the supply chain.
 
