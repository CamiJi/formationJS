const http = require('http');
var MongoClient = require('mongodb').MongoClient;

const hostname = '127.0.0.1';
const port = 15202;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  
	MongoClient.connect( 'mongodb://localhost:27017/commerce', function(err, db) {
		console.log("Connecté au serveur mongodb !");
		
		var _categories = db.collection('categories');
  
		_categories.insert( {"id":5,"name":"test 2"}, function(err, result) {
			console.log("Catégorie 'test 2' insérée !");
			console.log( '*** debut result ***');
			console.log( result);
			console.log( '*** fin result ***');
			console.log( '_id = ' + result.ops[0]._id);
			db.close();
		  });
		
		
	});
  
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
  
  
});

server.listen(port, hostname, () => {
  console.log('serveur démarré avec insert !');
});