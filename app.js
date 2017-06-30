/*=================================================
        Packages
===================================================
*/
var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var path        = require('path');
var housesJSON  = require('./houses.json');
var io          = require('socket.io')(http);

users = []

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')))

//Extract the Array from the JSON file
var houseArr = housesJSON.house;


/*=================================================
        ROUTES
===================================================
*/


//Landing Page
app.get('/',function(req,res){
  res.render('index',{
    title: 'Welcome'
  });
});


//Choose you house route
app.get('/choose',function(req,res){

    res.render('choose',{
      title: 'Choose Your house',
      houseArr: houseArr
    })
});

//Chatroom-default
app.get('/chatroom',function(req,res){

      res.render('chatroom',{
          title:'Chat Menu | ',
          image: 'khal-drogo.png'
        });


});

//Chatroom-house
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

io.on('connection',function(socket){
  console.log('A user connected');
  socket.on('disconnect',function(){
    console.log('A user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message',msg);
  });

});



http.listen((process.env.port || 3000),function(){
  console.log("Server has started");
});
