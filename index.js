$(document).ready( init);

function init() {

	Orsys.init();
	chargerCategoriesJSON();

//	setTimeout( testerSpinner, 1000);//tester les spinners
//	extendedObject('menuAccueil').hide();//objet étendu

//	debug( 'index ok !');
//	'index ok 2 !'.debug();//affichage de String.prototype.debug
//	'index ok 2 !'.debug.debug();//affichage de Function.prototype.debug
//	alert( (127).toString() + 1);//technique de nesting

	$('header.menu ul.buttons li a').click( gererMenu);

//	$('#menuProduits').click( chargerProduits);//old school

	$('#menuProduits').click
	(
		function()
		{
			charger(
				'services/products_select.php'
				,'produits de boutique.com'
				// , function() {
				// 	$('ul.products li[id^=p]').click( chargerFormulaireProduit);
				// }
				, gererClickProduitListe
			);
			
		}
	);//new school

	$('#menuAccueil').click( function(){charger('index-fragment.html','bienvenue sur boutique.com');});
}

function gererClickProduitListe() {
	$('ul.products li[id^=p]').click( chargerFormulaireProduit);
}

function chargerCategoriesJSON(){
	$.get( 'http://localhost:3000/categories', afficherCategoriesSelect);
}

function afficherCategoriesSelect( data) {

	//OLD BEE
//	$('#dzCat').html('<select id="idCat">' + data.map( function(item){
//		return '<option value="'+item.id+'">'+item.name+'</option>';
//	}).join('') + '</select>');

	//NEW BEE
	var _htmlOptions = data.map( function(item){
		return '<option value="'+item.id+'">'+item.name+'</option>';
	}).join('');
	var _htmlSelect = '<select id="idCat">' 
		+ '<option value="0">Tous les produits</option>'
		+ _htmlOptions 
		+ '</select>';
	$('#dzCat').html( _htmlSelect);

	//Accompagnement au changement !
	$('#idCat').change( function(){
			charger( 
				'http://localhost/services/products_select.php?id_cat='+this.value
				, 'Produits de la catégorie ' + this.value
				, gererClickProduitListe
			);

		}
	);
}

function charger( url, title, final) {
	var _spinner = new Spinner('section#main');
	$.get( url, function(data)
		{
			afficher(data,title);
			_spinner.unload();
			if( final){final();}
		}
	);
}

function chargerFormulaireProduit() {

	var _id = this.id.substr( 1);
	var _title = 'Formulaire : ' + $(this).text();

	charger( 
		'product-form-fragment.html'
		, _title
		, function(){ chargerProduit( _id);}
	);
}

function chargerProduit( id) {
//	$.get( 'http://localhost:3000/products?id='+id, afficherProduitJSON);//JSON-RESTfull
	$.get( 'http://localhost:3001/products/'+id, afficherProduitJSON);//JSON-RESTfull
//	$.get( 'http://localhost:3000/products/'+id, afficherProduitJSON2);//JSON-RESTfull
//	$.get( 'services/products_select.php?format=json&id='+id, afficherProduitJSON);//JSON-RPC
}

function afficherProduitJSON( data) {

	if( 'array' == typeof(data)) {
		(new Product( data[0])).fillForm();
	} else {
		(new Product( data)).fillForm();
	}

	

	//old school
	// var _produit = data[0];

	// $('#id').val( _produit.id);
	// $('#id_cat').val( _produit.id_category);
	// $('#nom').val( _produit.name);
	// $('#prix').val( _produit.price);
	// $('#quantite').val( 0);
	// $('#desc').val( _produit.desc);
	// $('#image').val( _produit.image);
}

function afficherProduitJSON2( data) {
	(new Product( data)).fillForm();
}

function afficher( data, title) {
	$('section#main article').first().html( data);
	$('h1').html( title);
	$('title').text( title);
}


function chargerProduits() {
	$.get( 'services/products_select.php', afficherProduits);
//	$.ajax( { url: 'services/produits_select.html', success: afficherProduits, method: 'GET'});//eq
	// $.get( 'services/products_select.php', function( data)
	// 	{
	// 		$('section#main article').first().html( data);
	// 		$('h1').html('produits de boutique.com');
	// 		$('title').text('produits de boutique.com');
	// 	}
	// );
}

function afficherProduits( data) {
	$('section#main article').first().html( data);
	$('h1').html('produits de boutique.com');
	$('title').text('produits de boutique.com');
}

function gererMenu( ev) {
	ev.preventDefault();
//	gererActive();//perte de contexte
//	gererActive.call( $('#menuProduits').get(0));//conservation du contexte statique
	gererActive.call(this);//conservation du contexte
//	gererActive.apply(this,arguments);//conservation du contexte et des arguments originaux
	console.log(this);
}

function gererActive() {
	$('.active').removeClass('active');
	$(this).addClass('active');
	console.log(this);
}