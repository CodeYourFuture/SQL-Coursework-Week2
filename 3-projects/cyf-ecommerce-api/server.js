const express = require('express');


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Router route
app.use('/', require('./routes/api/ecommerce'));

const listener = app.listen(PORT, () => {
  console.log(`Server started on port: ${listener.address().port}`)
});