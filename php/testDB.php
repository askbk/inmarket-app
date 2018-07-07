<?php
//  inserting some sample values into database for testing
include 'DB.php';
DB::insertCompany("inmarket", "en høvelig bedrift");

DB::insertEvent("drammen", "2017-05-31", "17:30", "hygging med bedrifter!", 1, "2t 30 min", "Gratis", "konsert");
DB::insertEvent("oslo", "2018-06-30", "14:00", "hygging med jøvler", 1, "2t 30 min", "100kr", "fenskap");


 ?>
