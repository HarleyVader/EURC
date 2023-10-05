import { config } from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import fetch from 'node-fetch';
import forge from 'node-forge';

config();

async function main() {
    try {
        // Generate or read the secret
        let secret = process.env.SECRET || crypto.randomBytes(32).toString('hex');
        console.log('Secret:', secret);

        // Write the secret to a file
        const secretFilePath = '.secret';
        fs.writeFileSync(secretFilePath, secret);
        console.log('Secret has been written to the file');

        // Fetch your entity's public key
        const url = 'https://api.circle.com/v1/w3s/config/entity/publicKey';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: process.env.CIRCLE_API_KEY,
            },
        };

        const response = await fetch(url, options);
        const responseObj = await response.json();
        console.log(responseObj);

        let { publicKey } = responseObj.data;

        // Encrypt the Entity Secret with RSA and encode it to base64
        const entitySecret = forge.util.hexToBytes(secret);
        const importedPublicKey = forge.pki.publicKeyFromPem(publicKey);
        const encryptedData = importedPublicKey.encrypt(entitySecret, 'RSA-OAEP', {
            md: forge.md.sha256.create(),
            mgf1: {
                md: forge.md.sha256.create(),
            },
        });

        console.log('Encrypted Data:', forge.util.encode64(encryptedData));

        // Store encrypted Entity Secret to a file
        const filePath = '.cypher';
        fs.writeFileSync(filePath, forge.util.encode64(encryptedData));
        console.log('Encrypted Data has been written to the file');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
