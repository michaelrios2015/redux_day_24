const { syncAndSeed, models: { User }} = require('./db');
const express = require('express');
const path = require('path');

const app = express();
// our static directories --- these guys never change 
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '../index.html')));

app.get('/api/users', async(req, res, next)=> {
    try{
        res.send(await User.findAll({
            attributes: {
                exclude: ['bio']
            }
        }));
    }
    catch(ex){
        next(ex);
    }
});


app.post('/api/users', async(req, res, next)=> {
    try{
        res.send(await User.createRandomUser());
    }
    catch(ex){
        next(ex);
    }
});

app.get('/api/user/:id', async(req, res, next)=> {
    try{
        res.send(await User.findByPk(req.params.id));
    }
    catch(ex){
        next(ex);
    }
});


const init = async()=> {
    try {
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
        console.log(ex)
    }
};

init();