anychart.onDocumentReady(function(){

//INÍCIO DAS LISTAS JSON DE DADOS PARA O GRÁFICO
//PRIMEIRA LISTA = GASTOS DO MÊS ATUAL
var dadosAT = [];
var dadosPASS = [];
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
  else if (mes==monthcheck-1)
    if (dadosPASS.length == 0)
    dadosPASS.push ({x: cat, value: valor});
  else {
    // Declaro uma variavel para saber se achou a categoria
    let encontrado = false;

    for (j=0; j < dadosPASS.length; j++) {
        // verificar se o objeto atual (j) do finan é da categoria a ser somada
        if (dadosPASS[j].x == cat) {
            encontrado = true;
            val = parseFloat (dadosPASS[j].value);
            val += valor;
            dadosPASS[j].value += val;
            break
        }
    }

    if (encontrado == false) 
        dadosPASS.push ({x: cat, value: valor});
  }
}

//DEFINE O TIPO DE GRÁFICO
chart = anychart.column();
  
// create a column series and set the data
var series1 = chart.column(dadosAT);
var series2 = chart.column(dadosPASS);

// configure the visual settings of the first series
series1.normal().fill("#DE4D44");
series1.hovered().fill("#FF948E");
series1.selected().fill("#FF948E");
series1.normal().stroke("#BF332B");
series1.hovered().stroke("#DE4D44");
series1.selected().stroke("#DE4D44");

// configure the visual settings of the second series
series2.normal().fill("#0066cc", 0.3);
series2.hovered().fill("#0066cc", 0.1);
series2.selected().fill("#0066cc", 0.5);
series2.normal().hatchFill("forward-diagonal", "#0066cc", 1, 15);
series2.hovered().hatchFill("forward-diagonal", "#0066cc", 1, 15);
series2.selected().hatchFill("forward-diagonal", "#0066cc", 1, 15);
series2.normal().stroke("#0066cc");
series2.hovered().stroke("#0066cc", 2);
series2.selected().stroke("#0066cc", 4);

// espaçamento entre barras + largura
chart.barsPadding(-0.5);
chart.barGroupsPadding(2);
series2.pointWidth(30);

//TÍTULO DO GRÁFICO
chart.title("Gastos do mês atual comparado ao anterior");
  
// set the container id
chart.container("grafico1");
  
// initiate drawing the chart
chart.draw();

// set rendering settings
series1.rendering().point(drawer);
series2.rendering().point(drawer);

});

function drawer() {
  // if missing (not correct data), then skipping this point drawing
  if (this.missing) {
return;
  }

  // get shapes group
  var shapes = this.shapes || this.getShapesGroup(this.pointState);
  // calculate the left value of the x-axis
  var leftX = this.x - this.pointWidth / 2;
  // calculate the right value of the x-axis
  var rightX = leftX + this.pointWidth;
  // calculate the half of point width
  var rx = this.pointWidth / 2;

  shapes['path']
  // resets all 'line' operations
  .clear()
  // draw column with rounded edges
  .moveTo(leftX, this.zero)
  .lineTo(leftX, this.value + rx)
  .circularArc(leftX + rx, this.value + rx, rx, rx, 180, 180)
  .lineTo(rightX, this.zero)
  // close by connecting the last point with the first straight line
  .close();
}