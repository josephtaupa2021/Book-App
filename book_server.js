// const { count } = require('console');
const express = require('express')
const app = express()
const path = require('path')
app.use(express.static(__dirname + '/public'))

let users = [];
// let count = 0;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/book_index.html')
})

app.get('/createUser', function (req, res) {
    let reader = {
        name: req.query.name,
        book: req.query.book
    }
    users.push(reader)
    res.status(201).redirect('/')
})

function readerTemp(data) {
    return `<table>
                    <tr><td>${data.name}</td><td>${data.book}</td></tr>
            </table>`;
}

app.get('/allBooks', function (req, res) {
    res.send(`
            <body style="font-family: Arial, Helvetica, sans-serif;">
            <center>
                    <h1>Book App</h1>
                    <div><p>All Books</p></div>
                    <br>
                    <table>
                        <tr><th>User</th><th>Books</th></tr>
                        <tr>${users.map(readerTemp).join('')}</tr>
                    </table>
            </center>
            </body>`)
})

function run(func) {
    func();
}

function book1() {
    let count = null;
    for (let i = 0; i < users.length; i++) {
        const title = users[i].book;
        if (title === "Grow Rich") {
            return count += 1;
        }
    }
}
function book2() {
    let count = null;
    for (let i = 0; i < users.length; i++) {
        const title = users[i].book;
        if (title === "The Secret") {
            return count += 1;
        }
    }
}
function book3() {
    let count = null;
    for (let i = 0; i < users.length; i++) {
        const title = users[i].book;
        if (title === "Ben Carson") {
            count += 1;
        }
        return count;
    }
}

app.get('/favBooks', function (req, res) {
    res.send(`<body style="font-family: Arial, Helvetica, sans-serif;">
    <center>
        <h1>Book App</h1>
        <div>
            <p>Favourte Book</p>
        </div>
        <br>
        <table>
            <tr>
                <td>Grow Rich</td><td>${run(book1)}</td>
            <tr>
                <td>The Secret</td><td>${run(book2)}</td>
            <tr>
                <td>Ben Carson</td><td>${run(book3)}</td>
        </table>
        <div>
            <div>
    </center>
</body>
    `)
})


app.listen(9001, console.log('Listening on Port 9001'))
