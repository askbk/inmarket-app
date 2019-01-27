export const template = `
<article class="w3-section w3-hide w3-container w3-content" id="profilePage">
    <h3>Kontaktforespørsler</h3>
    <ul class="w3-ul w3-section" id="request-list">
        Ingen filer lastet opp enda!
    </ul>
</article>

<template id="user-list-item-template">
    <li id="li-user-{{user_id}}">
        <div class="w3-row" id="{{user_id}}">
            <div class="w3-col s4">
                <a href="#/profil/{{user_id}}"><img src="{{profilePicture}}" alt="" class="w3-img w3-circle w3-margin-right" style="width:60px;"></a>
            </div>
            <div class="w3-col s4">
                {{name}}, {{company}} <br>
                har sendt deg kontaktforespørsel
            </div>
            <div class="w3-col s4">
                <button type="button" name="" class="golden-button w3-card button-accept-request" data-user-id="{{user_id}}">Aksepter</button>
                <button type="button" name="" class="golden-button w3-card button-deny-requst" data-user-id="{{user_id}}">Avvis</button>
            </div>
        </div>
    </li>
</template>
`;
