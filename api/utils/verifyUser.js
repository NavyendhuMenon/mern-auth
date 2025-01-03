import jwt from 'jsonwebtoken'

export  const verifyToken = (req,res,next)=>{

    console.log("Iam in token verify");
    

    const token = req.cookies.access_token 

    if(!token){

        return res.status(401).json({error:"Access denied"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{

        if(err) return res.status(403).json("Token is not valid")

            req.user = user
            next()

    })

}


// Admin only access middleware
export const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).json({ error: "You do not have access to this resource" });
    }
  };