class App {

    static listarPaises = []

    static requisicao() {

        fetch('https://kenzie-olympics.herokuapp.com/paises')
            .then(response => response.json())
            .then((data) => {

                App.listarPaises = data

                App.listarPaises.forEach(pais => {
                    pais.total = 0
                    pais.total = pais.medal_gold + pais.medal_silver + pais.medal_bronze
                });


                App.compararMedalhas("total")

            })

    }

    static templateTabela() {

        const tabela = document.createElement("table");
        tabela.id = 'idTabela'
        tabela.className = "corTabela"
        const cabecalho = document.createElement("thead");
        cabecalho.id = 'idCabecalho'
        const corpo = document.createElement("tbody");
        corpo.id = 'idCorpo'
        const linha_1 = document.createElement('tr');
        linha_1.id = "titulo"
        const coluna1 = document.createElement('th');

        const posicao = document.createElement('button');
        posicao.id = posicao
        posicao.innerHTML = ' posicao  ^'
        coluna1.appendChild(posicao)
        posicao.addEventListener("click", ordenarMedalhaPosicao)


        const coluna2 = document.createElement('th');
        coluna2.innerHTML = "País";

        const coluna3 = document.createElement('th');

        const btnOuro = document.createElement('button');
        btnOuro.id = btnOuro
        btnOuro.innerHTML = ' Ouro  ^'
        coluna3.appendChild(btnOuro)
        btnOuro.addEventListener("click", ordenarMedalhaOuro)

        const coluna4 = document.createElement('th');
        const btnPrata = document.createElement('button');
        btnPrata.id = btnPrata
        btnPrata.innerHTML = ' Prata  ^'
        coluna4.appendChild(btnPrata)
        btnPrata.addEventListener("click", ordenarMedalhaPrata)

        const coluna5 = document.createElement('th');
        const btnBronze = document.createElement('button');
        btnBronze.id = btnBronze
        btnBronze.innerHTML = ' Bronze  ^'
        coluna5.appendChild(btnBronze)
        btnBronze.addEventListener("click", ordenarMedalhaBronze)

        const coluna6 = document.createElement('th');
        coluna6.innerHTML = "Total";

        document.getElementById("tabelaContenaier").appendChild(tabela)
        document.getElementById("idTabela").appendChild(cabecalho)
        document.getElementById("idTabela").appendChild(corpo)
        document.getElementById("idTabela").appendChild(linha_1)

        linha_1.appendChild(coluna1)
        linha_1.appendChild(coluna2)
        linha_1.appendChild(coluna3)
        linha_1.appendChild(coluna4)
        linha_1.appendChild(coluna5)
        linha_1.appendChild(coluna6)

    }


    static templateLinhas(pais) {

        const linha = document.createElement("tr")
        linha.id = "idLinha"
        const campo1 = document.createElement('td');
        campo1.innerHTML = pais.id
        const img = document.createElement("img")
        img.src = pais.flag_url
        const span = document.createElement("span")
        span.innerHTML = "&nbsp" + pais.country
        const campo2 = document.createElement('td');
        const campo3 = document.createElement('td');
        campo3.innerHTML = pais.medal_gold
        const campo4 = document.createElement('td');
        campo4.innerHTML = pais.medal_silver
        const campo5 = document.createElement('td');
        campo5.innerHTML = pais.medal_bronze
        const campo6 = document.createElement('td');

        campo6.innerText = pais.total

        linha.appendChild(campo1)
        linha.appendChild(campo2)
        campo2.appendChild(img)
        campo2.appendChild(span)
        linha.appendChild(campo3)
        linha.appendChild(campo4)
        linha.appendChild(campo5)
        linha.appendChild(campo6)
        document.getElementById("idTabela").appendChild(linha)

    }

    static filtrarPais() {

        let listarPaisesAux = App.listarPaises.filter(pais =>
            document.getElementById("filtroPais").value.toLowerCase() == pais.country.toLowerCase())

        document.getElementById("tabelaContenaier").innerHTML = ""

        App.templateTabela()

        listarPaisesAux.forEach(pais => {
            App.templateLinhas(pais)
        });

    }

    static compararMedalhas(paramNomeMedalha) {
        const listaPaisesMaiorMedalha = App.listarPaises.sort(function(paisA, paisB) {

            if (paramNomeMedalha == "total") {
                if (paisA.total === paisB.total) {
                    return paisB.medal_gold - paisA.medal_gold
                } else {
                    return paisB.total - paisA.total
                }
            } else {
                return paisB[paramNomeMedalha] - paisA[paramNomeMedalha]
            }
        })
        document.getElementById("tabelaContenaier").innerHTML = ""
        App.templateTabela()

        let ordenacao = 1
        listaPaisesMaiorMedalha.forEach(pais => {
            pais.id = ordenacao++;
            App.templateLinhas(pais)
        });

    }

}


App.requisicao()
const btn = document.getElementById("btnPesquisar")
btn.addEventListener("click", App.filtrarPais)

const btnOuro = document.getElementById("btnOuro")

function ordenarMedalhaOuro() {
    App.compararMedalhas("medal_gold")
}

const btnPrata = document.getElementById("btnPrata")

function ordenarMedalhaPrata() {
    App.compararMedalhas("medal_silver")
}

const btnBronze = document.getElementById("btnBronze")

function ordenarMedalhaBronze() {
    App.compararMedalhas("medal_bronze")
}

const btnTotal = document.getElementById("btnTotal")

function ordenarMedalhaPosicao() {
    App.compararMedalhas("total")
}