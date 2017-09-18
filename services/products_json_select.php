<?php include( "../php/connect.php"); ?>
<?php
//sleep( 3);//delai
$strJson = "[";


//- listing produits -
//---------------------
$req = "SELECT * FROM produits";
$req_where = "";

//récupération de la catégorie sélectionnée
$prm_cat = "";
if( isSet( $_GET['cat'])) {
	$prm_cat = $_GET['cat'];
}

//si une catégorie est sélectionnée
if( ( $prm_cat != "") && ( $prm_cat != "0"))
{
	$req_where = $req_where." WHERE cat LIKE '".$prm_cat."%'";
}

//si on recherche un id
$prm_id = "";
if( isSet( $_GET['id'])) {
	$prm_id = $_GET['id'];
}

if( $prm_id != "")
{
	if( $req_where == "") $req_where = " WHERE id =".$prm_id;
	else $req_where = $req_where." AND id =".$prm_id;
}

//si on recherche une chaine
$prm_search = "";
if( isSet( $_GET['search'])) {
	$prm_search = $_GET['search'];
}

if( $prm_search != "")
{
	if( $req_where == "") $req_where = " WHERE nom LIKE '%".$prm_search."%'";
	else $req_where = $req_where." AND nom LIKE '%".$prm_search."%'";
}

//si on recherche une chaine au début
$prm_begin = "";
if( isSet( $_GET['begin'])) {
	$prm_begin = $_GET['begin'];
}

if( $prm_begin != "")
{
	if( $req_where == "") $req_where = " WHERE nom LIKE '".$prm_begin."%'";
	else $req_where = $req_where." AND nom LIKE '".$prm_begin."%'";
}


// génération de la liste des cotisants
$req = $req.$req_where;

//echo( $req);//!debug!
$res = mysql_query( $req, $connexion);
	
if( mysql_numrows( $res))
{
	for( $i = 0; $i < mysql_numrows($res); $i++)
	{
		$rcd = mysql_fetch_array ($res);
		
		if( 0 != $i) $strJson .= ',';
		
		$strJson .= "{";
		$strJson .= "\"id\":".$rcd["id"];
		$strJson .= ",\"nom\":\"".$rcd["nom"]."\"";
		$strJson .= ",\"prix\":".$rcd["prix"];
		$strJson .= "}";
	}
}

$strJson .= "]";

//header('Content-Type: text/xml');
header('Content-Type: text/plain');

echo( $strJson);
?>
