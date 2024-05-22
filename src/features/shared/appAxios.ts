import axios from "axios";

const appAxios = axios.create({
    baseURL : "http://localhost:5074/api/v1/"
});
export default appAxios;