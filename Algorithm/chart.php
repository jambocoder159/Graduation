<html>
<head>
  <meta charset="utf-8">
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);
      var x = new Array() ;
    function drawChart() {

      var data = new google.visualization.DataTable();
        data.addColumn('number', 'Date Size');
        data.addColumn('number', 'Selection Sort');
        data.addColumn('number', '下載次數');
        data.addColumn('number', '按讚次數');
        data.addRows(5);

        var size = 5000 ;
        for(var i=0; i<5; i++){
          data.setValue(i,0,size);
          data.setValue(i,1,Math.floor(Math.random()*(299+1)+1));
          data.setValue(i,2,Math.floor(Math.random()*(299+1)+1));
          data.setValue(i,3,Math.floor(Math.random()*(299+1)+1));
          size+=5000 ;
        }
       

      var options = {
        chart: {
          title: 'CPU Times',
        },
        width: 900,
        height: 500,
        
      };

      var chart = new google.charts.Line(document.getElementById('line_top_x'));

      chart.draw(data, options);
    }
  </script>
</head>
<body>
  <div id="line_top_x"></div>

</body>
</html>
