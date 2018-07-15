<?php

$filePath = "kommuner.json";

$kommuneNr = $_GET["kommuneNr"];

if(!file_exists($filePath) || time() - filemtime($filePath) > 6000) {
    $rawData = json_decode(file_get_contents("https://register.geonorge.no/api/subregister/sosi-kodelister/kartverket/kommunenummer-alle.json?"), true);
    $result = array();
    //var_dump($rawData["containeditems"][0]);
    $index = 0;
    foreach ($rawData["containeditems"] as $kommuneObj) {
        if ($kommuneObj["status"] == "Gyldig") {
            $kommuneNr = $kommuneObj["label"];
            $result[$index++] =  array('kommuneNr' => $kommuneNr, 'kommuneNavn' => $kommuneObj["description"]);
        }

    }

    usort($result, "sortByName");

    $jsonObj = json_encode($result);

    file_put_contents($filePath, $jsonObj);
}

if($kommuneNr == "") {
    echo file_get_contents($filePath);
} else {
    $kommuner = json_decode(file_get_contents($filePath));

    foreach ($kommuner as $kommune) {
        if ($kommune->kommuneNr == $kommuneNr) {
            echo $kommune->kommuneNavn;
            break;
        }
    }
}

function sortByName($a,$b) {
    return $a['kommuneNavn']>$b['kommuneNavn'];
}

?>
