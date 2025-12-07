// Simple user database (stored in localStorage for persistence)
const DEMO_USERS = {
    'user': '123',
    'admin': 'admin123'
};

// Sample meal data - 14 days of recipes
const mealPlan = [
    {
        day: 1,
        name: 'Grilled Salmon with Lemon',
        description: 'Fresh grilled salmon fillet with herbs and fresh lemon squeeze. Served with roasted vegetables.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
    {
        day: 2,
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with creamy sauce, bacon, and parmesan cheese. Simple and delicious.',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop'
    },
    {
        day: 3,
        name: 'Thai Green Curry Chicken',
        description: 'Aromatic green curry with tender chicken, basil, and coconut milk. Served with jasmine rice.',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e4e31?w=400&h=300&fit=crop'
    },
    {
        day: 4,
        name: 'Beef Tacos',
        description: 'Seasoned ground beef with fresh toppings. Served with corn tortillas, salsa, and guacamole.',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop'
    },
    {
        day: 5,
        name: 'Vegetable Stir-Fry',
        description: 'Colorful mix of fresh vegetables in a savory soy sauce. Served with brown rice.',
        image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=400&h=300&fit=crop'
    },
    {
        day: 6,
        name: 'Roasted Chicken Breast',
        description: 'Herb-crusted roasted chicken with roasted potatoes and seasonal vegetables.',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop'
    },
    {
        day: 7,
        name: 'Mushroom Risotto',
        description: 'Creamy arborio rice with fresh mushrooms, garlic, and parmesan cheese.',
        image: 'https://images.unsplash.com/photo-1592050760785-9e9f8f0d13f3?w=400&h=300&fit=crop'
    },
    {
        day: 8,
        name: 'Grilled Salmon with Lemon',
        description: 'Fresh grilled salmon fillet with herbs and fresh lemon squeeze. Served with roasted vegetables.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
    {
        day: 9,
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with creamy sauce, bacon, and parmesan cheese. Simple and delicious.',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop'
    },
    {
        day: 10,
        name: 'Thai Green Curry Chicken',
        description: 'Aromatic green curry with tender chicken, basil, and coconut milk. Served with jasmine rice.',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e4e31?w=400&h=300&fit=crop'
    },
    {
        day: 11,
        name: 'Beef Tacos',
        description: 'Seasoned ground beef with fresh toppings. Served with corn tortillas, salsa, and guacamole.',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop'
    },
    {
        day: 12,
        name: 'Vegetable Stir-Fry',
        description: 'Colorful mix of fresh vegetables in a savory soy sauce. Served with brown rice.',
        image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=400&h=300&fit=crop'
    },
    {
        day: 13,
        name: 'Roasted Chicken Breast',
        description: 'Herb-crusted roasted chicken with roasted potatoes and seasonal vegetables.',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop'
    },
    {
        day: 14,
        name: 'Mushroom Risotto',
        description: 'Creamy arborio rice with fresh mushrooms, garlic, and parmesan cheese.',
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
    
    mealPlan.forEach((meal) => {
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
                <button class="btn btn-small">View Recipe</button>
            </div>
        `;
        
        mealPlanGrid.appendChild(card);
    });
}
