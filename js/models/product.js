//couche ORM = Object Relational Mapping

function Product( product) {

	//initialisation
	if( null == product) { product = {};}
	product.id = product.id || Product.DEFAULT_ID;
	product.id_cat = product.id_cat || product.id_category || product.id_categorie || Product.CATEGORIES[0].id;
	product.name = product.name || product.nom || 'Inconnu';
	product.price = product.price || product.prix || 0.01;
	product.desc = product.desc || '';
	product.image = product.image || 'images/produits/defaut.jpg';
	product.stock = product.stock || 0;
	product.quantity = product.quantity || product.quantite ||product.qty || product.qte || 0;

	//proprietes privees
	var _id_cat = product.id_cat;

	//proprietes publiques
	this.id = product.id;
	this.name = product.name;
	this.price = product.price;
	this.desc = product.desc;
	this.image = product.image;
	this.stock = product.stock;
	this.quantity = product.quantity;

	//methodes privees
	function checkIdCat( id_cat) {
		return 1 == Product.CATEGORIES.filter( function(item){
			return item.id == id_cat;
		}).length;
	}

	//methodes publiques
	//setters/getters
	this.idCat = function( id_cat) {
		if( ( null != id_cat) && ( checkIdCat( id_cat))) {
			_id_cat = id_cat;
		}

		if( !checkIdCat( _id_cat)) { _id_cat = Product.CATEGORIES[0].id;}
		this.id_cat = _id_cat;
		return _id_cat;
	}
	this.idCat( product.id_cat);

	//Webservice
	this.wsDelete = function() {
		$.ajax(
			{
				method: 'DELETE'
				, url: Product.wsREST + '/' + this.id
				, success: function(){ alert('Produit supprimé !');}
			}
		);
	}

	this.wsGet = function() {
		$.get(
			Product.wsREST + '/' + this.id
			, (
				function(_this){
				return function(data){
				var _originalProduct = new Product( data);
				_this.id = _originalProduct.id;
				_this.idCat(_originalProduct.id_cat);
				_this.name = _originalProduct.name;
				_this.desc = _originalProduct.desc;
				_this.image = _originalProduct.image;
				_this.stock = _originalProduct.stock;
				_this.quantity = _originalProduct.quantity;
				_this.fillForm();
			}})(this)
		);
	}

	//utilitaires
	this.cat = function() {
		return Product.CATEGORIES.filter( function(item){
			return item.id == _id_cat;
		})[0].name;
	}

	this.fillForm = function() {

		//id
		$('#id').val( this.id);

		//id_cat
		$('#id_cat').val( this.id_cat);
		$('#id_category').val( this.id_cat);
		$('#id_categorie').val( this.id_cat);

		//name
		$('#nom').val( this.name);
		$('#name').val( this.name);

		//price
		$('#prix').val( this.price);
		$('#price').val( this.price);

		//stock
		$('#stock').val( this.stock);

		//quantity
		$('#quantite').val( this.quantity);
		$('#quantity').val( this.quantity);
		$('#qty').val( this.quantity);
		$('#qte').val( this.quantity);

		//desc
		$('#desc').val( this.desc);

		//image
		$('#image').val( this.image);

		//boutons
		$('#supprimer').click(
			( function(_this)
				{
					return function(){_this.wsDelete();}
				}
			)(this)
//			fabriquerFonctionSupprimer(this)//newbee
		);

		$('#raz').click(
			( function(_this)
				{
					return function(ev){
						ev.preventDefault();
						_this.wsGet();
					}
				}
			)(this)
		);
	}

	//destructeur

}
//newbee version
// function fabriquerFonctionSupprimer(_this) {
// 	return function(){ _this.wsDelete();};
// }


Product.wsREST = 'http://localhost:3000/products';
Product.DEFAULT_ID = 0;
Product.CATEGORIES = [
	{id: 1,name:'Alimentation'}
	, {
		"id": 2
		, "name": "Gros électro"
	}
	, {
		id: 3
		, name: 'Petit électro'
	}
	, {
		id: 4
		, name: 'Jardin'
	}
];
// Product.DEFAULT = {
// 	ID: 0, ID_CAT: 1
// }

function Products( products) {

}

function testerProduct() {
	var _p1 = new Product();
	console.log( _p1);
	console.log( '_p1._id_cat = ' + _p1._id_cat);//undefined
	console.log( '_p1.idCat() = ' + _p1.idCat());//1
	_p1.idCat( 'z');
	console.log( '_p1.idCat() = ' + _p1.idCat());//1
	console.log( '_p1.idCat(3) = ' + _p1.idCat(3));//3
	_p1.idCat(5);
	console.log( '_p1.id_cat = ' + _p1.id_cat);//3 => calculée
	console.log( '_p1.cat() = ' + _p1.cat());//Petit électro

	var _p2 = new Product( {
		"nom": "Pelle"
		, "price": 12.22
		, "id": 19
		, "id_cat": 4

	});
	console.log( _p2);
	console.log( _p2.idCat());
	console.log( _p2.id_cat);

	var _p3 = new Product( {
		id_cat: 'abc'

	});
	console.log( _p3.id_cat);
}
testerProduct();