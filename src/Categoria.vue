<template>
  <!-- Large modal -->
  <div class="modal-dialog modal-lg">
    <label>Categoria</label>
    <input class="form-control" type="text" placeholder="Nome" v-model="produto.nome">
  </div>
</template>

<script>

import Produto from './services/produto'
import Categoria from './services/categoria'

  export default{

    data(){
      return {
        produto:{
          id:'',
          nome: '',
          quantidade: '',
          valor: '',
          categoria: []
        },
        produtos:[],

        categorias: []
      }
    },

    mounted(){
      this.listar()

      Categoria.listarcategorias().then(answer => {
        this.categorias = answer.data
      })
    },
    
    methods:{

      listar(){
        Produto.listar().then(resposta => {
          this.produtos = resposta.data
        }).catch(e => {
          console.log(e)
        })
      },

      salvar(){
        if(!this.produto.id){
          Produto.salvar(this.produto).then(resposta => {
            this.produto = {}
            alert('Cadastrado com sucesso!')
            this.produtos = resposta
            this.listar()
            this.errors = {}
          }).catch(e => {
            this.errors = e.response.data.errors
          })
        }else{
          Produto.atualizar(this.produto).then(resposta => {
            this.produto = {}
            this.errors = {}
            alert('Atualizado com sucesso!')
            this.produtos = resposta
            this.listar()
          }).catch(e => {
            this.errors = e.response.data.errors
          })
        }
      },

      editar(produto){
        this.produto = produto
      }

    },

    remover(produto){

      if(confirm('Deseja excluir o produto?')){
        Produto.apagar(produto).then(resposta => {
          this.produtos = resposta
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
    }
  }

</script>

<style>

</style>