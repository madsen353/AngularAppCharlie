var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://angquest:gamle123@cluster0-vxwad.azure.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err : any, db : any) {
  // if (err) throw err;
  // var dbo = db.db("mydb");
  // dbo.createCollection("customers", function(err :any, res : any) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  //   db.close();
  // });
  if (err) throw err;
  var dbo = db.db("questsdb");
  var quest = {
    id : 1,
    title : "den første quest",
    description : "...",
    date : "",
    lat: 56,
    long: 9,
    challenges : [{
      title : "Første post",
      description :"Beskrivelse af første post",
      lat : 56,
      long : 9,
      question : "..."
    }],
    questCompleted : false,
    questActive : false
  };
  dbo.collection("quests").insertOne(quest, function(err : any, res : any) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

