// controller-register.js
const config = require('../config/db');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    // Menampilkan form registrasi
    formRegister(req, res) {
        res.render("signup", {
            url: 'http://localhost:3000/',
        });
    },

    // Menyimpan data registrasi ke database
    saveRegister(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        
        if (username && password) {
            pool.getConnection(function(err, connection) {
                if (err) throw err;

                connection.query(
                    `INSERT INTO users (username, password) VALUES (?, SHA2(?, 512))`, 
                    [username, password], function (error, results) {
                        if (error) throw error;
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Registrasi berhasil');
                        res.redirect('/login');  // Arahkan ke halaman login setelah registrasi sukses
                    });
                connection.release();
            });
        } else {
            res.redirect('/signup');  // Kembali ke halaman signup jika data tidak lengkap
            res.end();
        }
    }
};
