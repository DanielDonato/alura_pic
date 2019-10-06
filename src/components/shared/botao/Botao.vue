<template>
    <button @click="disparaAcao()" class="botao" :class="estiloDoBotao" :type="tipo">{{ rotulo }}</button>
</template>

<script>
['tipo', 'rotulo', 'confirmacao', 'estilo']
export default {
    props: {
        tipo: {
            required: true,
            type: String
        },
        rotulo: {
            required: true,
            type: String
        },
        confirmacao: Boolean,
        estilo: String
    },

    methods: {
        disparaAcao(){
            if(this.confirmacao){
                if(confirm("Confirma operação?")){
                    this.$emit('botaoAtivado'); // pode passar mais parametros, e receber no elemento pai como $event no primeiro parametro
                    // vai ativar a operação com o mesmo nome na chamada do componente filho no componente pai
                    return;
                }
            }
            this.$emit('botaoAtivado');
        }
    },

    computed: {
        estiloDoBotao(){
            if(this.estilo == 'padrao' || !this.estilo){
                return 'botao-padrao';
            }
            if(this.estilo == 'perigo'){
                 return 'botao-perigo';
            }
        }
    }

}
</script>

<style>
     .botao {
        display: inline-block;
        padding: 10px;
        border-radius: 3px;
        margin: 10px;
        font-size: 1.2em;
    }

    .botao-perigo {
        background: firebrick;
        color: white;
    }

    .botao-padrao {
        background: darkcyan;
        color: white;
    }
</style>
