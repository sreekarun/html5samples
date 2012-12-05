var express = require('express'),
    fs = require('fs'),
    app = express();

app.get('/index.html', function (req, res) {
    fs.readFile('../client/index.html', function (err, data) {
        if (err) {
          return res.end('Error loading index.html');
        }
        res.end(data);
    });
});

app.get('/todoapp.manifest', function (req, res) {
    console.log('manifest');
    fs.readFile('../client/todoapp.manifest', function (err, data) {
        if (err) {
          return res.end('Error loading todoapp.manifest');
        }
        res.setHeader('Content-Type', 'text/cache-manifest');
        res.end("CACHE MANIFEST");
    });
});

app.use('/css', express.static('../client/css')); //servers static files
app.use('/js', express.static('../client/js')); //servers static files

app.listen(2000, 'localhost');