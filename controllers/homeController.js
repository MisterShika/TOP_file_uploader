async function getHome (req, res) {
    res.render("index",{
        email: req.user?.email || null,
        authenticated: req.isAuthenticated(),
    });
}

module.exports = {
    getHome
}