<template>
  <div id="nav">
    <h1>Crowdfunding DAPP (IMD0293)</h1>
    <h4 v-if="this.account">Conectado com a conta: {{ this.account }}</h4>
    <h4>Por: Cácio Lucas Nobre de Almeida Bezerra (2020037607)</h4>
    <Button
      :loading="this.creatingProject"
      label="Novo Projeto"
      icon="pi pi-plus"
      @click="openNovoProjetoDisplay"
    />
    <Divider align="center">
      <h3>APOIE UM PROJETO</h3>
    </Divider>
    <div class="p-grid">
      <div class="p-col-6" v-for="projeto in projetos" :key="projeto.id">
        <Card class="p-shadow-4 p-mt-4" style="height: 100%">
          <template #title> {{ projeto.tituloProjeto }} </template>
          <template #content>
            <div class="p-text-left" style="width: 100%">
              <Tag
                :icon="{
                  'far fa-calendar-alt': projeto.statusProjeto == 0,
                  'far fa-calendar-check': projeto.statusProjeto == 1,
                  'far fa-calendar-times': projeto.statusProjeto == 2,
                }"
                :value="
                  projeto.statusProjeto == 0
                    ? 'ATIVO'
                    : projeto.statusProjeto == 1
                    ? 'COMPLETO'
                    : projeto.statusProjeto == 2
                    ? 'EXPIROU'
                    : ''
                "
                :severity="
                  projeto.statusProjeto == 0
                    ? 'info'
                    : projeto.statusProjeto == 1
                    ? 'success'
                    : projeto.statusProjeto == 2
                    ? 'danger'
                    : ''
                "
                class="p-mb-2"
              />
              <br />
              <span class="p-text-bold">Criado por:</span>
              {{ projeto.criadorProjeto }} <br />
              <span class="p-text-bold">Prazo:</span>
              {{ timestamp2Date(projeto.dataLimiteProjeto) }}
            </div>
            <div class="p-text-justify" style="width: 100%">
              <span class="p-text-bold">Descrição</span> <br />
              {{ projeto.descricaoProjeto }}
            </div>
          </template>
          <template #footer>
            <div class="p-grid p-ai-center vertical-container">
              <div class="p-col-2" v-if="projeto.statusProjeto != 1">
                <Button
                  label="APOIAR"
                  icon="fas fa-hands-helping"
                  class="p-button-sm"
                  style="width: 100%"
                  @click="openApoiarProjetoDisplay(projeto)"
                  v-if="projeto.statusProjeto == 0"
                />
                <Button
                  label="REEMBOLSO"
                  icon="fas fa-undo"
                  class="p-button-sm p-button-danger"
                  style="width: 100%"
                  @click="getReembolso(projeto)"
                  v-if="projeto.statusProjeto == 2"
                />
              </div>
              <div class="p-col-1" v-if="projeto.statusProjeto != 1">
                <span class="p-text-bold"
                  >{{ projeto.saldoAtualProjeto / 10 ** 18 }}
                  <i class="fab fa-ethereum"
                /></span>
              </div>
              <div class="p-col">
                <ProgressBar
                  :value="
                    projeto.statusProjeto != 1
                      ? (projeto.saldoAtualProjeto / projeto.metaProjeto) * 100
                      : 100
                  "
                  :id="
                    projeto.statusProjeto == 1
                      ? 'completeProgressBar'
                      : projeto.statusProjeto == 2
                      ? 'expiredProgressBar'
                      : ''
                  "
                />
              </div>
              <div class="p-col-1">
                <span class="p-text-bold"
                  >{{ projeto.metaProjeto / 10 ** 18 }}
                  <i class="fab fa-ethereum"
                /></span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <!-- eslint-disable -->
    <Dialog
      :modal="true"
      header="Quanto quer doar?"
      v-model:visible="apoiarProjetoDisplay"
      style="width: 40vw"
      @hide="apoiarProjetoDisplayClose"
    >
      <!-- eslint-enable -->
      <h3 class="p-text-normal p-mb-4" v-if="this.apoiarProjetoData.projeto">
        Apoie o projeto
        <span class="p-text-bold p-text-uppercase">{{
          this.apoiarProjetoData.projeto.tituloProjeto
        }}</span>
      </h3>
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col-12">
          <span class="p-float-label">
            <InputNumber
              id="valor"
              suffix=" ETH"
              v-model="apoiarProjetoData.valor"
              mode="decimal"
              :minFractionDigits="2"
              :maxFractionDigits="10"
            />
            <label for="valor">Valor</label>
          </span>
        </div>
      </div>
      <template #footer>
        <Button
          :loading="this.fundingProject"
          label="Apoiar"
          @click="apoiarProjeto"
        />
      </template>
    </Dialog>
    <!-- eslint-disable -->
    <Dialog
      :modal="true"
      v-model:visible="novoProjetoDisplay"
      style="width: 40vw"
      @hide="novoProjetoDisplayClose"
    >
      <!-- eslint-enable -->
      <template #header>
        <h2>Novo Projeto</h2>
      </template>
      <div class="p-fluid p-formgrid p-grid p-mt-4">
        <div class="p-field p-col-12">
          <span class="p-float-label">
            <InputText
              id="titulo"
              v-model="novoProjetoData.titulo"
              type="text"
            />
            <label for="titulo">Título</label>
          </span>
        </div>
        <div class="p-field p-col-12 p-mt-4">
          <span class="p-float-label">
            <TextArea
              id="descricao"
              v-model="novoProjetoData.descricao"
              rows="4"
            />
            <label for="descricao">Descrição</label>
          </span>
        </div>
        <div class="p-field p-col-6 p-mt-4">
          <span class="p-float-label">
            <InputNumber
              id="prazo"
              v-model="novoProjetoData.prazo"
              suffix=" dias"
            />
            <label for="prazo">Prazo</label>
          </span>
        </div>
        <div class="p-field p-col-6 p-mt-4">
          <span class="p-float-label">
            <InputNumber
              id="meta"
              v-model="novoProjetoData.meta"
              suffix=" ETH"
              mode="decimal"
              :minFractionDigits="1"
              :maxFractionDigits="10"
            />
            <label for="meta">Meta</label>
          </span>
        </div>
      </div>
      <template #footer>
        <Button
          :loading="this.creatingProject"
          label="Cadastrar"
          @click="newProjeto"
        />
      </template>
    </Dialog>
    <Toast />
  </div>
</template>

<script>
import crowdfundInstance from "./contracts/crowdfund";
import crowdfundProject from "./contracts/project";
import web3 from "./contracts/web3";
import moment from "moment";

export default {
  data() {
    return {
      account: null,
      novoProjetoDisplay: false,
      apoiarProjetoDisplay: false,

      creatingProject: false,
      fundingProject: false,
      projetos: [],
      novoProjetoData: {},

      apoiarProjetoData: {},

      my_web3: web3,
    };
  },
  mounted() {
    // this code snippet takes the account (wallet) that is currently active
    web3.eth.getAccounts().then((accounts) => {
      [this.account] = accounts;
      this.$toast.add({
        severity: "success",
        summary: "MetaMask conectado!",
        detail: this.account ? `${this.account}!` : "",
      });
      this.getProjetos();
    });
  },
  methods: {
    openNovoProjetoDisplay() {
      this.novoProjetoDisplay = true;
    },
    openApoiarProjetoDisplay(projetoRecebido) {
      this.apoiarProjetoData.projeto = projetoRecebido;
      this.apoiarProjetoDisplay = true;
    },
    getProjetos() {
      this.projetos = [];
      crowdfundInstance.methods
        .retornaProjetos()
        .call()
        .then((projetos) => {
          this.projetos = [];
          projetos.forEach((projectAddress) => {
            const projectInst = crowdfundProject(projectAddress);
            projectInst.methods
              .getDetalhes()
              .call()
              .then((projectData) => {
                const project = projectData;
                project.prazo = new Date(project.deadline);
                project.contract = projectInst;
                this.projetos.push(project);
                console.log(project);
              });
          });
        });
    },
    timestamp2Date(timestamp) {
      return moment.unix(timestamp).format("DD/MM/YYYY");
    },
    newProjeto() {
      this.creatingProject = true;
      this.$toast.add({
        severity: "info",
        summary: "Transação criada!",
        details: "A transação de criação do projeto está na fila!",
        life: 5000,
      });
      crowdfundInstance.methods
        .criaProjeto(
          this.novoProjetoData.titulo,
          this.novoProjetoData.descricao,
          this.novoProjetoData.prazo,
          web3.utils.toWei(`${this.novoProjetoData.meta}`, "ether")
        )
        .send({
          from: this.account,
        })
        .then(() => {
          this.novoProjetoDisplay = false;
          this.creatingProject = false;
          this.getProjetos();
          this.$toast.add({
            severity: true,
            summary: "Projeto criado!",
            life: 5000,
          });
        });
    },
    apoiarProjetoDisplayClose() {
      this.apoiarProjetoData = {};
    },
    novoProjetoDisplayClose() {
      this.novoProjetoData = {};
    },
    apoiarProjeto() {
      this.fundingProject = true;
      if (!this.apoiarProjetoData.valor) {
        this.$toast.add({
          severity: "warn",
          summary: "Quantidade inválida",
          detail: "Insira uma quantidade válida de ETH para apoiar!",
          life: 3000,
        });
        return;
      }
      this.$toast.add({
        severity: "info",
        summary: "Transação criada!",
        details: "A transação de apoio ao projeto está na fila!",
        life: 5000,
      });
      this.apoiarProjetoData.projeto.contract.methods
        .contribuir()
        .send({
          from: this.account,
          value: web3.utils.toWei(`${this.apoiarProjetoData.valor}`, "ether"),
        })
        .then((response) => {
          this.fundingProject = false;
          this.apoiarProjetoDisplay = false;
          const novototal =
            response.events.FinanciamentoRecebido.returnValues.saldoAtual;
          const meta = parseInt(this.apoiarProjetoData.projeto.metaProjeto);
          const dataLimite = this.apoiarProjetoData.projeto.dataLimiteProjeto;
          this.apoiarProjetoData.projeto.saldoAtualProjeto = novototal;
          if (moment().unix() > dataLimite) {
            this.$toast.add({
              severity: "warn",
              summary: "Projeto expirado!",
              detail:
                "O projeto agradece seu apoio, mas infelizmente o prazo foi atingido, recupere seu dinheiro!",
              life: 8000,
            });
            this.apoiarProjetoData.projeto.statusProjeto = 2;
            return;
          }
          if (novototal >= meta) {
            this.$toast.add({
              severity: "success",
              summary: "Sucesso! META ATINGIDA!!!",
              detail:
                "Muito obrigado pela ajuda, graças a você o projeto atingiu sua meta!",
              life: 8000,
            });
            this.apoiarProjetoData.projeto.statusProjeto = 1;
            return;
          }
          this.$toast.add({
            severity: "success",
            summary: "Sucesso!",
            detail: "Muito obrigado pela ajuda!",
            life: 5000,
          });
        });
    },
    getReembolso(projeto) {
      this.$toast.add({
        severity: "info",
        summary: "Transação criada!",
        details: "A transação de reembolso está na fila!",
        life: 5000,
      });
      projeto.contract.methods
        .getReembolso()
        .send({
          from: this.account,
        })
        .then(() => {
          this.$toast.add({
            severity: "success",
            summary: "Sucesso!",
            detail: "Investimento recuperado com sucesso!",
          });
          this.getProjetos();
        });
    },
  },
};
</script>

<style>
.p-toast {
  width: 30rem !important;
}
.p-card-content {
  height: 20vh;
}
body,
.p-divider,
.p-divider-content {
  background: var(--surface-b) !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
}
#completeProgressBar > .p-progressbar-value {
  background-color: var(--green-500);
}

#expiredProgressBar > .p-progressbar-value {
  background-color: #e91e43;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
