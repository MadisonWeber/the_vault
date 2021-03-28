import jwt from 'jsonwebtoken'


const authorize = async (req, res) => {
    
        const token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded){
            return { id : decoded.id}
        }else{
            return null
        }
}



export default authorize