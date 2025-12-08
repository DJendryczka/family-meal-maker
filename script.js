// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registered: ', registration.scope);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

// Simple user database (stored in localStorage for persistence)
const DEMO_USERS = {
    'user': '123',
    'admin': 'admin123'
};

// Sample meal data - 14 days of recipes
let mealPlan = [
    {
        day: 1,
        name: 'Grillowany łosoś z cytryną',
        description: 'Świeży grillowany filet z łososia z ziołami i sokiem z cytryny. Podawany z pieczonymi warzywami.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
    {
        day: 2,
        name: 'Spaghetti Carbonara',
        description: 'Klasyczny włoski makaron z kremowym sosem, boczkiem i serem parmezańskim. Prosty i pyszny.',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop'
    },
    {
        day: 3,
        name: 'Tajskie zielone curry z kurczakiem',
        description: 'Aromatyczne zielone curry z delikatnym kurczakiem, bazylią i mlekiem kokosowym. Podawane z ryżem jaśminowym.',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e4e31?w=400&h=300&fit=crop'
    },
    {
        day: 4,
        name: 'Tacos z wołowiną',
        description: 'Przyprawiona mielona wołowina ze świeżymi dodatkami. Podawane z tortillami kukurydzianymi, salsą i guacamole.',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop'
    },
    {
        day: 5,
        name: 'Warzywa smażone na patelni',
        description: 'Kolorowa mieszanka świeżych warzyw w aromatycznym sosie sojowym. Podawane z brązowym ryżem.',
        image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=400&h=300&fit=crop'
    },
    {
        day: 6,
        name: 'Pieczony filet z kurczaka',
        description: 'Kurczak pieczony w ziołowej panierce z pieczonymi ziemniakami i sezonowymi warzywami.',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop'
    },
    {
        day: 7,
        name: 'Risotto z grzybami',
        description: 'Kremowy ryż arborio ze świeżymi grzybami, czosnkiem i serem parmezańskim.',
        image: 'https://images.unsplash.com/photo-1592050760785-9e9f8f0d13f3?w=400&h=300&fit=crop'
    },
    {
        day: 8,
        name: 'Grillowany łosoś z cytryną',
        description: 'Świeży grillowany filet z łososia z ziołami i sokiem z cytryny. Podawany z pieczonymi warzywami.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
    {
        day: 9,
        name: 'Spaghetti Carbonara',
        description: 'Klasyczny włoski makaron z kremowym sosem, boczkiem i serem parmezańskim. Prosty i pyszny.',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop'
    },
    {
        day: 10,
        name: 'Tajskie zielone curry z kurczakiem',
        description: 'Aromatyczne zielone curry z delikatnym kurczakiem, bazylią i mlekiem kokosowym. Podawane z ryżem jaśminowym.',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e4e31?w=400&h=300&fit=crop'
    },
    {
        day: 11,
        name: 'Tacos z wołowiną',
        description: 'Przyprawiona mielona wołowina ze świeżymi dodatkami. Podawane z tortillami kukurydzianymi, salsą i guacamole.',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop'
    },
    {
        day: 12,
        name: 'Warzywa smażone na patelni',
        description: 'Kolorowa mieszanka świeżych warzyw w aromatycznym sosie sojowym. Podawane z brązowym ryżem.',
        image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=400&h=300&fit=crop'
    },
    {
        day: 13,
        name: 'Pieczony filet z kurczaka',
        description: 'Kurczak pieczony w ziołowej panierce z pieczonymi ziemniakami i sezonowymi warzywami.',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop'
    },
    {
        day: 14,
        name: 'Risotto z grzybami',
        description: 'Kremowy ryż arborio ze świeżymi grzybami, czosnkiem i serem parmezańskim.',
        image: 'https://images.unsplash.com/photo-1592050760785-9e9f8f0d13f3?w=400&h=300&fit=crop'
    }
];

// Get elements
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const logoutBtnSplash = document.getElementById('logoutBtnSplash');
const loginPage = document.getElementById('loginPage');
const splashPage = document.getElementById('splashPage');
const dashboardPage = document.getElementById('dashboardPage');
const viewMealPlanBtn = document.getElementById('viewMealPlanBtn');
const backToSplashBtn = document.getElementById('backToSplashBtn');
const mealPlanGrid = document.getElementById('mealPlanGrid');
const todayMealName = document.getElementById('todayMealName');
const todayMealDesc = document.getElementById('todayMealDesc');
const todayMealImage = document.getElementById('todayMealImage');

// Check if user is already logged in on page load
window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showSplash();
        generateMealPlan();
    }
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Clear previous error
    loginError.textContent = '';
    
    // Check credentials
    if (DEMO_USERS[username] && DEMO_USERS[username] === password) {
        // Login successful
        localStorage.setItem('currentUser', username);
        loginError.style.color = '#27ae60';
        loginError.textContent = 'Login successful! Redirecting...';
        
        setTimeout(() => {
            showSplash();
            generateMealPlan();
            loginForm.reset();
        }, 500);
    } else {
        // Login failed
        loginError.textContent = 'Invalid username or password!';
    }
});

// Handle logout
logoutBtn.addEventListener('click', logout);
logoutBtnSplash.addEventListener('click', logout);

// Handle navigation
if (viewMealPlanBtn) {
    console.log('viewMealPlanBtn found!');
    viewMealPlanBtn.addEventListener('click', (e) => {
        console.log('viewMealPlanBtn clicked!');
        e.preventDefault();
        e.stopPropagation();
        showDashboard();
    });
} else {
    console.log('viewMealPlanBtn NOT found!');
}
if (backToSplashBtn) {
    backToSplashBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showSplash();
    });
}

// Show splash page
function showSplash() {
    loginPage.classList.remove('active');
    dashboardPage.classList.remove('active');
    splashPage.classList.add('active');
    updateTodaysMeal();
}

// Show dashboard
function showDashboard() {
    console.log('showDashboard called!');
    loginPage.classList.remove('active');
    splashPage.classList.remove('active');
    dashboardPage.classList.add('active');
    console.log('Dashboard should be visible now');
}

// Show login page
function logout() {
    localStorage.removeItem('currentUser');
    loginError.textContent = '';
    loginError.style.color = '#e74c3c';
    loginPage.classList.add('active');
    splashPage.classList.remove('active');
    dashboardPage.classList.remove('active');
}

// Get today's meal (based on current day)
function getTodaysMeal() {
    const today = new Date().getDate() % 14 || 14;
    return mealPlan[today - 1];
}

// Update today's meal on splash page
function updateTodaysMeal() {
    const todayMeal = getTodaysMeal();
    todayMealName.textContent = todayMeal.name;
    todayMealDesc.textContent = todayMeal.description;
    todayMealImage.src = todayMeal.image;
}

// Generate 14-day meal plan cards
function generateMealPlan() {
    mealPlanGrid.innerHTML = '';
    const today = new Date().getDate() % 14 || 14;
    
    mealPlan.forEach((meal, index) => {
        const card = document.createElement('div');
        card.className = 'meal-plan-card';
        
        if (meal.day === today) {
            card.classList.add('today');
        }
        
        card.innerHTML = `
            <img src="${meal.image}" alt="${meal.name}" class="meal-plan-img">
            <div class="meal-plan-info">
                <span class="day-label">Day ${meal.day}</span>
                <h3>${meal.name}</h3>
                <p>${meal.description}</p>
            </div>
            <div class="meal-plan-footer">
                <button class="btn btn-small btn-edit" data-index="${index}">Edit</button>
            </div>
        `;
        
        mealPlanGrid.appendChild(card);
    });
    
    // Add click handlers for edit buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            openEditModal(index);
        });
    });
}

// Open edit modal
function openEditModal(index) {
    const meal = mealPlan[index];
    document.getElementById('editIndex').value = index;
    document.getElementById('editName').value = meal.name;
    document.getElementById('editDescription').value = meal.description;
    document.getElementById('editImage').value = meal.image;
    document.getElementById('editModal').classList.add('active');
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
}

// Save edited meal
function saveEditedMeal() {
    const index = parseInt(document.getElementById('editIndex').value);
    const name = document.getElementById('editName').value;
    const description = document.getElementById('editDescription').value;
    const image = document.getElementById('editImage').value;
    
    // Update meal plan
    mealPlan[index].name = name;
    mealPlan[index].description = description;
    mealPlan[index].image = image;
    
    // Save to localStorage
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
    
    // Regenerate cards and update today's meal
    generateMealPlan();
    updateTodaysMeal();
    
    // Close modal
    closeEditModal();
    
    console.log('Meal saved!', mealPlan[index]);
}

// Load saved meal plan from localStorage
function loadSavedMealPlan() {
    const saved = localStorage.getItem('mealPlan');
    if (saved) {
        mealPlan = JSON.parse(saved);
    }
}

// Initialize - load saved data
loadSavedMealPlan();
