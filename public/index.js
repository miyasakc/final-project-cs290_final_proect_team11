var myData = localData();

function addPoint(locx, locy){
    myData[0].values.push({x:locx,y:locy});
    myData[1].values.push({x:locx,y:locy});
    update_db();
    chartData.datum(myData).call(chart);
    nv.utils.windowResize(chart.update);
}

var chart;
var chartData;
nv.addGraph(function() {
    chart = nv.models.scatterChart()
                  .showDistX(true)
                  .showDistY(true)

    //Axis settings
    // chart.xScale(d3.scale.log());
    chart.xAxis.tickFormat(d3.format('1'));
    chart.yAxis.tickFormat(d3.format('.02f'));
    chart.forceY([0,5]);
    chart.forceX([0,5]);


    chartData = d3.select('#svgcontainer svg').datum(myData);
    chartData.call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });


function localData() {
    var data = []
    data.push({
        key: "Local deviation",
        values: []
    });
    data.push({
        key: "Global deviation",
        values: []
    });
    return data;
}

function simulate(trials){
    var inside = 0; //holds the number of points stored inside the circle
    console.log("Running Monte Carlo simulation with n =", trials);
    for(var i = 0;i<trials;i++){ //Loop a number of times equal to the number of requested trials
        var randX = Math.random(); //x value of point between 0-1
        var randY = Math.random(); //y value of point between 0-1
        var distance = Math.sqrt((randX * randX) + (randY * randY)); //distance from bottom left corner
        if(distance < 1){ //if point in circle
            inside++; //increment inside
        }
    }
    return (4* inside/trials); //return approximate value of pi for n = trials
}


function runSimulation(event){
    var numPoints = document.getElementById("Input 1").value;
    if(numPoints){
        if (numPoints < 90000001 && numPoints > 0){
            var piCalculated = simulate(numPoints);
            res1 = numPoints;
            res2 = piCalculated;
            res3 = (Math.abs(piCalculated - Math.PI)*100);
            document.getElementById("Result 1").value = res1;
            document.getElementById("Result 2").value = res2;
            document.getElementById("Result 3").value = res3;
            addPoint(res1, res3);
            event.stopPropagation();
        } else if(numPoints > 90000000){
            alert("The maximum number of points is 90,000,000!");
        }else {
            alert("You need to have at least 1 point!");
        }
    }else{
        alert("Enter a number of points to generate!");
    }
}

function update_db(){
  var postRequest = new XMLHttpRequest();
  var requestURL = '/data/updateDB';
  postRequest.open('POST', requestURL);
  var requestBody = JSON.stringify(myData[1]);
  postRequest.addEventListener('load', function (event) {
    if (event.target.status === 200) {
      console.log("== Database successfully updated");
    }
    else{
      console.log("== Error updating database");
    }
  });
  postRequest.setRequestHeader('Content-Type', 'application/json');
  postRequest.send(requestBody);
}

function getMongoData(){
  var getRequest = new XMLHttpRequest();
  var requestURL = '/data/initGlobals';
  getRequest.open('GET', requestURL);
  getRequest.setRequestHeader('Content-Type', 'application/json');
  getRequest.send();
  getRequest.addEventListener('load', function(event){
    if (event.target.status === 200 && event.target.readyState === 4) {
      console.log("== Data Acquired");
      data = JSON.parse(getRequest.response);
      for(var i in data.data){
        try{
          console.log(data.data[i].values[0])
          myData[1].values.push(data.data[i].values[0]);
        }
        catch{
          console.log("== Could not process data", i);
        }
    }
  }
    else{
      console.log("== Could not acquire data");
    }
  });
}

//listener setup section

function makeListeners(){
    var tryItButton = document.getElementsByClassName("btn")[0];
    tryItButton.addEventListener("click", runSimulation);
}

getMongoData();
makeListeners();
