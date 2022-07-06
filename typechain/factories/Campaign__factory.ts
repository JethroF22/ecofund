/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Campaign, CampaignInterface } from "../Campaign";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignGoal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_campaignDeadline",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_creator",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "campaignDeadline",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "campaignGoal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "creator",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hasDeadlinePassed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isSuccessful",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numPledges",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pledge",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pledges",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalPledges",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_hasPassed",
        type: "bool",
      },
    ],
    name: "updateDeadlineState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600060045560006005553480156200001b57600080fd5b5060405162000cad38038062000cad8339818101604052810190620000419190620000fc565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600181905550816002819055506001600660016101000a81548160ff0219169083151502179055506000600660006101000a81548160ff021916908315150217905550505050620001c4565b600081519050620000df8162000190565b92915050565b600081519050620000f681620001aa565b92915050565b6000806000606084860312156200011257600080fd5b60006200012286828701620000e5565b93505060206200013586828701620000e5565b92505060406200014886828701620000ce565b9150509250925092565b60006200015f8262000166565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6200019b8162000152565b8114620001a757600080fd5b50565b620001b58162000186565b8114620001c157600080fd5b50565b610ad980620001d46000396000f3fe60806040526004361061009c5760003560e01c806388ffe8671161006457806388ffe8671461017457806396e3f4c51461017e5780639f3d391e146101a9578063a46f7d19146101d4578063ec4cd0cf146101ff578063ef068a7f1461022a5761009c565b806302d05d3f146100a15780631d6f8223146100cc578063343576f5146100f75780633ccfd60b146101345780636154d82c1461014b575b600080fd5b3480156100ad57600080fd5b506100b6610255565b6040516100c3919061077e565b60405180910390f35b3480156100d857600080fd5b506100e1610279565b6040516100ee9190610874565b60405180910390f35b34801561010357600080fd5b5061011e6004803603810190610119919061062d565b61027f565b60405161012b9190610874565b60405180910390f35b34801561014057600080fd5b50610149610297565b005b34801561015757600080fd5b50610172600480360381019061016d9190610656565b61042e565b005b61017c61044b565b005b34801561018a57600080fd5b506101936105cb565b6040516101a09190610799565b60405180910390f35b3480156101b557600080fd5b506101be6105de565b6040516101cb9190610874565b60405180910390f35b3480156101e057600080fd5b506101e96105e4565b6040516101f69190610874565b60405180910390f35b34801561020b57600080fd5b506102146105ea565b6040516102219190610799565b60405180910390f35b34801561023657600080fd5b5061023f6105fd565b60405161024c9190610874565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b60036020528060005260406000206000915090505481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610325576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161031c906107d4565b60405180910390fd5b600660009054906101000a900460ff16610374576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036b90610854565b60405180910390fd5b600660029054906101000a900460ff166103c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ba90610814565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f1935050505015801561042b573d6000803e3d6000fd5b50565b80600660006101000a81548160ff02191690831515021790555050565b600660009054906101000a900460ff161561049b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610492906107f4565b60405180910390fd5b600660019054906101000a900460ff166104ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e190610834565b60405180910390fd5b6000341161052d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610524906107b4565b60405180910390fd5b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550346004600082825461058391906108a0565b9250508190555060016005600082825461059d91906108a0565b9250508190555060015447106105c9576001600660026101000a81548160ff0219169083151502179055505b565b600660009054906101000a900460ff1681565b60045481565b60055481565b600660029054906101000a900460ff1681565b60015481565b60008135905061061281610a75565b92915050565b60008135905061062781610a8c565b92915050565b60006020828403121561063f57600080fd5b600061064d84828501610603565b91505092915050565b60006020828403121561066857600080fd5b600061067684828501610618565b91505092915050565b61068881610908565b82525050565b6106978161091a565b82525050565b60006106aa60138361088f565b91506106b58261097f565b602082019050919050565b60006106cd600c8361088f565b91506106d8826109a8565b602082019050919050565b60006106f060138361088f565b91506106fb826109d1565b602082019050919050565b6000610713601a8361088f565b915061071e826109fa565b602082019050919050565b600061073660128361088f565b915061074182610a23565b602082019050919050565b600061075960178361088f565b915061076482610a4c565b602082019050919050565b61077881610946565b82525050565b6000602082019050610793600083018461067f565b92915050565b60006020820190506107ae600083018461068e565b92915050565b600060208201905081810360008301526107cd8161069d565b9050919050565b600060208201905081810360008301526107ed816106c0565b9050919050565b6000602082019050818103600083015261080d816106e3565b9050919050565b6000602082019050818103600083015261082d81610706565b9050919050565b6000602082019050818103600083015261084d81610729565b9050919050565b6000602082019050818103600083015261086d8161074c565b9050919050565b6000602082019050610889600083018461076f565b92915050565b600082825260208201905092915050565b60006108ab82610946565b91506108b683610946565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156108eb576108ea610950565b5b828201905092915050565b600061090182610926565b9050919050565b600061091382610926565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f496e73756666696369656e7420706c6564676500000000000000000000000000600082015250565b7f556e617574686f72697365640000000000000000000000000000000000000000600082015250565b7f446561646c696e65206861732070617373656400000000000000000000000000600082015250565b7f43616d706169676e20676f616c73206e6f742072656163686564000000000000600082015250565b7f43616d706169676e2063616e63656c6c65640000000000000000000000000000600082015250565b7f446561646c696e6520686173206e6f7420706173736564000000000000000000600082015250565b610a7e816108f6565b8114610a8957600080fd5b50565b610a958161091a565b8114610aa057600080fd5b5056fea2646970667358221220720b13273c7e7fc82800bb39e9d8baaa74fff1577977d799bb410b280122ac5864736f6c63430008040033";

export class Campaign__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _campaignGoal: BigNumberish,
    _campaignDeadline: BigNumberish,
    _creator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Campaign> {
    return super.deploy(
      _campaignGoal,
      _campaignDeadline,
      _creator,
      overrides || {}
    ) as Promise<Campaign>;
  }
  getDeployTransaction(
    _campaignGoal: BigNumberish,
    _campaignDeadline: BigNumberish,
    _creator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _campaignGoal,
      _campaignDeadline,
      _creator,
      overrides || {}
    );
  }
  attach(address: string): Campaign {
    return super.attach(address) as Campaign;
  }
  connect(signer: Signer): Campaign__factory {
    return super.connect(signer) as Campaign__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CampaignInterface {
    return new utils.Interface(_abi) as CampaignInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Campaign {
    return new Contract(address, _abi, signerOrProvider) as Campaign;
  }
}