import {
  signup,
  protect,
  login,
  forgotPassword,
  updatePassword,
  resetPassword,
} from '@controllers/authController'
import express from 'express'
const router = express.Router()
router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/forget-password').post(forgotPassword)
// we use patch because we need to change some fields
router.route('/reset-password/:token').patch(resetPassword)
router.route('/update-password').patch(protect, updatePassword)

export default router
