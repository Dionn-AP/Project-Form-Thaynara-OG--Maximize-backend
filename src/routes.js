const express = require('express');

import Usercontroller from './controllers/user';
import SentEmails from './controllers/sentEmails';
import Login from './controllers/login';
import authMiddleware from './middleware/middlewareLogin';

const router = express();

//user
router.post('/user', Usercontroller.createuser);
router.post('/login', Login.authenticate);

//sent emails
router.post('/sendmail', SentEmails.sendemail);

//authenticated routes
router.get('/user', authMiddleware, Usercontroller.getuser);