export const template = `
<article class="w3-section w3-hide w3-container w3-content" id="profilePage">
    <div class="profilePic w3-center">
        <img src="" alt="" class="w3-img w3-circle" id="profilePicture">
    </div>

    <button type="button" name="contact" class="black-button w3-card w3-right">Kontakt</button>

    <h4 class="margin-bottom-0" id="nameHeader">{{name}}</h4>
    <span style="color:#aaa;" id="userTypeHeader" class=""></span>

    <p id="bio" class="w3-card golden-bg">Denne brukeren har ikke skrevet noen bio enda.</p>

    <h3>Filer</h3>
    <ul class="w3-ul w3-section" id="fileList">
        Ingen filer lastet opp enda!
    </ul>
</article>

<template id="fileListTemplate">
    <li id="li{{userFile_id}}">
        <div class="w3-row" id="{{userFile_id}}">
            <div class="w3-col s12">
                <a href="{{path}}" target="_blank">{{name}}</a>
            </div>
        </div>
    </li>
</template>
`;
