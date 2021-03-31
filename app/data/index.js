(async function (data){
    console.log('Called in index.js')
    var database = require('./database')
    var calendarfun = require('../jsonfile/calender')

    data.demo =  async function(next) {
        var a = 'a'
        next(null, a);
    }

    function createTables(){
        database.getDb(function(err, theDb){
            if(err){
                console.log('Error: createTables ' + err.message);
            } else {
                theDb.db.run('CREATE TABLE IF NOT EXISTS calender(id INTEGER PRIMARY KEY AUTOINCREMENT, type text not null, name text not null, date not null);', function(err){
                    if(err){
                        return console.log('Error creating calender table ' + err.message)
                    }
                    console.log('Table Created')
                });
            }
        })  
    } 
    function seedDatabase(){
        console.log('seedDatabase function called')
        database.getDb(function(err, theDB){
            if(err){
                console.log('Failed to load database ' + err);
            } else {
                theDB.db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, 'calender', (err, row) => {
                    if(err){
                        console.log('Calender table does not exists')
                    } else {
                        theDB.db.all(`SELECT Count(*)  as total from calender`, (err, row) => {
                            console.log(`rows ${JSON.stringify(row)}`)
                            if(row.map(a=>a.total) > 0){
                                console.log('record exit no insert made to calender table')
                                return;
                            } else {
                                calendarfun.getCalenderFromJson(function(err,result){
                                    console.log(JSON.stringify(result)) 
                                    console.log(`Inserting ${JSON.stringify(result)}`)
                                    result.events.forEach(event => {
                                        
                                        theDB.db.run('INSERT INTO calender(type, name, date) VALUES (?, ?, ?)', event.type, event.name, event.date,(err) => {
                                         if (err){
                                            console.log('Error inserting Calender entry ' + err)
                                         } else {
                                             console.log('Insert completed successfully')
                                         }
                                     });
                                    });
                                });

                            }

                        });
                    }
                });
            }
        })
    }

    createTables();
    seedDatabase();
})(module.exports)