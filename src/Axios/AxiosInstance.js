import axios from 'axios';
import {config} from "../config/config";

const instance = axios.create({
    withCredentials: true,
    baseURL: `${config.ABC_hotel_check_in_system}`
});

export default instance;