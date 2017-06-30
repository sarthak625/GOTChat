var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var path        = require('path');
var housesJSON  = require('./houses.json');

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')))
var houseArr = housesJSON.house;

app.get('/',function(req,res){
  res.render('index',{
    title: 'Welcome'
  });
});

app.get('/chatroom',function(req,res){

      res.render('chatroom',{
          title:'Chat Menu | ',
          image: 'khal-drogo.png'
        });


});


app.get('/choose',function(req,res){

    res.render('choose',{
      title: 'Choose Your house',
      houseArr: houseArr
    })
});

app.get('/chatroom/:id?',function(req,res){
    var id = req.params.id;
    var isValid = false;
    var image;
    for (var i=0;i<houseArr.length;i++){
      if (id=== houseArr[i].id){
        isValid = true;
        image = houseArr[i].image;
        console.log("Found");
        break;
      }
    }

    if (isValid){
      res.render('chatroom',{
        title: id.toUpperCase()  + ' CHAT',
        image: image
      })
    }
    else{
      res.send('Not found');
    }
});



http.listen((process.env.port || 3000),function(){
  console.log("Server has started");
});
