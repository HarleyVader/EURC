import fetch from 'node-fetch';
import { config } from 'dotenv';
config();


const tempurl = 'https://api.circle.com/v1/w3s/wallets/'
const __WALLET_ID__ = '76d69d94-226d-435a-a877-35e9a57795a4'
const tempbalances = '/balances'

const url = tempurl + __WALLET_ID__ + tempbalances;
console.log(url);

const options = {
  method: 'GET',
  headers: {'Content-Type': 'application/json', 
  Authorization: `${process.env.CIRCLE_API_KEY}`}
};

    try {
        const response = await fetch(url, options);
        const responseObj = await response.json();

        const [{ amount }] = responseObj.data.tokenBalances;
        const [{ token: { symbol } }] = responseObj.data.tokenBalances;

        console.log("Symbol: " + symbol +'\n'+  "Balances: " + amount);
      } catch (error) {
        console.error(error);
    }