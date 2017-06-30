var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var path        = require('path');


app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/',function(req,res){
  res.render('index');
});

app.get('/chatroom',function(req,res){
  res.render('chatroom');
});



http.listen((process.env.port || 3000),function(){
  console.log("Server has started");
});
