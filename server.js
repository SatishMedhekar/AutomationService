const express     = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const cors = require('cors');
var socket = require('socket.io');
var request = require('request');
//var menu = require('./app/jsonfile/westher.js');
var weatherJson = require('./app/jsonfile/weather.js')
//var calenderjson = require('./app/jsonfile/calender.js')
var calendarfun = require('./app/jsonfile/calender')
var data = require('./app/data')


const app         = express();
const port        = 8808;

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}))
require('../AutomationService/app/routes')(app,{});
var server = app.listen(port, () => {
    console.log("We are listening on port " + port);
})

var io = socket(server)
var m = 'hello';
var weatherjson = new weatherJson();
var date = new Date();
var currentDate = '';

//var calenderjson = new calenderjson();
    // setInterval(() =>{
    // io.sockets.emit('message',m)
    // console.log(m);
    // },1000);


        
io.on('connection', function(socket){
    console.log('made socket connection');
   
    socket.on('disconnect',function(){
        console.log('user disconnected');
    })

    //Call the weather app on start of the program
    console.log('currentDate ' + currentDate)
    if (currentDate == ''){
        console.log('Sending weather data On start of the program');
        var newDate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
        currentDate = newDate;
        request('http://api.weatherapi.com/v1/current.json?key=12be296723724de9950110956212903&q=sydney&aqi=yes', function(error, response, body){
            if(!error && response.statusCode === 200){
                console.log('Demo google response on start of the program ' + body);
            }
        })
        io.sockets.emit('message',weatherjson.getWeather(cntr));
    }

var cntr = 1;
    //socket.on('message', () => {
        setInterval(() =>{
            console.log('Inside weather io...')
        //io.sockets.emit('message',weatherjson.getWeather(cntr));
        var newDate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
        console.log('Io weather called...')
            if (currentDate != newDate){
                console.log('Sending weather data');
                currentDate = newDate;
                request('http://www.google.com', function(error, response, body){
                    if(!error && response.statusCode === 200){
                        console.log(body);
                    }
                })
                io.sockets.emit('message',weatherjson.getWeather(cntr));
            }
            
        },60*1000);


        calendarfun.getCalenderDetail(function(err, result){
            console.log(`calenderDetail ${JSON.stringify(result)}`)
        })

        // var calenderDetail = {
        //     monthDetail:calendarfun.getcalenderMonth(),
        //     //birthDays = calenderjson.getBirthDay()
        // }

        // calendarfun.getcalenderMonth(function(err,result){
        //     console.log(JSON.stringify(result)) 
        //     var monthDetail = result   
        //     io.sockets.emit('calender',monthDetail);
        // })
    
})