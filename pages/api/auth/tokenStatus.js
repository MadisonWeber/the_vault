import jwt from 'jsonwebtoken'

const tokenStatus = (req, res) => {
    try {

        //Check if Refresh is almost expired
       
        const refresh = req.headers.cookie.split('=')[1]
        const refreshDecoded = jwt.verify(refresh, process.env.JWT_REFRESH)
        const refreshMinsToExpire = ((Date.now()/ 60000) - ((refreshDecoded.exp * 1000 / 60000))) * -1
        console.log('refresh time until expire =', refreshMinsToExpire)
        if(refreshMinsToExpire < 10) return res.status(401).json({msg : 'refresh'})
        

        //Check if token is almost expired

        const token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const minsToExpire = ((Date.now()/ 60000) - ((decoded.exp * 1000 / 60000))) * -1
        if(minsToExpire < 10) return res.status(401).json({msg : 'token needed'})
        
        console.log('time until expiry = ', minsToExpire)
        return res.status(200).json({msg : "ok"}) 


    } catch (error) {
        return res.status(403).json({msg : error.message})
    }

}

export default tokenStatus