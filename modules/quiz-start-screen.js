

    const script = document.createElement("script");
    
    
    script.src =  "../modules/randomExpierience.js"
    script.type = "module";

    const loadEnvirionment = (status) => {
        let stat = status;
        if(stat === 1){

            document.getElementById("color-div").innerHTML = `
            <div class="start-button-parent">
            <button id="start-button" class="start-button">Start</button>
            </div>

            `
        }else if(stat === 2){

            document.body.appendChild(script);
    }
    }
    

    loadEnvirionment(1);  // load the initial state

    const startButton = document.getElementById("start-button");
 

startButton.addEventListener("click", () => {
    loadEnvirionment(2);
})
