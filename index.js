const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();


const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//database connection here

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9rpk71q.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

async function run() {
    try {
        const TaskPostCollection = client.db("Job").collection("TaskCollection");
        
        
        
        app.post('/add-task', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await TaskPostCollection.insertOne(user);
            console.log(result);
            res.send(result);
        });
        app.get('/all-tasks', async (req, res) => {
            const query = {}
            const alltasks = await TaskPostCollection.find(query).toArray();
            res.send(alltasks);
            
        })
        

        

        
    }
    finally {
        
    }
}

run().catch(err => console.log(err))


app.get('/', async (req, res) => {
    res.send('Used Mobile Deal server is running');
})

app.listen(port, () => console.log(`Used Mobile Deal running on ${port}`))