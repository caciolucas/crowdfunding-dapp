pragma solidity 0.5.4;

contract Crowdfunding {
    
    Projeto[] private projetos;

    event ProjetoIniciado(address id, address criador, string titulo, string descricao, uint256 dataLimite, uint256 meta);

    function criaProjeto (string calldata titulo, string calldata descricao, uint diasLimite, uint meta ) external {
        uint dataLimite = now + (diasLimite * (1 days));
        Projeto projeto = new Projeto(msg.sender, titulo, descricao, dataLimite, meta);
        projetos.push(projeto);
        
        emit ProjetoIniciado(address(projeto),msg.sender,titulo,descricao,dataLimite, meta);
    }                                                                                                                                   

    function retornaProjetos() external view returns(Projeto[] memory){
        return projetos;
    }
}


contract Projeto {

    enum Status {Ativo, Completado, Expirado}

    address payable public criador;
    string public titulo;
    string public descricao;
    uint public meta;
    uint public dataLimite;
    
    Status public status = Status.Ativo; // initialize on create
    
    uint256 public saldoAtual;
    mapping (address => uint) public contribuicoes;

    event FinanciamentoRecebido (address doador, uint quantidade, uint saldoAtual);
    event CriadorPago(address criador);

    modifier comStatus(Status _status) {
        require(status == _status);
        _;
    }

    constructor (address payable criadorProjeto, string memory tituloProjeto, string memory descricaoProjeto, uint dataLimiteProjeto, uint metaProjeto) public {
        criador = criadorProjeto;
        titulo = tituloProjeto;
        descricao = descricaoProjeto;
        meta = metaProjeto;
        dataLimite = dataLimiteProjeto;
        saldoAtual = 0;
    }

    function contribuir() external comStatus(Status.Ativo) payable {
        contribuicoes[msg.sender] = contribuicoes[msg.sender] + (msg.value);
        
        saldoAtual = saldoAtual + (msg.value);
        emit FinanciamentoRecebido(msg.sender, msg.value, saldoAtual);
        verificaStatus();
    }

    function verificaStatus() public {
        if (saldoAtual >= meta) {
            status = Status.Completado;
            pagaCriador();
        } else if (now > dataLimite)  {
            status = Status.Expirado;
        }
    }

    function pagaCriador() internal comStatus(Status.Completado) returns (bool) {
        uint256 totalArrecadado = saldoAtual;

        saldoAtual = 0;
        
        if (criador.send(totalArrecadado)) {
            emit CriadorPago(criador);
            status = Status.Completado;
        } else {
            saldoAtual = totalArrecadado;
            return true;
        }

        return false;
    }

    function getReembolso() public comStatus(Status.Expirado) returns (bool) {
        require(contribuicoes[msg.sender] > 0);

        uint valorADevolver = contribuicoes[msg.sender];
        contribuicoes[msg.sender] = 0;

        if (!msg.sender.send(valorADevolver)) {
            contribuicoes[msg.sender] = valorADevolver;
            return false;
        } else {
            saldoAtual = saldoAtual - (valorADevolver);
        }

        return true;
    }

    function getDetalhes() public view returns (
        address payable criadorProjeto,
        string memory tituloProjeto,
        string memory descricaoProjeto,
        uint256 dataLimiteProjeto,
        Status statusProjeto,
        uint256 saldoAtualProjeto,
        uint256 metaProjeto
        ) {
        criadorProjeto = criador;
        tituloProjeto = titulo;
        descricaoProjeto = descricao;
        dataLimiteProjeto = dataLimite;
        statusProjeto = status;
        saldoAtualProjeto = saldoAtual;
        metaProjeto = meta;
    }
}