import jwt from "jsonwebtoken"
export const Sign=({payload})=>{
    const token =jwt.sign(payload,process.env.SIGNATURE)
    return token

}
export const Verify=({payload}={})=>{
    const token =jwt.verify(payload,process.env.SIGNATURE)
    return token

}

