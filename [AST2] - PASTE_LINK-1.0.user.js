// ==UserScript==
// @name         [AST2] - PASTE_LINK
// @version      1.2
// @description  Automatycznie otwiera AST2 z numerem seryjnym zlecenia z Fixably. Rzoszerzenie działa w kooperacji z: FIXABLY_-_INTERFACE_TWEAKS
// @author       Sebastian Zborowski
// @match        https://diagnostics.apple.com/*
// @updateURL    https://raw.githubusercontent.com/sebastian-zborowski/ast2_-_paste_link/main/%5BAST2%5D%20-%20PASTE_LINK-1.0.user.js
// @downloadURL  https://raw.githubusercontent.com/sebastian-zborowski/ast2_-_paste_link/main/%5BAST2%5D%20-%20PASTE_LINK-1.0.user.js
// @grant        none
// @source       https://github.com/sebastian-zborowski
// ==/UserScript==

//Disclaimer:
//Niniejszy skrypt został utworzony metodą Vibecodingu. Nie ingeruje trwale w oryginalne strony internetowe, nie odwołuje się do danych prywatnych ani chronionych przepisami RODO,
//nie przetwarza danych osobowych, a także nie zmienia podstawowego działania strony. Skrypt dodaje kilka automatyzacji, skrótów oraz modyfikacje wizualne, które mają na celu
//usprawnienie i ułatwienie korzystania z serwisu.

//Ostatnia aktualizacja: 30.07.2025

(function() {
    'use strict';

    const CURRENT_VERSION = '1.2'; // musisz ręcznie zaktualizować gdy wypuszczasz wersję
    const REMOTE_META_URL = 'https://raw.githubusercontent.com/sebastian-zborowski/ast2_-_paste_link/main/%5BAST2%5D%20-%20PASTE_LINK-1.0.user.js';

    fetch(REMOTE_META_URL)
        .then(r => r.text())
        .then(text => {
            const remoteVersionMatch = text.match(/@version\s+([0-9.]+)/);
            if (!remoteVersionMatch) return;

            const remoteVersion = remoteVersionMatch[1];

            if (isNewerVersion(remoteVersion, CURRENT_VERSION)) {
                notifyUpdate(remoteVersion);
            }
        });

    function isNewerVersion(remote, local) {
        const r = remote.split('.').map(Number);
        const l = local.split('.').map(Number);
        for (let i = 0; i < Math.max(r.length, l.length); i++) {
            const rv = r[i] || 0;
            const lv = l[i] || 0;
            if (rv > lv) return true;
            if (rv < lv) return false;
        }
        return false;
    }

    function notifyUpdate(newVersion) {
        const note = document.createElement('div');
        note.textContent = `🔔 Dostępna nowa wersja skryptu [AST2] - PASTE_LINK: ${newVersion}`;
        note.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ffd700;
            padding: 10px 20px;
            border: 2px solid #000;
            border-radius: 8px;
            z-index: 99999;
            font-weight: bold;
        `;
        const link = document.createElement('a');
        link.href = REMOTE_META_URL;
        link.target = '_blank';
        link.textContent = 'Kliknij, aby zaktualizować';
        link.style.display = 'block';
        link.style.marginTop = '8px';

        note.appendChild(link);
        document.body.appendChild(note);
    }
})();
