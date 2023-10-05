import fetch from 'node-fetch';
import fs from 'fs';
import { config } from 'dotenv';
config();


const tempurl = 'https://api.circle.com/v1/w3s/wallets/'
const __WALLET_ID__ = '76d69d94-226d-435a-a877-35e9a57795a4'
const tempbalances = '/balances'

const url = tempurl + __WALLET_ID__ + tempbalances;
console.log(url);

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `${process.env.CIRCLE_API_KEY}`
    }
};

try {
    const response = await fetch(url, options);
    const responseObj = await response.json();

    const [{ amount }] = responseObj.data.tokenBalances;
    const [{ token: { symbol } }] = responseObj.data.tokenBalances;

    // Convert the JSON object to a string
    const jsonObj = JSON.stringify(responseObj, null, 2); // Use null and 2 for pretty formatting

    // Specify the file path where you want to save the JSON
    const filePath = '.output.json';

    // Write the JSON string to the file
    fs.writeFile(filePath, jsonObj, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`JSON data saved to ${filePath}`);
        }
    });

    console.log("Symbol: " + symbol + '\n' + "Balances: " + amount);
} catch (error) {
    console.error(error);
}

