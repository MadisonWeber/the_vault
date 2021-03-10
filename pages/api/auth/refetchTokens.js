import jwt from 'jsonwebtoken'



const refetchTokens =  (req, res) => {
    try {
        
        console.log(req.headers)
        const refresh = req.headers.cookie.split('=')[1]
        console.log('cookie is', refresh)
        const valid = jwt.verify(refresh, process.env.JWT_REFRESH)
  
        const newToken = jwt.sign({id : valid.id}, process.env.JWT_SECRET)
        // const newRefresh = jwt.sign({id : valid.id}, process.env.JWT_REFRESH)
        
    
        return res.status(200).json({token : newToken})
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }

} 

export default refetchTokens 