<template>
  <div id="app">

    <nav class="navbar navbar-dark bg-primary">
      <h3><a href="#" class="card-title" style="color:white">Cadastro de Produtos</a></h3>
    </nav>

    <br>

    <div class="container">

      <form @submit.prevent="salvar" >
          <label>Nome</label>
          <input class="form-control" type="text" placeholder="Nome" v-model="produto.nome">
          <label>Quantidade</label>
          <input class="form-control"  type="number" placeholder="QTD" v-model="produto.quantidade">
          <label>Valor</label>
          <input class="form-control" type="text" placeholder="Valor" v-model="produto.valor">

          <label>Categoria</label>
          <select class="form-control">
            <option v-for="categoria of categorias" :key="categoria.id" :value="categoria.nomecategoria">{{ categoria.nomecategoria }}</option>
          </select>
          
          <br>              

          <button class="btn btn-success">salvar</button>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Cadastrar Categoria</button>

      </form>

      <br>

      <table class="table">

        <thead>

          <tr>
            <th scope="col">NOME</th>
            <th scope="col">QTD</th>
            <th scope="col">VALOR</th>
            <th scope="col">CATEGORIA</th>
            <th scope="col">OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="produto of produtos" :key="produto.id">

            <td>{{ produto.nome }}</td>
            <td>{{ produto.quantidade }}</td>
            <td>{{ produto.valor }}</td>
            <td>{{ produto.categoria.nomecategoria }}</td>
            <td>
              <button @click="editar(produto)" class="btn btn-primary">Editar</button>
              <button @click="remover(produto)" class="btn btn-danger">Deletar</button>
            </td>

          </tr>

        </tbody>

      
      </table>

    </div>

  </div>
</template>


<script>

  import Produto from './services/produto'
  import Categoria from './services/categoria'

  export default {

    data(){

      return{

        produto: {
          nome: '',
          quantidade: '',
          valor: '',
          categoria: {
            nomecategoria: ''
          }
        },


        produtos: [],
        categorias: []
      }

    },

    mounted(){

      Categoria.listarcategorias().then(answer => {
        this.categorias = answer.data
      })

      Produto.listar().then(resposta => {
        this.produtos = resposta.data
      })

    },

    methods:{

      salvar(){

        Produto.salvar(this.produto).then(resposta => {
          alert('Salvo com sucesso!')
          this.produto = resposta
        })       

      },

      remover(produto){
        Produto.apagar(produto).then(resposta => {
          this.produto = resposta
          this.listar();
        })
      }

    }

  }
</script>

<style>

</style>