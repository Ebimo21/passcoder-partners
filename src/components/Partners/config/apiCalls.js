import axios from "axios"
import jsCookie from "js-cookie"
import { passcoder_access_key } from "./configuration"

const host = "https://us-central1-id-app-f1f1e.cloudfunctions.net/ng_app_internal/"
const authRoute = "auth/partner/"
const token = "1838b876c9c38a16ac07e80cb68405c33181fb18"
const strip ="aria-brown-apapa-lagos"
// const jwt= jsCookie.get("jwt")

export const hostRoute =async()=>{
    try {
        const response = await axios.get(`${host}`)
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}
export const PartnerPremiumPackages =async()=>{
    try {
        const response = await axios.get(`${host}partner/premium/packages`)
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}
export const Partner =async(jwt)=>{
    try {
        const response = await axios.get(
            `${host}partner/`, 
            {
                headers: { 
                    "passcoder-access-token": jwt 
                }
            }
        )
        console.log("partner")
        console.log(response);
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, status: err.response.status}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}

export const PartnerMetrics =async(jwt)=>{
    try {
        const response = await axios.get(
            `${host}partner/`, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}
export const PartnerGetStripped =async(jwt)=>{
    try {
        const response = await axios.get(`${host}partner/`, {params: {token: jwt}})
        return response.data.data.stripped
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}
export const PartnerAccessDetails =async(stripped)=>{
    try {
        const response = await axios.get(
            `${host}partner/access/details`, 
            {
                params: {
                    stripped: stripped
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data.data}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}
export const PartnerDetail =async(jwt)=>{
    try {
        const response = await axios.get(`${host}partner`, 
        { headers: { "passcoder-access-token": jwt }})
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}

export const PartnerPackage =async()=>{
    try {
        const response = await axios.get(`${host}partner/premium/packages`)
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}


export const PartnerCreateOtp =async({otp})=>{
    try {
        const response = await axios.post(
            `${host}partner/otp/create`,
            {
                otp
            },
            {

            })
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerVerifyOtp =async(otp, jwt)=>{
    try {
        const response = await axios.post(
            `${host}partner/otp/verify`,
            {
                otp: otp
            },
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            })
            const jwt = response.data.data.token
        jsCookie.set("jwt", jwt)
        // console.log(jwt)
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}
export const PartnerLoginVerifyOtp =async(email, otp, stripped)=>{
    try {
        const response = await axios.post(
            `${host}${authRoute}access/${stripped}/verify`,
            {
                email, 
                otp
            },
            {

            })

            const jwt = response.data.data.token
        jsCookie.set("jwt", jwt)
        console.log(response)
        return {success: true, data: response.data, message: "Login Successful!"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerUploadPhoto =async(jwt, photo)=>{
    console.log(photo)
    try {
        const response = await axios.put(`
            ${host}partner/profile/photo`,
            {photo: photo}, 
            { 
                headers: {
                    "passcoder-access-token": jwt,
                    // 'Content-Type': 'multipart/form-data'

                }
            }
        )
        console.log(response)
        return {success: true, message: "File successfullly updated"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerUpdateEmail =async(jwt, email)=>{
    try {
        const response = await axios.put(`
            ${host}partner/email`,
            {
                email
            }, 
            { 
                headers: {
                    "passcoder-access-token": jwt,
                }
            }
        )
        console.log(response)
        return {success: true, message: "Email Updated Successfully"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}
export const PartnerComplianceCertificate =async(jwt, registration_certificate)=>{
    try {
        const response = await axios.put(`
            ${host}partner/compliance/certificate`,
            { 
                registration_certificate:registration_certificate
            }, 
            { 
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        console.log(response.data)
        return {success: true, filename: response.data[0].registration_certificate}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerComplianceDocument =async(jwt, registration_document)=>{
    try {
        const response = await axios.put(`
            ${host}partner/compliance/document`,
            { 
                registration_document: registration_document
            }, 
            { 
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerComplianceMultipleDocuments =async(jwt, {registration_document, registration_certificate})=>{
    try {
        const response = await axios.put(`
            ${host}partner/compliance/details`,
            { 
                registration_document,
                registration_certificate
            }, 
            { 
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerComplianceDetails =async(
    jwt, 
    {
        company_name, 
        company_email, 
        company_rc_number, 
        company_type, 
        company_address
    })=>{
        try {
            const response = await axios.put(`
                ${host}partner/compliance/details`,
                { 
                    company_name,
                    company_email,
                    company_rc_number,
                    company_type,
                    company_address
                }, 
                { 
                    headers: {
                        "passcoder-access-token": jwt
                    }
                }
            )
            return { success: true, message: "Successfully Updated"}
        } catch(err){
            if (err.response){ return {success: false, message: err.response.data.message, err}; }
            else if (err.request) { console.log(err.request); } 
            else { console.log('Error: ', err.message); }
        }
}


export const PartnerUploadCover =async(jwt, cover)=>{
    try {
        const response = await axios.put(`${host}partner/profile/cover`,{ cover}, { headers: {"passcoder-access-token": jwt} })
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}
export const PartnerUpdateName =async(jwt, {name, state, city, country})=>{
    try {
        const response = await axios.put(`${host}partner/name`,{name, state, city, country}, {headers: {"passcoder-access-token": jwt}})
        return {success: true, message: "Partner Name updated Successfully"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerUpdateThreshold =async(jwt, point_threshold)=>{
    try {
        const response = await axios.put(
            `${host}partner/point/threshold`,
            {
                point_threshold
            }, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}
export const PartnerUpdateDescription =async(jwt, description)=>{
    try {
        const response = await axios.put(
            `${host}partner/description`,
            {
                description
            }, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}
export const PartnerVerifyEmail =async(email, id)=>{
    try {
        const response = await axios.post(
            `${host}partner/verify/email`,
            {
               email: email,
               verification_id: id
            }, 
            {

            }
        )
        console.log(response)
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerProofProfilePhoto =async(jwt, partner_unique_id)=>{
    try {
        const response = await axios.post(
            `${host}proofs/partner/profile/photo`,
            {
                partner_unique_id 
            }, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return {success: true, filename: response.data.data[0].photo}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerProofComplianceDocument =async(jwt, partner_unique_id)=>{
    try {
        const response = await axios.post(
            `${host}proofs/partner/compliance/documents`,
            {
                partner_unique_id 
            }, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        console.log(response.data)
        // console.log(response.data.data[0]?.photo)
        return {success: true, filename: response.data}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerProof =async(jwt, partner_unique_id)=>{
    try {
        const response = await axios.post(
            `${host}proofs/partner/profile/photo`,
            {
                partner_unique_id 
            }, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return {success: true, filename: response.data.data[0].photo}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerResetOtp =async({email})=>{
    try {
        const response = await axios.post(`
            ${host}${authRoute}resent/verification/email`,
            {
                email
            }, 
            {

            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}
export const PartnerLoginToken =async({role, token}, stripped)=>{
    try {
        const response = await axios.post(
            // console.log(stripped)
            `${host}${authRoute}access/token/${stripped}`, 
            {
                role,
                token
            },
            {

            })
        const jwt = response.data.data.token
        jsCookie.set("jwt", jwt)
        // console.log(response.data
        return {success: true, message: "Successful Login"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}
export const PartnerLoginEmail =async(email, stripped)=>{
    try {
        const response = await axios.post(`
        ${host}${authRoute}access/${stripped}`,
        {
            email
        },
        {
            
        })
        const jwt = response.data.data.token
        jsCookie.set("jwt", jwt)
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerGenerateOtp =async(payload)=>{
    try {
        const response = await axios.post(
            `${host}${authRoute}access/${strip}`, 
            {
                payload
            },  
            {
                
            })
            return response.data
            
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}


export const PartnerSignupRoute =async({name, email, description, city, state, country})=>{
    try {

        const response = await axios.post(
            `${host}${authRoute}signup`, 
            {
                name, 
                email,
                description,
                city, 
                state,
                country
            })
            
        return response.data
    } catch(err){
        if (err.response){ return err; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerOffers =async(jwt)=>{
    try {
        const response = await axios.get(
            `${host}partner/offers`, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerRequests =async(jwt)=>{
    try {
        const response = await axios.get(
            `${host}partner/requests`, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerUniqueOffer =async(jwt, offer_id)=>{
    try {
        const response = await axios.get(`${host}partner/offer`, {params: {token: jwt, unique_id: offer_id}})
        
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerAddOffer =async(jwt, {name, discount, single, points, star})=>{
    try {
        const response = await axios.post(
            `${host}partner/offer/add`, 
            {
                name, 
                discount, 
                single, 
                points, 
                star
            },
            {
                headers: {"passcoder-access-token":jwt}}
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerDeleteOffer =async(jwt, unique_id)=>{
    try {
        await axios.delete(
            `${host}partner/offer`,             
            {
                data: {
                    unique_id
                },
                
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return {success: true, message: "Offer Successfully Deleted"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerUpdateOffer =async(jwt, unique_id, {name, discount, single, points, star})=>{
    try {
         await axios.put(
            `${host}partner/offer/update/details`, 
            {
                unique_id, 
                name, 
                discount, 
                single, 
                points, 
                star
            }, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return {success: true, message: "Successfully updated"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerAddUserToAnnouncementList =async(jwt,pid)=>{
    try {
        const response = await axios.post(
            `${host}partner/announcement/list/add/user`, 
            {
                pid
            }, 
            { 
                headers: {
                "passcoder-access-token": jwt
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerCreateAnnouncement =async(jwt,{title, description})=>{
    try {
        const response = await axios.post(
            `${host}partner/announcement/add`, 
            {
                title, 
                description
            }, 
            {
                headers: { 
                    "passcoder-access-token": jwt
                }
            }
        )
       
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}
export const PartnerGetAnnouncements =async(jwt)=>{
    try {
        const response = await axios.get(
            `${host}partner/announcements`, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerGetAnnouncement =async(jwt)=>{
    try {
        const response = await axios.get(
            `${host}partner/announcement`, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerActivateUser =async(jwt, pid, offer_unique_id)=>{
    try {
        const response = await axios.post(
            `${host}partner/user/offer/authentication`, 
            {
                pid, 
                offer_unique_id
            }, 
            {
                headers: { 
                    "passcoder-access-token": jwt
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerLoyaltyUsers =async(jwt)=>{
    try {
        const response = await axios.get(
            `${host}partner/app/users`, 
            {
                headers: { 
                    "passcoder-access-token": jwt 
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}

export const PartnerAddLoyaltyPoints =async(jwt, pid, points)=>{
    try {
        const response = await axios.post(
            `${host}partner/user/issue/loyalty/point`, 
            {
                pid,
                points
            }, 
            {
                headers: { 
                    "passcoder-access-token": jwt 
                }
            }
        )
        
        return {success: true, message: "Points Successfully added to User"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}

export const PartnerCheckoutLoyaltyPoints =async(jwt, pid, points)=>{
    try {
        const response = await axios.post(
            `${host}partner/user/checkout/loyalty/point`, 
            {
                pid, 
                points
            }, 
            {
                headers: { 
                    "passcoder-access-token": jwt 
                }
            }
        )
        
        return {success: true, message: "Points Successfully removed from User"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}


export const PartnerUpgrade =async(jwt)=>{
    try {
        const response = await axios.post(`${host}partner/app/users`, {}, {
        headers: { "passcoder-access-token": passcoder_access_key }})
        
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}

export const PartnerTransactions =async(jwt)=>{
    try {
        const response = await axios.get(
            `${host}partner/transactions`, 
            {
                headers: { 
                    "passcoder-access-token": jwt 
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}

export const PartnerAddToken =async(jwt, {alias, expiration, valid})=>{
    try {
        const response = await axios.post(
            `${host}partner/token/add`, 
            { 
                alias, 
                expiration,
                valid 
            }, 
            { 
                headers: { 
                    "passcoder-access-token": jwt 
                }
            })
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}

export const PartnerGetTokens =async(jwt)=>{
    try {
        const response = await axios.get(
            `${host}partner/tokens`, 
            {
                headers: { 
                    "passcoder-access-token": jwt 
                }
            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log("fatal error"); } 
        else { console.log('Error: ', err.message); }
    }
    // returns {success, message, data} on success

}


export const PartnerDeleteToken =async(jwt, unique_id)=>{
    try {
        const response = await axios.delete(
            `${host}partner/token`, 
            {
                data: {
                    unique_id
                },

                headers: {
                    "passcoder-access-token": jwt
                }
            },
            
        )
            
        
        return {success: true, message: "Token Deleted Successfully"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerUpdateTokenDetails =async(jwt,token_id, unique_id, {alias, description, valid})=>{
    try {
        const response = await axios.put(
            `${host}partner/token/update/details`,
            {
                token: token_id, 
                unique_id, 
                alias, 
                description, 
                valid}, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        
        return {success: true, message: "Token Updated Successfully"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerUpdateToken =async(jwt, unique_id, )=>{
    try {
        const response = await axios.put(
            `${host}partner/token/update/token`,
            {
                unique_id, 
            }, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        
        return {success: true, message: "Token Updated Successfully"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerUniqueToken = async(jwt, token )=>{
    try {
        const response = await axios.get(
            `${host}partner/token`, 
            { params: 
                {
                    token
                },
                
              headers: 
              {
                "passcoder-access-token": jwt
              }
            }
        )
        
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}



export const PartnersLogOut=()=>{
    jsCookie.remove("jwt")
    
}
