const path = require('path');
const express = require('express');

const app = express();
const pub_path  = path.join(__dirname, '../public');

app.use(express.static(pub_path));

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{console.log(`Listening on PORT:${PORT}`)});


