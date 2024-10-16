const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users = [];
let nextId = 1;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if(!name || !email){
        res.status(400).json({error: 'name and email are required.'});
    }
    else{
        const newUser = {id: nextId++, name, email: email};
        users.push(newUser);
        res.status(201).json(newUser);
    }
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user){
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
    const user = users.find (u => u.id === parseInt(req.params.id));
    if (!user){
        return res.status(404).json({ error: 'User not found'});
    }

    const{name, email} = req.body;
    if(name) user.name = name;
    if(email) user.email = email;

    res.status(200).json(user);
});

app.delete('/users/:id', (req,res) =>{
    const userIndex = users.findIndex(u=> u.id === parseInt(req.params.id));
    if (userIndex === -1){
        return res.status(404).json({ error: 'User not found' });
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    res.status(204).send();
    /*json({ message: `User with ID ${deletedUser.id} successfully deleted`, deletedUser});*/
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing