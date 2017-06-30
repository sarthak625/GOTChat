var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var path        = require('path');
var housesJSON  = require('./houses.json');

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/',function(req,res){
  res.render('index',{
    title: 'Welcome'
  });
});

app.get('/chatroom',function(req,res){
  res.render('chatroom',{
    title:'Chat Menu'
  });
});

app.get('/choose',function(req,res){
    var houseArr = housesJSON.house;
    res.render('choose',{
      title: 'Choose Your house',
      houseArr: houseArr
    })
})



http.listen((process.env.port || 3000),function(){
  console.log("Server has started");
});
