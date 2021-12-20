const isAdmin = (req, res, next) => {
    if (!req.session.User || req.session.User.role != 1)
        return res.redirect("/admin/login");
    next()
}

const isDoctor = (req, res, next) => {
    if (!req.session.User || (req.session.User.role != 1 && req.session.User.role != 2))
        return res.redirect("/admin/login");
    next()
}

const isUser = (req, res, next) => {
    if (!req.session.User)
        return res.redirect("/login");
    next()
}

module.exports = {
    isAdmin,
    isDoctor,
    isUser
  };
  