const express = require('express');
const router = express.Router();
const { messages } = require('./bot');

router.get('/', (req, res) => {
  res.json(messages);
});

module.exports = router;
