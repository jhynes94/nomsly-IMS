import axios from 'axios'

export default () => {
    return axios.create( function () {

        if (process.env.NODE_ENV === "development") {
            return { baseURL: 'http://localhost:3000' };
        }
        return { baseURL: '/' }
    })
}