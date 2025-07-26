const questions = {
  gk: [
    { question: "Capital of India?", options: ["Mumbai", "Delhi", "Chennai", "Kolkata"], answer: "Delhi" },
    { question: "Currency of Japan?", options: ["Yen", "Won", "Dollar", "Rupee"], answer: "Yen" },
    { question: "National bird of India?", options: ["Sparrow", "Crow", "Peacock", "Parrot"], answer: "Peacock" },
    { question: "Which ocean is the largest?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: "Pacific" },
    { question: "Which country gifted the Statue of Liberty to the USA?", options: ["UK", "France", "Germany", "Italy"], answer: "France" },
    { question: "Where is the Great Wall located?", options: ["India", "China", "Nepal", "Japan"], answer: "China" },
    { question: "Which planet is called the Blue Planet?", options: ["Earth", "Mars", "Neptune", "Venus"], answer: "Earth" },
    { question: "Which festival is known as the Festival of Lights?", options: ["Diwali", "Holi", "Eid", "Christmas"], answer: "Diwali" },
    { question: "Taj Mahal is in which city?", options: ["Delhi", "Agra", "Jaipur", "Mumbai"], answer: "Agra" },
    { question: "Which is the largest desert?", options: ["Sahara", "Gobi", "Thar", "Kalahari"], answer: "Sahara" },
  ],
  science: [
    { question: "H2O is the chemical formula of?", options: ["Oxygen", "Water", "Hydrogen", "Helium"], answer: "Water" },
    { question: "Earth's only satellite?", options: ["Mars", "Moon", "Sun", "Venus"], answer: "Moon" },
    { question: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
    { question: "The center of an atom is called?", options: ["Proton", "Electron", "Nucleus", "Neutron"], answer: "Nucleus" },
    { question: "Which vitamin from sunlight?", options: ["A", "B", "C", "D"], answer: "D" },
    { question: "Boiling point of water?", options: ["90°C", "80°C", "100°C", "70°C"], answer: "100°C" },
    { question: "Largest organ in human body?", options: ["Heart", "Skin", "Liver", "Brain"], answer: "Skin" },
    { question: "Animals that eat plants?", options: ["Herbivores", "Carnivores", "Omnivores", "None"], answer: "Herbivores" },
    { question: "Which gas is needed to burn fire?", options: ["Nitrogen", "Carbon", "Oxygen", "Helium"], answer: "Oxygen" },
    { question: "Human blood is red due to?", options: ["Chlorophyll", "Iron", "Calcium", "Sodium"], answer: "Iron" },
  ],
  history: [
    { question: "Who was the first President of India?", options: ["Rajendra Prasad", "Nehru", "Gandhi", "Kalam"], answer: "Rajendra Prasad" },
    { question: "Who discovered America?", options: ["Columbus", "Vasco da Gama", "Einstein", "Newton"], answer: "Columbus" },
    { question: "Who fought in the Battle of Plassey?", options: ["Mughals", "British & Nawab", "French", "Dutch"], answer: "British & Nawab" },
    { question: "When did India get independence?", options: ["1945", "1946", "1947", "1950"], answer: "1947" },
    { question: "Who built the Red Fort?", options: ["Akbar", "Shah Jahan", "Babur", "Aurangzeb"], answer: "Shah Jahan" },
    { question: "Who was Mahatma Gandhi?", options: ["Scientist", "Freedom Fighter", "Teacher", "Doctor"], answer: "Freedom Fighter" },
    { question: "Who was Ashoka?", options: ["King", "Farmer", "Doctor", "Warrior"], answer: "King" },
    { question: "Quit India Movement started in?", options: ["1939", "1942", "1947", "1950"], answer: "1942" },
    { question: "Founder of Mughal Empire?", options: ["Babur", "Akbar", "Aurangzeb", "Humayun"], answer: "Babur" },
    { question: "Who was Bhagat Singh?", options: ["Singer", "Soldier", "Revolutionary", "Poet"], answer: "Revolutionary" },
  ]
};

let currentIndex = 0;
let currentCategory = 'gk';
let currentQuestions = [];
let score = 0;
let timerInterval;
let timeLeft = 10;

// ✅ Smooth polite sound for correct answer
const correctSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_5e6cba77e5.mp3');
correctSound.volume = 0.5;

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function startQuiz() {
  const name = document.getElementById('username').value.trim();
  if (!name) return alert("Please enter your name");

  currentCategory = document.getElementById('category').value;
  currentQuestions = questions[currentCategory];

  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('quiz-box').classList.remove('hidden');

  currentIndex = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  resetState();

  const questionObj = currentQuestions[currentIndex];
  document.getElementById('question-text').textContent = questionObj.question;

  const optionsList = document.getElementById('options');
  questionObj.options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    li.onclick = () => selectOption(li, option, questionObj.answer);
    optionsList.appendChild(li);
  });

  startTimer();

  const qBox = document.getElementById('question-box');
  qBox.classList.remove('fade-in');
  setTimeout(() => qBox.classList.add('fade-in'), 10);
}

function selectOption(selectedLi, selectedAnswer, correctAnswer) {
  clearInterval(timerInterval);
  const allOptions = document.querySelectorAll("#options li");
  allOptions.forEach(li => {
    li.onclick = null;
    if (li.textContent === correctAnswer) li.classList.add('correct');
    else if (li.textContent === selectedAnswer) {
      li.classList.add('wrong');
      if (navigator.vibrate) navigator.vibrate(300); // ✅ Vibrate on wrong
    }
  });

  if (selectedAnswer === correctAnswer) {
    score++;
    correctSound.play();
  }

  document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function resetState() {
  clearInterval(timerInterval);
  document.getElementById('options').innerHTML = "";
  document.getElementById('next-btn').disabled = true;
  timeLeft = 10;
  document.getElementById('timer').textContent = timeLeft;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoRevealAnswer();
    }
  }, 1000);
}

function autoRevealAnswer() {
  const correctAnswer = currentQuestions[currentIndex].answer;
  const allOptions = document.querySelectorAll("#options li");
  allOptions.forEach(li => {
    li.onclick = null;
    if (li.textContent === correctAnswer) li.classList.add('correct');
    else li.classList.add('wrong');
  });
  document.getElementById('next-btn').disabled = false;
}

function showResult() {
  document.getElementById('quiz-box').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');

  const name = document.getElementById('username').value.trim();
  const percentage = Math.round((score / currentQuestions.length) * 100);
  document.getElementById('congrats').textContent = `Congratulations, ${name}!`;
  document.getElementById('score-text').textContent = `You scored ${score}/${currentQuestions.length} (${percentage}%)`;
}