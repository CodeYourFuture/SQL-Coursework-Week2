const express = require('express');
const app = express()


app.get('/', (req, res) => {
    res.send('app is working')
})
module.exports = app