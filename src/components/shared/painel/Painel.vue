<template>
  <div class="painel">
    <!-- <h2 class="painel-titulo" v-on:dblclick=" visivel = !visivel">{{ titulo }}</h2> -->
    <h2 class="painel-titulo" @dblclick=" visivel = !visivel">{{ titulo }}</h2>
     <!-- 
        Vue ira adicionar essas classes ao elemento transition
        painel-fade-enter // antes do elemento ser incluído ou removido, o estado atual
        painel-fade-enter-active // quando o elemento esta sendo incluído
        painel-fade-leave-active // quando o elemento esta sendo removido
      -->
    <transition name="painel-fade">
      <div class="painel-conteudo" v-show="visivel">
        <!--<slot name="teste">
            Lugar aonde será recebido os dados entre a abertura e fechamento das tags de Painel 
        </slot>
        <slot name="conteudo">
            Lugar aonde será recebido os dados entre a abertura e fechamento das tags de Painel
        </slot>-->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["titulo"], //propriedades que esse elemento aceita receber
  data(){
    return {
      visivel: true
    }
  }
};
</script>

<!-- scoped faz o css ser apenas do componente, fazendo com que ele não faça alterações nos itens restantes da pagina -->
<style scoped>
.painel {
  padding: 0 auto;
  border: solid 2px grey;
  display: inline-block;
  margin: 5px;
  box-shadow: 5px 5px 10px grey;
  width: 200px;
  height: 100%;
  vertical-align: top;
  text-align: center;
}

.painel .painel-titulo {
  text-align: center;
  border: solid 2px;
  background: lightblue;
  margin: 0 0 15px 0;
  padding: 10px;
  text-transform: uppercase;
}

.painel-fade-enter, .painel-fade-leave-active {
  opacity: 0;
}

.painel-fade-enter-active, .painel-fade-leave-active {
  transition: opacity .4s;
}

</style>
