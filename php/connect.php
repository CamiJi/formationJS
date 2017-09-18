<?php
error_reporting(E_ALL & ~E_WARNING & ~E_DEPRECATED);

$connexion = mysql_pconnect( 'localhost', 'root', '');
if(!$connexion)
{
	header('Location: http://localhost/erreurs/nodb.html');
}
	
if( !mysql_select_db ('onlinestore', $connexion))
{
	header('Location: http://localhost/erreurs/nodb.html');
}
?>