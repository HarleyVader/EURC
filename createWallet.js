import fs from 'fs';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
config();

async function main() {
  // Generate UUID 4
  let myuuid = uuidv4();
  console.log('Your UUID is: ' + myuuid);

  // Read the file asynchronously
  const filePath = '.cypher';

  try {
    const dataObj = await new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });

    // The file contents are stored in the 'dataObj' variable
    //console.log('File contents:', dataObj);

    const url = process.env.URL_WALLETS;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${process.env.CIRCLE_API_KEY}`,
      },

      body: JSON.stringify({
        idempotencyKey: myuuid,
        entitySecretCipherText: dataObj.toString(),
        blockchains: ["ETH-GOERLI"],
        count: 1,
        walletSetId: `${process.env.WALLET_SET_ID}`,
      }),
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
  } catch (error) {
    console.error('Error reading the file:', error);
  }
}

main();
