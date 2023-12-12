import testData from "../quizzes/personality-test-data.json" assert{type: 'json'}


const testBody = document.getElementById('test-body');
const pageDisp = document.getElementById('page-count');
const testContainer = document.getElementById('test-container')

const elementLimit = 6;
let elementTotal = elementLimit;
let elementCount = 0; 
let pageCount = 0;
const pageLimit = 9;


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


generateFormItem(testData)

const nextButton = document.getElementById('next-button');


nextButton.addEventListener("click", () => {
    if(testBody.checkValidity()){
            saveRadioAnswers(); 
        if(pageCount === pageLimit - 1){
            calculateResults();
        }else{
         
        elementTotal += elementLimit;
        elementCount += elementLimit;
        pageCount += 1
        generateFormItem(testData);
    }
    }else{
         console.log('failed')
    }
    console.log('button-clicked')
   
}) 

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

const calculateResults = () => {
    let extraversionScore = 0;
    let agreeabllnessScore = 0;
    let conscientiousnessScore = 0;
    let stabilityScore = 0;
    let imaginationIntellectScore = 0
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
    testContainer.innerHTML = `

        <div class="results-body">
            <h1 class="header-label">Results</h1>
                <h1 class="header-label">Extraversion: ${extraversionScore}/50</h1>
                <h1 class="header-label">Agreeableness: ${agreeabllnessScore}/50</h1>
                <h1 class="header-label">Conscientiousness: ${conscientiousnessScore}/50</h1>
                <h1 class="header-label">Emotional stability: ${stabilityScore}/50</h1>
                <h1 class="header-label">Imagination / Intellect: ${imaginationIntellectScore}/50</h1>
        </div>
    
    `
}



// test key: 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