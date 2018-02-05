import Api from '@/services/Api'

export default {
  signup (credentials) {
    return Api().post('signup', credentials)
  },
  signin (credentials) {
    return Api().post('signin', credentials)
  },
  face_signin (credentials) {
    return Api().post('face_signin', credentials)
  }
}
