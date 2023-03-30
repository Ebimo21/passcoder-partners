import jsCookie from 'js-cookie'
import React from 'react'
import { Partner } from './config/apiCalls'

async function CheckAuth () {
    const jwt = jsCookie.get("jwt")

    const response = await Partner(jwt)
    console.log(response)

    if(response?.status === 401) return false
    return true

  
}

export default CheckAuth
