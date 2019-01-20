export const template = `
<meta charset="utf-8">
<div class="w3-container w3-content w3-padding-32 w3-large">
    <div id="registration"class="w3-panel">
        <div class="" id="studentPage">
        <input class="w3-input w3-section" type="text" name="school" value="" placeholder="Skole" pattern="^([ \u00c0-\u01ffa-zA-Z0-9'\-])+$">
        <input class="w3-input" type="text" name="program" value="" placeholder="Retning" pattern="^([ \u00c0-\u01ffa-zA-Z'\-])+$">
        <input class="w3-input w3-section" type="text" name="schoolYear" value="" placeholder="Årstrinn" pattern="^([ \u00c0-\u01ffa-zA-Z0-9'\-])+$">
        </div>

        <div class="w3-hide" id="jobseekerPage">
        <input class="w3-input w3-section" type="text" name="schoolStudent" value="" placeholder="Universitet/høyskole" pattern="^([ \u00c0-\u01ffa-zA-Z0-9'\-])+$">
        <input class="w3-input" type="text" name="programStudent" value="" placeholder="linje" pattern="^([ \u00c0-\u01ffa-zA-Z'\-])+$">
        <input class="w3-input w3-section" type="text" name="schoolYearStudent" value="" placeholder="årstrinn" pattern="^([ \u00c0-\u01ffa-zA-Z0-9'\-])+$">
        </div>

        <div class="w3-hide" id="employeePage">
        <input class="w3-input w3-section" type="text" name="companyName" value="" placeholder="Bedriftsnavn" pattern="^([ \u00c0-\u01ffa-zA-Z0-9'\-])+$">
        <input class="w3-input" type="text" name="companyNo" value="" placeholder="Organisasjonsnummer">
        <input class="w3-input w3-section" type="text" name="position" value="" placeholder="Stilling" pattern="^([ \u00c0-\u01ffa-zA-Z'\-])+$">
        </div>

        <input type="submit" name="" value="Ferdig" class="black-button w3-card w3-mobile clientType w3-input hover-bg-grey" id="registerButton">
    </div>

    <p id="responseText"></p>
</div>
`;
