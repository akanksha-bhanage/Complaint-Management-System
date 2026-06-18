const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
    try {
        const newComplaint = new Complaint({
          title: req.body.title,
          description: req.body.description,
          date: req.body.date,
          complaintType: req.body.complaintType,
          userId: req.user.id
        });
        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getPendingComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ status: "pending" });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getResolvedComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ status: "resolved" });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.assignComplaint = async (req, res) => {
  try {
    const { staffId } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.assignedTo) {
      return res.status(400).json({ message: "Complaint already assigned" });
    }

    complaint.assignedTo = staffId;
    complaint.status = "in-progress";

    await complaint.save();

    res.json({ message: "Assigned successfully", complaint });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAssignedComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedTo: req.user.id
    });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, message } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Not found" });
    }

    if (complaint.status === "resolved") {
      return res.status(400).json({ message: "Complaint already resolved" });
    }

    // Only assigned staff can update
    if (complaint.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Status rule
    if (complaint.status === "in-progress" && status === "pending") {
      return res.status(400).json({ message: "Invalid status change" });
    }

    // Only allow specific flow
    if (status !== "resolved" && status !== "in-progress") {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Message compulsory
    if (!message) {
      return res.status(400).json({ message: "Description required" });
    }

    complaint.status = status;

    // Add progress update
    complaint.updates.push({
      message,
      date: new Date()
    });

    await complaint.save();

    res.json({ message: "Updated successfully", complaint });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.user.id
    });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("userId", "name email")
      .populate("assignedTo", "name email");

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}