const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// For testing the server
app.get('/', async (req, res) => {
    res.send("Social Media app is running");
});

app.listen(port, () => {
    console.log(`Social Media app is running on port ${port}`)
});