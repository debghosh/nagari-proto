// ================================================
// Dashboard/Home - Authenticated User Experience
// ================================================

class Dashboard {
    constructor() {
        this.user = null;
        this.recommendations = [];
        this.upcomingEvents = [];
        this.savedItems = [];
    }

    init(user) {
        this.user = user;
        this.loadDashboard();
    }

    loadDashboard() {
        // Create dashboard overlay
        const dashboardHTML = `
            <div id="userDashboard" class="dashboard-overlay">
                <div class="dashboard-container">
                    <div class="dashboard-header">
                        <h2>Welcome back, ${this.user.name}! 👋</h2>
                        <button class="btn-close-dashboard" onclick="dashboard.closeDashboard()">✕</button>
                    </div>

                    <div class="dashboard-grid">
                        <!-- Quick Stats -->
                        <div class="dashboard-card stats-card">
                            <h3>📊 Your Activity</h3>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <div class="stat-number">5</div>
                                    <div class="stat-label">Events Attended</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">12</div>
                                    <div class="stat-label">Hours Volunteered</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">3</div>
                                    <div class="stat-label">Items Saved</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">8</div>
                                    <div class="stat-label">Connections</div>
                                </div>
                            </div>
                        </div>

                        <!-- Recommended Events -->
                        <div class="dashboard-card recommendations-card">
                            <h3>✨ Recommended for You</h3>
                            <div class="recommendations-list">
                                <div class="rec-item">
                                    <span class="rec-icon">🎵</span>
                                    <div class="rec-content">
                                        <h4>Classical Music Workshop</h4>
                                        <p>Based on your interest in music</p>
                                    </div>
                                    <button class="btn btn-sm btn-primary">RSVP</button>
                                </div>
                                <div class="rec-item">
                                    <span class="rec-icon">🧘</span>
                                    <div class="rec-content">
                                        <h4>Yoga Retreat Weekend</h4>
                                        <p>Popular in your area</p>
                                    </div>
                                    <button class="btn btn-sm btn-primary">RSVP</button>
                                </div>
                                <div class="rec-item">
                                    <span class="rec-icon">🙋</span>
                                    <div class="rec-content">
                                        <h4>Volunteer: Food Drive</h4>
                                        <p>Help your community</p>
                                    </div>
                                    <button class="btn btn-sm btn-primary">Sign Up</button>
                                </div>
                            </div>
                        </div>

                        <!-- Upcoming Events (My RSVPs) -->
                        <div class="dashboard-card upcoming-card">
                            <h3>📅 Your Upcoming Events</h3>
                            <div class="upcoming-list">
                                <div class="upcoming-item">
                                    <div class="upcoming-date">
                                        <div class="date-day">15</div>
                                        <div class="date-month">DEC</div>
                                    </div>
                                    <div class="upcoming-details">
                                        <h4>Carnatic Music Concert</h4>
                                        <p>📍 Cary Arts Center • 7:00 PM</p>
                                    </div>
                                    <button class="btn btn-sm btn-outline">View</button>
                                </div>
                                <div class="upcoming-item">
                                    <div class="upcoming-date">
                                        <div class="date-day">10</div>
                                        <div class="date-month">JAN</div>
                                    </div>
                                    <div class="upcoming-details">
                                        <h4>Cooking Class</h4>
                                        <p>📍 Chapel Hill • 6:00 PM</p>
                                    </div>
                                    <button class="btn btn-sm btn-outline">View</button>
                                </div>
                            </div>
                            <button class="btn btn-link">View All →</button>
                        </div>

                        <!-- Saved Items -->
                        <div class="dashboard-card saved-card">
                            <h3>💾 Saved Items</h3>
                            <div class="saved-list">
                                <div class="saved-item">
                                    <span class="saved-type">Event</span>
                                    <span class="saved-name">Diwali Celebration</span>
                                    <button class="btn-icon">🗑️</button>
                                </div>
                                <div class="saved-item">
                                    <span class="saved-type">Service</span>
                                    <span class="saved-name">Tabla Lessons</span>
                                    <button class="btn-icon">🗑️</button>
                                </div>
                                <div class="saved-item">
                                    <span class="saved-type">Org</span>
                                    <span class="saved-name">Tamil Sangam</span>
                                    <button class="btn-icon">🗑️</button>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="dashboard-card actions-card">
                            <h3>⚡ Quick Actions</h3>
                            <div class="action-buttons">
                                <button class="btn btn-primary btn-block">📝 Create Event</button>
                                <button class="btn btn-secondary btn-block">📢 Post Classified</button>
                                <button class="btn btn-secondary btn-block">🛍️ List Item for Sale</button>
                                <button class="btn btn-secondary btn-block">🙋 Volunteer Sign-up</button>
                            </div>
                        </div>

                        <!-- Community Feed -->
                        <div class="dashboard-card feed-card">
                            <h3>📰 Community Updates</h3>
                            <div class="feed-list">
                                <div class="feed-item">
                                    <div class="feed-avatar">RS</div>
                                    <div class="feed-content">
                                        <p><strong>Raleigh Music Society</strong> posted a new event</p>
                                        <span class="feed-time">2 hours ago</span>
                                    </div>
                                </div>
                                <div class="feed-item">
                                    <div class="feed-avatar">PS</div>
                                    <div class="feed-content">
                                        <p><strong>Priya Sharma</strong> is offering new dance classes</p>
                                        <span class="feed-time">5 hours ago</span>
                                    </div>
                                </div>
                                <div class="feed-item">
                                    <div class="feed-avatar">TS</div>
                                    <div class="feed-content">
                                        <p><strong>Tamil Sangam</strong> announced Pongal celebration</p>
                                        <span class="feed-time">1 day ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add to body if not exists
        if (!document.getElementById('userDashboard')) {
            document.body.insertAdjacentHTML('beforeend', dashboardHTML);
        }
    }

    showDashboard() {
        const dashboardEl = document.getElementById('userDashboard');
        if (dashboardEl) {
            dashboardEl.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeDashboard() {
        const dashboardEl = document.getElementById('userDashboard');
        if (dashboardEl) {
            dashboardEl.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Personalized content filtering
    getRecommendations() {
        // Based on user interests and history
        const userInterests = this.user.preferences || ['music', 'yoga'];
        
        // Filter events matching interests
        const allEvents = document.querySelectorAll('.event-card');
        const recommended = [];
        
        allEvents.forEach(event => {
            const tags = Array.from(event.querySelectorAll('.event-tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            const matches = tags.some(tag => 
                userInterests.some(interest => tag.includes(interest))
            );
            
            if (matches) {
                recommended.push(event);
            }
        });

        return recommended;
    }

    // Highlight saved items
    highlightSavedItems() {
        const savedIds = ['event_123', 'event_456']; // From user profile
        savedIds.forEach(id => {
            const card = document.querySelector(`[data-id="${id}"]`);
            if (card) {
                card.classList.add('saved');
            }
        });
    }
}

// Initialize dashboard
const dashboard = new Dashboard();

// Export for global use
window.dashboard = dashboard;
