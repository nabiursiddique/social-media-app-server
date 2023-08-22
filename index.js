const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7t8vw3l.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const postCollection = client.db('social-media-app').collection('all-posts');

        // Saving post in the db
        app.post('/posts', async (req, res) => {
            const data = req.body;
            console.log(data);
        })

        // Getting all the posts
        app.get('/posts', async (req, res) => {
            const posts = await postCollection.find({}).toArray();
            res.send(posts);
        });
    }
    finally {

    }
}
run().catch(console.dir);



// For testing the server
app.get('/', async (req, res) => {
    res.send("Social Media app is running");
});

app.listen(port, () => {
    console.log(`Social Media app is running on port ${port}`)
});