import Api from '@/services/Api.js'

export default {


    deleteAllVotes (credentials) {
        return Api().delete('/votes', credentials)
    },


    FakePostRequest (credentials) {
        return Api().post('/TempData', credentials)
    },

    getTempData (params) {
        return Api().get('TempData', {
          params: params
        })
      },

    getMeals (accountNumber){
        return Api().get('/meals?account=' + accountNumber, {})
    },
}