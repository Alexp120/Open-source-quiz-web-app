import random from '../quizzes/random-quiz-questions.json' assert{type: 'json'};

let score = 0;

document.getElementById("color-div").innerHTML =  `
            
        
        <h1 class="question" id="question">Quiz question</h1>
        <div class="answer-container">
            <button id="clickA">A.</button>
            <h2 id="A">answer</h2>

        </div>
        <div class="answer-container">
            <button id="clickB">B.</button>
            <h2 id="B">answer</h2>
        </div>
        <div class="answer-container">
            <button id="clickC">C.</button>
            <h2 id="C">answer</h2>
        </div>
        <div class="answer-container">
            <button id="clickD">D.</button>
            <h2 id="D">answer</h2>
        </div>
        <div class="info-container" >
            <div class="score-elements" > 
                <label id="score" class="score">  </label>
                <label id="score-animate" class="score-notification make-invisible" >+100</label>
            </div>
            <div id="result" class="result" ></div>
            <button id="next-question-button" class="next-question-button make-invisible">Next Question</button>
        </div>
        `;







let isEventListenerEnabled = true;

let selectedQuiz = random;



const questionView = document.getElementById('question');
const scoreDisp = document.getElementById("score");
const a = document.getElementById('A')
const b = document.getElementById('B')
const c = document.getElementById('C')
const d = document.getElementById('D')

const buttonA = document.getElementById('clickA');
const buttonB = document.getElementById('clickB');
const buttonC = document.getElementById('clickC');
const buttonD = document.getElementById('clickD');
const nextQuestionButton = document.getElementById("next-question-button");
const scoreAnimDisp = document.getElementById("score-animate")
const resultDisp = document.getElementById("result");


let slectedAnswerAnimationTarget = null;


const checkAnswer = (selAnswer, buttonClicked) => {
    let answer = selectedQuiz[usedRandomQuesions]["answer"]
    //answerDisp.innerHTML = `Answer : ${selAnswer}`;
    if(selAnswer === answer){
        slectedAnswerAnimationTarget = buttonClicked;

        isEventListenerEnabled = false

        score = score += 100

        scoreDisp.innerHTML = `${score}`

        nextQuestionButton.classList.remove("make-invisible")

        slectedAnswerAnimationTarget.classList.add("selected-answer");

        animateResult(scoreAnimDisp, 'flash');
        animateResult(resultDisp, 'result')

        stopTimer();

        resultDisp.innerHTML = "Correct!";


        returnToOriginalColor();
    }else{
        randomQuestion(1);
        resetTimer();
        startTimer();
    }
}   

                              // so the event listeners dont throw errors being assigned to nothing
buttonA.addEventListener("click", () => {
    if(isEventListenerEnabled === true){
      checkAnswer("A", buttonA);  
    }
    
})

buttonB.addEventListener("click", () => {
    if(isEventListenerEnabled === true){
    checkAnswer("B", buttonB);
    }
})

buttonC.addEventListener("click", () => {
    if(isEventListenerEnabled === true){
    checkAnswer("C", buttonC);
    }
})

buttonD.addEventListener("click", () => {
    if(isEventListenerEnabled === true){
    checkAnswer("D", buttonD);
}
}) 

nextQuestionButton.addEventListener("click", () => {
    randomQuestion(1);
    resetEnvirionment();
    resetTimer();
    startTimer();
    resultDisp.innerHTML = "";
})
    

const resetEnvirionment = () => {
    isEventListenerEnabled = true;
    nextQuestionButton.classList.add("make-invisible")
    if(slectedAnswerAnimationTarget !== null){
        slectedAnswerAnimationTarget.classList.remove("selected-answer")
    }
    slectedAnswerAnimationTarget = null
    resultDisp.classList.remove("result-bounce");
}

// result animation functionality : 


    /* create a function that does the following :
    
    1 - when called animateResult(elementID, 'flash') it shows elementID for 1s then dissapears, it also has a slide in out transition
        thats cleared after 1.6s

    2 - when callled animateResult(elementID, 'result') it shows the element untill next button is clicked

    3 - the 'result' animation consists of each letter being seprate and floating up in a wave pattern then setting down flat
    
    */

const animateResult = (elementId, animType) => {
    if(animType === 'flash'){
        elementId.classList.replace("make-invisible", "show");
        elementId.classList.add("score-transition-in");
        setTimeout(() => {
           elementId.classList.replace("show", "make-invisible");
           elementId.classList.replace("score-transition-in", "score-transition-out");
        }, 1000);
        setTimeout(() => {
            elementId.classList.remove("score-transition-out");
        }, 1600);
    }else if(animType === 'result'){
        resultDisp.classList.add("result-bounce")
        setTimeout(() => {
            resultDisp.classList.remove("result-bounce")
        }, 2000);
    }
}



    // function for timer :





/* create a function that does the following:

1 - counts down from 30 and logs every second until 0

2 - has a blinking log that happends on the last 5 seconds and is almost like a heart beat, like beat, beat, puase, beat beat etc.

3 - logs next question when timer runs to 0

4 - has a stopper function that can be run from anywhere 
*/
const timeDisp = document.getElementById("timer");

let timerInterval = null;
let timeAllotted = 30;
let timePassed = 0;
let timeLeft;

const divColor = document.getElementById("color-div").classList;

const pulse = () => {

    if(divColor.contains("pulse-border")){
        divColor.remove("pulse-border")  // pulses the div
   }else{divColor.add("pulse-border")}

    setTimeout(() => {

        if(divColor.contains("pulse-border")){
            divColor.remove("pulse-border")  // pulses the div
       }else{
        divColor.add("pulse-border")
    }

    }, 500);
    
}



const stopTimer = () => {
    if(timerInterval !== null){
    clearInterval(timerInterval);
    }
    timePassed = 0;
    timerInterval = null;
}


const startTimer = () => {
    stopTimer();
    timerInterval = setInterval(() => {
        timePassed++
        timeLeft = timeAllotted - timePassed;

        checkTimeLeft();

        if(timeLeft < 6 && timeLeft > 0){
            pulse();
        }

        if(timeLeft === 0){
            stopTimer();
            console.log('timer stopped')
            returnToOriginalColor();
            timePassed = 0;
            isEventListenerEnabled = false;
            nextQuestionButton.classList.remove("make-invisible")
        }
    }, 1000)
}

let currentColor = "green"
const checkTimeLeft = () => {

    timeDisp.innerHTML = `${timeLeft}`

    if(timeLeft == Math.floor(timeAllotted / 1.2)){
        currentColor = 'warning-color'
        document.getElementById("color-div").classList.replace("safe-color", "warning-color")
    }else if(timeLeft === Math.floor(timeAllotted / 2)){
        currentColor = 'urgent-color'
        document.getElementById("color-div").classList.replace("warning-color", "urgent-color")
    }
}

const returnToOriginalColor = () => {
    if(currentColor === 'urgent-color'){
    document.getElementById("color-div").classList.replace("warning-color", "safe-color")
}else if(currentColor === 'urgent-color'){
    document.getElementById("color-div").classList.replace("urgent-color", "safe-color")
}
}


const resetTimer = () => {
    stopTimer();
    timeDisp.innerHTML = timeAllotted;
    returnToOriginalColor();
}

























//question functionality :


let usedRandomQuesions = 0;

    const randomQuestion = (num) => {
        startTimer();
        if(num === 1){
            usedRandomQuesions++
        }else if (usedRandomQuesions >= 1){
            usedRandomQuesions --
        }
        const qA = selectedQuiz[usedRandomQuesions]["A"];
        const qB = selectedQuiz[usedRandomQuesions]["B"];
        const qC = selectedQuiz[usedRandomQuesions]["C"];
        const qD = selectedQuiz[usedRandomQuesions]["D"];
        a.innerHTML = qA.replace(qA[0],qA[0].toUpperCase());
        b.innerHTML = qB.replace(qB[0],qB[0].toUpperCase());;
        c.innerHTML = qC.replace(qC[0],qC[0].toUpperCase());;
        d.innerHTML = qD.replace(qD[0],qD[0].toUpperCase());;
        questionView.innerHTML = selectedQuiz[usedRandomQuesions]["question"];
        timeDisp.innerHTML = timeAllotted;
    
    }

    randomQuestion();


    // function to load the different screens inside the div :

