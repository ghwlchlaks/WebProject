import Api from '@/services/Api'

export default {
  show (boardId) {
    return Api().get(`/${boardId}`)
  },
  add (boardId, stateId, data) {
    return Api().post(`/${boardId}/${stateId}`, data)
  }
}
