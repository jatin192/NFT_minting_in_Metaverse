import abi from "./abi/abi.json" assert {type:"json"};
// import {Web3} from 'web3';
let polygon =new Promise((res,rej)=>
{
    async function meta()
    {
        if(typeof window.ethereum == "undefined")
        {
            rej("Please install Metamask");
        }

        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(abi,"0xd5DadDE2e929C2299706cd50431FabB5011Dc7d7");  //contract address (Polygon)
        let accounts_ = await web3.eth.requestAccounts(); // array of accounts
        
        let totalsupply = await contract.methods.total_supply().call({from: accounts_[0]});
        
        let maxsupply = await contract.methods.maxsupply.call({from: accounts_[0]});
        
        let ownerobject = await contract.methods.show_all_item_of_owner.call({from: accounts_[0]});

        console.log("connected accounts",accounts_[0]);
        console.log("total supply",totalsupply);
        console.log("max supply",maxsupply);
        console.log("Owner objects =",ownerobject);

        

        //__________________________________________________________________________________________________________
        web3.eth.requestAccounts().then((accounts_) => {
            contract.methods
            .total_supply()
            .call({ from: accounts_[0] })
            .then((supply) => {
                contract.methods
                .get_all_items()
                .call({ from: accounts_[0] })
                .then((data) => {
                    res({ supply: supply, nft: data });
                });
            });
        });
        //_____________________________________________________________________________________________________________
        // then == "ye hone ke baad"

    }
    meta();
});
export default polygon;

