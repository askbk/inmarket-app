export const template = `
<meta charset="utf-8">
<div class="w3-container w3-content w3-padding-32 w3-large">
    <div id="registration" class="w3-panel">
    <input class="w3-input" type="text" name="name" value="" placeholder="Navn" required pattern="^([ \u00c0-\u01ffa-zA-Z'\-])+$">
    <input class="w3-input w3-section" type="email" name="email" value="" placeholder="Epost" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$">
    <input class="w3-input" type="text" name="phone" value="" placeholder="Telefon" required pattern="[0-9]{8}">
    <input class="w3-input w3-section" type="password" name="password" value="" placeholder="Passord" required pattern=".{8,}">

    <label class="">
    Kommune:
    <select class=" w3-input" name="" id="kommuneList">

    </select>
    </label>
    <button class="black-button w3-card w3-mobile w3-input hover-bg-grey w3-section" type="button" name="button" id="page2btn">Neste</button>
    </div>

    <p id="responseText"></p>
</div>

<template id="kommuneTemplate">
    <option value="{{kommuneNr}}">{{kommuneNavn}}</option>
</template>
`
