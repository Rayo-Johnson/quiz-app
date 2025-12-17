// ============================================
// QuizMaster App - Complete JavaScript
// ============================================

// Global State
let quizState = {
    settings: {
        category: '',
        difficulty: 'easy',
        numQuestions: 10
    },
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answeredQuestions: 0
};

// API Configuration
const API_BASE_URL = 'https://opentdb.com/api.php';

// Category Names Mapping
const CATEGORIES = {
    '9': 'General Knowledge',
    '17': 'Science & Nature',
    '23': 'History',
    '21': 'Sports',
    '11': 'Entertainment: Film',
    '12': 'Entertainment: Music',
    '18': 'Science: Computers',
    '22': 'Geography'
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('QuizMaster initialized!');
    initializeLandingPage();
});

// ============================================
// LANDING PAGE
// ============================================

function initializeLandingPage() {
    // Setup difficulty buttons
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    difficultyButtons.forEach(button => {
        button.addEventListener('click', handleDifficultyClick);
    });
    
    // Setup form submission
    const quizForm = document.getElementById('quizForm');
    quizForm.addEventListener('submit', handleFormSubmit);
}

function handleDifficultyClick(e) {
    // Remove active class from all buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    e.target.classList.add('active');
    
    // Update state
    quizState.settings.difficulty = e.target.dataset.difficulty;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const category = document.getElementById('category').value;
    const numQuestions = document.getElementById('numQuestions').value;
    
    if (!category) {
        alert('Please select a category!');
        return;
    }
    
    // Update state
    quizState.settings.category = category;
    quizState.settings.numQuestions = numQuestions;
    
    // Show loading state
    const startBtn = document.getElementById('startBtn');
    startBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading Quiz...
    `;
    startBtn.disabled = true;
    
    // Fetch quiz questions from API
    try {
        await fetchQuizQuestions();
        initializeQuizScreen();
        switchScreen('quizScreen');
    } catch (error) {
        console.error('Error fetching quiz:', error);
        alert('Failed to load quiz questions. Please try again!');
        
        // Reset button
        startBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
            Start Quiz
        `;
        startBtn.disabled = false;
    }
}

// ============================================
// API INTEGRATION
// ============================================

async function fetchQuizQuestions() {
    const { category, difficulty, numQuestions } = quizState.settings;
    
    // Build API URL
    const url = `${API_BASE_URL}?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;
    
    console.log('Fetching questions from:', url);
    
    // Fetch from API
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.response_code !== 0) {
        throw new Error('Failed to fetch questions');
    }
    
    // Process questions
    quizState.questions = data.results.map(q => ({
        question: decodeHTML(q.question),
        correctAnswer: decodeHTML(q.correct_answer),
        incorrectAnswers: q.incorrect_answers.map(a => decodeHTML(a)),
        allAnswers: shuffleArray([
            decodeHTML(q.correct_answer),
            ...q.incorrect_answers.map(a => decodeHTML(a))
        ])
    }));
    
    console.log('Questions loaded:', quizState.questions.length);
}

// Decode HTML entities (like &quot; to ")
function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ============================================
// QUIZ SCREEN
// ============================================

function initializeQuizScreen() {
    // Reset state
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.answeredQuestions = 0;
    
    // Update header info
    document.getElementById('totalQuestions').textContent = quizState.settings.numQuestions;
    document.getElementById('quizCategory').textContent = CATEGORIES[quizState.settings.category];
    document.getElementById('quizDifficulty').textContent = capitalizeFirst(quizState.settings.difficulty);
    
    // Setup exit button
    document.getElementById('exitBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
            resetQuiz();
            switchScreen('landingScreen');
        }
    });
    
    // Load first question
    loadQuestion();
}

function loadQuestion() {
    const question = quizState.questions[quizState.currentQuestionIndex];
    
    // Update question number
    document.getElementById('currentQuestion').textContent = quizState.currentQuestionIndex + 1;
    
    // Update progress bar
    const progress = ((quizState.currentQuestionIndex) / quizState.settings.numQuestions) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    // Update question text
    document.getElementById('questionText').textContent = question.question;
    
    // Update score display
    document.getElementById('currentScore').textContent = quizState.score;
    document.getElementById('questionsAnswered').textContent = quizState.answeredQuestions;
    
    // Render answer options
    const answerContainer = document.getElementById('answerOptions');
    answerContainer.innerHTML = '';
    
    question.allAnswers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'answer-btn w-full px-6 py-4 bg-gray-50 hover:bg-indigo-50 border-2 border-gray-200 hover:border-indigo-500 rounded-xl text-left font-semibold text-gray-700 hover:text-indigo-700 transition flex items-center justify-between group';
        button.innerHTML = `
            <span>${answer}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 group-hover:text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
        `;
        button.addEventListener('click', () => handleAnswerClick(answer, button));
        answerContainer.appendChild(button);
    });
}

function handleAnswerClick(selectedAnswer, button) {
    const question = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    // Update score
    quizState.answeredQuestions++;
    if (isCorrect) {
        quizState.score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        // Highlight correct answer
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(btn => {
            if (btn.textContent.includes(question.correctAnswer)) {
                btn.classList.add('correct');
            }
        });
    }
    
    // Disable all buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
    });
    
    // Update score display
    document.getElementById('currentScore').textContent = quizState.score;
    document.getElementById('questionsAnswered').textContent = quizState.answeredQuestions;
    
    // Move to next question or show results
    setTimeout(() => {
        quizState.currentQuestionIndex++;
        
        if (quizState.currentQuestionIndex < quizState.questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

// ============================================
// RESULTS SCREEN
// ============================================

function showResults() {
    const { score, answeredQuestions } = quizState;
    const percentage = Math.round((score / answeredQuestions) * 100);
    
    // Update score displays
    document.getElementById('finalScore').textContent = `${score}/${answeredQuestions}`;
    document.getElementById('finalPercentage').textContent = `${percentage}% Correct`;
    document.getElementById('correctCount').textContent = score;
    document.getElementById('incorrectCount').textContent = answeredQuestions - score;
    document.getElementById('totalCount').textContent = answeredQuestions;
    
    // Update message based on score
    const messageEl = document.getElementById('scoreMessage');
    if (percentage >= 80) {
        messageEl.textContent = 'Excellent! 🎉';
        messageEl.className = 'inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold';
    } else if (percentage >= 60) {
        messageEl.textContent = 'Good Job! 👍';
        messageEl.className = 'inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold';
    } else if (percentage >= 40) {
        messageEl.textContent = 'Not Bad! 💪';
        messageEl.className = 'inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold';
    } else {
        messageEl.textContent = 'Keep Trying! 📚';
        messageEl.className = 'inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold';
    }
    
    // Setup buttons
    document.getElementById('retryBtn').addEventListener('click', function() {
        resetQuiz();
        switchScreen('landingScreen');
    });
    
    document.getElementById('homeBtn').addEventListener('click', function() {
        resetQuiz();
        switchScreen('landingScreen');
    });
    
    // Switch to results screen
    switchScreen('resultsScreen');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function switchScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show selected screen
    document.getElementById(screenId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function resetQuiz() {
    quizState = {
        settings: {
            category: '',
            difficulty: 'easy',
            numQuestions: 10
        },
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        answeredQuestions: 0
    };
    
    // Reset form
    document.getElementById('quizForm').reset();
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-difficulty="easy"]').classList.add('active');
    
    // Reset start button
    const startBtn = document.getElementById('startBtn');
    startBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
        Start Quiz
    `;
    startBtn.disabled = false;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Log when app is ready
console.log('QuizMaster app loaded successfully!');