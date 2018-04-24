import Api from '@/services/Api.js'

export default {


    deleteAllVotes (credentials) {
        return Api().delete('/deleteAllVotes', credentials)
    },

    getMeals (accountNumber){
        return Api().get('/meals?account=' + accountNumber, {})
    },

    stocking (accountNumber, meal) {
        let extension = "";
        extension = "?account=" + this.accountNumber;

        return Api().post('/stocking' + extension, {meal});
    },
}