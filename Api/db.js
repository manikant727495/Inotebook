const mongoose = require('mongoose')

const connectToMongo = ()=>{
    mongoose.connect('mongodb://localhost:27017/inotebook');
    mongoose.connection.on('connected',()=>{
        console.log('connected to database mongodb');
    });

    mongoose.connection.on('error',(err)=>{
        if(err)
        {
            console.log('error in db connectintio  '+err);
        }
    });
}

module.exports = connectToMongo;