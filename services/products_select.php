<?php include( "../php/connect.php"); ?>
<?php
//sleep( 3);
//récupération de la  catégorie sélectionnée
$strXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
$strXml .= "<products>";

$strHtml = "<ul class=\"products\">";

$strText = "";

$strJson = "[";

//format HTML, XML, JSON, CSV
$prm_format = 'html';

if( isSet( $_GET['format'])) {
	$prm_format = $_GET['format'];
}

//gestion par categorie
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

//si on recherche par id
//gestion par id
$prm_id = "";

if( isSet( $_GET['id'])) {
	$prm_id = $_GET['id'];
}

if( $prm_id != "")
{
	if( $req_where == "") $req_where = " WHERE id = ".$prm_id;
	else $req_where = $req_where." AND id = ".$prm_id;
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
		$strXml .= "<id_category>".$rcd["id_category"]."</id_category>";
		$strXml .= "<name>".$rcd["name"]."</name>";
		$strXml .= "<desc>".$rcd["desc"]."</desc>";
		$strXml .= "<price>".$rcd["price"]."</price>";
		$strXml .= "<stock>".$rcd["stock"]."</stock>";
		$strXml .= "</product>";
		
		$strHtml .= "<li id=\"p".$rcd["id"]."\">";
		$strHtml .= $rcd["name"];
		$strHtml .= "</li>";
		
		$strText .= $rcd["desc"];
		
		if( 0 != $i) $strJson .= ",";
		$strJson .= "{";
		$strJson .= "\"id\":".$rcd["id"];
		$strJson .= ",\"id_category\":".$rcd["id_category"];
		$strJson .= ",\"name\":\"".$rcd["name"]."\"";
		$strJson .= ",\"desc\":\"".$rcd["desc"]."\"";
		$strJson .= ",\"price\":".$rcd["price"];
		$strJson .= ",\"stock\":".$rcd["stock"];
		$strJson .= ",\"image\":\"".$rcd["image"]."\"";
		$strJson .= "}";
	}
}

$strXml .= "</products>";
$strHtml .= "</ul>";
$strJson .= "]";


$header = 'Content-Type: text/html';
$data = $strHtml;

if( $prm_format == 'xml') {
	$header = 'Content-Type: text/xml';
	$data = $strXml;
} else if( $prm_format == 'text') {
	$header = 'Content-Type: text/plain';
	$data = $strText;
} else if( $prm_format == 'json') {
	$header = 'Content-Type: application/json';
	$data = $strJson;
}

header( $header);
echo( utf8_encode( $data));
?>
