var menu = require ('../jsonfile/menu.json')
var csv = require('csv-express');

module.exports = function(app, db) {

    app.get('/api/notes',(req,res) => {
        res.send(menu)
    });

    app.post('/notes',(req,res) => {
        res.send('Hello')
    })

    app.get('/api/csv', (req,res) => {
        res.send([
            ["a", "b", "c"],
            ["d", "e", "e"]
        ])
    })
}