const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey'

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'Email already registered' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' })
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Login failed' })
  }
}















// const User = require('../models/User')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// exports.register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body
//     const existing = await User.findOne({ email })
//     if (existing) return res.status(400).json({ message: 'User already exists' })

//     const hash = await bcrypt.hash(password, 10)
//     const user = await User.create({ username, email, password: hash })

//     res.status(201).json({ message: 'Registered successfully' })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const user = await User.findOne({ email })
//     if (!user) return res.status(404).json({ message: 'User not found' })

//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })

//     res.status(200).json({ token, user: { id: user._id, username: user.username } })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }
