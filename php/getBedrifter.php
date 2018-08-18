<?php
require_once 'class/Company.php';

$bedriftId = $_GET["bedrift"];
if ($bedriftId == "-1") {
    $bedriftArray = Company::getCompanies();
    $result = array();
    foreach ($bedriftArray as $key => $bedrift) {
        $result[$key] = new stdClass;
        foreach ($bedrift as $attr => $value) {
            $result[$key]->$attr = $value;
        }
    }

    usort($result, "sortByName");

    echo json_encode($result);
} else {
    $bedrift = Company::getCompany($bedriftId);

    echo json_encode($bedrift);
}

function sortByName($a,$b) {
    return $a['companyName'] > $b['companyName'];
}
?>
