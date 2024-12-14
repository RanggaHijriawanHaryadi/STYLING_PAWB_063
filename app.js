const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const flash = require("req-flash");

const loginRoutes = require('./src/routes/router-login'); // Pastikan ini mengarah ke router-login.js
const registerRoutes = require('./src/routes/router-register');
const homeRoutes = require('./src/routes/router-home');
const contactRoutes = require('./src/routes/router-contact');
const todoRoutes = require('./src/routes/router-todo');

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "t@1k0ch3ng",
        name: "secretName",
        cookie: {
            sameSite: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views')); // Tentukan path ke folder views


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secretname', // Ganti dengan secret yang aman
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(flash());

// Rute untuk halaman root yang mengarah ke /login

// Routes
app.use('/login', loginRoutes); // Menggunakan loginRoutes sebagai router utama
app.use('/signup', registerRoutes);
app.use('/', homeRoutes);
app.use('/contact', contactRoutes);
app.use('/todo', todoRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
