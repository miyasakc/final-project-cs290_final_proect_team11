//runs a monte carlo simulation with n = trials and returns number

function runSimulation(trials){ 
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

module.exports = (runSimulation); //export for external usage