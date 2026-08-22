const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getComplaintById,
} = require('../controllers/complaintController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Mount routes
// Note: /my must be defined before /:id so it doesn't get treated as an ID
router.route('/my')
  .get(authMiddleware, roleMiddleware('citizen'), getMyComplaints);

router.route('/')
  .post(authMiddleware, roleMiddleware('citizen'), createComplaint)
  .get(authMiddleware, roleMiddleware('admin'), getAllComplaints);

router.route('/:id')
  .get(authMiddleware, getComplaintById);

module.exports = router;
