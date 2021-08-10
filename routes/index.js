var express = require('express');
var router = express.Router();
var template = require('../lib/template')
var auth = require('../lib/auth')

router.get('/', (req, res) => {
  var html = template.html(
    `<h2>HOME</h2>`,
    auth.statusUI(req, res)
  );
  res.send(html);
});

module.exports = router;