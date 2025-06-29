const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
  getProfile,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} = require('../controllers/userController')

router.get('/me', auth, getProfile)
router.get('/watchlist', auth, getWatchlist)
router.post('/watchlist', auth, addToWatchlist)
router.delete('/watchlist/:movieId', auth, removeFromWatchlist)

module.exports = router
