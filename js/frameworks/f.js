Orsys = {};

String.prototype.toInt = function(){
	return parseInt( this, 10);
}
//alert( '10' + 1);
//alert( '10'.toInt() + 1);

var VERSION = 0.9;
//const VERSION = 0.9;

function extendedObject( id) {
	var _e = document.getElementById( id);
	_e.hide = function(){
		this.style.display = 'none';
	}
	return _e;
}

Orsys.VERSION = VERSION;

Orsys.init = function() {
	console.info( 'JS : Module Orsys v' + Orsys.VERSION);
}

Orsys.DEBUG_MODE = true;

function debug( s) {
	if( Orsys.DEBUG_MODE) {
		alert( s);
	} else {
		console.log( s);
	}
}

String.prototype.debug = Function.prototype.debug = (function(dm){return dm?function(){alert(this);}:function(){console.log(this);}})(Orsys.DEBUG_MODE);


/*
String.prototype.debug = Function.prototype.debug = (function(dm) {
	if( dm) {
		return fabriquerAlert();
	} else {
		return fabriquerLog();
	}
})(Orsys.DEBUG_MODE);

function fabriquerAlert() {
	return function() {
		alert( this);
	}
}

function fabriquerLog() {
	return function() {
		console.log( this);
	}
}
*/













