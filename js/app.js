// QuizMaster App - Landing Page JavaScript
// This handles the quiz configuration and form submission

// State to store quiz settings
let quizSettings = {
    category: '',
    difficulty: 'easy', // Default difficulty
    numQuestions: 10
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('QuizMaster initialized!');
    
    // Set up difficulty button handlers
    setupDifficultyButtons();
    
    // Set up form submission
    setupFormSubmission();
});

// Handle difficulty button clicks
function setupDifficultyButtons() {
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    
    difficultyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            difficultyButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('bg-gray-100', 'text-gray-700');
                btn.classList.remove('bg-green-100', 'text-green-700');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.classList.remove('bg-gray-100', 'text-gray-700');
            this.classList.add('bg-green-100', 'text-green-700');
            
            // Update quiz settings
            quizSettings.difficulty = this.dataset.difficulty;
            console.log('Difficulty selected:', quizSettings.difficulty);
        });
    });
}

// Handle form submission
function setupFormSubmission() {
    const quizForm = document.getElementById('quizForm');
    
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page reload
        
        // Get form values
        const category = document.getElementById('category').value;
        const numQuestions = document.getElementById('numQuestions').value;
        
        // Validate category selection
        if (!category) {
            alert('Please select a category!');
            return;
        }
        
        // Update quiz settings
        quizSettings.category = category;
        quizSettings.numQuestions = numQuestions;
        
        // Log settings (for now - later we'll use this to fetch quiz data)
        console.log('Starting quiz with settings:', quizSettings);
        
        // Show loading message
        const startBtn = document.getElementById('startBtn');
        startBtn.innerHTML = `
            <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading Quiz...
        `;
        startBtn.disabled = true;
        
        // Simulate quiz loading (2 seconds)
        // In the next phase, we'll actually fetch quiz data from the API here
        setTimeout(() => {
            alert(`Quiz Ready!\nCategory: ${getCategoryName(category)}\nDifficulty: ${quizSettings.difficulty}\nQuestions: ${numQuestions}\n\n(Quiz page coming soon!)`);
            
            // Reset button
            startBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                Start Quiz
            `;
            startBtn.disabled = false;
        }, 2000);
    });
}

// Helper function to get category name
function getCategoryName(categoryId) {
    const categories = {
        '9': 'General Knowledge',
        '17': 'Science & Nature',
        '23': 'History',
        '21': 'Sports',
        '11': 'Entertainment: Film',
        '12': 'Entertainment: Music',
        '18': 'Science: Computers',
        '22': 'Geography'
    };
    return categories[categoryId] || 'Unknown';
}

// Export settings for use in other files (later)
// This will be used when we add the quiz page
function getQuizSettings() {
    return quizSettings;
}