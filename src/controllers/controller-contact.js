const config = require('../config/db'); // Koneksi ke database

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
})

module.exports = {
    getContact(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM contacts;', function (error, results) {
                if (error) throw error;

                 // Log to debug
                console.log('Results: ', results);
                
                // Check if results contains any data
                if (results.length > 0) {
                    res.render('contact', {
                        url: 'http://localhost:3000/',
                        contacts: results, // Pass the contacts data to the view
                        showNavbar: true, // Tambahkan ini untuk mendefinisikan showNavbar
                        currentPage: 'contact' // Tambahkan ini untuk menandai halaman yang aktif
                    });
                } else {
                    res.render('contact', {
                        url: 'http://localhost:3000/',
                        contacts: [], // Pass an empty array if no data
                        showNavbar: true, // Tambahkan ini untuk mendefinisikan showNavbar
                        currentPage: 'contact' // Tambahkan ini untuk menandai halaman yang aktif
                    });
                }
            });
            connection.release();
        });
    },
    formContact(req,res){
        res.render("addContact",{
            url : 'http://localhost:3000/',
        });
    },
    saveContact(req, res) {
        let { name, email, phone, address } = req.body;
        console.log(name, email, phone, address); 
        if (name && email && phone && address) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?);`,
                    [name, email, phone, address], 
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil disimpan');
                        res.redirect('/contact');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },  
    editContact: (req, res) => {
        const { id } = req.params;
        const query = 'SELECT * FROM contacts WHERE id = ?';
        pool.query(query, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving contact');
            }
            if (results.length === 0) {
                return res.status(404).send('Contact not found');
            }
            res.render('/contact', { contact: results[0] });
        });
    },

    updateContact: (req, res) => {
        const { id } = req.params;
        const { name, email, phone, address } = req.body;
        const query = 'UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?';
        pool.query(query, [name, email, phone, address, id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating contact');
            }
            res.redirect('/contact');
        });
    },

    deleteContact: (req, res) => {
        const { id } = req.params;
        const query = 'DELETE FROM contacts WHERE id = ?';
        pool.query(query, [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error deleting contact');
            }
            res.redirect('/contact');
        });
    }
};