# melkaneas circle developer quickstart guide   
## this only works with a circle dev account https://developers.circle.com/  
### started on 04/10/2023  
### localhost enviroment needs:  
a- node.js 18+  
b- git  
c- IDE with javascript support  
d- a terminal ( im using a debian 11 over WSL on win11)  

### USAGE  
1- download repository & 'cd' into "EURC"  
2- run 'npm i' to setup dependancies  
2.a- Copy your Circle Dev API to your enviromental file it should look like this CIRCLE_API_KEY=Bearer <TEST_API_KEY>  
3- run 'node 'genEntitySecretCyphertext.js' to generate a unique 32 char string stored in the .secret   
3. copy/paste it from .secret to your .env file!  

### YOU WILL NEED A NEW CYPHER EACH TIME YOU RUN A TRANSACTION! (AUTOMATED)  
4- run 'genEntitySecretCyphertext.js will also generate a encrypted string stored in the .cypher file  
4.a- Use the .cypher string to register it to https://console.circle.com/wallets/dev/configurator  
4.b- store the recovery file on your localhost (DONT LOSE THIS!!!)  

#### all scripts automatically load from the .cypher  
5- run 'node createWalletSet.js'   
5.a- check your termnals output & copy/paste the walletSetId to your .env file  

### NOW COMES THE REAL BLOCKCHAIN FUN!  
6-run 'node createWallet.js' creates a DEV WALLET set to testnet MATIC-MUMBAI  
6.a- go to https://mumbaifaucet.com/ & add test funds to your wallet  
7-while you wait 5 min add your walletId to your .env file  
7.a- change the WALLET_ID to the wallet you want to check the balance for!  

### First transfer between wallets  
8- repeat step 6 to create a second wallet   
9- edit file 'createTransaction.js' & replace variables 'walletId' in line 38 & 'destinationAddress' on line 43   
10- run 'createTransaction.js'  

