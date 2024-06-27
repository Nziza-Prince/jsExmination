const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Contacts")
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  credentials: true, // Allows credentials like cookies to be passed in CORS requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify which HTTP methods are allowed
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify which headers are allowed in requests
};

app.use(cors(corsOptions));

// Mongoose schema definition
const formDataSchema = new mongoose.Schema({
    title: String,
    firstName: String,
    lastName: String,
    position: String,
    company: String,
    business: String,
    employees: String,
    street: String,
    additional: String,
    zip: String,
    place: String,
    country: String,
    code: String,
    phone: String,
    email: String,
    checkbox: Boolean,
});

const FormData = mongoose.model('FormData', formDataSchema);

// Parse JSON bodies
app.use(express.json());

// POST route for form submission
app.post('/submit', (req, res) => {
    const formData = new FormData(req.body);
    formData.save()
        .then(() => {
            res.json({ message: 'Form submitted successfully' });
        })
        .catch(err => {
            console.error('Error saving form data:', err);
            res.status(500).json({ message: 'Error submitting form' });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
