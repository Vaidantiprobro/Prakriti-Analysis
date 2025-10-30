// --- Constants for State Management ---
const STORAGE_KEY_USERS = 'prakriti_users';
const STORAGE_KEY_CURRENT_USER = 'prakriti_currentUser';
const SCREEN_AUTH = 'auth';
const SCREEN_DASHBOARD = 'dashboard';
const SCREEN_QUESTIONNAIRE = 'questionnaire';
const SCREEN_PROCESSING = 'processing';
const SCREEN_RESULTS = 'results';
const SCREEN_CHART_VIEW = 'chart_view'; 
const SCREEN_HISTORY = 'history_view';
const SCREEN_BASICS = 'basics_view';   
const SCREEN_PROFILE = 'profile';
const SCREEN_DETAILS = 'details';

// --- Global Variables (Declared only once) ---
let splashScreen, splashTitle, splashSubtitle, prakritiFrame, authScreen, dashboardScreen, questionnaireScreen, resultsScreen, processingScreen, loginForm, registerForm, showRegisterLink, showLoginLink, questionContainer, prevBtn, nextBtn, currentQQuestionContainer, totalQNumberEl, resultDosha, resultDescription, retakeBtn, logoutBtn, messageBox, messageText, startAssessmentBtn, knowAyurvedaBtn, viewHistoryBtn, dashboardLogoutBtn, backToDashboardBtn, resultDoshaImageContainer, resultDescriptionContainer, resultDoshaImage, getChartBtn, nextStepsPrompt, chartViewScreen, chartViewImage, backToResultsBtn, goToDashboardBtn, historyViewScreen, historyList, backFromHistoryBtn, basicsViewScreen, backFromBasicsBtn, carouselContainer, carouselTrack, carouselPrevBtn, carouselNextBtn, carouselCounter; 

// --- State Management ---
let currentQuestionIndex = 0;
let userAnswers = [];
let currentUser = null;
let finalDoshaResult = null;
let currentImageIndex = 0; 
let touchStartX = 0;       

// --- Carousel Images Data (MAPPING TO 1.png through 7.png) ---
const basicsImages = [
    { title: "The 5 Elements", file: '1.png' }, 
    { title: "The Three Doshas Overview", file: '2.jpg' }, 
    { title: "Doshas and Elements Venn Diagram", file: '3.jpg' }, 
    { title: "Vata Dosha Traits", file: '4.jpg' }, 
    { title: "Pitta Dosha Traits", file: '5.jpg' }, 
    { title: "Kapha Dosha Traits", file: '6.jpg' }, 
    { title: "Ayurvedic Daily Rhythm", file: '7.png' } 
];

// --- Questions, Dosha Descriptions, and Icons (Unchanged) ---
const questions = [
    { category: "Physical Traits", question: "What is your skin type?", options: [{text: "Dry, rough", value: "Vata" }, { text: "Oily, sensitive, reddish", value: "Pitta" }, { text: "Thick, oily, cool", value: "Kapha" }] },
    { category: "Physical Traits", question: "What is your body build?", options: [{text: "Thin, light frame, find it hard to gain weight", value: "Vata"}, {text: "Medium, muscular build", value: "Pitta" }, { text: "Heavier build, stocky, easy to gain weight", value: "Kapha" }] },
    { category: "Physical Traits", question: "Describe your hair.", options: [{ text: "Dry, thin, brittle", value: "Vata" }, { text: "Fine, oily, may have premature graying or thinning", value: "Pitta" }, { text: "Thick, oily, wavy", value: "Kapha" }] },
    { category: "Physical Traits", question: "How would you describe your eyes?", options: [{ text: "Small, active, may be dry", value: "Vata" }, { text: "Medium, sharp, penetrating gaze", value: "Pitta" }, { text: "Large, calm, attractive", value: "Kapha" }] },
    { category: "Mental & Emotional Traits", question: "What is your general mindset?", options: [{ text: "Restless, active, creative", value: "Vata" }, { text: "Intense, focused, determined", value: "Pitta" }, {text: "Calm, steady, easy-going", value: "Kapha" }] },
    { category: "Mental & Emotional Traits", question: "How is your memory?", options: [{ text: "Quick to grasp, but also quick to forget", value: "Vata" }, { text: "Sharp, clear, good medium-term memory", value: "Pitta" }, { text: "Slow to learn, but excellent long-term retention", value: "Kapha" }] },
    { category: "Mental & Emotional Traits", question: "What are your common emotional tendencies?", options: [{ text: "Prone to anxiety, worry, and fear", value: "Vata" }, { text: "Prone to anger, irritability, and impatience", value: "Pitta" }, { text: "Generally content, but can be possessive or complacent", value: "Kapha" }] },
    { category: "Daily Habits & Preferences", question: "What are your dietary preferences?", options: [{ text: "Irregular appetite, prefer warm foods and drinks", value: "Vata" }, { text: "Strong appetite, prefer cool and sweet foods", value: "Pitta" }, { text: "Moderate appetite, drawn to spicy and dry foods", value: "Kapha" }] },
    { category: "Daily Habits & Preferences", question: "Describe your sleep patterns.", options: [{ text: "Light, interrupted sleep, have trouble falling asleep", value: "Vata" }, {text: "Moderate but sound sleep, may wake up feeling hot", value: "Pitta" }, { text: "Deep, heavy, long sleep", value: "Kapha" }] },
    { category: "Daily Habits & Preferences", question: "How are your energy levels?", options: [{ text: "Comes in bursts, can experience fatigue easily", value: "Vata" }, { text: "Strong, steady energy, very productive", value: "Pitta" }, { text: "Good stamina, but may feel sluggish in the morning", value: "Kapha" }] },
    { category: "Environmental Reactions", question: "What are your weather preferences?", options: [{ text: "Dislike cold and wind, prefer warm climates", value: "Vata" }, { text: "Dislike heat and sun, prefer cool climates", value: "Pitta" }, { text: "Dislike damp, cool weather, prefer warm and dry", value: "Kapha" }] },
    { category: "Environmental Reactions", question: "How do you respond to stress?", options: [{text: "Become anxious and worried", value: "Vata" }, { text: "Become irritable and short-tempered", value: "Pitta" }, { text: "Handle it calmly, but may withdraw or procrastinate", value: "Kapha" }] }
];

const doshaDescriptions = {
    Vata: {
        title: "Vata (Air + Ether)",
        description: "Individuals with a dominant Vata dosha are typically energetic, creative, and lively. They are characterized by qualities of cold, light, dry, rough, and mobile. When in balance, Vatas are flexible and enthusiastic. Out of balance, they can experience anxiety, insomnia, and digestive issues.",
        traits: ["Dry skin, thin build", "Restless mind, active", "Light, interrupted sleep", "Prefers warm weather and food", "Responds to stress with anxiety"]
    },
    Pitta: {
        title: "Pitta (Fire + Water)",
        description: "Pitta types are known for their sharp intellect, ambition, and strong digestion. Governed by the fire element, they are warm, sharp, and intense. In balance, Pittas are excellent leaders and decision-makers. Out of balance, they can be prone to anger, inflammation, and skin rashes.",
        traits: ["Oily skin, muscular build", "Intense emotions, sharp intellect", "Moderate, sound sleep", "Prefers cool weather and food", "Responses to stress with irritability"]
    },
    Kapha: {
        title: "Kapha (Earth + Water)",
        description: "Kapha individuals are calm, stable, and compassionate. Their qualities are heavy, slow, cool, and smooth. When balanced, Kaphas are loving and supportive with strong stamina. Out of balance, they can experience weight gain, sluggishness, and congestion.",
        traits: ["Balanced/oily skin, heavier build", "Calm demeanor, thoughtful", "Deep, heavy sleep", "Prefers warm, dry weather", "Responses to stress with withdrawal"]
    }
};

// --- Dosha Icons Data ---
const doshaIcons = {
    Vata: 'vata_icon.jpg',
    Pitta: 'pitta_icon.jpg',
    Kapha: 'kapha_icon.jpg',
    'default': 'default_icon.jpg'
};

// --- Next Steps Images (Chart Images) ---
const nextStepsImages = {
    Vata: 'vata_next_steps.png', 
    Pitta: 'pitta_next_steps.png', 
    Kapha: 'kapha_next_steps.png', 
    'default': 'default_next_steps.jpg' 
};


//--- Functions
function showMessage(msg, isError = true) {
    const { messageBox, messageText } = getElements();
    messageText.textContent = msg;
    messageBox.className = `fixed top-5 right-5 text-white py-3 px-5 rounded-lg shadow-lg ${isError ? 'bg-red-700' : 'bg-green-600'}`;
    messageBox.classList.remove('hidden');
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3000);
}

function toggleAuthForms (formToShow) {
    const { loginForm, registerForm } = getElements();
    if (formToShow === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }
}

/** FIX: Ensured the new user is saved back to Local Storage. */
function handleRegister(e) {
    e.preventDefault();
    const { registerForm } = getElements();

    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (!username || !password) {
        showMessage("Username and password cannot be empty.");
        return;
    }
    if (password.length < 6) {
        showMessage("Password must be at least 6 characters long.");
        return;
    }

    const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];
    if (users.find(user => user.username === username)) {
        showMessage("Username already exists.");
        return;
    }

    // Initialize user with history array
    users.push({ username, password, history: [] }); 
    // Save the updated array back to Local Storage
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users)); 
    
    showMessage("Registration successful! Please log in.", false);
    toggleAuthForms('login');
    registerForm.reset();
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!username || !password) {
        showMessage("Please enter username and password.");
        return;
    }

    const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user.username;
        sessionStorage.setItem(STORAGE_KEY_CURRENT_USER, currentUser);
        showScreen(SCREEN_DASHBOARD); 
    } else {
        showMessage("Invalid username or password.");
    }
}

function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    showScreen(SCREEN_AUTH);
}

function handleGoToDashboard() {
    showScreen(SCREEN_DASHBOARD);
}

/** Displays a specific screen and hides others. */
function showScreen(screenName) {
    const { authScreen, dashboardScreen, questionnaireScreen, resultsScreen, processingScreen, chartViewScreen, historyViewScreen, basicsViewScreen, loginForm, registerForm } = getElements();

    authScreen.classList.add('hidden');
    dashboardScreen.classList.add('hidden'); 
    questionnaireScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden'); 
    processingScreen.classList.add('hidden');
    chartViewScreen.classList.add('hidden'); 
    historyViewScreen.classList.add('hidden');
    basicsViewScreen.classList.add('hidden');

    if (screenName === SCREEN_AUTH) {
        authScreen.classList.remove('hidden');
        toggleAuthForms('login');
        loginForm.reset();
        registerForm.reset();
    } else if (screenName === SCREEN_DASHBOARD) {
        dashboardScreen.classList.remove('hidden');
    } else if (screenName === SCREEN_QUESTIONNAIRE) {
        questionnaireScreen.classList.remove('hidden');
        currentQuestionIndex = 0;
        userAnswers = [];
        displayQuestion();
    } else if (screenName === SCREEN_PROCESSING) {
        processingScreen.classList.remove('hidden');
        calculateAndDisplayResults(); 
        
        setTimeout(() => {
            const { processingScreen } = getElements(); 
            processingScreen.classList.add('hidden'); 
            showScreen(SCREEN_RESULTS); 
        }, 3000);

    } else if (screenName === SCREEN_RESULTS) { 
        resultsScreen.classList.remove('hidden');
    } else if (screenName === SCREEN_CHART_VIEW) {
        chartViewScreen.classList.remove('hidden');
    } else if (screenName === SCREEN_HISTORY) { 
        historyViewScreen.classList.remove('hidden');
        displayHistory(); 
    } else if (screenName === SCREEN_BASICS) { 
        basicsViewScreen.classList.remove('hidden');
        initializeBasicsCarousel(); 
    }
}

function displayQuestion() {
    const { questionContainer, currentQNumberEl } = getElements();

    const q = questions [currentQuestionIndex];
    questionContainer.innerHTML =
        `<p class="text-sm text-indigo-400 font-semibold">${q.category}</p>
        <h3 class="text-xl sm:text-2xl font-semibold my-4 text-white">${q.question}</h3>
        <div id="options-list" class="space-y-4">
        ${q.options.map((opt, index) =>
            `<label for="option-${index}" class="flex items-center p-4 border border-gray-600 bg-gray-900 rounded-lg
            hover:border-indigo-500 hover:bg-gray-700 transition duration-200 cursor-pointer">
            <input type="radio" id="option-${index}" name="answer" value="${opt.value}"
            class="form-radio" ${userAnswers[currentQuestionIndex] === opt.value ? 'checked' : ""}>
            <span class="ml-3 text-white text-lg">${opt.text}</span>
            </label>`
        ).join('')}
        </div>`;
    
    const radioInputs = questionContainer.querySelectorAll('input[name="answer"]');
    radioInputs.forEach(input => {
        // --- CORE CHANGE: Auto-advance on option selection ---
        input.addEventListener('change', () => {
            // Record the answer immediately
            userAnswers[currentQuestionIndex] = input.value;
            
            // Wait briefly before moving to the next step
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    displayQuestion();
                } else {
                    // This is the last question, so go to processing/results
                    showScreen(SCREEN_PROCESSING);
                }
            }, 150); // Small delay for visual feedback
        });
    });
    // --------------------------------------------------------

    updateNavigationButtons();
    currentQNumberEl.textContent = currentQuestionIndex + 1;
}

function updateNavigationButtons() {
    const { prevBtn, nextBtn } = getElements();
    // Previous button logic remains essential for editing/review
    prevBtn.disabled = currentQuestionIndex === 0;

    // Next button is now primarily a fallback/visual indicator
    if (currentQuestionIndex === questions.length-1) {
        nextBtn.textContent = 'Finish';
    } else {
        nextBtn.textContent = 'Next';
    }
}

/** The handleNext function is simplified and relies on auto-advance in displayQuestion(). */
function handleNext() {
    const selected = document.querySelector('input[name="answer"]:checked');
    
    if (!selected) {
        showMessage("Please select an answer.");
        return;
    }

    userAnswers[currentQuestionIndex] = selected.value;

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showScreen(SCREEN_PROCESSING);
    }
}


function handlePrev() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// --- NEW HISTORY & BASICS LOGIC ---

/** Saves the current result to the user's history in Local Storage. */
function saveResultToHistory(dominantDosha, scores) {
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];
    const userIndex = users.findIndex(u => u.username === currentUser);

    if (userIndex !== -1) {
        const historyEntry = {
            date: new Date().toISOString(),
            dosha: dominantDosha,
            scores: scores
        };
        
        if (!users[userIndex].history) {
            users[userIndex].history = [];
        }
        
        users[userIndex].history.unshift(historyEntry); 
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    }
}

/** Displays the history view screen. */
function displayHistory() {
    const { historyList } = getElements();
    
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];
    const user = users.find(u => u.username === currentUser);
    
    if (!user || !user.history || user.history.length === 0) {
        historyList.innerHTML = `<p class="text-center text-gray-400 mt-8">No past assessment results found.</p>`;
        return;
    }

    let listHTML = `<div class="space-y-4 pt-4">`;

    user.history.forEach((entry, index) => {
        const date = new Date(entry.date).toLocaleDateString();
        const time = new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const scoreString = Object.keys(entry.scores).map(key => `${key}: ${entry.scores[key]}`).join(', ');

        listHTML += `
            <div class="p-4 rounded-lg bg-gray-800 border-l-4 border-indigo-500 shadow-md">
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold text-indigo-400">${entry.dosha} Dominance</span>
                    <span class="text-sm text-gray-400">${date} at ${time}</span>
                </div>
                <p class="text-sm mt-2 text-gray-300">Scores: ${scoreString}</p>
                <p class="text-xs text-gray-500 mt-1">Assessment #${user.history.length - index}</p>
            </div>
        `;
    });

    listHTML += `</div>`;
    historyList.innerHTML = listHTML;
}

// --- CAROUSEL LOGIC ---

function updateCarousel() {
    const { carouselContainer, carouselCounter, carouselPrevBtn, carouselNextBtn } = getElements();
    
    // We must read the current scroll position to determine the current image index
    const scrollLeft = carouselContainer.scrollLeft;
    const offsetWidth = carouselContainer.offsetWidth;
    
    // Calculate index by dividing scroll position by container width and rounding
    currentImageIndex = Math.round(scrollLeft / offsetWidth);

    // Update counter
    carouselCounter.textContent = `${currentImageIndex + 1} / ${basicsImages.length}`;
    
    // Update button states
    carouselPrevBtn.disabled = currentImageIndex === 0;
    carouselNextBtn.disabled = currentImageIndex === basicsImages.length - 1;
}

function showNextImage() {
    const { carouselContainer } = getElements();
    carouselContainer.scrollBy({ left: carouselContainer.offsetWidth, behavior: 'smooth' });
    setTimeout(updateCarousel, 500); // Wait for scroll animation to finish before updating counter
}

function showPrevImage() {
    const { carouselContainer } = getElements();
    carouselContainer.scrollBy({ left: -carouselContainer.offsetWidth, behavior: 'smooth' });
    setTimeout(updateCarousel, 500); // Wait for scroll animation to finish before updating counter
}


/** Initializes the basics carousel screen. */
function initializeBasicsCarousel() {
    const { carouselTrack, carouselContainer } = getElements();
    
    // Reset state
    currentImageIndex = 0;
    
    // 1. Build the image track dynamically
    carouselTrack.innerHTML = basicsImages.map(item => `
        <div class="carousel-item flex-shrink-0 w-full h-full flex flex-col items-center justify-center p-4 text-center">
            <h3 class="text-xl font-semibold text-indigo-400 mb-4">${item.title}</h3>
            <img src="${item.file}" alt="${item.title}" class="w-auto h-auto object-contain max-h-full">
        </div>
    `).join('');
    
    // 2. Attach click handlers to navigation buttons 
    const { carouselPrevBtn, carouselNextBtn } = getElements();
    carouselPrevBtn.onclick = showPrevImage;
    carouselNextBtn.onclick = showNextImage;
    
    // 3. Attach a scroll listener to update the counter as the user manually scrolls/swipes
    carouselContainer.onscroll = () => {
        // Debounce the update slightly for performance
        clearTimeout(carouselContainer.scrollTimeout);
        carouselContainer.scrollTimeout = setTimeout(updateCarousel, 50);
    };
    
    // 4. Set initial state 
    setTimeout(updateCarousel, 100); 
}


function handleKnowAyurveda() {
    showScreen(SCREEN_BASICS);
}

/** Handles the click on the new 'Get Personalized Chart' button, switching to the new screen. */
function handleGetChart() {
    const { chartViewImage } = getElements();
    
    const imageFileName = nextStepsImages[finalDoshaResult] || nextStepsImages['default'];

    chartViewImage.src = imageFileName;
    chartViewImage.alt = `Personalized steps for ${finalDoshaResult} Dosha`;

    showScreen(SCREEN_CHART_VIEW);
}

/** Handles the back button on the chart view screen. */
function handleBackToResults() {
    showScreen(SCREEN_RESULTS);
}

/** Calculates the final Dosha and prepares the results content. (UPDATED TO SAVE HISTORY) */
function calculateAndDisplayResults() {
    const { resultDosha, resultDescription, resultDoshaImage, resultDoshaImageContainer, resultDescriptionContainer, nextStepsPrompt } = getElements();
    const scores = { Vata: 0, Pitta: 0, Kapha: 0 };
    userAnswers.forEach(answer => {
        if (scores.hasOwnProperty(answer)) {
            scores[answer]++;
        }
    });

    // Find the dosha with the highest score
    const dominantDosha = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    finalDoshaResult = dominantDosha; 
    resultDosha.textContent = dominantDosha;
    
    saveResultToHistory(dominantDosha, scores); 
    
    // Set the image source based on the result
    resultDoshaImage.src = doshaIcons[dominantDosha] || doshaIcons['default'];

    // Ensure elements are visible (using classes defined in the HTML)
    resultDoshaImageContainer.style.opacity = '1';
    resultDoshaImageContainer.style.transform = 'none';
    resultDescriptionContainer.style.opacity = '1';
    resultDescriptionContainer.style.transform = 'none';
    
    // Update prompt text to reflect the new button action
    nextStepsPrompt.classList.remove('hidden');
    nextStepsPrompt.textContent = "Click 'View Personalized Chart' to view recommendations on a full screen.";


    const desc = doshaDescriptions[dominantDosha];
    
    // Inject the result details into the description container
    resultDescription.innerHTML =
        `<h3 class="text-2xl font-bold text-white">${desc.title}</h3>
        <p class="text-lg text-gray-300">${desc.description}</p>
        <h4 class="text-xl font-semibold pt-4 text-white">Key Traits:</h4>
        <ul class="list-disc list-inside space-y-2 text-gray-300">
        ${desc.traits.map(trait => `<li>${trait}</li>`).join('')}
        </ul>`;
}


/** Safely collect all DOM elements and attach listeners. */
function getElements() {
    // This structure ensures variables are always fresh when called.
    return {
        // SCREEN ELEMENTS
        splashScreen: document.getElementById('splash-screen'),
        splashTitle: document.getElementById('splash-title'),
        splashSubtitle: document.getElementById('splash-subtitle'),
        prakritiFrame: document.getElementById('prakriti-frame'),
        authScreen: document.getElementById('auth-screen'),
        dashboardScreen: document.getElementById('dashboard-screen'),
        questionnaireScreen: document.getElementById('questionnaire-screen'),
        processingScreen: document.getElementById('processing-screen'),
        resultsScreen: document.getElementById('results-screen'),
        chartViewScreen: document.getElementById('chart-view-screen'),
        historyViewScreen: document.getElementById('history-view-screen'), 
        basicsViewScreen: document.getElementById('basics-view-screen'),   

        // AUTH FORM ELEMENTS
        loginForm: document.getElementById('login-form'),
        registerForm: document.getElementById('register-form'),
        showRegisterLink: document.getElementById('show-register'),
        showLoginLink: document.getElementById('show-login'),
        
        // QUESTIONNAIRE ELEMENTS
        questionContainer: document.getElementById('question-container'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        currentQNumberEl: document.getElementById('current-q-number'),
        totalQNumberEl: document.getElementById('total-q-number'),
        backToDashboardBtn: document.getElementById('back-to-dashboard-btn'),

        // DASHBOARD BUTTONS
        startAssessmentBtn: document.getElementById('start-assessment-btn'),
        knowAyurvedaBtn: document.getElementById('know-ayurveda-btn'),
        viewHistoryBtn: document.getElementById('view-history-btn'), 
        dashboardLogoutBtn: document.getElementById('dashboard-logout-btn'),

        // RESULT ELEMENTS
        resultDosha: document.getElementById('result-dosha'), 
        resultDescription: document.getElementById('result-description'),
        resultDoshaImageContainer: document.getElementById('result-image-container'), 
        resultDescriptionContainer: document.getElementById('result-description-container'),
        resultDoshaImage: document.getElementById('result-dosha-image'),
        
        // RESULT BUTTONS
        retakeBtn: document.getElementById('retake-btn'),
        logoutBtn: document.getElementById('logout-btn'),
        getChartBtn: document.getElementById('get-chart-btn'), 
        goToDashboardBtn: document.getElementById('go-to-dashboard-btn'), 
        
        // CHART VIEW ELEMENTS
        nextStepsPrompt: document.getElementById('next-steps-prompt'), 
        chartViewImage: document.getElementById('chart-view-image'),
        backToResultsBtn: document.getElementById('back-to-results-btn'),

        // HISTORY VIEW ELEMENTS
        historyList: document.getElementById('history-list'), 
        backFromHistoryBtn: document.getElementById('back-from-history-btn'), 

        // BASICS VIEW ELEMENTS (CAROUSEL)
        carouselContainer: document.getElementById('carousel-container'),
        carouselTrack: document.getElementById('carousel-track'),       
        carouselPrevBtn: document.getElementById('carousel-prev-btn'),   
        carouselNextBtn: document.getElementById('carousel-next-btn'),   
        carouselCounter: document.getElementById('carousel-counter'),    
        backFromBasicsBtn: document.getElementById('back-from-basics-btn'), 

        // UTILITY ELEMENTS
        messageBox: document.getElementById('message-box'),
        messageText: document.getElementById('message-text'),
    };
}


function handleSplashScreenAndInit() {
    const { splashScreen, splashTitle, splashSubtitle, prakritiFrame, totalQNumberEl } = getElements();
    
    // Safely assign total question count after elements are loaded
    totalQNumberEl.textContent = questions.length;
    
    // The visual animation sequence
    setTimeout(() => {
        splashTitle.classList.remove('opacity-0', 'translate-y-4');
    }, 100); 
    
    setTimeout(() => {
        prakritiFrame.classList.add('frame-active');
        prakritiFrame.classList.remove('opacity-0');
        splashSubtitle.classList.remove('opacity-0');
    }, 1100);

    const SPLASH_DURATION = 3500;

    // Fade out and transition to the app
    setTimeout(() => {
        splashScreen.style.opacity = '0'; 
        
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.classList.remove('opacity-0');
            appContainer.style.opacity = '1';
        }

        setTimeout(() => {
            splashScreen.classList.add('hidden');
            // Continue the core application flow
            initializeApplication(); 
        }, 1000);
    }, SPLASH_DURATION);
}


function initializeApplication() {
    const { startAssessmentBtn, knowAyurvedaBtn, viewHistoryBtn, dashboardLogoutBtn, showRegisterLink, showLoginLink, registerForm, loginForm, retakeBtn, logoutBtn, backToDashboardBtn, nextBtn, prevBtn, getChartBtn, backToResultsBtn, goToDashboardBtn, backFromHistoryBtn, backFromBasicsBtn } = getElements();
    
    // Check session status and display initial screen
    currentUser = sessionStorage.getItem(STORAGE_KEY_CURRENT_USER);
    
    if (currentUser) {
        showScreen(SCREEN_DASHBOARD); 
    } else {
        showScreen(SCREEN_AUTH); 
    }

    // Attach all event listeners
    showRegisterLink.addEventListener('click', (e) => { e.preventDefault(); toggleAuthForms('register'); });
    showLoginLink.addEventListener('click', (e) => { e.preventDefault(); toggleAuthForms('login'); });
    // --- ATTACHING FORM SUBMISSION LISTENERS ---
    registerForm.addEventListener('submit', handleRegister);
    loginForm.addEventListener('submit', handleLogin);
    // ------------------------------------------
    
    startAssessmentBtn.addEventListener('click', () => showScreen(SCREEN_QUESTIONNAIRE));
    // Dashboard Buttons
    knowAyurvedaBtn.addEventListener('click', handleKnowAyurveda);
    viewHistoryBtn.addEventListener('click', () => showScreen(SCREEN_HISTORY)); 
    dashboardLogoutBtn.addEventListener('click', handleLogout); 
    
    retakeBtn.addEventListener('click', ()=> showScreen(SCREEN_QUESTIONNAIRE));
    logoutBtn.addEventListener('click', handleLogout); 
    goToDashboardBtn.addEventListener('click', handleGoToDashboard); 

    // Questionnaire Navigation
    backToDashboardBtn.addEventListener('click', handleGoToDashboard); 
    nextBtn.addEventListener('click', handleNext); 
    prevBtn.addEventListener('click', handlePrev);
    
    // Result & Chart Navigation
    getChartBtn.addEventListener('click', handleGetChart);
    backToResultsBtn.addEventListener('click', handleBackToResults);

    // New History/Basics Back Buttons
    backFromHistoryBtn.addEventListener('click', handleGoToDashboard); 
    backFromBasicsBtn.addEventListener('click', handleGoToDashboard);   
}


// --- Start the App (Only calls the safe handler on load) ---
document.addEventListener('DOMContentLoaded', handleSplashScreenAndInit);
