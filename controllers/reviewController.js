const Review = require('../models/Review.js'); // Use require instead of import

 const createReview = async (req, res) => {
  const { movieId, rating, comment } = req.body

  if (!movieId || !rating || !comment) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const review = await Review.create({
      user: req.user.id,
      movieId,
      rating,
      comment,
    })
    res.status(201).json(review)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to create review' })
  }
}

 const getReviewsByMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).populate('user', 'username')
    res.json(reviews)
  } catch {
    res.status(500).json({ message: 'Failed to load reviews' })
  }
}

 const updateReview = async (req, res) => {
  const { rating, comment } = req.body
  const reviewId = req.params.id

  try {
    const review = await Review.findById(reviewId)
    if (!review) return res.status(404).json({ message: 'Review not found' })

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    review.rating = rating
    review.comment = comment
    await review.save()

    res.json(review)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update review' })
  }
}

const deleteReview = async (req, res) => {
  const reviewId = req.params.id

  try {
    const review = await Review.findById(reviewId)
    if (!review) return res.status(404).json({ message: 'Review not found' })

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    await review.deleteOne()
    res.json({ message: 'Review deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete review' })
  }
}

module.exports = {
    createReview,
    getReviewsByMovie,
    updateReview,
    deleteReview
};