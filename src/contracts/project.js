/* eslint-disable */
import web3 from './web3';

const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "descricao",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "criador",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "saldoAtual",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "contribuicoes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "status",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getDetalhes",
		"outputs": [
			{
				"name": "criadorProjeto",
				"type": "address"
			},
			{
				"name": "tituloProjeto",
				"type": "string"
			},
			{
				"name": "descricaoProjeto",
				"type": "string"
			},
			{
				"name": "dataLimiteProjeto",
				"type": "uint256"
			},
			{
				"name": "statusProjeto",
				"type": "uint8"
			},
			{
				"name": "saldoAtualProjeto",
				"type": "uint256"
			},
			{
				"name": "metaProjeto",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "titulo",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "verificaStatus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getReembolso",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "contribuir",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "meta",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "dataLimite",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "criadorProjeto",
				"type": "address"
			},
			{
				"name": "tituloProjeto",
				"type": "string"
			},
			{
				"name": "descricaoProjeto",
				"type": "string"
			},
			{
				"name": "dataLimiteProjeto",
				"type": "uint256"
			},
			{
				"name": "metaProjeto",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "doador",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "quantidade",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "saldoAtual",
				"type": "uint256"
			}
		],
		"name": "FinanciamentoRecebido",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "criador",
				"type": "address"
			}
		],
		"name": "CriadorPago",
		"type": "event"
	}
]

export default (address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};
