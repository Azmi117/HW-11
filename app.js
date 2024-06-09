const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const routerUser = require('./routes/User.controller');
const routerTodo = require('./routes/Todo.controller');

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});


app.use(express.json());

app.use(routerUser);
app.use(routerTodo);


// app.listen(port, () => {
//     console.log(`Running on http://localhost:${port}`);
// })

module.exports = app