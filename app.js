var app = require('express')();

app.get('/',function(req,res){
  res.send('Hello');
});

app.listen((process.env.port || 3000),function(){
  console.log("Server has started");
});
