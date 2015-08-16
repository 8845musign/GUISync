
module.exports = {
    proxy: {
        target: "df",
        middleware: function (req, res, next) {
            req.headers.authorization = "Basic ZmRzZjpzZGZzZA==";
            next();
        }
    }
};
