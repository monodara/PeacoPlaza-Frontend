import axios from "axios";

const appAxios = axios.create({
    baseURL : "https://peacoplaza.azurewebsites.net/api/v1"
});
export default appAxios;