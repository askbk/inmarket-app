<?php
require_once 'class/Company.php';
require_once 'class/Auth.php';


if (True) {
    $bedriftId = $_GET["bedrift"];
    if (Company::companyExists('', $bedriftId)) {
        $employeeArray = Company::getCompanyEmployees($bedriftId);
        $result = array();
        foreach ($employeeArray as $key => $employee) {
            $result[$key] = new stdClass;
            foreach ($employee as $attr => $value) {
                $result[$key]->$attr = $value;
            }
        }
        echo json_encode($result);
    } else {
        echo "Bedriften eksisterer ikke";
    }

} else {
    echo "Not logged in";
}

?>
