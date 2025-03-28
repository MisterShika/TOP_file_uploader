async function getHome (req, res) {
    res.render("index",{
        userId: req.user?.id || null,
        email: req.user?.email || null,
        authenticated: req.isAuthenticated(),
    });
}

module.exports = {
    getHome
}