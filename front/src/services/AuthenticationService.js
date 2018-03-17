import Api from '@/services/Api'

export default {
  local_signup (credentials) {
    return Api().post('local_signup', credentials)
  },
  local_email_validation (credentials, state) {
    return Api().post(`/local_signup/${state}`, credentials)
  },
  local_signin (credentials) {
    return Api().post('local_signin', credentials)
  },
  social_login (credentials, socialName) {
    return Api().post(`/social_login/${socialName}`, credentials)
  }
}
