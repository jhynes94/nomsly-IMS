import Api from './Api.js'

export default {
    register (credentials) {
        return Api().post('hero', credentials)
    }
}