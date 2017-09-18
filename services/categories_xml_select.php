<?php
$strXml = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>";
$strXml .= "<categories>";

//On se connecte au serveur de bd et on sélectionne la base
$connexion = mysql_pconnect( 'localhost', 'root', '');
if(!$connexion)
{
	header('Location: http://localhost/erreurs/nodb.html');
}
	
if( !mysql_select_db ('commerce', $connexion))
{
	header('Location: http://localhost/erreurs/nodb.html');
}

$req = "SELECT * FROM categories";
$res = mysql_query( $req, $connexion);
	
if( mysql_numrows( $res))
{
	for( $i = 0; $i < mysql_numrows($res); $i++)
	{
		$rcd = mysql_fetch_array ($res);
		
		$strXml .= "<categorie>";
		$strXml .= "<id>".$rcd["id"]."</id>";
		$strXml .= "<nom>".$rcd["nom"]."</nom>";
		$strXml .= "<desc>".$rcd["desc"]."</desc>";
		$strXml .= "</categorie>";
	}
}

$strXml .= "</categories>";
header('Content-Type: text/xml');
echo( $strXml);
?>
