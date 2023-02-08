const express = require('express');

const { createuser, getuser, replaymessage } = require('./controllers/user');
const { sendemail, viewmessages, messageread } = require('./controllers/sendEmails');
const { authenticate } = require('./controllers/login');
const MiddlewareLogin = require('./middleware/middlewareLogin');

const router = express();

//user
router.post('/user', createuser);
router.post('/login', authenticate);

//sent emails
router.post('/sendmail', sendemail);

router.use(MiddlewareLogin);

//authenticated routes
router.get('/user', getuser);
router.post('/replay', replaymessage);

router.get('/viewmessages', viewmessages);
router.patch('/messageread/:id', messageread);

module.exports = router;