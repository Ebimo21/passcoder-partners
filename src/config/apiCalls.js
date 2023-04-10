import axios from "axios"
import jsCookie from  "jscookie"
import { passcoder_access_key, host, authRoute} from "./configuration"
// my own

// const jwt= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX3VuaXF1ZV9pZCI6IkdvN3lkdzdrbDU2T3E3VERkTFlFIiwicGFydG5lcl91c2VyX3Rva2VuIjoiZTAyZGFmNjA4MDBlODYyMWJlZjY2OTE3OThmZmVkZjU5NTVkOTQzZCIsInBhcnRuZXJfbmFtZSI6IkFyaWEgQnJvd24gKEFwYXBhIHwgTGFnb3MpIiwicGFydG5lcl9yb2xlIjoiQURNSU4iLCJpYXQiOjE2Nzk5MzEyNDIsImV4cCI6MTY4MDUzNjA0Mn0.mnDSzzGdsqT65B6QM2SE1ZIf_S1oBEaJUSICmpGsGjM"
export let jwt = jsCookie.get('jwt')
// const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX3VuaXF1ZV9pZCI6Im9qcm9ySkxVeTVkZ3JUQlJORnVUIiwicGFydG5lcl91c2VyX3Rva2VuIjoiOTI3Zjk1MDAzNDM3ZTdkOWMxZmE0MDk4YjQ1ZGQ3MGM1NDk5NTNkZSIsInBhcnRuZXJfbmFtZSI6Ik5hb21pIEpvc2VwaCAoQXBhcGEgfCBMYWdvcykiLCJwYXJ0bmVyX3JvbGUiOiJBRE1JTiIsImlhdCI6MTY4MDI1MjM5NSwiZXhwIjoxNjgwODU3MTk1fQ.xjOras-lm6S3zd8GCtZW9Pt38c9TZ9rnsE5bzixS4rI"
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
export const Partner =async()=>{
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

export const PartnerMetrics =async()=>{
    try {
        const response = await axios.get(
            `${host}partner/metrics`, 
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
export const PartnerGetStripped =async()=>{
    try {
        const response = await axios.get(`
        ${host}partner/`, 
        {
            headers: {
                "passcoder-access-token": jwt 
            }})
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
export const PartnerDetail =async()=>{
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

export const PartnerVerifyOtp =async(otp)=>{
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
        const responseJWT = response.data.data.token
        jsCookie.set({
            name: "jwt",
            value: responseJWT,
        })
        jwt = jsCookie.get('jwt')
        return {success: true, data: response.data, message: response.data.message}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerUploadPhoto =async( photo, imagePath)=>{
    console.log(photo)
    try {
        const response = await axios.put(`
            ${host}partner/profile/photo`,
            {
                photo: photo,
                photo_file_ext: imagePath   }, 
            { 
                headers: {
                    "passcoder-access-token": jwt,
                    // 'Content-Type': 'multipart/form-data'

                }
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

export const PartnerUpdateEmail =async( email)=>{
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
export const PartnerComplianceCertificate =async( registration_certificate, imagePath)=>{
    try {
        const response = await axios.put(`
            ${host}partner/compliance/certificate`,
            { 
                registration_certificate:registration_certificate,
                registration_certificate_file_ext: imagePath
            }, 
            { 
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        console.log(response.data)
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerComplianceDocument =async( registration_document, imagePath)=>{
    try {
        const response = await axios.put(`
            ${host}partner/compliance/document`,
            { 
                registration_document: registration_document,
                registration_document_file_ext: imagePath,
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

export const PartnerComplianceMultipleDocuments =async( {registration_document, registration_certificate})=>{
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


export const PartnerUploadCover =async( cover)=>{
    try {
        const response = await axios.put(`${host}partner/profile/cover`,{ cover}, { headers: {"passcoder-access-token": jwt} })
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}
export const PartnerUpdateName =async( {name, state, city, country})=>{
    try {
        const response = await axios.put(`${host}partner/name`,{name, state, city, country}, {headers: {"passcoder-access-token": jwt}})
        return {success: true, message: "Partner Name updated Successfully"}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerUpdateThreshold =async( point_threshold)=>{
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
export const PartnerUpdateDescription =async( description)=>{
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

export const PartnerProofProfilePhoto =async( partner_unique_id)=>{
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
        return {success: true, filename: response.data}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerProofComplianceDocument =async( partner_unique_id)=>{
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

export const PartnerProof =async( partner_unique_id)=>{
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

export const PartnerResetOtp =async(email)=>{
    try {
        const response = await axios.post(`
            ${host}${authRoute}reset/token`,
            {
                email: email
            }, 
            {

            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerResendEmailVerificationToken =async(email)=>{
    try {
        const response = await axios.post(`
            ${host}auth/partner/resend/verification/email`,
            {
                email: email
            }, 
            {

            }
        )
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}
export const PartnerLoginToken =async({role, token}, stripped)=>{
    try {
        const response = await axios.post(
            `${host}${authRoute}access/token/${stripped}`, 
            {
                role,
                token
            },
            {

            })

            const responseJWT = response.data.data.token
        jsCookie.set({
            name: "jwt",
            value: responseJWT,
        })

        jwt = jsCookie.get('jwt')
        
        return {success: true, message: response.data.message}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, data: err.response.data.data, err}; }
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
        
        return {success: true, data: response.data}
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerGenerateOtp =async(payload, strip)=>{
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
            console.log(response);
        return response.data
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err, data: err.response.data};}
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerOffers =async()=>{
    try {
        const response = await axios.get(
            `${host}partner/offers`, 
            {
                headers: {
                    "passcoder-access-token": jwt
                }
            }
        )
        return response.data;
    } catch(err){
        if (err.response){ return {success: false, message: err.response.data.message, err}; }
        else if (err.request) { console.log(err.request); } 
        else { console.log('Error: ', err.message); }
    }
}

export const PartnerRequests =async()=>{
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

export const PartnerUniqueOffer =async(offer_id)=>{
    try {
        const response = await axios.get(`${host}partner/offer`, 
        {params: 
            { 
                unique_id: offer_id
            },
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

export const PartnerAddOffer =async({name, discount, start, limit, end, single, points, star})=>{
    try {
        const response = await axios.post(
            `${host}partner/offer/add`, 
            {
                name, 
                discount, 
                single, 
                points,
                limit, 
                star,
                start, 
                end
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

export const PartnerDeleteOffer =async(unique_id)=>{
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

export const PartnerUpdateOffer =async(unique_id, {name, discount, single, points, star})=>{
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

export const PartnerAddUserToAnnouncementList =async(pid)=>{
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

export const PartnerCreateAnnouncement =async({title, description})=>{
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
export const PartnerGetAnnouncements =async()=>{
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

export const PartnerGetAnnouncement =async()=>{
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

export const PartnerActivateUser =async(pid, offer_unique_id)=>{
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

export const PartnerLoyaltyUsers =async()=>{
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

export const PartnerAddLoyaltyPoints =async( pid, points)=>{
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

export const PartnerCheckoutLoyaltyPoints =async(pid, points)=>{
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


export const PartnerUpgrade =async()=>{
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

export const PartnerTransactions =async()=>{
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

export const PartnerAddToken =async({alias, expiration, valid})=>{
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

export const PartnerGetTokens =async()=>{
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


export const PartnerDeleteToken =async(unique_id)=>{
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

export const PartnerUpdateTokenDetails =async(token_id, unique_id, {alias, expiration, valid})=>{
    try {
        const response = await axios.put(
            `${host}partner/token/update/details`,
            {
                token: token_id, 
                unique_id, 
                alias, 
                expiration, 
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

export const PartnerUpdateToken =async(unique_id, )=>{
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

export const PartnerUniqueToken = async(token )=>{
    try {
        const response = await axios.get(
            `${host}partner/token`, 
            { 
            params: {
                token:token
            }  ,              
              headers: 
              {
                "passcoder-access-token": jwt,
                // "token": token,
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
    jsCookie.del("jwt")
    jwt = ""
}
