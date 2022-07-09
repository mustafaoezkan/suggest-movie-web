import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return axios.create({
        baseURL: "https://suggest-movie-db.herokuapp.com",
    });
}