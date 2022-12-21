const express = require('express')
const connectToMongo = require('./db')
const app = express();
const cors = require('cors');
const port = 5000;
app.use(express.json());
app.use(cors());//cross origin resource sharing
connectToMongo();

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,()=>{
    console.log("server running at port "+port);
})