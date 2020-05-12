module.exports = {
    devServer: {
        before: function(app, server) {
            app.get('/data', function(req, res) {
                const result = { x: 1, y: "hello" };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            });
        }
    }
}