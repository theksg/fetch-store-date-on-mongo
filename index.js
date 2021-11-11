let express = require('express');
let app = express();
var bodyParser = require('body-parser');
var env = require('dotenv').config()


app.listen(3000, () => console.log('Server running on port 3000!'))

app.use(express.json());


let MongoClient = require('mongodb').MongoClient;


//LocalHost
var url = "mongodb://localhost:27017/";
var dbNameLocal="danceWebsite";
var collectionNameLocal="members";

var dbNameRemote="myFirstDatabase";
var collectionNameRemote="members";

app.post('/', (req, res) => {
    console.log(process.env.MONGODB_URI);
    MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbNameRemote);
        dbo.collection(collectionNameRemote).insertOne({
            name: req.body.name,
            danceForm: req.body.danceForm,
            mobile: req.body.mobile,
            mail: req.body.mail,
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});


app.get('/:name', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("danceWebsite");
        dbo.collection("members").findOne({
            name: req.params.name
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});




