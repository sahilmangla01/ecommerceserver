const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
const route = require('./Router/routeComponent')
const connectToDb = require('./connection')
require('dotenv').config()


app.use(cors({
    origin:"*"
}))
app.use(express.json())


app.use('/', route )
app.get('/', (req, res) => res.send('Hello World!'))
const startconnection=async ()=>{
    try{
        await connectToDb(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    }
    catch(err){
        console.log(err);
    }
}

startconnection()



