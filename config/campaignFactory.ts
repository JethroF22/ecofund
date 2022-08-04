const config = {
  address: {
    localnet: "0xE9C09Cc1e780cfa90279eB23c3a1558Be71021ED",
    testnet: "",
    mainnet: "",
  },
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "newAddress",
          type: "address",
        },
      ],
      name: "CampaignCreated",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "campaigns",
      outputs: [
        {
          internalType: "contract Campaign",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_campaignGoal",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_creator",
          type: "address",
        },
      ],
      name: "createCampaign",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

export default config;
