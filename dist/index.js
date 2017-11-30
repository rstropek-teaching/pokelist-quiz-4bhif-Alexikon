"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$().ready(function () {
    const limit = 20;
    let offset = 0;
    let btnPrev = $('#btnPrev');
    let btnNext = $('#btnNext');
    let pokeTable = $('#pokeTable');
    let pokeDetail = $('#pokeDetail').hide();
    let btnBack = $('#btnBack').hide();
    listPokemons();
    function listPokemons() {
        return __awaiter(this, void 0, void 0, function* () {
            let pokelist = yield $.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
            let html = '';
            for (const pokemon of pokelist.results) {
                html += `<tr><td><button type="button" onclick="showPokeDetails('${pokemon.url}')">${pokemon.name}</button></td></tr>`;
            }
            pokeTable[0].innerHTML = html;
        });
    }
    ;
    function showPokeDetails(pokeURL) {
        return __awaiter(this, void 0, void 0, function* () {
            btnNext.hide();
            btnPrev.hide();
            pokeTable.hide();
            btnBack.show();
            pokeDetail.show();
            let html = '';
            let pokeFacts = yield $.get(pokeURL);
            html = `<tr><td>Name: ${pokeFacts.name}</td></tr>` +
                `<tr><td>Foto: <br><img src="${pokeFacts.image}"></td></tr>` +
                `<tr><td>Weight: ${pokeFacts.weight}</td></tr>` +
                `<tr><td>Abilities:</td></tr>` +
                `<tr><td><ul>`;
            for (let ability of pokeFacts.abilities) {
                html += `<li>${ability.ability.name}</li>`;
            }
            html += `</ul></td></tr>`;
            pokeDetail[0].innerHTML = html;
        });
    }
    $('#btnPrev').on("click", function () {
        if (offset > 0) {
            offset -= 20;
            listPokemons();
        }
    });
    $('#btnNext').on("click", function () {
        offset += 20;
        listPokemons();
    });
    $('#btnBack').on("click", function () {
        btnNext.show();
        btnPrev.show();
        pokeTable.show();
        btnBack.hide();
        pokeDetail.hide();
    });
});
