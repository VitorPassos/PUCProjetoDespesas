anychart.onDocumentReady(function () {
    anychart.theme('lightProvence');

    var dadosT = {
        title: 'Receita x Despesas',
        header: ['#', 'Receita', 'Despesas'],
        rows: [
            ['Janeiro'],
            ['Fevereiro'],
            ['Março'],
            ['Abril'],
            ['Maio'],
            ['Junho'],
            ['Julho'],
            ['Agosto'],
            ['Setembro'],
            ['Outubro'],
            ['Novembro'],
            ['Dezembro'],
        ]
    };

    document.getElementById("grafico3_alt").style.display = "none";

    //INÍCIO DO SCRIPT PRÓPRIO

    // Percorre os dados de outro DB para encontrar valores
    for (i = 0; i < receitas.dadosReceitas.length; i++) {
        let mes = receitas.dadosReceitas[i].mes;
        let valor = parseFloat(receitas.dadosReceitas[i].valor);

        let x;
        switch (mes) {
            case "Jan/2019": x = 0; break;
            case "Fev/2019": x = 1; break;
            case "Mar/2019": x = 2; break;
            case "Abr/2019": x = 3; break;
            case "Mai/2019": x = 4; break;
            case "Jun/2019": x = 5; break;
            case "Jul/2019": x = 6; break;
            case "Ago/2019": x = 7; break;
            case "Set/2019": x = 8; break;
            case "Out/2019": x = 9; break;
            case "Nov/2019": x = 10; break;
            case "Dez/2019": x = 11; break;

            default:
                break;
        }
        if (dadosT.rows[x].length == 1)
            dadosT.rows[x].push(valor);
        else {
            for (j = 1; j < dadosT.rows[x].length; j++)
                val = parseFloat(dadosT.rows[x][j]);
            val += valor;
            dadosT.rows[x][1] = val;
        }
    }

    for (i = 0; i < db.data.length; i++) {
        let mesD = (db.data[i].mes);
        let valorD = parseFloat(db.data[i].valor);

        let x;
        switch (mesD) {
            case "Jan/2019": x = 0; break;
            case "Fev/2019": x = 1; break;
            case "Mar/2019": x = 2; break;
            case "Abr/2019": x = 3; break;
            case "Mai/2019": x = 4; break;
            case "Jun/2019": x = 5; break;
            case "Jul/2019": x = 6; break;
            case "Ago/2019": x = 7; break;
            case "Set/2019": x = 8; break;
            case "Out/2019": x = 9; break;
            case "Nov/2019": x = 10; break;
            case "Dez/2019": x = 11; break;

            default:
                break;
        }

        if (dadosT.rows[x].length == 2)
            dadosT.rows[x].push(valorD);
        else if (dadosT.rows[x].length == 3) {
            for (j = 2; j < dadosT.rows[x].length; j++)
                valD = parseFloat(dadosT.rows[x][j]);
            valD += valorD;
            dadosT.rows[x][2] = valD;
        }
        else if (dadosT.rows[x].length == 1) {
            dadosT.rows[x].push('N/A');
            dadosT.rows[x].push(valorD);
        }
    }

    var diferenca;
    var d = new Date();
    var n = d.getMonth();
    document.getElementById("texto").innerHTML = "";
    if (dadosT.rows[n].length == 3) {
        if (dadosT.rows[n][1] == 'N/A') {
            document.getElementById("diferenca").innerHTML = 'Não há dados de receita registrados para o mês atual. Adicione sua receita para obter o saldo mensal.';
        }
        else {
            diferenca = dadosT.rows[n][1] - dadosT.rows[n][2];
            if (diferenca <0)
                document.getElementById("box-diferenca").style.backgroundColor = "red";
            if (diferenca >0)
                document.getElementById("box-diferenca").style.backgroundColor = "green";
            document.getElementById("diferenca").innerHTML = diferenca;
            document.getElementById("texto").innerHTML = "Saldo disponível no mês atual: R$ ";
        }
    }
    else if (dadosT.rows[n].length == 2) {
        document.getElementById("diferenca").innerHTML = 'Não há dados de despesas registrados para o mês atual. Adicione suas despesas para obter o saldo mensal.';
    }
    else if (dadosT.rows[n].length == 1) {
        document.getElementById("diferenca").innerHTML = 'Nenhum dado financeiro foi disponibilizado para o mês atual.';
    }


    //FIM DO SCRIPT PRÓPRIO

    // create column chart
    var chart = anychart.column();

    // set chart data
    chart.data(dadosT);

    // turn on chart animation
    chart.animation(true);

    chart.yAxis().labels().format('R${%Value}');

    chart.labels()
        .enabled(true)
        .position('center-top')
        .anchor('center-bottom')
        .fontSize(16)
        .format('R${%Value}');
    chart.hovered().labels(false);

    // turn on legend and tune it
    chart.legend()
        .enabled(true)
        .fontSize(20)
        .padding([0, 0, 20, 0]);

    // interactivity settings and tooltip position
    chart.interactivity().hoverMode('single');

    chart.tooltip()
        .positionMode('point')
        .position('center-top')
        .anchor('center-bottom')
        .offsetX(0)
        .offsetY(5)
        .titleFormat('{%X}')
        .fontSize(20)
        .format('{%SeriesName} : R${%Value}');

    var title = chart.title();
    title.fontSize(30);

    // set container id for the chart
    chart.container('grafico3');

    // initiate chart drawing
    chart.draw();

    //DEFINE O TIPO DE BORDA DO GRÁFICO, SUA COR E ESPAÇAMENTO
    var background = chart.background();
    background.stroke({ color: "#282828", dash: "10", thickness: 1 });
    background.cornerType("round");
    background.corners(15, 15, 15, 15);

    var count = 0
    for (i = 0; i < dadosT.rows.length; i++) {
        if (dadosT.rows[i].length == 1) {
            count++;
        }
        else {
            break;
        }
    }
    if (count == 12) {
        document.getElementById("grafico3").style.display = "none";
        document.getElementById("grafico3_alt").style.display = "block";
    }


});