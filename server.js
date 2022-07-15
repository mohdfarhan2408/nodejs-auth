const express = require('express');
const app =  express();
const bcrypt = require('bcrypt');


app.use(express.json())


const users = []; //data


//GET
app.get('/users', (req,res) => {
    res.json(users)
})

//POST

//Register
app.post('/users', async(req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10) //10 is salt
        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user) // push user data name and pwd to users.array
        res.status(201).send()  // if success, send this status 
    } catch {
        res.status(500).send() //if failed send this status
    }
})

//LOG-IN
app.post('/users/login', async(req,res) => {

    // name
    const user = users.find(user => user.name = req.body.name) //find in users.array, the array.name = body.name (in client side/what wrote by user)
    if (user == null) { //if can't find the user
        return res.status(400).send('Cannot find user') //return this status
    }

    //password
    try {
         //compare password to log in with hashed password
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success') //if success, send this status
        } else {
            res.send('Not allowed') // if failed/not correct, send this status
        }
    } catch {
        res.status(500).send() // if there's any error on user, not us
    }
})

app.listen(3000, () => console.log('Run in port 3000'))


/// try and catch method:
//try {put anything that possibly could go wrong}
// catch {if wrong, what error/statu that you want to send?}