const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' })
  }
}

module.exports = auth


// import jwt from 'jsonwebtoken'

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization
//   const token = authHeader?.split(' ')[1]

//   if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' })

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = decoded
//     next()
//   } catch {
//     res.status(403).json({ message: 'Invalid token.' })
//   }
// }
