const express = require('express');
const cors = require('cors');
const connectDb=require('../backend/Config/db')
const regstrRoutes=require('./Routes/registerRoutes')
const adminRoutes=require('./Routes/adminroutes')
const emailRoutes=require('./Routes/registerRoutes')
const userRoutes=require('./Routes/userRoutes')

const app = express();
app.use(cors()); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
connectDb()

app.use('/api/regtr',regstrRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/user',emailRoutes)
app.use('/api/users',userRoutes)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



