<?php include( "../php/connect.php"); ?>
<?php
//récupération de la  catégorie sélectionnée
$strXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
$strXml .= "<products>";
$prm_id_cat = "";

if( isSet( $_GET['id_cat'])) {
	$prm_id_cat = $_GET['id_cat'];
}

//- listing produit -
//---------------------
$req = "SELECT * FROM products";
$req_where = "";

//si une catégorie est sélectionnée
if( ( $prm_id_cat != "") && ( $prm_id_cat != "0"))
{
	$req_where = $req_where." WHERE id_category = ".$prm_id_cat;
}

//si on recherche une chaine
$prm_search = "";
if( isSet( $_GET['search'])) {
	$prm_search = $_GET['search'];
}

if( $prm_search != "")
{
	if( $req_where == "") $req_where = " WHERE name LIKE '%".$prm_search."%'";
	else $req_where = $req_where." AND name LIKE '%".$prm_search."%'";
}

//si on recherche une chaine au début
$prm_begin = "";
if( isSet( $_GET['begin'])) {
	$prm_begin = $_GET['begin'];
}

if( $prm_begin != "")
{
	if( $req_where == "") $req_where = " WHERE name LIKE '".$prm_begin."%'";
	else $req_where = $req_where." AND name LIKE '".$prm_begin."%'";
}


// génération de la liste des produits
$req = $req.$req_where;
//echo( $req);//!debug!
$res = mysql_query( $req, $connexion);
	
if( mysql_numrows( $res))
{
	for( $i = 0; $i < mysql_numrows($res); $i++)
	{
		$rcd = mysql_fetch_array ($res);
		
		$strXml .= "<product>";
		$strXml .= "<id>".$rcd["id"]."</id>";
		$strXml .= "<id_category>".$rcd["id_category"]."</id_cat>";
		$strXml .= "<name>".$rcd["name"]."</name>";
		$strXml .= "<desc>".$rcd["desc"]."</desc>";
		$strXml .= "<price>".$rcd["price"]."</price>";
		$strXml .= "</product>";
	}
}

$strXml .= "</products>";

header('Content-Type: text/xml');

echo( $strXml);
?>
