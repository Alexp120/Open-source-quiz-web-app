import random from './quizzes/random-quiz-questions.json' assert{type: 'json'};

let selectedQuiz = random;

const questionView = document.getElementById('question');
const a = document.getElementById('A')
const b = document.getElementById('B')
const c = document.getElementById('C')
const d = document.getElementById('D')

const buttonA = document.getElementById('clickA');
const buttonB = document.getElementById('clickB');
const buttonC = document.getElementById('clickC');
const buttonD = document.getElementById('clickD');

const scoreDisp = document.getElementById('score');
const resultDisp = document.getElementById('result');
const answerDisp = document.getElementById('answer');

const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('previos-button')
 

let usedRandomQuesions = 0;
let score = 0;


const randomQuestion = (num) => {

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

}

randomQuestion();


const checkAnswer = (selAnswer) => {
    let answer = selectedQuiz[usedRandomQuesions]["answer"]
    answerDisp.innerHTML = `Answer : ${selAnswer}`;
    if(selAnswer === answer){
        resultDisp.innerHTML = `Result : Correct!`
        scoreDisp.innerHTML = `Score : ${score += 10}`
    }else{
        resultDisp.innerHTML = `Result : Incorrect!`
        scoreDisp.innerHTML = `Score : ${score -= 10}`
    }
}   

buttonA.addEventListener("click", () => {
    checkAnswer("A");
})

buttonB.addEventListener("click", () => {
    checkAnswer("B");
})

buttonC.addEventListener("click", () => {
    checkAnswer("C");
})

buttonD.addEventListener("click", () => {
    checkAnswer("D");
})

nextButton.addEventListener("click", () => {
    randomQuestion(1);
})

prevButton.addEventListener("click", () => {
    randomQuestion()
})

