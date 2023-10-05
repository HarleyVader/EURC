import readline from 'readline';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';
import { config } from 'dotenv';
config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getNameFromUser() {
  return new Promise((resolve) => {
    rl.question('Please enter your name: ', (userName) => {
      // Close the readline interface
      rl.close();

      if (userName.trim() !== '') {
        resolve(userName);
      } else {
        console.log('You did not enter a name.');
        resolve(null);
      }
    });
  });
}

async function main() {
  const userEnteredName = await getNameFromUser();

  if (userEnteredName !== null) {
    //console.log('Hello, ' + userEnteredName + '!');

    // Read the file asynchronously
    const filePath = '.cypher';

    fs.readFile(filePath, 'utf8', async (err, dataObj) => {
      if (err) {
        console.error('Error reading the file:', err);
        return;
      }
      // The file contents are stored in the 'dataObj' variable
      console.log('File contents:', dataObj);
    

      // Generate UUID 4
      let myuuid = uuidv4();
      console.log('Your UUID is: ' + myuuid);

      // Create WalletSet
      const urlwalletSets = 'https://api.circle.com/v1/w3s/developer/walletSets';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.CIRCLE_API_KEY}`,
        },
        body: JSON.stringify({
          idempotencyKey: myuuid,
          entitySecretCipherText: dataObj.toString(),
          name: userEnteredName,
        }),
      };
      const response = await fetch(urlwalletSets, options);
      const data = await response.json();
      console.log(data);
    });
  } else {
    console.log('No name entered.');
  }
}

main();