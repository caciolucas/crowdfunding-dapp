/* eslint-disable */
import web3 from './web3';

const address = '0x45fe98f6460d2922e76c7a9fa461d1295cd379cf';
const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "retornaProjetos",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "titulo",
				"type": "string"
			},
			{
				"name": "descricao",
				"type": "string"
			},
			{
				"name": "diasLimite",
				"type": "uint256"
			},
			{
				"name": "meta",
				"type": "uint256"
			}
		],
		"name": "criaProjeto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "criador",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "titulo",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "descricao",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "dataLimite",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "meta",
				"type": "uint256"
			}
		],
		"name": "ProjetoIniciado",
		"type": "event"
	}
]

const instance = new web3.eth.Contract(abi, address);

export default instance;
