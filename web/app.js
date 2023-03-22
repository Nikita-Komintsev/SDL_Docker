const express = require('express');
const redis = require('redis');
const app = express();

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});


function insertData(){
    value = 'Коминцев Никита БСБО-02-19';
    redisClient.select(0, ( ) => {
    // Запись данных
    redisClient.set("students", value);
    });
}


app.get('/', function(req, res) {
    redisClient.get('students', function(err, students) {
        if (isNaN(students) || students==null || !!students) {
            insertData();
        } 
        res.send('Data in redis: ' + students);
    });
});


app.listen(5000);