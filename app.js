const express = require('express')
const app = express()
const port = 3000

app.set('view angine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})