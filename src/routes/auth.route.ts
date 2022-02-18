import {
  signup,
  protect,
  login,
  forgotPassword,
  updatePassword,
  resetPassword,
  logout,
} from '@controllers/index.controller'
import express from 'express'
const router = express.Router()
router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/forget-password').post(forgotPassword)
// we use patch because we need to change some fields
router.route('/reset-password/:token').patch(resetPassword)
router.route('/update-password').patch(protect, updatePassword)
router.route('/logout').delete(protect, logout)
export default router
