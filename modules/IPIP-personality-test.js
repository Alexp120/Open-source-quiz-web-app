
import testData from "../quizzes/personality-test-data.json" assert{type: 'json'}

const testBody = document.getElementById('test-body');
const pageDisp = document.getElementById('page-count');
const testContainer = document.getElementById('test-container');
const testTitle = document.getElementById("test-title");

const elementLimit = 6;
let elementTotal = elementLimit;
let elementCount = 0; 
let pageCount = 0;
const pageLimit = 9;
// clear the sentence interval in the api call !

function generateFormItem (data) {
    testBody.innerHTML = '';
    pageDisp.innerHTML = `Progress: ${pageCount}/9`

    if(pageCount === pageLimit - 1){
        nextButton.innerText = 'Submit'
    }

    for(let i = elementCount; i < elementTotal && i < 50; i++){
        const question = data[i]["question"];
        const typeOfQ = data[i]["type"];
        const modifier = data[i]["modifier"];
        
        if(modifier === "+"){
                    testBody.innerHTML +=(
            `
            <div class="form-item">
            <label class="questions">I ${question.toLowerCase()}.</label>
            <div class="form-input-container">
                <label>Accurate</label>
                <input required type="radio" id="${typeOfQ}" name="${i}" value="5">
                <input required type="radio" id="${typeOfQ}" name="${i}" value="4">
                <input required type="radio" id="${typeOfQ}" name="${i}" value="3">
                <input required type="radio" id="${typeOfQ}" name="${i}" value="2">
                <input required type="radio" id="${typeOfQ}" name="${i}" value="1">
                <label>Inaccurate</label>
            </div>
        </div>
            `
        )
            }else if(modifier === "-"){
                testBody.innerHTML +=(
                    `
                    <div class="form-item">
                    <label class="questions">I ${question.toLowerCase()}.</label>
                    <div class="form-input-container">
                        <label>Accurate</label>
                        <input required type="radio" id="${typeOfQ}" name="${i}" value="1">
                        <input required type="radio" id="${typeOfQ}" name="${i}" value="2">
                        <input required type="radio" id="${typeOfQ}" name="${i}" value="3">
                        <input required type="radio" id="${typeOfQ}" name="${i}" value="4">
                        <input required type="radio" id="${typeOfQ}" name="${i}" value="5">
                        <label>Inaccurate</label>
                    </div>
                </div>
                    `
                )
            }
        }
}


generateFormItem(testData) // initializing the envirionment

// next button functionality:

const nextButton = document.getElementById('next-button'); 


nextButton.addEventListener("click", () => {
    if(testBody.checkValidity()){
            saveRadioAnswers(); 
            
        if(pageCount === pageLimit - 1){
            calculateResults();
            analizeData();
        }else{
         
        elementTotal += elementLimit;
        elementCount += elementLimit;
        pageCount += 1
        generateFormItem(testData);
    }
    }else{
         console.log('failed')
    }
}) 
 // handling the answers for each page :
let answerArr = [];

const saveRadioAnswers = () => {

    const radios = testBody.elements;

    for(let i = 0; i < testBody.elements.length; i++){
        let radio = radios[i]
        if(radio.checked){
            answerArr.push([radio.value, radio.id]);
        }
    }
    console.log(answerArr)
}

/* 
    calculation formula and info :
    each out of the 5 items tested for have a maximum score out of 50
    each item is already keyed for if its a negative or positive so a sum of each type is all that is needed;
*/

    let extraversionScore = 0;
    let agreeabllnessScore = 0;
    let conscientiousnessScore = 0;
    let stabilityScore = 0;
    let imaginationIntellectScore = 0

const calculateResults = () => {

    answerArr.forEach(e => {
        const value = Number(e[0])
        switch (Number(e[1])) {
            case 1: extraversionScore += value
                break;
            case 2: agreeabllnessScore += value
                break;
            case 3: conscientiousnessScore += value
                break;
            case 4: stabilityScore += value
                break;
            case 5: imaginationIntellectScore += value
                break;
            default: console.log('error')
                break;
        }

    });
    loadingScreen()
}


// ai analyzation and results handling:
const analizeData = () => { 
        
       const userPrompt  =   `
            Extraversion: ${extraversionScore}/50
            Agreeableness: ${agreeabllnessScore}/50
            Conscientiousness: ${conscientiousnessScore}/50
            Emotional stability: ${stabilityScore}/50
            Imagination / Intellect: ${imaginationIntellectScore}/50`;

    fetch('http://localhost:3000',{
    method: 'POST',
    headers: {
        'content-Type' : 'application/json'
        },
        body: JSON.stringify({
            message: userPrompt
         })
}) 
.then(res => res.json())
.then(data => {
    testTitle.innerText = `Your Assessment`

    

    testContainer.innerHTML = `
    <div class="results-body">
        <div class="graph-container">
        <canvas id="myChart"></canvas>
        </div>
        <div class="results-paragraph">${data.completion.content}<div>
</div>
    `
    loadChartJS([extraversionScore, agreeabllnessScore, conscientiousnessScore, stabilityScore, imaginationIntellectScore]);
})

}


// loading screen handling :

const loadingScreen = () => {
    testContainer.innerHTML = `

<div class="results-body">
<div class="loader">
<div class="circle">
  </div>
<div class="circle">
  </div>
<div class="circle">
  </div>
<div class="circle">
  </div>
<div class="circle">
  </div>
<div class="circle">
  </div>
<div class="circle">
  </div>
<div class="circle">
  </div>
<div class="circle">
  </div>
<div class="circle">
  </div>
</div>
</div>
<h1 class="loading-sentences" id="loading-sentences"></h1>

`

    const loadingScreenSentences = [
        "Counting squirrels...",
        "Analyzing your quirks and perks...",
        "Unboxing the mysteries of you...",
        "Sorting your personality pixels...",
        "Observing puppies...",
        "Finding the gems in your traits...",
        "Tickling your neurons gently...",
        "Motivating squirrels",
        "Digging into the personality treasure chest...",
        "Crafting your personality potion...",
        "Polishing the mirrors of your mind...",
        "Decoding your uniqueness...",
        "Baking your personality pie...",
        "More agressively motivating the squirrels",
        "Mixing and matching your vibes...",
        "Unraveling the threads of your character...",
        "Assembling your personality puzzle...",
        "Juggling your quirks with care...",
        "Stirring the cauldron of your traits...",
        "Mapping the landscape of your character...",
        "Brewing your distinct personality blend...",
        "Inventing your personality dance...",
        "Weaving the tapestry of your traits...",
        "Launching your personality fireworks...",
        "The squirrels may be giving up, stay strong...",
        "counting stars..."
      ];
       
      let counter = 0;
      let loopsPassed = 0
      document.getElementById("loading-sentences").innerHTML = loadingScreenSentences[counter];  
      const loadSentenceInterval = setInterval(() => {
        
        counter ++
        document.getElementById("loading-sentences").innerHTML = loadingScreenSentences[counter];  
        if(counter > loadingScreenSentences.length - 2){
        counter = 0;
        loopsPassed++
      }
        if(document.querySelector("results-paragraph") || loopsPassed > 3){
            clearInterval(loadSentenceInterval);
            if(loopsPassed > 3){
                document.getElementById("loading-sentences").innerHTML = `Sorry it seems something went wrong, this test is still new
                                                                            so I havn't worked out all the bugs`; 
            }
        }
      }, 3000);
    
}

// creating the chart functionality:

 const loadChartJS = (data) => {
  
      const ctx = document.getElementById('myChart');
      const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Extraversion', 'Agreeableness', 'Conscientiousness', 'Emotional stability', 'Imagination / Intellect'],
          
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.9)',
              'rgba(54, 162, 235, 0.9)',
              'rgba(255, 206, 86, 0.9)',
              'rgba(75, 192, 192, 0.9)',
              'rgba(153, 102, 255, 0.9)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)'
            ],
            borderWidth: 1
          }]
        },
        options:{
          responsive: true,
          aspectRatio: 1,
          maintainAspectRatio: false,
        }
      });  
      

  }
