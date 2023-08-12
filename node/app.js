const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});
connection.query(`CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);`
);

app.get('/', (req, res) => {
    connection.query('INSERT INTO people (name) VALUES ("Wolney Carneiro")', (error, insertResult) => {
        if (error) throw error;
        connection.query('SELECT * FROM people', (error, selectResult) => {
            if (error) throw error;
            const peopleList = selectResult.map(person => `<li>${person.name}</li>`).join('');
            const htmlResponse = `
                <h1>Full Cycle Rocks!</h1>
                <h2>Lista de pessoas:</h2>
                <ul>
                    ${peopleList}
                </ul>
            `;
            res.send(htmlResponse);
        });
    });
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
