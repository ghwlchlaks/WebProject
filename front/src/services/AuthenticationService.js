import Api from '@/services/Api'

export default {
  local_signup (credentials) {
    return Api().post('local_signup', credentials)
  },
  local_signin (credentials) {
    return Api().post('local_signin', credentials)
  },
  face_signin () {
    return Api().get('/facebook')
  }
}
