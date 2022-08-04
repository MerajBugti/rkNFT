const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

let web3Modal
let provider;
let web3;
let contract;
let user_address;
let selectedAccount;
let already_minted;

var mint_count = 1;
var final_cost;
var mint_costs = 0.15; // Change cost here
var chainId = 4; // should be 4 for rinkeby and 1 for mainnet

var t_address = "0x5993b8afEFa94Ad847EC4caCd9550873A25164aA"
var t_abi =[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"MintERC2309QuantityExceedsLimit","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"OwnershipNotInitializedForExtraData","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toTokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"ConsecutiveTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint16","name":"_mintAmount","type":"uint16"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"Airdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"MaxMintPublic","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxPerWallet","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_mintAmount","type":"uint16"}],"name":"OwnerMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"PublicCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PublicSalePaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_mintAmount","type":"uint16"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"Reserve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenID","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hiddenURL","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_mintAmount","type":"uint16"}],"name":"publicMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reveal","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uriPrefix","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uriPrefix","type":"string"}],"name":"setHiddenUri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_limit","type":"uint8"}],"name":"setMaxMintPublic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_cost","type":"uint256"}],"name":"setPublicCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setPublicSalePaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setRevealed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uriPrefix","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uriSuffix","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function init() {

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "c0db0b85222f4f5c82dd2bed1fc843f9",
            }
        }
    };

    web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
    });

}

async function update_total_supply() {
    await contract.methods.totalSupply().call().then(function (res, err) {
        if (res) {
            $('#total_supply').html(res)
        }
    });
}

async function update_cost() {
    await contract.methods.PublicCost().call().then(function (res, err) {
        if (res) {
            mint_costs = parseFloat(web3.utils.fromWei(res, 'ether'))
        }
    });
}

async function mint_now(final_cost, mint_count) {
    var final_wei_Val = (final_cost * Math.pow(10, 18)).toFixedSpecial(0)
    await contract.methods.publicMint(String(mint_count))
        .send({
            from: user_address,
            value: final_wei_Val
        }).then(function (res, err) {
            if (res) {
                alert("MINTED SUCCESSFULLY!")
            } else {
                alert("MINTING FAILED!")
            }
        });

}

async function switch_network(chainId) {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(chainId) }]
    });
}

function check() {
    web3.eth.getAccounts().then(async (tx) => {
        if (tx[0] !== undefined) {
            user_address = tx[0]
            alert("Wallet connected !!!")

            web3.eth.net.getId().then(async (netId) => {
                if (netId === chainId) {
                    $('#connection_text').hide()
                    $('#connect_btn').hide()
                    $('#mint_box').show();

                    // total supply
                    await update_total_supply();

                    // update cost
                    await update_cost();

                    $('#mint_btn').click(async () => {
                        // check if already minted
                        await mint_now(mint_count * mint_costs, mint_count)
                    })

                } else {
                    switch (chainId) {
                        case 1:
                            alert("Connect to ETH mainnet");
                            break;
                        case 4:
                            alert("Connect to Rinkeby");
                            break;
                    }

                    await switch_network(chainId)

                }
            });
        }
    });
}

async function connectweb3() {
    try {
        provider = await web3Modal.connect();
        web3 = new Web3(provider);
        contract = new web3.eth.Contract(t_abi, t_address);
        check()
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    provider.on("accountsChanged", (accounts) => {
        location.reload();
    });

    provider.on("chainChanged", (chainId) => {
        location.reload();
    });

    provider.on("networkChanged", (networkId) => {
        location.reload();
    });

}

function set_value(type) {
    if (type == 'increase') {
        if (mint_count != 10) {
            mint_count++;
        }
    } else {
        if (mint_count != 1) {
            mint_count--;
        }
    }
    final_cost = mint_costs * mint_count
    $('#mint_count').html(mint_count);
}


$(document).ready(() => {
    init();
    $('#connect_btn').show()
    
    $('#connect_btn').click(async () => { await connectweb3(); })

    $('#increase_btn').click(() => {
        set_value('increase');
    })

    $('#decrease_btn').click(() => {
        set_value('decrease');
    })

    set_value("increase")
});



Number.prototype.toFixedSpecial = function (n) {
    var str = this.toFixed(n);
    if (str.indexOf("e+") === -1) return str;

    str = str
        .replace(".", "")
        .split("e+")
        .reduce(function (p, b) {
            return p + Array(b - p.length + 2).join(0);
        });

    if (n > 0) str += "." + Array(n + 1).join(0);

    return str;
};