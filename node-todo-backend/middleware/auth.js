import jsonwebtoken from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
   try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) return res.status(401).json({ error: "No token provided"})
    
        const decoded = jsonwebtoken.verify(token, process.env.JWT_ACCESS_SECRET)
        req.user = { id: decoded.userId }
    
        next()
   } catch {
        return res.status(403).json({error: "Invalid or expired token"})
   }
}

