const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const userCollection = client.db('social-media-app').collection('users');

        // All operations related to posts

        // Saving post in the db
        app.post('/posts', async (req, res) => {
            const data = req.body;
            const result = await postCollection.insertOne(data);
            res.send(result);
        });

        // Getting all the posts
        app.get('/posts', async (req, res) => {
            const posts = await postCollection.find({}).toArray();
            res.send(posts);
        });

        // Getting info of a specific post
        app.get('/posts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const post = await postCollection.findOne(query);
            res.send(post);
        });

        // for adding like on a post 
        app.patch('/posts/:id', async (req, res) => {
            const id = req.params.id;
            const updateInfos = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    like: updateInfos
                }
            }
            const result = await postCollection.updateOne(filter, updateDoc, options)
            res.send(result);
        });


        // All operations related to user

        // saving user to the database
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        // User collection 

        // Getting the logged in user info
        app.get('/users', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            res.send(user);
        });

        // Updating user informaitons
        app.patch('/users', async (req, res) => {
            const email = req.query.email;
            const updateInfos = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateInfos.name,
                    address: updateInfos.address,
                    university: updateInfos.university
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
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