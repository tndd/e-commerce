const bodyParser = require('body-parser')
const app = require('express')()
const { query, validationResult } = require('express-validator')

app.use(bodyParser.json())

app.get('/test_get',[
  query('q').isString().isLength({min: 8, max: 8})
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({
    query: req.query
  })
})

module.exports = app