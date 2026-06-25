require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "HostelCare - Complaint Management System",
    message: "Backend API is running successfully."
  });
});

app.use('/api/complaints', userRouter);
app.use('/api/auth', authRoutes);

const mongo_url = process.env.MONGO_URI;
mongoose.connect(mongo_url).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error while connecting with mongodb", err);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});