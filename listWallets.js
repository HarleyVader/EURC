import fetch from 'node-fetch';
import { config } from 'dotenv';
config();

async function main() {
const url = 'https://api.circle.com/v1/w3s/wallets?pageSize=10';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: `${process.env.CIRCLE_API_KEY}`
  }
};

try {
      const response = await fetch(url, options);
      const responseObj = await response.json();
      console.log(responseObj);

      const { data } = responseObj; // Destructure the 'data' property
      const { wallets } = data; // Destructure the 'wallets' property

      console.log(wallets)

    } catch (error) {
      console.error(error);
  }
  }
  main();