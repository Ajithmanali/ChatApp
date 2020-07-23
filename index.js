const express = require('express')
const app = express()
const port = 3080

app.use(express.static(__dirname+'/public'))


app.listen(port, () => console.log(`Chat app listening at http://localhost:${port}`))