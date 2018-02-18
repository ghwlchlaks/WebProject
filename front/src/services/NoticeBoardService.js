import Api from '@/services/Api'

export default {
  show (boardId) {
    return Api().get(`/${boardId}`)
  }
}
