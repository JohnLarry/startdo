import axios from 'axios'

export const base_apiURL = "http://localhost:8000";
export const axios_request =axios.create({
    baseURL: base_apiURL,
});