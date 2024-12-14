module.exports = {
    // Middleware untuk memeriksa apakah pengguna sudah login
    isLogin(req, res, next) {
        if (req.session.loggedin === true) {
            next(); // Jika sudah login, lanjut ke handler berikutnya
        } else {
            req.session.destroy(function(err) {
                // Jika belum login, arahkan ke halaman login
                res.redirect('/login');
            });
        }
    },
    // Middleware untuk memeriksa apakah pengguna belum login
    isLogout(req, res, next) {
        if (req.session.loggedin !== true) {
            next(); // Jika belum login, lanjut ke handler berikutnya
        } else {
            // Jika sudah login, arahkan ke halaman utama
            res.redirect('/');
        }
    }
};
