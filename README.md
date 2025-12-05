# QuizMaster - Interactive Quiz Application

A responsive web-based quiz application that allows users to test their knowledge across various topics using the Open Trivia Database API.

## 🎯 Project Overview

QuizMaster is a frontend capstone project built with HTML, CSS, and JavaScript. Users can select quiz categories, difficulty levels, and number of questions, then take interactive quizzes and track their performance over time.

## ✨ Features

### Core Features
- 📚 Multiple quiz categories (Science, History, Sports, Entertainment, etc.)
- 🎚️ Three difficulty levels (Easy, Medium, Hard)
- 📊 Real-time score tracking
- ✅ Instant feedback on answers
- 📱 Fully responsive design for all devices

### Additional Features (Planned)
- 🔍 Search functionality for quiz topics
- 📈 Quiz history and performance tracking
- 🔄 Option to retake quizzes
- 💡 Answer explanations and review mode

## 🛠️ Technologies Used

- **HTML5** - Structure and content
- **CSS3 / Tailwind CSS** - Styling and responsive design
- **JavaScript (ES6+)** - Application logic and interactivity
- **Open Trivia Database API** - Quiz questions and categories

## 📋 API Reference

This project uses the [Open Trivia Database API](https://opentdb.com/)

**Example Endpoints:**
- Fetch categories: `https://opentdb.com/api_category.php`
- Fetch questions: `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. Clone the repository
```bash
git clone https://github.com/Rayo-Johnson/quiz-app.git
```

2. Navigate to the project directory
```bash
cd quiz-app
```

3. Open `index.html` in your browser or use a local server
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

4. Visit `http://localhost:8000` in your browser

## 📁 Project Structure

```
quiz-app/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Custom styles
├── js/
│   ├── app.js             # Main application logic
│   ├── api.js             # API integration
│   └── utils.js           # Helper functions
├── assets/
│   ├── images/            # Images and icons
│   └── designs/           # Design mockups
├── README.md              # Project documentation
└── .gitignore             # Git ignore file
```

## 🎨 Design

High-fidelity designs are available in the `/assets/designs/` folder, including:
- Landing page (category selection)
- Quiz interface (question display)
- Results screen (score summary)

All designs are responsive and optimized for desktop, tablet, and mobile devices.

## 🔄 Current Progress

- [x] Project planning and documentation
- [x] High-fidelity design mockups
- [x] GitHub repository setup
- [ ] HTML structure implementation
- [ ] CSS styling with Tailwind
- [ ] JavaScript functionality
- [ ] API integration
- [ ] Testing and bug fixes
- [ ] Deployment

## 🚧 Roadmap

### Week 1-2
- Set up project structure
- Implement HTML layout
- Apply Tailwind CSS styling

### Week 3
- Integrate Open Trivia Database API
- Build quiz logic and state management
- Implement score tracking

### Week 4
- Add quiz history feature
- Final styling and responsiveness
- Testing and deployment

## 🤝 Contributing

This is a student capstone project, but feedback and suggestions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Motunrayo Johnson**
- GitHub: [@Rayo-Johnson](https://github.com/Rayo-Johnson)

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the quiz API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- Course instructors and mentors for guidance

---

**Note:** This project is currently in development. Check back for updates!

