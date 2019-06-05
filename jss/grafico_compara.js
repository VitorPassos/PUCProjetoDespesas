anychart.onDocumentReady(function(){

  //INÍCIO DAS LISTAS JSON DE DADOS PARA O GRÁFICO
  //PRIMEIRA LISTA = GASTOS DO MÊS ATUAL
  var dadosT = [];
  var dadosT2 = [];
  /*     ["Casa", 3000 ],
      ["Prestação do carro", 4200 ],
      ["Filhos", 3200 ],
      ["Plano de saúde", 2000 ] */
  
  /* var dadosPASS = [
      ["Casa", 3000 ],
      ["Prestação do carro", 4200 ],
      ["Filhos", 3200 ],
      ["Plano de saúde", 2000 ]
    ]; */
  
  
  // Monta a estrutura de dados a ser exibida no gráfico para a RECEITA
  for (i = 0; i < receitas.dadosReceitas.length; i++) {
    let mes = receitas.dadosReceitas[i].mes;  
    let valor = parseFloat (receitas.dadosReceitas[i].valor);
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

    // Checa o mês atual
    let d = new Date();
    let monthcheck = d.getMonth();  
  
    // Se não tem nenhum valor, insere o primeiro objeto
    if (mes==monthcheck)
      if (dadosT.length == 0)
          dadosT.push ({x: "Receita", value: valor});
      else {
        for (j=0; j < dadosT.length; j++) {
            val = parseFloat (dadosT[j].value);
            val += valor;
            dadosT[j].value = val;
              
          }
  
      }
  }
  

  // Monta a estrutura de dados a ser exibida no gráfico para as DESPESAS
  for (i = 0; i < db.data.length; i++) {
    let mes = db.data[i].mes;
    let valor = parseFloat (db.data[i].valor);
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

    // Checa o mês atual
    let d = new Date();
    let monthcheck = d.getMonth();  
  
    // Se não tem nenhum valor, insere o primeiro objeto
    if (mes==monthcheck)
      if (dadosT2.length == 0)
          dadosT2.push ({x: "Despesas", value: valor});
      else {
        for (j=0; j < dadosT2.length; j++) {
            val = parseFloat (dadosT2[j].value);
            val += valor;
            dadosT2[j].value = val;
              
          }
  
      }
  }


  //DEFINE O TIPO DE GRÁFICO
  chart = anychart.column();
    
  // create a column series and set the data
  var series1 = chart.column(dadosT);
  var series2 = chart.column(dadosT2);
  
  // configure the visual settings of the first series
  series1.normal().fill("#5CD65C");
  series1.hovered().fill("#87D387");
  series1.selected().fill("#87D387");

  series2.normal().fill("#DE4D44");
  series2.hovered().fill("#FF948E");
  series2.selected().fill("#FF948E");
  series2.normal().stroke("#BF332B");
  series2.hovered().stroke("#DE4D44");
  series2.selected().stroke("#DE4D44");

  //DEFINE O TIPO DE BORDA DO GRÁFICO, SUA COR E ESPAÇAMENTO
  var background = chart.background();
  background.stroke({color: "#282828", dash: "10", thickness: 1});
  background.cornerType("round");
  background.corners(15, 15, 15, 15);
  
  // espaçamento entre barras
  chart.barsPadding(-2);
  chart.barGroupsPadding(2);
  
  //TÍTULO DO GRÁFICO
  chart.title("Comparação entre receita e despesas");
    
    // set the container id
    chart.container("grafico4");
    
    // initiate drawing the chart
    chart.draw();
  });