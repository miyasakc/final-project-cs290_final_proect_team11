function simulate(trials){ 
    var inside = 0; //holds the number of points stored inside the circle
    // console.log("Running Monte Carlo simulation with n =", trials);
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
            event.stopPropagation();
        } else if(numpoints > 90000000){
            alert("The maximum number of points is 90,000,000!");
        }else {
            alert("You need to have at least 1 point!");
        }
    }else{
        alert("Enter a number of points to generate!");
    }
}

//listener setup section

function makeListeners(){
    var tryItButton = document.getElementsByClassName("btn")[0];
    tryItButton.addEventListener("click", runSimulation);
}

makeListeners();