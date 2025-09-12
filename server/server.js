const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const connections = require('./config/dbconfig')
const userRoute = require('./routes/user.Route')
const productRoute = require('./routes/products.Routes')
const bidsRoute = require('./routes/bids.Routes')
const notificationRoute = require('./routes/notification.Routes')

const port = process.env.PORT || 8080;

// serve local uploads in development
const uploadsPath = require('path').join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

// serve local images in development
const imagesPath = require('path').join(__dirname, 'images');
app.use('/images', express.static(imagesPath));

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/bids', bidsRoute);
app.use('/api/notifications', notificationRoute);

// Seed a single admin user if not exists
const UserModel = require('./models/user.model');
const bcrypt = require('bcrypt');
async function ensureAdminUserExists() {
  try {
    const existingAdmin = await UserModel.findOne({ role: 'admin' });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', salt);
      await UserModel.create({
        name: 'admin',
        email: process.env.ADMIN_EMAIL || 'admin@quicksell.com',
        password: hashed,
        role: 'admin',
        status: 'active'
      });
      console.log('Seeded default admin user -> email:', process.env.ADMIN_EMAIL || 'admin@quicksell.com');
    }
  } catch (e) {
    console.error('Failed seeding admin user:', e.message);
  }
}

// deployemnet configuration

const path = require('path');
__dirname=path.resolve();
// render deployment

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/client/build')));
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}

app.listen(port, async ()=> {
  console.log(`listening on port number ${port}`);
  await ensureAdminUserExists();
});