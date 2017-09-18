const SPINNER_PATH = '/js/widgets/spinner/';

var _link = document.createElement( 'LINK');
_link.setAttribute( 'rel', 'stylesheet');
_link.setAttribute( 'type', 'text/css');
_link.setAttribute( 'href', SPINNER_PATH + 'spinner.css');
$('head').append( _link);

function Spinner( dz, title) {

	//nombre
	this.constructor.nb++;

	//propriétés privées
	var _id = Spinner.nb;
	var _dz = dz || 'body';

	//propriétés publiques
	this.title = title || 'Chargement en cours...';

	//fonctions utilitaires
	//affichage
	var _html = Spinner.HTML_BASE
		.replace('{{id}}',_id)
		.replace('{{title}}',this.title);
		
	$( _dz).prepend( _html);

	//destructeur
	this.unload = function () {
//		this.constructor.nb--;
		$('#spinner'+_id).remove();
	}
}

//propriété statique ou variable de classe
Spinner.nb = 0;
Spinner.HTML_BASE = '<p class="spinner" id="spinner{{id}}">{{title}}</p>';

$.get( SPINNER_PATH + 'spinner.html', function(data){ Spinner.HTML_BASE = data;})

function testerSpinner() {

	//spinner par défaut
	var _sp1 = new Spinner();
	console.log( _sp1);

	//spinner avec params
	var _sp2 = new Spinner( 'section#main article', 'WOW ça charge !');
	console.log( _sp2);
}
