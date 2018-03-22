import Api from '@/services/Api.js'

export default {


    deleteAllVotes (credentials) {
        return Api().delete('/votes', credentials)
    },

    getMeals (accountNumber = 0) {
        let extension = "";
        if(parseInt(accountNumber) != 0) {
            extension = "?account=" + this.accountNumber;
        }

        return Api().get('/meals' + extension, {});
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