import { ContractPromise } from '@polkadot/api-contract';
import { Keyring } from '@polkadot/api';
import { ApiPromise, WsProvider } from '@polkadot/api';

const metadata = {
    "source": {
      "hash": "0x7b3c553329e36c097661dcc42b2c21ec6a03b76a3d0ec6f6e382229039fa0f48",
      "language": "ink! 3.3.0",
      "compiler": "rustc 1.63.0-nightly"
    },
    "contract": {
      "name": "flipper",
      "version": "0.1.0",
      "authors": [
        "[your_name] <[your_email]>"
      ]
    },
    "V3": {
      "spec": {
        "constructors": [
          {
            "args": [
              {
                "label": "init_value",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 0
                }
              }
            ],
            "docs": [],
            "label": "new",
            "payable": false,
            "selector": "0x9bae9d5e"
          },
          {
            "args": [],
            "docs": [],
            "label": "default",
            "payable": false,
            "selector": "0xed4b9d1b"
          }
        ],
        "docs": [],
        "events": [],
        "messages": [
          {
            "args": [],
            "docs": [],
            "label": "flip",
            "mutates": true,
            "payable": false,
            "returnType": null,
            "selector": "0x633aa551"
          },
          {
            "args": [],
            "docs": [],
            "label": "get",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "bool"
              ],
              "type": 0
            },
            "selector": "0x2f865bd9"
          }
        ]
      },
      "storage": {
        "struct": {
          "fields": [
            {
              "layout": {
                "cell": {
                  "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                  "ty": 0
                }
              },
              "name": "value"
            }
          ]
        }
      },
      "types": [
        {
          "id": 0,
          "type": {
            "def": {
              "primitive": "bool"
            }
          }
        }
      ]
    }
  }
  
const address = "5CW4f7ENxBtsrhLoZ7SAp21kiivbQ8zVXsPz6mYrRRX66t35"
main()

async function main() {
    // Construct
    const wsProvider = new WsProvider('ws://localhost:9944');
    const api = await ApiPromise.create({ provider: wsProvider });

    const contract = new ContractPromise(api, metadata, address);

    const keyring = new Keyring({ type: 'sr25519' });

    const alicePair = keyring.addFromUri('//Alice', { name: 'Alice default' });
    const gasLimit = 3000n * 1000000n;
    const storageDepositLimit = null
    const value = 0;

    // (We perform the send from an account, here using Alice's address)
    const { gasRequired, storageDeposit, result, output } = await contract.query.get(
    alicePair.address,
    {
        gasLimit,
        storageDepositLimit,
    }
    );

    // The actual result from RPC as `ContractExecResult`
    console.log(result.toHuman());

    // the gas consumed for contract execution
    console.log(gasRequired.toHuman());

    // check if the call was successful
    if (result.isOk) {
    // output the return value
    console.log('Success', output.toHuman());
    } else {
    console.error('Error', result.asErr);
    }
}


