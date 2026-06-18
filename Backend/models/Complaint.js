const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  complaintType: String,
  status: { 
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: 'pending' 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }, 
  updates: [
    {
      message: String,
      date: Date
    }
  ]}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);