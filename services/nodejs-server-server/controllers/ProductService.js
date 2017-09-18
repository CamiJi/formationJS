'use strict';
var MongoClient = require('mongodb').MongoClient;

exports.deleteProduct = function(args, res, next) {
  /**
   * Supprime un produit
   * 
   *
   * id Long L'id du produit à supprimer !
   * no response value expected for this operation
   **/
  res.end();
}

exports.getProduct = function(args, res, next) {

//   console.log( args);
  var _id = args.id.value;

  //connexion à la base
  MongoClient.connect(
    'mongodb://localhost:27017/commerce'
    , function(err, db) {

      var _produits = db.collection('produits');
      _produits.findOne(
        {id: _id}
        , function(err,result) {

//          console.log( err);

          console.log( '**** RESULT ****');
          console.log( result);
//          console.log( '**** RESULT ****');

          res.setHeader('Content-Type', 'application/json');

          if( null != result) {

            res.statusCode = 200;

            res.end(JSON.stringify( result, null, 2));

          } else {
            res.statusCode = 404;
            res.statusMessage = 'Produit ' + _id + 'non trouvé !';
            res.end(JSON.stringify( {}, null, 2));
          }

        }
      );
    }
  );
  
}

exports.getProducts = function(args, res, next) {
  /**
   * lister les produits
   * lister les produits au format JSON
   *
   * id Integer Récupérer un tableau de un produit par son id (optional)
   * id_category Integer Récupérer un tableau de produits par leur id de catégorie (optional)
   * no response value expected for this operation
   **/
  res.end();
}

exports.postProduct = function(args, res, next) {
  /**
   * Ajouter un nouveau produit à la liste des produits
   * 
   *
   * body Product Le produit à rajouter dans la liste
   * no response value expected for this operation
   **/
  res.end();
}

