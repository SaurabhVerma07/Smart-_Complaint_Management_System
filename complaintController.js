const Complaint = require('../models/Complaint');

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private (Citizen only)
const createComplaint = async (req, res) => {
  try {
    const { title, category, description, location, priority } = req.body;

    // Generate a human-friendly complaintId (e.g., C-1001)
    // Find the latest complaint to determine the next ID
    const latestComplaint = await Complaint.findOne().sort({ createdAt: -1 });
    let nextIdNumber = 1000;
    if (latestComplaint && latestComplaint.complaintId && latestComplaint.complaintId.startsWith('C-')) {
      const currentNumber = parseInt(latestComplaint.complaintId.replace('C-', ''), 10);
      if (!isNaN(currentNumber)) {
        nextIdNumber = currentNumber + 1;
      }
    }
    const complaintId = `C-${nextIdNumber}`;

    const complaint = await Complaint.create({
      complaintId,
      title,
      category,
      description,
      location,
      priority: priority || 'Medium',
      submittedBy: req.user.id,
      status: 'Pending',
      timeline: [
        {
          status: 'Pending',
          date: Date.now(),
          note: 'Complaint submitted',
        },
      ],
    });

    res.status(201).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get logged in citizen's complaints
// @route   GET /api/complaints/my
// @access  Private (Citizen only)
const getMyComplaints = async (req, res) => {
  try {
    const { status, category } = req.query;
    
    let query = { submittedBy: req.user.id };
    
    if (status) query.status = status;
    if (category) query.category = category;

    const complaints = await Complaint.find(query).sort({ dateSubmitted: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private (Admin only)
const getAllComplaints = async (req, res) => {
  try {
    const { status, category, assignedTo } = req.query;
    
    let query = {};
    
    if (status) query.status = status;
    if (category) query.category = category;
    if (assignedTo) query.assignedTo = assignedTo;

    const complaints = await Complaint.find(query)
      .populate('submittedBy', 'name email')
      .populate('assignedTo', 'name')
      .sort({ dateSubmitted: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get a single complaint by ID
// @route   GET /api/complaints/:id
// @access  Private (Any authenticated role)
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('submittedBy', 'name email')
      .populate('assignedTo', 'name');

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    // Role-based access control
    if (req.user.role === 'citizen') {
      // Ensure the citizen is the owner of the complaint
      // Populated submittedBy is an object, so compare _id
      if (complaint.submittedBy._id.toString() !== req.user.id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized to view this complaint' });
      }
    }

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getComplaintById,
};
