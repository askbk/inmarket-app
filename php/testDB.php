<?php
//  inserting some sample values into database for testing
require_once 'class/Company.php';
require_once 'class/Event.php';
require_once 'class/Message.php';
require_once 'class/Group.php';
Company::insertCompany("inmarket", "en høvelig bedrift");

Event::insertEvent("drammen", "2017-05-31 17:30", "hygging med bedrifter!", 1, "2t 30 min", "Gratis", "konsert");
Event::insertEvent("oslo", "2018-06-30 14:00", "hygging med jøvler", 1, "2t 30 min", "100kr", "fenskap");
Event::insertEvent("Comfort Hotel Union Brygge", "2018-05-26 17:00", "Comfort Hotell inviterer i samarbeid med
InMarket og Cre8 til gratiskonsert!
Unge talenter fra hele Drammen viser frem sine
låter og skaper god stemning på Union Brygge. I
tillegg vil det være mulighet for å stille spørsmål til
et panel bestående av de arrangerende bedriftene.
", 1, "2t 30min", "Gratis", "Konsert");

Message::startConversation(1, 2, 0);
Message::sendMessage(1,1,"helo");
Message::sendMessage(1,2,"helo agaun");

Group::insert("gruppe1", "testgruppe");
Group::addMember(1, 1, 1);
Group::addMember(1, 2, 0);
Group::insertPost(1, 1, "mitt første innlegg ;)");
Group::insertComment(1, 2, "kommentar1");
Group::insertComment(1, 1, "svar på kommentar1");
?>
