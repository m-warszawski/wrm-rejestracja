const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:4200',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());

// Połączenie z bazami danych
const Datastore = require('nedb')

const wizyty = new Datastore({
    filename: 'databases/visits.db',
    autoload: true
});

const badania = new Datastore({
    filename: 'databases/tests.db',
    autoload: true
});

const pacjenci = new Datastore({
    filename: 'databases/patients.db',
    autoload: true
});

// --> Obsługa rejestracji na badania
app.post("/add-test", function (req, res) {
    console.log(req.body)
    res.send("Pod tym adresem można dodać nową rejestrację na badanie")
})

app.get('/get-test', (req, res) => {
    console.log(req.query) 
    res.send("Pod tym adresem można pobrać dane o rejestracji na badanie")
});

app.get('/remove-test', (req, res) => {
    console.log(req.query) 
    res.send("Pod tym adresem można usunąć rejestrację na badanie")
});

// --> Obsługa rejestracji na wizyty
app.post("/add-visit", function (req, res) {
    console.log(req.body)
    res.send("Pod tym adresem można dodać nową rejestrację na wizytę")
})

app.get('/get-visit', (req, res) => {
    console.log(req.query) 
    res.send("Pod tym adresem można pobrać dane o rejestracji na wizytę")
});

app.get('/remove-visit', (req, res) => {
    console.log(req.query) 
    res.send("Pod tym adresem można usunąć rejestrację na wizytę")
});

// --> Obsługa logowania
app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log('Username:', username);
    console.log('Password:', password);

    pacjenci.count({ username: username, password: password},  function (err, count) {
        if(count === 1){
            res.send(true);
        }
        else{
            res.send(false);
        }
    });
})

// app.get('/logout', (req, res) => {
//     // console.log(req.query)
//     res.send("Pod tym adresem można wylogować się z systemu")
// });

// Nasłuchiwanie na porcie 3000
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});

