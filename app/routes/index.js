const noteRoutes = require('./node_routes');

module.exports = function(app,db){
    console.log('route called')
    noteRoutes(app,db);
}