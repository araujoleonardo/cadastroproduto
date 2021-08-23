<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cadastro de Produtos</a>
      </div>
    </nav>

    <div class="container">

      <form>

          <label>Nome</label>
          <input type="text" placeholder="Nome">
          <label>Quantidade</label>
          <input type="number" placeholder="QTD">
          <label>Valor</label>
          <input type="text" placeholder="Valor">
          <label>Categoria</label>
          <input list="categoria" placeholder="Categoria">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>CATEGORIA</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="produto of produto" :key="produto.id">

            <td>{{ produto.nome }}</td>
            <td>{{ produto.quantidade }}</td>
            <td>{{ produto.valor }}</td>
            <td>{{ produto.categoria.nomecategoria }}</td>
            <td>
              <button class="waves-effect btn-small blue darken-1"><i class="material-icons">edit</i></button>
              <button class="waves-effect btn-small red darken-1"><i class="material-icons">delete</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>


<script>

  import Produto from './services/produto'

  export default{

    data(){
      return {
        produto:[]
      }
    },

    mounted(){
      Produto.listar().then(resposta => {
        console.log(resposta.data)
        this.produto = resposta.data
      })
    }
  }

</script>

<style>

</style>
