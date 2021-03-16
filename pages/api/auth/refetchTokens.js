import jwt from 'jsonwebtoken'


const refetchTokens =  (req, res) => {

    /// Check time left on token every so often

    try {
        
        const refresh = req.headers.cookie.split('=')[1]
        const valid = jwt.verify(refresh, process.env.JWT_REFRESH)
        const newToken = jwt.sign({id : valid.id}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRY_TIME})
   
        return res.status(200).json({token : newToken})
    } catch (error) {
        
        return res.status(500).json({msg : error.message})
    }
} 

export default refetchTokens 