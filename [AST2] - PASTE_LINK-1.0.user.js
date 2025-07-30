// ==UserScript==
// @name         [AST2] - PASTE_LINK
// @version      1.0
// @description  Automatycznie otwiera AST2 z numerem seryjnym zlecenia z Fixably. Rzoszerzenie działa w kooperacji z: FIXABLY_-_INTERFACE_TWEAKS
// @author       Sebastian Zborowski
// @match        https://diagnostics.apple.com/*
// @grant        none
// ==/UserScript==

//Disclaimer:
//Niniejszy skrypt został utworzony metodą Vibecodingu. Nie ingeruje trwale w oryginalne strony internetowe, nie odwołuje się do danych prywatnych ani chronionych przepisami RODO,
//nie przetwarza danych osobowych, a także nie zmienia podstawowego działania strony. Skrypt dodaje kilka automatyzacji, skrótów oraz modyfikacje wizualne, które mają na celu
//usprawnienie i ułatwienie korzystania z serwisu.

(function() {
    'use strict';

    const serial = new URLSearchParams(location.search).get('serial');
    if (!serial) return;

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
})();
