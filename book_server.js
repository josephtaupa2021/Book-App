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


app.get('/favBooks', function (req, res) {

    function run(func) {
        func();
    }

    function book1() {
        let count = 0;
        for (const title of users) {
            if (title.book === "Grow Rich") {
                count += 1;
            }
        }
        return `<div>${count}</div>`;
    }

    function book2() {
        let count = 0;
        for (const title of users) {
            if (title.book === "The Secret") {
                count += 1;
            }
        }
        return `<div>${count}</div>`;
    }
    function book3() {
        let count = 0;
        for (const title of users) {
            if (title.book === "Ben Carson") {
                count += 1;
            }
        }
        return `<div>${count}</div>`;
    }

    run(book1);
    run(book2);
    run(book3);

    res.send(`<body style="font-family: Arial, Helvetica, sans-serif;">
    <center>
        <h1>Book App</h1>
        <div>
            <p>Favourte Book</p>
        </div>
        <br>
        <table>
            <tr>
                <td>Grow Rich</td><td>${book1()}</td>
            <tr>
                <td>The Secret</td><td>${book2()}</td>
            <tr>
                <td>Ben Carson</td><td>${book3()}</td>
        </table>
        <div>
            <div>
    </center>
</body>
    `)
})


app.listen(9001, console.log('Listening on Port 9001'))
