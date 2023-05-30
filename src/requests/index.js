import axios from "axios";
const token = localStorage.getItem('token')

export async function userRegister(payload) {
    return axios.post(process.env.REACT_APP_BACKEND_URL + "/register",
        payload,
        {headers: {app_key: process.env.REACT_APP_KEY}})
}

export async function userLogin(payload) {
    return axios.post(process.env.REACT_APP_BACKEND_URL + "/login",
        payload,
        {headers: {app_key: process.env.REACT_APP_KEY}})
}

export async function getBalance(id) {
    return axios.get(process.env.REACT_APP_BACKEND_URL + "/get-balance/" + id,
        {headers: {app_key: process.env.REACT_APP_KEY, Authorization: 'Bearer ' + token}})
}

export async function getTransactions() {
    return axios.get(process.env.REACT_APP_BACKEND_URL + "/transactions",
        {headers: {app_key: process.env.REACT_APP_KEY, Authorization: 'Bearer ' + token}})
}

export async function verifyPassword(payload) {
    return axios.post(process.env.REACT_APP_BACKEND_URL + "/verify-password",
        payload,
        {headers: {app_key: process.env.REACT_APP_KEY,  Authorization: 'Bearer ' + token}})
}

export async function addBalance(payload) {
    return axios.post(process.env.REACT_APP_BACKEND_URL + "/deposit",
        payload,
        {headers: {app_key: process.env.REACT_APP_KEY,  Authorization: 'Bearer ' + token}})
}

export async function getBeneficiary(payload) {
    return axios.post(process.env.REACT_APP_BACKEND_URL + "/get-beneficiary",
        payload,
        {headers: {app_key: process.env.REACT_APP_KEY,  Authorization: 'Bearer ' + token}})
}

export async function transferAmount(payload) {
    return axios.post(process.env.REACT_APP_BACKEND_URL + "/transfer-amount",
        payload,
        {headers: {app_key: process.env.REACT_APP_KEY,  Authorization: 'Bearer ' + token}})
}
