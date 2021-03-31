(function (database){
    console.log('called in database.js')
    var sqlite3 = require('sqlite3').verbose();
    //var db = new sqlite3.Database('./app/database/homeautomation.db');
    var theDb = null;

    database.getDb = function(next){
        console.log('getdb called')
        if(!theDb){
            var data = new sqlite3.Database('./app/database/homeautomation.db',
                                            (err) => {
                                                if(err){
                                                    console.log('Error while creating db ' + err);
                                                    next(err,null);
                                                } else {
                                                    console.log('sending from theDb')
                                                    theDb = {
                                                        db:data
                                                    };
                                                    next(null,theDb)        
                                                }
                                            });
         //   theDb = {
            //     db:db
            // }
            //next(null, theDb)
        } else {
            next (null, theDb)
        }
    }
    
})(module.exports)