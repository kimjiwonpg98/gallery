const express = require('express');
const router = express.Router();

//routes
//home
router.get('/', (req, res) => {
    res.redirect('/contacts');
});

module.exports = router;