import express from 'express';
import https from 'https';
import fs from 'fs';
import posts from './routes/post.mjs';
import users from './routes/user.mjs';
import profileRoutes from './routes/profile.mjs';
import paymentRoutes from './routes/payment.mjs';
import transactionsRoutes from './routes/transactions.mjs';
import cors from 'cors';
import { profile } from 'console';

const PORT = 3001;
const app = express();

const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem'),
};

app.use(cors());
app.use(express.json());

// Middleware to set headers for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

// Mount routers
app.use("/post", posts);  
app.use("/user", users);  
app.use("/profile", profileRoutes);        
app.use("/payment", paymentRoutes);          
app.use("/transactions", transactionsRoutes); 

// Create and start the HTTPS server
let server = https.createServer(options, app);
console.log(`Server running on port ${PORT}`);
server.listen(PORT);
