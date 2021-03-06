anychart.onDocumentReady(function(){

  //INÍCIO DAS LISTAS JSON DE DADOS PARA O GRÁFICO
  //PRIMEIRA LISTA = GASTOS DO MÊS ATUAL
  var dadosAT = [];
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
  
  // Monta a estrutura de dados a ser exibida no gráfico

  document.getElementById("grafico1_alt").style.display = "none";

  for (i = 0; i < receitas.dadosReceitas.length; i++) {
    let cat = receitas.dadosReceitas[i].categoria;
    let valor = parseFloat (receitas.dadosReceitas[i].valor);
    let mes = receitas.dadosReceitas[i].mes;
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
      if (dadosAT.length == 0)
          dadosAT.push ({x: cat, value: valor});
      else {
          // Declaro uma variavel para saber se achou a categoria
          let encontrado = false;
  
          for (j=0; j < dadosAT.length; j++) {
              // verificar se o objeto atual (j) do finan é da categoria a ser somada
              if (dadosAT[j].x == cat) {
                  encontrado = true;
                  val = parseFloat (dadosAT[j].value);
                  val += valor;
                  dadosAT[j].value += val;
                  break
              }
          }
  
          if (encontrado == false) 
              dadosAT.push ({x: cat, value: valor});
      }
  }

  if (dadosAT.length == 0) {
    document.getElementById("grafico1").style.display = "none";
    document.getElementById("grafico1_alt").style.display = "block";
  }
  




  //DEFINE O TIPO DE GRÁFICO
  chart = anychart.column();
    
  // create a column series and set the data
  var series1 = chart.column(dadosAT);
  
  // configure the visual settings of the first series
  series1.normal().fill("#5CD65C");
  series1.hovered().fill("#98E298");
  series1.selected().fill("#98E298");
  series1.normal().stroke("#3A8E3A");
  series1.hovered().stroke("#3A8E3A");
  series1.selected().stroke("#3A8E3A");
  
  // espaçamento entre barras
  chart.barsPadding(-0.5);
  chart.barGroupsPadding(2);
  
  //TÍTULO DO GRÁFICO
  chart.title("Receita do mês atual");
  
  var title = chart.title();
    title.fontSize(30);
    
  // set the container id
  chart.container("grafico1");
    
  // initiate drawing the chart
  chart.draw();

  //DEFINE O TIPO DE BORDA DO GRÁFICO, SUA COR E ESPAÇAMENTO
  var background = chart.background();
  background.stroke({color: "#282828", dash: "10", thickness: 1});
  background.cornerType("round");
  background.corners(15, 15, 15, 15);


  });
