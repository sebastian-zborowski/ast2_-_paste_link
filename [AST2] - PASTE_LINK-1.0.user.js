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

//Ostatnia aktualizacja: 01.08.2025

(function () {
    'use strict';

    const urlA = 'https://raw.githubusercontent.com/sebastian-zborowski/ast2_-_paste_link/main/iSpot-safetykeyA.js';
    const urlB = 'https://raw.githubusercontent.com/sebastian-zborowski/ast2_-_paste_link/main/iSpot-safetykeyB.js';

    fetch(urlA).then(resA => {
        if (!resA.ok) throw new Error('Failed to fetch file A');
        return resA.text();
    }).then(textA => {
        fetch(urlB).then(resB => {
            if (!resB.ok) throw new Error('Failed to fetch file B');
            return resB.text();
        }).then(textB => {
            if (textA !== textB) return;
            
            console.log("Script Execution Successful...");
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

        }).catch(err => {
            console.error("Script Execution Failure...", err);
        });
    }).catch(err => {
        console.error("Script Execution Failure...", err);
    });
})();

// SYSTEM KONTROLI WERSJI NARUSZA POLITYKE STRONY AST2, NIE ZOSTAŁ ZAIMPLEMENTOWANY
