// ==UserScript==
// @name         [AST2] - PASTE_LINK
// @version      1.0
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

// Kontrola wersji alert ---------------------------------------------------------
    const SCRIPT_NAME = 'PASTE_LINK';
    const CURRENT_VERSION = '1.0';
// -------------------------------------------------------------------------------

    const serial = new URLSearchParams(location.search).get('serial');
    if (serial) {
        const tryFill = setInterval(() => {
            const input = document.querySelector('input#serial-input');
            if (input) {
                clearInterval(tryFill);
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                nativeInputValueSetter.call(input, serial);
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, 300);
    }

// Kontrola wersji alert ---------------------------------------------------------
(async function() {
    const scriptList = [
        { name: 'VERSION_CONTROL_SYSTEM', url: 'https://raw.githubusercontent.com/sebastian-zborowski/fixably_-_version-control-system/b2b6d4cbfe5cef3fcb98d3e23d79657ff9eae127/%5BFIXABLY%5D%20-%20VERSION%20CONTROL%20SYSTEM-1.0.user.js' },
        { name: 'PASTE_LINK', url: 'https://raw.githubusercontent.com/sebastian-zborowski/ast2_-_paste_link/main/%5BAST2%5D%20-%20PASTE_LINK-1.0.user.js' },
        { name: 'INTERFACE_TWEAKS', url: 'https://raw.githubusercontent.com/sebastian-zborowski/fixably_-_interface_tweaks/main/%5BFIXABLY%5D%20-%20INTERFACE_TWEAKS-1.0.user.js' },
        { name: 'PHOTO_PREVIEW', url: 'https://raw.githubusercontent.com/sebastian-zborowski/fixably_-_photo-preview/main/%5BFIXABLY%5D%20-%20PHOTO_PREVIEW-0.8.user.js' },
        { name: 'ACTION-REQUIRED', url: 'https://raw.githubusercontent.com/sebastian-zborowski/gsx_-_action_required/main/%5BGSX%5D%20-%20ACTION_REQUIRED-1.0.user.js' },
        { name: 'ADD_PARTS', url: 'https://raw.githubusercontent.com/sebastian-zborowski/gsx_-_add_parts/main/%5BGSX%5D%20-%20ADD_PARTS-1.0.user.js' },
    ];

    // 1. Pobierz i zapisz wersje
    await Promise.all(scriptList.map(async script => {
        try {
            const res = await fetch(script.url);
            const text = await res.text();
            const match = text.match(/@version\s+([0-9.]+)/);
            if (match) {
                const version = match[1];
                localStorage.setItem(script.name, JSON.stringify({
                    name: script.name,
                    remote: version
                }));
                console.log(`[VERSION CONTROL] ${script.name}: ${version}`);
            } else {
                console.warn(`[VERSION CONTROL] Nie znaleziono wersji dla: ${script.name}`);
            }
        } catch (err) {
            console.warn(`[VERSION CONTROL] Błąd ładowania ${script.name}:`, err);
        }
    }));


    try {
        const storedStr = localStorage.getItem(SCRIPT_NAME);
        if (!storedStr) throw new Error('Brak danych w localStorage');

        const data = JSON.parse(storedStr);

        if (data?.remote && compareVersions(data.remote, CURRENT_VERSION) > 0) {
            showUpdatePopup(SCRIPT_NAME, CURRENT_VERSION, data.remote);
        }
    } catch (e) {
        console.warn(`[UPDATE CHECK] Błąd sprawdzania wersji dla ${SCRIPT_NAME}:`, e);
    }

    function compareVersions(v1, v2) {
        const split1 = v1.split('.').map(Number);
        const split2 = v2.split('.').map(Number);
        const length = Math.max(split1.length, split2.length);
        for (let i = 0; i < length; i++) {
            const a = split1[i] || 0;
            const b = split2[i] || 0;
            if (a > b) return 1;
            if (a < b) return -1;
        }
        return 0;
    }

    function showUpdatePopup(scriptName, current, remote) {
        const popup = document.createElement('div');
        popup.textContent = `🔔 Aktualizacja dostępna dla ${scriptName}: ${remote} (masz ${current})`;
        Object.assign(popup.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#222',
            color: '#fff',
            padding: '12px 18px',
            borderRadius: '8px',
            fontSize: '14px',
            zIndex: 9999,
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            userSelect: 'none',
        });

        popup.addEventListener('click', () => popup.remove());

        document.body.appendChild(popup);

        setTimeout(() => popup.remove(), 15000);
    }
})();
// ---------------------------------------------------------------------------------

})();
