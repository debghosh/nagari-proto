// ================================================
// Indian Community Portal - Main JavaScript
// ================================================

// Global State
let currentCategory = 'all';
let currentContentType = 'events';
let currentView = 'cards';
let isAuthenticated = false;
let currentUser = null;

// User Data State
let userSavedItems = [];
let userFavorites = [];
let userRSVPs = [];

// ================================================
// Authentication Functions
// ================================================

function checkAuth() {
    // Check localStorage for authentication token
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
        isAuthenticated = true;
        currentUser = JSON.parse(user);
        loadUserData();
        updateUIForAuthState();
    }
}

function loadUserData() {
    // Load user's saved items, favorites, and RSVPs from localStorage
    userSavedItems = JSON.parse(localStorage.getItem('userSavedItems_' + currentUser.id)) || [];
    userFavorites = JSON.parse(localStorage.getItem('userFavorites_' + currentUser.id)) || [];
    userRSVPs = JSON.parse(localStorage.getItem('userRSVPs_' + currentUser.id)) || [];
}

function saveUserData() {
    // Save user data to localStorage
    if (currentUser) {
        localStorage.setItem('userSavedItems_' + currentUser.id, JSON.stringify(userSavedItems));
        localStorage.setItem('userFavorites_' + currentUser.id, JSON.stringify(userFavorites));
        localStorage.setItem('userRSVPs_' + currentUser.id, JSON.stringify(userRSVPs));
    }
}

function showAuthModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    modal.classList.add('active');
    
    // Switch to appropriate tab
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    forms.forEach(form => form.style.display = 'none');
    
    if (mode === 'login') {
        tabs[0].classList.add('active');
        document.getElementById('loginForm').style.display = 'block';
    } else {
        tabs[1].classList.add('active');
        document.getElementById('signupForm').style.display = 'block';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('active');
}

function switchAuthTab(tab) {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(t => t.classList.remove('active'));
    forms.forEach(f => f.style.display = 'none');
    
    if (tab === 'login') {
        tabs[0].classList.add('active');
        document.getElementById('loginForm').style.display = 'block';
    } else {
        tabs[1].classList.add('active');
        document.getElementById('signupForm').style.display = 'block';
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // TODO: Replace with actual API call
    // For demo purposes, simulate authentication
    if (email && password) {
        const user = {
            id: 'user_' + Date.now(),
            name: email.split('@')[0],
            email: email,
            avatar: email.charAt(0).toUpperCase(),
            preferences: ['music', 'yoga', 'cooking'] // User interests
        };
        
        // Store auth data
        localStorage.setItem('authToken', 'demo_token_' + Date.now());
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        isAuthenticated = true;
        currentUser = user;
        
        loadUserData();
        updateUIForAuthState();
        updateAllCardActions();
        closeAuthModal();
        
        // Initialize and show dashboard
        if (window.dashboard) {
            dashboard.init(user);
            setTimeout(() => {
                dashboard.showDashboard();
            }, 300);
        }
        
        // Show success message
        showNotification('Welcome back! Check out your personalized dashboard.', 'success');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // TODO: Replace with actual API call
    if (name && email && password) {
        const user = {
            id: 'user_' + Date.now(),
            name: name,
            email: email,
            avatar: name.charAt(0).toUpperCase(),
            preferences: [] // Empty preferences for new users
        };
        
        localStorage.setItem('authToken', 'demo_token_' + Date.now());
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        isAuthenticated = true;
        currentUser = user;
        
        loadUserData();
        updateUIForAuthState();
        updateAllCardActions();
        closeAuthModal();
        
        // Initialize and show dashboard for new users
        if (window.dashboard) {
            dashboard.init(user);
            setTimeout(() => {
                dashboard.showDashboard();
            }, 300);
        }
        
        // Show welcome message
        showNotification('Welcome to the community! Explore your personalized dashboard.', 'success');
    }
}

function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    
    isAuthenticated = false;
    currentUser = null;
    userSavedItems = [];
    userFavorites = [];
    userRSVPs = [];
    
    updateUIForAuthState();
    updateAllCardActions();
    
    showNotification('You have been logged out successfully.', 'info');
}

function updateUIForAuthState() {
    const guestActions = document.querySelector('.guest-actions');
    const userProfile = document.querySelector('.user-profile');
    
    if (isAuthenticated && currentUser) {
        guestActions.style.display = 'none';
        userProfile.style.display = 'block';
        
        // Update user info
        document.querySelector('.profile-name').textContent = currentUser.name;
        document.querySelector('.profile-avatar').textContent = currentUser.avatar;
    } else {
        guestActions.style.display = 'flex';
        userProfile.style.display = 'none';
    }
}

function requireAuth(action) {
    if (isAuthenticated) {
        showNotification(`${action} - Feature coming soon!`, 'info');
    } else {
        showNotification('Please login to ' + action.toLowerCase(), 'warning');
        setTimeout(() => {
            showAuthModal('login');
        }, 500);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">✕</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function toggleProfileDropdown() {
    const dropdown = document.querySelector('.profile-dropdown');
    dropdown.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userProfile = document.querySelector('.user-profile');
    const dropdown = document.querySelector('.profile-dropdown');
    
    if (userProfile && dropdown && !userProfile.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// ================================================
// Favorite, Save, and RSVP Functions
// ================================================

function toggleFavorite(itemId, itemType, itemTitle) {
    if (!isAuthenticated) {
        showNotification('Please login to favorite items', 'warning');
        setTimeout(() => {
            showAuthModal('login');
        }, 500);
        return;
    }
    
    const index = userFavorites.findIndex(item => item.id === itemId);
    
    if (index > -1) {
        // Remove from favorites
        userFavorites.splice(index, 1);
        showNotification('Removed from favorites', 'info');
    } else {
        // Add to favorites
        userFavorites.push({
            id: itemId,
            type: itemType,
            title: itemTitle,
            timestamp: Date.now()
        });
        showNotification('Added to favorites', 'success');
    }
    
    saveUserData();
    updateCardActions(itemId);
    
    // Update dashboard if open
    if (window.dashboard && document.getElementById('userDashboard')?.classList.contains('active')) {
        dashboard.init(currentUser);
    }
}

function toggleSave(itemId, itemType, itemTitle) {
    if (!isAuthenticated) {
        showNotification('Please login to save items', 'warning');
        setTimeout(() => {
            showAuthModal('login');
        }, 500);
        return;
    }
    
    const index = userSavedItems.findIndex(item => item.id === itemId);
    
    if (index > -1) {
        // Remove from saved
        userSavedItems.splice(index, 1);
        showNotification('Removed from saved items', 'info');
    } else {
        // Add to saved
        userSavedItems.push({
            id: itemId,
            type: itemType,
            title: itemTitle,
            timestamp: Date.now()
        });
        showNotification('Saved successfully', 'success');
    }
    
    saveUserData();
    updateCardActions(itemId);
    
    // Update dashboard if open
    if (window.dashboard && document.getElementById('userDashboard')?.classList.contains('active')) {
        dashboard.init(currentUser);
    }
}

function toggleRSVP(eventId, eventTitle, eventDate) {
    if (!isAuthenticated) {
        showNotification('Please login to RSVP to events', 'warning');
        setTimeout(() => {
            showAuthModal('login');
        }, 500);
        return;
    }
    
    const index = userRSVPs.findIndex(item => item.id === eventId);
    
    if (index > -1) {
        // Remove RSVP
        userRSVPs.splice(index, 1);
        showNotification('RSVP cancelled', 'info');
    } else {
        // Add RSVP
        userRSVPs.push({
            id: eventId,
            title: eventTitle,
            date: eventDate,
            timestamp: Date.now()
        });
        showNotification('RSVP confirmed! Event added to your calendar.', 'success');
    }
    
    saveUserData();
    updateCardActions(eventId);
    
    // Update dashboard if open
    if (window.dashboard && document.getElementById('userDashboard')?.classList.contains('active')) {
        dashboard.init(currentUser);
    }
}

function isItemFavorited(itemId) {
    return userFavorites.some(item => item.id === itemId);
}

function isItemSaved(itemId) {
    return userSavedItems.some(item => item.id === itemId);
}

function isEventRSVPd(eventId) {
    return userRSVPs.some(item => item.id === eventId);
}

function updateCardActions(itemId) {
    const card = document.querySelector(`[data-item-id="${itemId}"]`);
    if (!card) return;
    
    const favoriteBtn = card.querySelector('.favorite-btn');
    const saveBtn = card.querySelector('.save-btn');
    const rsvpBtn = card.querySelector('.rsvp-btn');
    
    if (favoriteBtn) {
        if (isItemFavorited(itemId)) {
            favoriteBtn.classList.add('active');
            favoriteBtn.textContent = '❤️';
        } else {
            favoriteBtn.classList.remove('active');
            favoriteBtn.textContent = '🤍';
        }
    }
    
    if (saveBtn) {
        if (isItemSaved(itemId)) {
            saveBtn.classList.add('active');
            saveBtn.textContent = '🔖';
        } else {
            saveBtn.classList.remove('active');
            saveBtn.textContent = '📌';
        }
    }
    
    if (rsvpBtn) {
        if (isEventRSVPd(itemId)) {
            rsvpBtn.classList.add('going');
            rsvpBtn.textContent = '✓ Going';
        } else {
            rsvpBtn.classList.remove('going');
            rsvpBtn.textContent = 'RSVP';
        }
    }
}

function updateAllCardActions() {
    const allCards = document.querySelectorAll('[data-item-id]');
    allCards.forEach(card => {
        const itemId = card.getAttribute('data-item-id');
        updateCardActions(itemId);
    });
}

// ================================================
// Category & Content Navigation Functions
// ================================================

function switchCategory(category) {
    currentCategory = category;
    
    // Update button states
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter ALL event cards across all sections
    const allEventCards = document.querySelectorAll('.event-card[data-category]');
    allEventCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all') {
            card.style.display = '';
        } else {
            card.style.display = (cardCategory === category) ? '' : 'none';
        }
    });
    
    console.log('Switched to category:', category, '- Filtered', allEventCards.length, 'cards');
}

function switchContentType(type) {
    currentContentType = type;
    
    // Update tab states
    const tabs = document.querySelectorAll('.content-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const selectedSection = document.getElementById(type + '-section');
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    console.log('Switched to content type:', type);
}

function switchView(view) {
    currentView = view;
    
    // Update button states
    const buttons = document.querySelectorAll('.view-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (view === 'cards') {
        document.getElementById('cards-view').style.display = 'grid';
        document.getElementById('calendar-view').classList.remove('active');
    } else {
        document.getElementById('cards-view').style.display = 'none';
        document.getElementById('calendar-view').classList.add('active');
    }
    
    console.log('Switched to view:', view);
}

// ================================================
// AI Assistant Functions
// ================================================

function toggleAI() {
    const assistant = document.getElementById('aiAssistant');
    const fab = document.querySelector('.ai-fab');
    
    if (assistant.classList.contains('active')) {
        assistant.classList.remove('active');
        fab.classList.remove('hidden');
    } else {
        assistant.classList.add('active');
        fab.classList.add('hidden');
    }
}

function askAI(question) {
    const input = document.getElementById('aiInput');
    input.value = question;
    sendMessage();
}

function sendMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    
    if (!message) return;

    const messagesContainer = document.getElementById('aiMessages');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-message user-message';
    userMsg.innerHTML = `
        <div class="ai-avatar">👤</div>
        <div class="ai-message-content">${escapeHtml(message)}</div>
    `;
    messagesContainer.appendChild(userMsg);

    // Clear input
    input.value = '';

    // Simulate AI response
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'ai-message';
        aiMsg.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div class="ai-message-content">I found several results for "${escapeHtml(message)}". Let me show you the most relevant events and listings!</div>
        `;
        messagesContainer.appendChild(aiMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ================================================
// Utility Functions
// ================================================

function performSearch() {
    const searchTerm = document.getElementById('globalSearch').value;
    if (searchTerm) {
        console.log('Searching for:', searchTerm);
        alert('Search functionality will be implemented with backend integration.\n\nSearching for: ' + searchTerm);
    }
}

// ================================================
// Initialization
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status
    checkAuth();
    
    // Setup AI input enter key
    const aiInput = document.getElementById('aiInput');
    if (aiInput) {
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Setup global search enter key
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('auth-modal')) {
            closeAuthModal();
        }
    });
    
    // Update all card actions on load
    updateAllCardActions();
    
    console.log('Indian Community Portal initialized');
});

// ================================================
// Export functions for global use
// ================================================

window.portalApp = {
    switchCategory,
    switchContentType,
    switchView,
    toggleAI,
    askAI,
    sendMessage,
    showAuthModal,
    closeAuthModal,
    switchAuthTab,
    handleLogin,
    handleSignup,
    handleLogout,
    toggleProfileDropdown,
    performSearch,
    requireAuth,
    toggleFavorite,
    toggleSave,
    toggleRSVP,
    isItemFavorited,
    isItemSaved,
    isEventRSVPd,
    updateCardActions,
    updateAllCardActions,
    showNotification,
    getUserRSVPs: () => userRSVPs,
    getUserSavedItems: () => userSavedItems,
    getUserFavorites: () => userFavorites,
    getCurrentUser: () => currentUser,
    isAuthenticated: () => isAuthenticated
};
