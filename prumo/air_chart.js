d3.csv('air.csv', function(error, data){
    var container = d3.select('.prumo-air .charts-container');
    
    // console.log(data);
    var dataParsed = data
        // .filter(function(d){ return d.value !== ""; })
        // .slice(0, 100)
        .map(function(d, i){
            return {
                timestamp: d3.time.format('%d/%m/%Y %H:%M').parse(d.timestamp),
                rawTimestamp: d.timestamp,
                value: (d.value === '') ? null : +d.value,
                variableName: d.variableName
            };
        })
        .filter(function(d){ return d.timestamp.getFullYear().toString() === '2016'; });

    var nest = d3.nest()
        .key(function(d) { return d.variableName; })
        // .key(function(d) { return parseInt(d.timestamp.getMonth()) + 1; })
        .entries(dataParsed);

    var titles = ["PRUMO_TEMP","PRUMO_PM10","PRUMO_PTS","PRUMO_WS","PRUMO_WD","PRUMO_AT","PRUMO_RH","PRUMO_BP","PRUMO_SR","PRUMO_RAIN"];
    var titlesReplacement = ["Temperatura do ar","Particulados inaláveis","Particulados totais em suspensão ","Velocidade do vento","Direção do vento","Temperatura","Umidade Relativa","Pressao atmosferica","Radiação Solar","Precipitação"];

    nest
    // .slice(0, 1)
    .forEach(function(d){
        var chartContainer = container.append('div').classed('chart-container ui card', true);
        d.values.sort(function(a, b){ return a.timestamp.getTime() - b.timestamp.getTime(); });

        var chart = piper.areaChartTimeRotated({
            container: chartContainer.node(),
            width: 1000,
            height: 250,
            margin: {top: 30, right: 30, bottom: 60, left: 60},
            data: d.values,
            chartTitle: titlesReplacement[titles.indexOf(d.key)]
        });
    });
});
