import { token } from "morgan"
import * as usersAPI from "./users-api"

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData)

    // for right now, this won"t be a token but we will be returning one eventually
    localStorage.setItem("token", token)
    return getUser()
}

export function getToken() {
    //get token from local storage
    //get token"s payload
    //check if the token has expired
    //if it hasn"t, return the token
    const token = localStorage.getItem("token")
    if(!token) return null
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJnIiwiZW1haWwiOiJnQGcuY29tIiwiX2lkIjoiNjNlYTY0YTNiZGFmYmFiYjEyMzY3YWRhIiwiY3JlYXRlZEF0IjoiMjAyMy0wMi0xM1QxNjoyNjoxMS40OTBaIiwidXBkYXRlZEF0IjoiMjAyMy0wMi0xM1QxNjoyNjoxMS40OTBaIiwiX192IjowfSwiaWF0IjoxNjc2MzA1NTcxLCJleHAiOjE2NzYzOTE5NzF9.qXIIKc5m1VypaTAXvDZzbVaevX8t1VfDsK3-5Ex5bzI

    const payload = token.split(".")[1]
    //JWTs are base64 encoded
    //need to decode it to make it usable
    //JS has builtin function to turn token into JSON
    //atob(put token here)
    const decodedPayload = atob(payload)
    const parsedPayload = JSON.parse(decodedPayload)
    //JWT"s exp is express in seconds, not milliseconds so convert
    if(parsedPayload.exp < Date.now() / 1000) {
        localStorage.removeItem("token")
        return null
    } else {
        return token
    }
}

export function getUser() {
    const token = getToken()
    if (token) {
        const payload = token.split(".")[1]
        const decodedPayload = atob(payload)
        const parsedPayload = JSON.parse(decodedPayload)
        return parsedPayload.user
    } else {
        return null
    }
}

export function logOut() {
    localStorage.removeItem("token")
}

export async function logIn(credentials) {
    const token = await usersAPI.logIn(credentials)
    localStorage.setItem("token", token)
    return getUser()
}

export function checkToken() {
    return usersAPI.checkToken()
        .then(dataStr => new Date(dataStr))
}
