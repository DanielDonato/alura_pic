<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <!-- <h1 v-text=titulo></h1> -->
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input
      type="search"
      class="filtro"
      v-on:input="filtro = $event.target.value"
      placeholder="Filtre por parte do titulo"
    />
    {{ filtro }}
    <!-- $event == objeto que conhece os eventos
        .target == elemento que lançou o evento
        .value == valor do obj que lançou o evento
    -->
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComfiltro" v-bind:key="foto">
        <meu-painel :titulo="foto.titulo">
          <!--<div slot="conteudo">
            <img class="imagem-responsiva" :src="foto.url" :alt="foto.titulo">
          </div>
          <div slot="teste">
            <img class="imagem-responsiva" :src="foto.url" :alt="foto.titulo">
          </div>-->
          <imagem-responsiva
            v-meu-transform="{incremento: 15, animate: true}"
            :url="foto.url"
            :titulo="foto.titulo"
          />
          <router-link :to="{ name: 'altera', params: { id: foto._id } }">
            <meu-botao 
              tipo="button"
              rotulo="alterar"
            />
          </router-link>
          <meu-botao
            tipo="button"
            rotulo="REMOVER"
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo"
          />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "meu-painel": Painel, //apelido para o componente : componente referenciado
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  data() {
    return {
      titulo: "AluraPic",
      fotos: [],
      filtro: "",
      mensagem: ""
    };
  },

  computed: {
    //elementos que são funções mas que podem ser acessados pela view como variaveis
    fotosComfiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  methods: {
    remove(foto) {
      this.service.apaga(foto._id)
          .then(
          () => {
            this.mensagem = "Foto removida com sucesso";
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1);
          },
          err => {
            this.mensagem = err.message;
          });
    }
  },

  created() {
    this.service = new FotoService(this.$http);
    this.service
      .lista()
      .then(fotos => (this.fotos = fotos), 
        err => {
          console.log(err);
          this.mensagem = "Não foi possivel obter as fotos";
        }
      );
  }
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
