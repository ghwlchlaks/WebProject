import Api from '@/services/Api'

export default {
  show (boardId, index) {
    return Api().get(`/board/${boardId}/${index}`)
  },
  add (boardId, stateId, data) {
    return Api().post(`/board/${boardId}/${stateId}`, data)
  },
  contentView (boardId, stateId, index) {
    return Api().get(`/board/${boardId}/${stateId}/${index}`)
  },
  totalPages (boardId) {
    return Api().get(`/board/${boardId}/totalNum/1`)
  }
}
