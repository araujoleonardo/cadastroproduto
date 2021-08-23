import { http } from './config'

export default {
  listarcategorias:() => {
    return http.get('categorias')
  }
}