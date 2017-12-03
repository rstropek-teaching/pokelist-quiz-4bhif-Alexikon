$().ready(function() {
    const limit = 20;
    let offset = 0;
    
    let btnPrev = $('#btnPrev');
    let btnNext = $('#btnNext');
    let pokeTable = $('#pokeTable');

    let pokeDetail = $('#pokeDetail').hide();
    let btnBack = $('#btnBack').hide();

    listPokemons();


    async function listPokemons() {
        let pokelist = await $.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);

        let html = '';
        for(const pokemon of pokelist.results) {
            html += `<tr><td><button type="button" id="details" data-details-url="${pokemon.url}">${pokemon.name}</button></td></tr>`
        }
        
        pokeTable[0].innerHTML = html;
    };

    async function showPokeDetails(pokeURL: string) {
        btnNext.hide();
        btnPrev.hide();
        pokeTable.hide();

        btnBack.show();
        pokeDetail.show();

        let html = '';
        let pokeFacts = await $.get(pokeURL);

        html = `<tr><td>Name: ${pokeFacts.name}</td></tr>` +
               `<tr><td>Foto: <br><img src="${pokeFacts.sprites.front_default}"></td></tr>` +
               `<tr><td>Weight: ${pokeFacts.weight}</td></tr>` +
               `<tr><td>Abilities:</td>` +
               `<td><ul>`;

        for(let ability of pokeFacts.abilities) {
            html += `<li>${ability.ability.name}</li>`
        }
        html += `</ul></td></tr>`;
        
        pokeDetail[0].innerHTML = html;
    }

    $(document).on("click", '#details', function () { showPokeDetails(<string>this.getAttribute('data-details-url')); });

    $('#btnPrev').on("click", function() {
        if(offset > 0){
            offset -= 20;
            listPokemons();
        }
    });

    $('#btnNext').on("click", function() {
        offset += 20;
        listPokemons();
    });

    $('#btnBack').on("click", function() {
        btnNext.show();
        btnPrev.show();
        pokeTable.show();

        btnBack.hide();
        pokeDetail.hide();
    });
});