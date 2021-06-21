const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
  const token = req.header('auth-token')
  if (!token)
    return res
      .status(401)
      .json({ type: false, body: 'Access denied' })
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = { id: verified.id }
    next()
  } catch (err) {
    return res.status(401).json({ type: false, body: 'invalid token' })
  }
}
module.exports = auth
