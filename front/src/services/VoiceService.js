import Api from '@/services/Api'

export default {
  show (boardId, index) {
    return Api().get(`/chatting/${boardId}/${index}`)
  },
  add (boardId, stateId, data) {
    return Api().post(`/chatting/${boardId}/${stateId}`, data)
  },
  contentView (boardId, stateId, index) {
    return Api().get(`/chatting/${boardId}/${stateId}/${index}`)
  },
  totalPages (boardId) {
    return Api().get(`/chatting/${boardId}/totalNum/1`)
  }
}
