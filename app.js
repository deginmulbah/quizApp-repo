
(function () {
    function buildQuiz() {
        //   variables to store  the html output
        const output = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            //variable to store the list of possible answers
            const answers = [];

            //and for each available answer..
            for (letter in currentQuestion.answers) {
                //... add an html radio button
                answers.push(
                    `<label>
                       <input type="radio" name="question${questionNumber}" value="${letter}">
                       ${letter} :
                       ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            //  add this question and its answers to the output
            output.push(
                `<div class="slide">
                   <div class="question"> ${currentQuestion.question}</div>
                   <div class="answers"> ${answers.join('')}</div>
                </div>`
            );
        }
        );
        //finally combine the output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('')
    }
    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousBtn.style.color = 'red';
        }
        else {
            previousBtn.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextBtn.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextBtn.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }


    function showNextSlide() {
        showSlide(currentSlide + 1);
    }
    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }
    //Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('result')
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            question: "Who invented JavaScript?",
            answers: {
                a: "Douglas Crockford",
                b: "Sheryl Sandberg",
                c: "Brendan Eich"
            },
            correctAnswer: "c"
        },
        {
            question: "Which one of these is a JavaScript package manager?",
            answers: {
                a: "Node.js",
                b: "TypeScript",
                c: "npm"
            },
            correctAnswer: "c"
        },
        {
            question: "Which tool can you use to ensure code quality?",
            answers: {
                a: "Angular",
                b: "jQuery",
                c: "RequireJS",
                d: "ESLint"
            },
            correctAnswer: "d"
        }
        
    ];
    buildQuiz();
    // navigation

    const previousBtn = document.getElementById("pre");
    const nextBtn = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(currentSlide)

    submitButton.addEventListener('click', showResults);
    previousBtn.addEventListener('click', showPreviousSlide);
    nextBtn.addEventListener('click', showNextSlide);
})()