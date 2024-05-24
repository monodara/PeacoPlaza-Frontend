import axios from "axios";

const appAxios = axios.create({
    baseURL : "https://peacoplaza.azurewebsites.net/"
});
export default appAxios;