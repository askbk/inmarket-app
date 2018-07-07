<?php

$filePath = "kommuner.json";

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

    $jsonObj = json_encode($result);

    file_put_contents($filePath, $jsonObj);

    echo $jsonObj;
} else {
    echo file_get_contents($filePath);
}

?>
