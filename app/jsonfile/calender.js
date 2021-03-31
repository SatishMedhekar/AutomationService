(async function (data){
    var database = require('../data/database')

const monthDetail = {
    month: 'November',
    firstDayOfMonth: 'MONDAY',
    birthDays: [{ dayOfMonth: 10 },],
    totalDaysInThisMonth: 30
}

const event = [
    { name:'Arati',
      type:'b',
      date:'20/09/1978' 
    },
    { name:'Mridula',
      type:'b',
      date:'01/01/2006' 
    },
    { name:'Mayank',
      type:'b',
      date:'21/02/2010' 
    },
]


data.getCalenderDetail =  async function (next) {
    weekday = new Array('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FIRDAY', 'SATURDAY')
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')

    let sql = `SELECT * from calender`
    database.getDb(function(err, theDb){
        if(err){
            console.log('Error: getCalenderDetail select calender query ' + err.message);
        } else {
                theDb.db.all(sql, (err, row) => {
                if(err){
                    console.log('Error: getCalenderDetail Get request ' + err.message)
                }   
                var thisMonthEvent = row.filter(a=> new Date(a.date).getMonth() == new Date().getMonth()).map(b=>b)
                var date = new Date();
                
                var calender = {
                    event: thisMonthEvent,
                    currentMonth:{
                        month: months[date.getMonth()],
                        firstDayOfMonth: weekday[date.getDay()-1],
                        birthDays: [{ dayOfMonth: 10 },],
                        totalDaysInThisMonth: new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()
                    }
                }
                console.log (`Calender -> ${JSON.stringify(calender)}`)         
                next(null, row)
            })
        }
    })
 };


data.getCalenderFromJson =  async function(next) {
        calender = {
            events: event,
            currentMonth:{
                month: 'November',
                firstDayOfMonth: new Date(date.getFullYear(), date.getMonth(), 1),
                birthDays: [{ dayOfMonth: 10 },],
                totalDaysInThisMonth: 30
            }
        }
        next(null, calender);
    }

    data.getcalenderMonth =  async function(next) {
        next(null, monthDetail);
    }


})(module.exports)