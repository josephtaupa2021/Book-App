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
    return `<tr><td>${data.name}</td><td>${data.book}</td></tr>`;
}

app.get('/allBooks', function (req, res) {
    res.send(`
            <style>
                table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
            }
            th, td {
                padding: 15px;
            }
            </style>
            <body style="font-family: Arial, Helvetica, sans-serif;">
            <center>
                    <h1>Book App</h1>
                    <div><p>All Books</p></div>
                    <br>
                    <table style="width:50%">
                        <tr><th>User</th><th>Books</th></tr>
                        ${users.map(readerTemp).join('')}
                    </table>
            </center>
            </body>`)
})

app.get('/favBooks', function (req, res) {

    function book1() {
        let count = 0;
        for (const title of users) {
            if (title.book === "Grow Rich") {
                count += 1;
            }
        }
        return count;
    }

    function book2() {
        let count = 0;
        for (const title of users) {
            if (title.book === "The Secret") {
                count += 1;
            }
        }
        return count;
    }
    function book3() {
        let count = 0;
        for (const title of users) {
            if (title.book === "Ben Carson") {
                count += 1;
            }
        }
        return count;
    }

    function favBook() {
        if (book1() > book2() && book1() > book3()) {
            return "Grow Rich"
        }
        else if (book2() > book1() && book1() > book3()) {
            return "The Secret"
        }
        else if (book3() > book1() && book1() > book2()) {
            return "Ben Carson"
        }
        else {
            return "None"
        }
    }

    res.send(`
    <style>
        table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        }
        th, td {
        padding: 15px;
        }
    </style>
    <body style="font-family: Arial, Helvetica, sans-serif;">
    <center>
        <h1>Book App</h1>
        <div>
            <p>Favourte Book</p>
        </div>
        <br>
        <table style="width:50%">
            <tr><th>Books</th><th>Count</th></tr>
            <tr><td>Grow Rich</td><td>${book1()}</td></tr>
            <tr><td>The Secret</td><td>${book2()}</td></tr>
            <tr><td>Ben Carson</td><td>${book3()}</td></tr>
        </table>
        <br><p>The favourite book is: ${favBook()}</p>
    </center>
</body>
    `)
})


app.listen(9001, console.log('Listening on Port 9001'))
