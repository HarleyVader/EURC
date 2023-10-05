import fetch from 'node-fetch';
import { config } from 'dotenv';
config();

const url = 'https://api.circle.com/v1/w3s/wallets/10fcc280-64ae-492d-803f-72486429eb41/balances?includeAll=true&name=EURC&tokenAddress=0x5bd5b4381332e57ffb47ba30030f1dd889bbe1f3&standard=EURC&pageSize=10';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: `${process.env.CIRCLE_API_KEY}`
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));

try {
        const response = await fetch(url, options);
        const responseObj = await response.json();
        console.log("responseobj: " + responseObj);

       const { data } = responseObj; // Destructure the 'data' property
       const { tokenBalances } = data; // Destructure the 'tokenBalances' property
      

        console.log("Balances" + tokenBalances);
      } catch (error) {
        console.error(error);
    }
  
