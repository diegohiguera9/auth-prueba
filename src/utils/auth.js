const jwt = require('jsonwebtoken')

exports.auth = (req,res,next) =>{
    try{
        const {authorization}  = req.headers

        const [_,token] = authorization.split(' ')

        //if (!token) return res.status(400).json({message:'no token'})
        if (!token) return res.status(400).send('No token provided')

        // jwt.verify(token,proces.env.SECRET_KEY,(err,user)=>{
        //     if (err) return res.status(400).json({message:'no valid token'})
        //     req.user = user.id
        //     next()
        // })

        const {id} = jwt.verify(token,process.env.SECRET_KEY)

        req.userId = id

        next()


    } catch(err){
        res.status(400).json({message:'something went wrong with token',data:err})
    }
}