anychart.onDocumentReady(function(){

    //INÍCIO DA LISTA JSON DE DADOS PARA O GRÁFICO
    var dadosfinan = []; 
    // = [
    //     {x: "Casa", value:"3000" },
    //     {x: "Prestação do carro", value:"4200" },
    //     {x: "Faculdade e colégio de filhos", value:"3200" },
    //     {x: "Plano de saúde", value:"2000" }
    // ];
    
    // Monta a estrutura de dados a ser exibida no gráfico
    for (i = 0; i < db.data.length; i++) {
        let cat = db.data[i].categoria;
        let valor = parseFloat (db.data[i].valor);
        let mes = db.data[i].mes;
        if (mes=="Jan/2019")
          mes=0;
        if (mes=="Fev/2019")
          mes=1;
        if (mes=="Mar/2019")
          mes=2;
        if (mes=="Abr/2019")
          mes=3;
        if (mes=="Mai/2019")
          mes=4;
        if (mes=="Jun/2019")
          mes=5;
        if (mes=="Jul/2019")
          mes=6;
        if (mes=="Ago/2019")
          mes=7;
        if (mes=="Set/2019")
          mes=8;
        if (mes=="Out/2019")
          mes=9;
        if (mes=="Nov/2019")
          mes=10;
        if (mes=="Dez/2019")
          mes=11;
    
        // Checa o mes atual
        let d = new Date();
        let monthcheck = d.getMonth();
    
        // Se não tem nenhum valor, insere o primeiro objeto
        if (mes==monthcheck)
            if (dadosfinan.length == 0) 
                dadosfinan.push ({x: cat, value: valor});
            else {
                // Declaro uma variavel para saber se achou a categoria
                let encontrado = false;
    
                for (j=0; j < dadosfinan.length; j++) {
                    // verificar se o objeto atual (j) do finan é da categoria a ser somada
                    if (dadosfinan[j].x == cat) {
                        encontrado = true;
                        val = parseFloat (dadosfinan[j].value);
                        val += valor;
                        dadosfinan[j].value += val;
                        break
                    }
                }
    
                if (encontrado == false) 
                    dadosfinan.push ({x: cat, value: valor});
            }
            
    }
    
    //DEFINE O TIPO DE GRÁFICO
    var chart = anychart.pie();
    
    //TÍTULO DO GRÁFICO
    chart.title("Porcentagem de gastos do mês atual");
    
    //DEFINE DE ONDE O GRÁFICO RECEBE SEUS DADOS (AQUI RECEBE DO JSON ACIMA)
    chart.data(dadosfinan);

    //DEFINE O TIPO DE BORDA DO GRÁFICO, SUA COR E ESPAÇAMENTO
    var background = chart.background();
    background.stroke({color: "#282828", dash: "10", thickness: 1});
    background.cornerType("round");
    background.corners(15, 15, 15, 15);
    
    //DEFINE ONDE O GRÁFICO APARECERÁ
    chart.container('grafico2');
    
    chart.draw();
    });
    
    