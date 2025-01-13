const express = require('express');
const app = express();
app.get('/health', (req, res) => res.send('OK'));
app.listen(5002, () => console.log('Bridge running on port 5002'));
