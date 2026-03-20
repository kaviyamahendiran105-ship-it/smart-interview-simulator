// ============================================
// VARIABLES AND DATA TYPES
// ============================================

// String variables - Questions
var hrQuestions = [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "What are your strengths?",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?"
];

var techQuestions = [
    "What is HTML?",
    "What is CSS?",
    "What is JavaScript?",
    "What is a function?",
    "What is an array?"
];

var codingQuestions = [
    "What is a variable?",
    "What is a loop?",
    "What is an if statement?",
    "What is debugging?",
    "What is GitHub?"
];

// Array of objects - Keywords for scoring
var keywords = [
    { word: "experience", points: 20 },
    { word: "learn", points: 20 },
    { word: "team", points: 20 },
    { word: "skill", points: 20 },
    { word: "work", points: 20 }
];

// Number variables
var currentIndex = 0;
var totalScore = 0;
var timeLeft = 60;
var maxQuestions = 5;

// String variable - Current interview type
var currentType = "";

// Boolean variable
var isTimerRunning = false;

// ============================================
// DOM SELECTION METHODS
// ============================================

// Get elements by ID
var typeDiv = document.getElementById("typeSelection");
var interviewDiv = document.getElementById("interviewArea");
var scoreDiv = document.getElementById("scoreArea");
var chatContainer = document.getElementById("chatContainer");
var questionNumber = document.getElementById("questionNumber");
var timerDisplay = document.getElementById("timerDisplay");
var userAnswer = document.getElementById("userAnswer");
var submitBtn = document.getElementById("submitBtn");
var finalScore = document.getElementById("finalScore");
var feedbackMessage = document.getElementById("feedbackMessage");
var restartBtn = document.getElementById("restartBtn");

// Get buttons by ID
var hrBtn = document.getElementById("hrBtn");
var techBtn = document.getElementById("techBtn");
var codingBtn = document.getElementById("codingBtn");

// ============================================
// ARROW FUNCTIONS AND FUNCTION FORMS
// ============================================

// Regular function declaration
function showMessage(sender, text) {
    var messageDiv = document.createElement("div");
    messageDiv.className = "message";
    
    if (sender === "interviewer") {
        messageDiv.classList.add("interviewer");
        messageDiv.innerHTML = "<strong>Interviewer:</strong> " + text;
    } else {
        messageDiv.classList.add("user-message");
        messageDiv.innerHTML = "<strong>You:</strong> " + text;
    }
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function expression
var clearChat = function() {
    chatContainer.innerHTML = "";
};

// Arrow function
const updateQuestionNumber = () => {
    questionNumber.textContent = "Question " + (currentIndex + 1) + "/5";
};

// Arrow function with parameters
const updateTimer = (seconds) => {
    timerDisplay.textContent = seconds + "s";
    if (seconds <= 10) {
        timerDisplay.classList.add("timer-warning");
    } else {
        timerDisplay.classList.remove("timer-warning");
    }
};

// ============================================
// OBJECT BASICS
// ============================================

// Simple object for user progress
var userProgress = {
    type: "",
    questionsAttempted: 0,
    correctAnswers: 0,
    score: 0
};

// Object with method
var timer = {
    interval: null,
    start: function() {
        this.interval = setInterval(function() {
            if (timeLeft > 0) {
                timeLeft = timeLeft - 1;
                updateTimer(timeLeft);
                
                if (timeLeft === 0) {
                    clearInterval(timer.interval);
                    handleTimeout();
                }
            }
        }, 1000);
    },
    stop: function() {
        clearInterval(this.interval);
    }
};

// ============================================
// FUNCTIONS - Main Logic
// ============================================

function startInterview(type) {
    // Store type in object
    userProgress.type = type;
    currentType = type;
    currentIndex = 0;
    totalScore = 0;
    
    // DOM manipulation - changing display
    typeDiv.style.display = "none";
    interviewDiv.style.display = "block";
    scoreDiv.style.display = "none";
    
    // Clear chat
    clearChat();
    
    // Show first question
    displayQuestion();
}

function displayQuestion() {
    // Check if interview is complete
    if (currentIndex >= maxQuestions) {
        showFinalScore();
        return;
    }
    
    // Update question number
    updateQuestionNumber();
    
    // Get question based on type (CONDITIONAL PARTS)
    var questionText = "";
    
    if (currentType === "hr") {
        questionText = hrQuestions[currentIndex];
    } else if (currentType === "technical") {
        questionText = techQuestions[currentIndex];
    } else if (currentType === "coding") {
        questionText = codingQuestions[currentIndex];
    }
    
    // Show interviewer message
    showMessage("interviewer", questionText);
    
    // Reset timer
    timeLeft = 60;
    updateTimer(timeLeft);
    
    // Start timer
    timer.start();
    
    // Clear answer box
    userAnswer.value = "";
}

function checkAnswer(answer) {
    var scoreEarned = 0;
    var answerLower = answer.toLowerCase();
    
    // Using LOOP to check keywords
    for (var i = 0; i < keywords.length; i++) {
        var keyword = keywords[i].word;
        var points = keywords[i].points;
        
        // Using conditional to check if keyword exists
        if (answerLower.indexOf(keyword) > -1) {
            scoreEarned = scoreEarned + points;
        }
    }
    
    // Update total score
    totalScore = totalScore + scoreEarned;
    
    // Update user progress object
    userProgress.questionsAttempted = userProgress.questionsAttempted + 1;
    userProgress.score = totalScore;
    
    return scoreEarned;
}

function submitAnswerHandler() {
    // Get answer
    var answer = userAnswer.value;
    
    // Conditional check
    if (answer === "") {
        alert("Please type an answer!");
        return;
    }
    
    // Stop timer
    timer.stop();
    
    // Show user's answer
    showMessage("user", answer);
    
    // Check answer and get score
    var scoreEarned = checkAnswer(answer);
    
    // Show feedback using conditional
    var feedbackText = "";
    
    if (scoreEarned >= 60) {
        feedbackText = "Excellent answer! You earned " + scoreEarned + " points.";
    } else if (scoreEarned >= 30) {
        feedbackText = "Good answer! You earned " + scoreEarned + " points.";
    } else {
        feedbackText = "Try to include keywords like: experience, learn, team, skill, work.";
    }
    
    // Show feedback message
    var feedbackDiv = document.createElement("div");
    feedbackDiv.className = "message feedback-message";
    feedbackDiv.innerHTML = "<strong>Feedback:</strong> " + feedbackText;
    chatContainer.appendChild(feedbackDiv);
    
    // Move to next question
    currentIndex = currentIndex + 1;
    
    // Show next question after delay (using setTimeout closure)
    setTimeout(function() {
        displayQuestion();
    }, 2000);
}

// ============================================
// CLOSURE EXAMPLE
// ============================================

function createScoreKeeper() {
    var interviewScores = [];
    
    // Inner function has access to interviewScores (CLOSURE)
    return function(score) {
        interviewScores.push(score);
        return interviewScores;
    };
}

var saveScore = createScoreKeeper();

// ============================================
// HANDLER FUNCTIONS
// ============================================

function handleTimeout() {
    alert("Time's up! Moving to next question.");
    
    // Move to next question
    currentIndex = currentIndex + 1;
    displayQuestion();
}

function showFinalScore() {
    // Stop timer
    timer.stop();
    
    // DOM manipulation - hide/show
    interviewDiv.style.display = "none";
    scoreDiv.style.display = "block";
    
    // Calculate percentage
    var maxScore = maxQuestions * 100;
    var percentage = (totalScore / maxScore) * 100;
    
    // Round to nearest integer
    percentage = Math.round(percentage);
    
    // Save score using closure
    var allScores = saveScore(percentage);
    
    // Display score
    finalScore.textContent = percentage + "%";
    
    // Feedback based on score
    var message = "";
    
    if (percentage >= 80) {
        message = "🌟 Excellent! You're ready for real interviews!";
    } else if (percentage >= 60) {
        message = "👍 Good job! Keep practicing to improve!";
    } else if (percentage >= 40) {
        message = "📚 Fair attempt. Review the topics and try again!";
    } else {
        message = "💪 Need more practice. Don't give up!";
    }
    
    feedbackMessage.textContent = message;
    
    // Save to localStorage
    localStorage.setItem("lastScore", percentage);
    localStorage.setItem("lastType", currentType);
    
    // Show all scores (using closure)
    console.log("All interview scores:", allScores);
}

function restartInterview() {
    // Show type selection
    typeDiv.style.display = "block";
    interviewDiv.style.display = "none";
    scoreDiv.style.display = "none";
    
    // Reset variables
    currentIndex = 0;
    totalScore = 0;
    timeLeft = 60;
    
    // Reset user progress object
    userProgress.questionsAttempted = 0;
    userProgress.score = 0;
    
    // Clear chat
    clearChat();
}

// ============================================
// EVENT HANDLING METHODS
// ============================================

// Using addEventListener
hrBtn.addEventListener("click", function() {
    startInterview("hr");
});

techBtn.addEventListener("click", function() {
    startInterview("technical");
});

codingBtn.addEventListener("click", function() {
    startInterview("coding");
});

submitBtn.addEventListener("click", submitAnswerHandler);

restartBtn.addEventListener("click", restartInterview);

// Keypress event
userAnswer.addEventListener("keypress", function(event) {
    // Check if Enter key is pressed (without Shift)
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent new line
        submitAnswerHandler();
    }
});

// ============================================
// WINDOW LOAD EVENT
// ============================================

window.addEventListener("load", function() {
    // Check localStorage for saved score
    var savedScore = localStorage.getItem("lastScore");
    var savedType = localStorage.getItem("lastType");
    
    if (savedScore !== null) {
        var message = "Your last " + savedType + " interview score was " + savedScore + "%";
        
        // Create and show notification
        var notification = document.createElement("div");
        notification.style.background = "#f0f0f0";
        notification.style.padding = "10px";
        notification.style.margin = "10px 0";
        notification.style.borderRadius = "5px";
        notification.style.textAlign = "center";
        notification.textContent = message;
        
        typeDiv.insertBefore(notification, typeDiv.firstChild);
        
        // Remove after 5 seconds
        setTimeout(function() {
            notification.remove();
        }, 5000);
    }
});

// ============================================
// ARRAY METHODS (Basics)
// ============================================

// Simple array manipulation
var practiceSessions = [];

function addSession(type, score) {
    // Add to array
    practiceSessions.push({
        type: type,
        score: score,
        date: new Date().toLocaleDateString()
    });
    
    // Keep only last 5 sessions
    if (practiceSessions.length > 5) {
        practiceSessions.shift();
    }
    
    console.log("Practice history:", practiceSessions);
}

// Call this when showing score
var originalShowScore = showFinalScore;
showFinalScore = function() {
    originalShowScore();
    addSession(currentType, totalScore);
};