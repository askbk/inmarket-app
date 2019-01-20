export const template = `
<meta charset="utf-8">
<div class="w3-container w3-content w3-padding-32 w3-large">
    <div id="registration" class="w3-panel">
        <button class="black-button w3-card w3-mobile clientType w3-input hover-bg-grey" value="student">Elev/student</button>
        <button class="black-button w3-card w3-mobile clientType w3-input hover-bg-grey w3-section" value="jobseeker">Jobbsøker</button>
        <button class="black-button w3-card w3-mobile clientType w3-input hover-bg-grey" value="employee">Bedriftsansatt</button>
        <button class="black-button w3-card w3-mobile clientType w3-input hover-bg-grey w3-section" value="company">Bedrift</button>

        <p>Allerede registrert? <a href="#/innlogging" class="text-underline">Logg inn her.</a> </p>
    </div>

    <p id="responseText"></p>
</div>
`;
