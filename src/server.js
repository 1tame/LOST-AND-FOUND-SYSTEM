const express = require('express');
const connectDb = require('./config/dbconfig');
const userRoutes = require('./routes/user.routes');
const itemRoutes = require('./routes/item.routes');
const claimRoutes = require('./routes/claim.routes');
const errorHandler = require('./middleware/errorhandler');
const path = require("path");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;





// Serve static frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Optional: redirect unknown routes to index.html
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
app.get('/', (req, res) => {
  res.send('Hello World from /');
});*/


app.use(express.json());
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/claims', claimRoutes);
app.use('/uploads',express.static('uploads'));



app.use(errorHandler);

app.listen(port,  () => {
  console.log(`Server is running on port ${port}`);
});

const con = async () => {
  try {
    await connectDb();
  } catch (error) {
    console.error('DB Error:', error.message);
  }
};



con();


