export const template = `
<article class="w3-section w3-hide w3-container w3-content" id="profilePage">
    <h2 class="w3-center">Min profil</h2>
    <a href="#" id="publicProfileLink" class="black-button w3-card">Gå til offentlig profil</a>
    <div class="profilePic w3-center">
        <img src="" alt="" class="w3-img w3-circle" id="profilePicture">
    </div>
    <form class="" action="index.html" method="post">
        <input type="file" name="pictureSelect" id="pictureSelect" value="" class="w3-hide">
        <label for="pictureSelect" class="black-button w3-card line-height-inherit w3-right">Endre profilbilde</label>
    </form>
    <h4 class="margin-bottom-0" id="nameHeader">{{name}}</h4>
    <span style="color:#aaa;" id="userTypeHeader" class=""></span>

    <form class="" action="" method="post" id="bioForm">
        <textarea name="bio" rows="8" cols="80" id="bio" class="width-100"></textarea>
        <input type="submit" name="" value="Lagre" class="black-button w3-card">
    </form>

    <h3 class="w3-center">Mine filer</h3>
    <p>Her kan du laste opp filer som er relevante for arbeidsgivere</p>
    <form class="w3-panel" action="index.html" method="post">
        <input type="file" id="fileInput" value="Last opp filer" class="w3-hide">
        <label for="fileInput" class="black-button w3-card line-height-inherit w3-right">Velg fil…</label>
    </form>
    <ul class="w3-ul w3-section" id="fileList">
        Du har ikke lastet opp noen filer enda.
    </ul>
</article>


<template id="myFileListTemplate">
    <li id="li{{userFile_id}}">
        <div class="w3-row" id="{{userFile_id}}">
            <div class="w3-col s6">
                <a href="{{path}}" target="_blank">{{name}}</a>
            </div>
            <div class="w3-col s6">
                <button type="button" name="deleteFile" class="black-button w3-card w3-right">Slett</button>
            </div>
        </div>
    </li>
</template>
`;
