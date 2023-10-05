import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { config } from 'dotenv';
config();

// Generate UUID 4
let myuuid = uuidv4();
console.log('Your UUID is: ' + myuuid);

 // Read the file asynchronously
  const filePath = '.cypher';

  
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
    console.log('File contents:', dataObj);
 

const url = 'https://api.circle.com/v1/w3s/developer/transactions/transfer';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: `${process.env.CIRCLE_API_KEY}`,
  },
  body: JSON.stringify({
    amounts: ['0.000000000000000001'],
    walletId: '76d69d94-226d-435a-a877-35e9a57795a4',
    tokenId: 'e4f549f9-a910-59b1-b5cd-8f972871f5db',
    refId: 'melkaneas first transaction',
    feeLevel: 'HIGH',
    entitySecretCiphertext: dataObj.toString(),
    destinationAddress: '0xf6fee84bdc2c4d5b9f2f1ebadce8c5fdccf9962b',
    idempotencyKey: myuuid,
  })
    
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));

