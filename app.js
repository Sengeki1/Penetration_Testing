const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Data'
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('MySQL Connected...')
})

app.post('/login', (req, res) => {
    console.log(req.body)
    const { username, password } = req.body
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Internal server error')
            throw err
        }

        if (results.length > 0) {
            res.send('Login successful!')
        } else {
            res.send('Invalid credentials')
        }
    })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})