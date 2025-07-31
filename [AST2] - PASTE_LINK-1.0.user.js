// ==UserScript==
// @name         [AST2] - PASTE_LINK
// @version      1.3
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

(function () {
    'use strict';

    const CURRENT_VERSION = '1.3'; // ręcznie modyfikować, ma zgadzać się z wersją skryptu w nagłówku
    const REMOTE_META_URL = 'https://raw.githubusercontent.com/sebastian-zborowski/ast2_-_paste_link/main/%5BAST2%5D%20-%20PASTE_LINK-1.0.user.js';

    const LAST_CHECK_KEY = 'ast2_update_last_check';
    const now = Date.now();
    const lastCheck = parseInt(localStorage.getItem(LAST_CHECK_KEY) || '0', 10);

    if (now - lastCheck < 36200000) {
        return; // sprawdzono co 24h
    }
    localStorage.setItem(LAST_CHECK_KEY, now.toString());

    fetch(REMOTE_META_URL)
        .then(r => r.text())
        .then(text => {
            const remoteVersionMatch = text.match(/@version\s+([0-9.]+)/);
            if (!remoteVersionMatch) {
                console.log('[AST2] Nie znaleziono wersji zdalnej');
                return;
            }

            const remoteVersion = remoteVersionMatch[1];
            console.log('[AST2] Wersja zdalna:', remoteVersion, '| Lokalna:', CURRENT_VERSION);

            if (isNewerVersion(remoteVersion, CURRENT_VERSION)) {
                notifyUpdate(remoteVersion);
            }
        })
        .catch(err => {
            console.warn('[AST2] Błąd sprawdzania aktualizacji:', err);
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
        note.innerHTML = `
            🔔 Dostępna nowa wersja skryptu: <strong>${newVersion}</strong><br>
            <a href="${REMOTE_META_URL}" target="_blank">Kliknij tutaj, aby pobrać</a>
        `;
        Object.assign(note.style, {
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: '#fff8b5',
            border: '2px solid #d3a600',
            padding: '12px',
            fontSize: '14px',
            borderRadius: '10px',
            zIndex: '99999',
            color: '#333',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
        });

        document.body.appendChild(note);
    }
})();
