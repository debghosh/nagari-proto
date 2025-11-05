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
        // Get user data
        const userRSVPs = portalApp.getUserRSVPs();
        const userSavedItems = portalApp.getUserSavedItems();
        const userFavorites = portalApp.getUserFavorites();
        
        // Separate upcoming and past events
        const now = Date.now();
        const upcomingRSVPs = userRSVPs.filter(rsvp => new Date(rsvp.date).getTime() > now);
        const pastRSVPs = userRSVPs.filter(rsvp => new Date(rsvp.date).getTime() <= now);
        
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
                                    <div class="stat-number">${upcomingRSVPs.length}</div>
                                    <div class="stat-label">Upcoming Events</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">${pastRSVPs.length}</div>
                                    <div class="stat-label">Events Attended</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">${userSavedItems.length}</div>
                                    <div class="stat-label">Items Saved</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">${userFavorites.length}</div>
                                    <div class="stat-label">Favorites</div>
                                </div>
                            </div>
                        </div>

                        <!-- Your Upcoming Events (RSVPs) -->
                        <div class="dashboard-card upcoming-card">
                            <h3>📅 Your Upcoming Events</h3>
                            <div class="upcoming-list">
                                ${this.renderUpcomingEvents(upcomingRSVPs)}
                            </div>
                        </div>

                        <!-- Past Events -->
                        <div class="dashboard-card upcoming-card">
                            <h3>✅ Past Events Attended</h3>
                            <div class="upcoming-list">
                                ${this.renderPastEvents(pastRSVPs)}
                            </div>
                        </div>

                        <!-- Saved Items -->
                        <div class="dashboard-card saved-card">
                            <h3>💾 Saved Items</h3>
                            <div class="saved-list">
                                ${this.renderSavedItems(userSavedItems)}
                            </div>
                        </div>

                        <!-- Favorites -->
                        <div class="dashboard-card saved-card">
                            <h3>❤️ Favorites</h3>
                            <div class="saved-list">
                                ${this.renderFavorites(userFavorites)}
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="dashboard-card actions-card">
                            <h3>⚡ Quick Actions</h3>
                            <div class="action-buttons">
                                <button class="btn btn-primary btn-block" onclick="portalApp.showNotification('Create Event - Feature coming soon!', 'info')">📝 Create Event</button>
                                <button class="btn btn-secondary btn-block" onclick="portalApp.showNotification('Post Classified - Feature coming soon!', 'info')">📢 Post Classified</button>
                                <button class="btn btn-secondary btn-block" onclick="portalApp.showNotification('List Item for Sale - Feature coming soon!', 'info')">🛍️ List Item for Sale</button>
                                <button class="btn btn-secondary btn-block" onclick="portalApp.showNotification('Volunteer Sign-up - Feature coming soon!', 'info')">🙋 Volunteer Sign-up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add to body if not exists
        if (!document.getElementById('userDashboard')) {
            document.body.insertAdjacentHTML('beforeend', dashboardHTML);
        } else {
            // Update existing dashboard
            document.getElementById('userDashboard').outerHTML = dashboardHTML;
        }
    }

    renderUpcomingEvents(events) {
        if (events.length === 0) {
            return '<div class="empty-state"><h4>No upcoming events</h4><p>RSVP to events to see them here!</p></div>';
        }
        
        return events.map(event => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
            
            return `
                <div class="upcoming-item">
                    <div class="upcoming-date">
                        <div class="date-day">${day}</div>
                        <div class="date-month">${month}</div>
                    </div>
                    <div class="upcoming-details">
                        <h4>${event.title}</h4>
                        <p>${eventDate.toLocaleDateString()}</p>
                    </div>
                    <button class="btn btn-sm btn-outline" onclick="dashboard.closeDashboard(); portalApp.showNotification('View event details - Feature coming soon!', 'info')">View</button>
                </div>
            `;
        }).join('');
    }

    renderPastEvents(events) {
        if (events.length === 0) {
            return '<div class="empty-state"><h4>No past events</h4><p>Events you attended will appear here.</p></div>';
        }
        
        return events.map(event => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
            
            return `
                <div class="upcoming-item">
                    <div class="upcoming-date" style="background: #6C757D;">
                        <div class="date-day">${day}</div>
                        <div class="date-month">${month}</div>
                    </div>
                    <div class="upcoming-details">
                        <h4>${event.title}</h4>
                        <p>${eventDate.toLocaleDateString()}</p>
                    </div>
                    <button class="btn btn-sm btn-outline" onclick="dashboard.closeDashboard(); portalApp.showNotification('View event details - Feature coming soon!', 'info')">View</button>
                </div>
            `;
        }).join('');
    }

    renderSavedItems(items) {
        if (items.length === 0) {
            return '<div class="empty-state"><h4>No saved items</h4><p>Save items to access them quickly here!</p></div>';
        }
        
        return items.map(item => `
            <div class="saved-item" onclick="dashboard.closeDashboard()">
                <span class="saved-type">${item.type}</span>
                <span class="saved-name">${item.title}</span>
                <button class="btn-icon" onclick="event.stopPropagation(); portalApp.toggleSave('${item.id}', '${item.type}', '${item.title.replace(/'/g, "\\'")}'); dashboard.init(dashboard.user);">🗑️</button>
            </div>
        `).join('');
    }

    renderFavorites(items) {
        if (items.length === 0) {
            return '<div class="empty-state"><h4>No favorites</h4><p>Add items to your favorites to see them here!</p></div>';
        }
        
        return items.map(item => `
            <div class="saved-item" onclick="dashboard.closeDashboard()">
                <span class="saved-type">${item.type}</span>
                <span class="saved-name">${item.title}</span>
                <button class="btn-icon" onclick="event.stopPropagation(); portalApp.toggleFavorite('${item.id}', '${item.type}', '${item.title.replace(/'/g, "\\'")}'); dashboard.init(dashboard.user);">🗑️</button>
            </div>
        `).join('');
    }

    showDashboard() {
        // Reload dashboard with fresh data
        if (this.user) {
            this.loadDashboard();
        }
        
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
}

// Initialize dashboard
const dashboard = new Dashboard();

// Export for global use
window.dashboard = dashboard;
