// ================================================
// Data Loader - Loads content dynamically with action buttons
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    loadEventsSection();
    loadClassifiedsSection();
    loadMarketplaceSection();
    loadPeopleSection();
});

function createActionButtons(itemId, itemType, itemTitle, includeRSVP = false, eventDate = null) {
    const favoriteIcon = portalApp.isItemFavorited(itemId) ? '❤️' : '🤍';
    const saveIcon = portalApp.isItemSaved(itemId) ? '🔖' : '📌';
    
    let actionButtons = `
        <div class="card-actions">
            <button class="card-action-btn favorite-btn ${portalApp.isItemFavorited(itemId) ? 'active' : ''}" 
                    onclick="event.stopPropagation(); portalApp.toggleFavorite('${itemId}', '${itemType}', '${escapeQuotes(itemTitle)}');" 
                    title="Favorite">
                ${favoriteIcon}
            </button>
            <button class="card-action-btn save-btn ${portalApp.isItemSaved(itemId) ? 'active' : ''}" 
                    onclick="event.stopPropagation(); portalApp.toggleSave('${itemId}', '${itemType}', '${escapeQuotes(itemTitle)}');" 
                    title="Save">
                ${saveIcon}
            </button>
        </div>
    `;
    
    let rsvpButton = '';
    if (includeRSVP && eventDate) {
        const isGoing = portalApp.isEventRSVPd(itemId);
        const rsvpText = isGoing ? '✓ Going' : 'RSVP';
        const rsvpClass = isGoing ? 'rsvp-btn going' : 'rsvp-btn';
        
        rsvpButton = `
            <button class="${rsvpClass}" 
                    onclick="event.stopPropagation(); portalApp.toggleRSVP('${itemId}', '${escapeQuotes(itemTitle)}', '${eventDate}');">
                ${rsvpText}
            </button>
        `;
    }
    
    return { actionButtons, rsvpButton };
}

function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function loadEventsSection() {
    const section = document.getElementById('events-section');
    section.innerHTML = `
        <div class="view-controls">
            <h2 class="view-title">Upcoming Events</h2>
            <div class="view-toggle">
                <button class="view-btn active" onclick="portalApp.switchView('cards')">
                    🎴 Cards
                </button>
                <button class="view-btn" onclick="portalApp.switchView('calendar')">
                    📆 Calendar
                </button>
            </div>
        </div>

        <!-- Cards View -->
        <div id="cards-view" class="events-grid">
            ${getEventCards()}
        </div>

        <!-- Calendar View -->
        <div id="calendar-view" class="calendar-container">
            ${getCalendarView()}
        </div>
    `;
}

function getEventCards() {
    const events = [
        { id: 'event_1', category: 'art', icon: '🎵', date: 'Dec 15, 2024', dateISO: '2024-12-15', title: 'Carnatic Music Concert', location: 'Cary Arts Center, Cary NC', time: '7:00 PM - 9:30 PM', organizer: 'Raleigh Classical Music Society', tags: ['Music', 'Classical'] },
        { id: 'event_2', category: 'art', icon: '💃', date: 'Dec 22, 2024', dateISO: '2024-12-22', title: 'Bharatanatyam Workshop', location: 'Durham Community Center', time: '2:00 PM - 5:00 PM', organizer: 'Priya Sharma', tags: ['Dance', 'Workshop'] },
        { id: 'event_3', category: 'art', icon: '🎭', date: 'Feb 1, 2025', dateISO: '2025-02-01', title: 'Hindi Theatre Production', location: 'Fletcher Opera Theater, Raleigh', time: '7:30 PM - 10:00 PM', organizer: 'RTP Theatre Group', tags: ['Theatre', 'Hindi'] },
        { id: 'event_4', category: 'culture', icon: '🪔', date: 'Jan 1, 2025', dateISO: '2025-01-01', title: 'Pongal Celebration', location: 'Morrisville Community Park', time: '10:00 AM - 4:00 PM', organizer: 'Tamil Sangam of RTP', tags: ['Festival', 'Family'] },
        { id: 'event_5', category: 'health', icon: '🧘', date: 'Jan 15, 2025', dateISO: '2025-01-15', title: 'Yoga and Meditation Retreat', location: 'Jordan Lake Retreat Center', time: '9:00 AM - 5:00 PM', organizer: 'Dr. Anita Patel', tags: ['Yoga', 'Wellness'] },
        { id: 'event_6', category: 'health', icon: '🌿', date: 'Jan 20, 2025', dateISO: '2025-01-20', title: 'Ayurveda Workshop', location: 'Wellness Center, Durham', time: '2:00 PM - 5:00 PM', organizer: '', tags: ['Ayurveda', 'Health'] },
        { id: 'event_7', category: 'faith', icon: '🕉️', date: 'Jan 25, 2025', dateISO: '2025-01-25', title: 'Bhagavad Gita Study Circle', location: 'Hindu Temple, Morrisville', time: '6:00 PM - 8:00 PM', organizer: '', tags: ['Spiritual', 'Study'] },
        { id: 'event_8', category: 'faith', icon: '🙏', date: 'Feb 5, 2025', dateISO: '2025-02-05', title: 'Meditation & Kirtan Evening', location: 'ISKCON Temple, Cary', time: '7:00 PM - 9:00 PM', organizer: '', tags: ['Meditation', 'Music'] },
        { id: 'event_9', category: 'culinary', icon: '🍛', date: 'Jan 10, 2025', dateISO: '2025-01-10', title: 'North Indian Cooking Class', location: 'Culinary Arts Studio, Chapel Hill', time: '6:00 PM - 8:30 PM', organizer: 'Chef Rajesh Kumar', tags: ['Cooking', 'Workshop'] },
        { id: 'event_10', category: 'culinary', icon: '🥘', date: 'Jan 18, 2025', dateISO: '2025-01-18', title: 'South Indian Tiffin Workshop', location: 'Community Kitchen, Raleigh', time: '10:00 AM - 1:00 PM', organizer: '', tags: ['Cooking', 'South Indian'] },
        { id: 'event_11', category: 'culinary', icon: '🍰', date: 'Feb 8, 2025', dateISO: '2025-02-08', title: 'Indian Desserts Masterclass', location: 'Baking Studio, Durham', time: '3:00 PM - 6:00 PM', organizer: '', tags: ['Desserts', 'Baking'] }
    ];

    return events.map(event => {
        const buttons = createActionButtons(event.id, 'Event', event.title, true, event.dateISO);
        return `
        <div class="event-card" data-category="${event.category}" data-item-id="${event.id}">
            ${buttons.actionButtons}
            <div class="event-image">${event.icon}</div>
            <div class="event-content">
                <span class="event-date">${event.date}</span>
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <span>📍 ${event.location}</span>
                    <span>🕐 ${event.time}</span>
                    ${event.organizer ? `<span>👤 ${event.organizer}</span>` : ''}
                </div>
                <div class="event-tags">
                    ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
                </div>
                ${buttons.rsvpButton}
            </div>
        </div>
    `;
    }).join('');
}

function getCalendarView() {
    return `
        <div class="calendar-header">
            <h3>December 2024</h3>
            <div class="calendar-nav">
                <button>← Previous</button>
                <button>Next →</button>
            </div>
        </div>
        <div class="calendar-grid">
            <div class="calendar-day"><div class="calendar-day-header">Sun</div></div>
            <div class="calendar-day"><div class="calendar-day-header">Mon</div></div>
            <div class="calendar-day"><div class="calendar-day-header">Tue</div></div>
            <div class="calendar-day"><div class="calendar-day-header">Wed</div></div>
            <div class="calendar-day"><div class="calendar-day-header">Thu</div></div>
            <div class="calendar-day"><div class="calendar-day-header">Fri</div></div>
            <div class="calendar-day"><div class="calendar-day-header">Sat</div></div>
            
            <div class="calendar-day">1</div>
            <div class="calendar-day">2</div>
            <div class="calendar-day">3</div>
            <div class="calendar-day">4</div>
            <div class="calendar-day">5</div>
            <div class="calendar-day">6</div>
            <div class="calendar-day">7</div>
            <div class="calendar-day">8</div>
            <div class="calendar-day">9</div>
            <div class="calendar-day">10</div>
            <div class="calendar-day">11</div>
            <div class="calendar-day">12</div>
            <div class="calendar-day">13</div>
            <div class="calendar-day">14</div>
            <div class="calendar-day">
                15
                <div class="calendar-event">Carnatic Concert</div>
            </div>
            <div class="calendar-day">16</div>
            <div class="calendar-day">17</div>
            <div class="calendar-day">18</div>
            <div class="calendar-day">19</div>
            <div class="calendar-day">20</div>
            <div class="calendar-day">21</div>
            <div class="calendar-day">
                22
                <div class="calendar-event">Bharatanatyam</div>
            </div>
            <div class="calendar-day">23</div>
            <div class="calendar-day">24</div>
            <div class="calendar-day">25</div>
            <div class="calendar-day">26</div>
            <div class="calendar-day">27</div>
            <div class="calendar-day">28</div>
            <div class="calendar-day">29</div>
            <div class="calendar-day">30</div>
            <div class="calendar-day">31</div>
        </div>
    `;
}

function loadClassifiedsSection() {
    const section = document.getElementById('classifieds-section');
    
    const classifieds = [
        { id: 'classified_1', category: 'art', type: 'OFFERED', title: 'Tabla Lessons Available', description: 'Experienced tabla player offering lessons for beginners and intermediate students.', tags: ['Music', 'Teaching'] },
        { id: 'classified_2', category: 'art', type: 'NEEDED', title: 'Looking for Kathak Dance Teacher', description: 'Seeking qualified Kathak dance instructor for 8-year-old daughter.', tags: ['Dance', 'Kids'] },
        { id: 'classified_3', category: 'culinary', type: 'OFFERED', title: 'Home Cooked Indian Meals', description: 'Authentic North and South Indian meals prepared fresh. Catering available.', tags: ['Culinary', 'Catering'] },
        { id: 'classified_4', category: 'health', type: 'OFFERED', title: 'Ayurvedic Consultation', description: 'Certified Ayurvedic practitioner offering personalized wellness consultations.', tags: ['Health', 'Ayurveda'] },
        { id: 'classified_5', category: 'faith', type: 'OFFERED', title: 'Sanskrit & Vedic Studies Tutoring', description: 'Qualified teacher offering Sanskrit language and Vedic philosophy lessons for all ages.', tags: ['Education', 'Spiritual'] },
        { id: 'classified_6', category: 'faith', type: 'NEEDED', title: 'Priest for Home Puja', description: 'Looking for qualified priest to conduct Griha Pravesh ceremony in early January.', tags: ['Religious Services', 'Ceremony'] }
    ];
    
    section.innerHTML = `
        <div class="view-controls">
            <h2 class="view-title">Classifieds</h2>
        </div>
        <div class="events-grid">
            ${classifieds.map(item => {
                const buttons = createActionButtons(item.id, 'Classified', item.title);
                return `
                <div class="event-card" data-category="${item.category}" data-item-id="${item.id}">
                    ${buttons.actionButtons}
                    <div class="event-content">
                        <span class="event-date" style="background: ${item.type === 'OFFERED' ? '#138808' : '#E87722'};">${item.type}</span>
                        <h3>${item.title}</h3>
                        <div class="event-meta">
                            <span>${item.description}</span>
                        </div>
                        <div class="event-tags">
                            ${item.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            }).join('')}
        </div>
    `;
}

function loadMarketplaceSection() {
    const section = document.getElementById('marketplace-section');
    
    const items = [
        { id: 'marketplace_1', category: 'art', price: '$350', title: 'Tabla Set - Like New', description: 'Professional quality tabla set, barely used. Includes case, cushion, and maintenance tools.', tags: ['Instruments', 'Music'] },
        { id: 'marketplace_2', category: 'art', price: '$45', title: 'Indian Classical Music Books', description: 'Comprehensive guide to Hindustani classical music. Set of 5 books in excellent condition.', tags: ['Books', 'Education'] },
        { id: 'marketplace_3', category: 'art', price: '$120', title: 'Bharatanatyam Dance Costume', description: 'Beautiful silk costume in red and gold. Size medium. Worn only once for performance.', tags: ['Costumes', 'Dance'] },
        { id: 'marketplace_4', category: 'health', price: '$25', title: 'Yoga Props Set', description: 'Complete yoga props set including blocks, strap, bolster, and mat. Lightly used.', tags: ['Health', 'Yoga'] },
        { id: 'marketplace_5', category: 'faith', price: '$150', title: 'Puja Items Collection', description: 'Complete set of brass puja items including bells, diya, thali, and idols. Excellent condition.', tags: ['Religious Items', 'Brass'] },
        { id: 'marketplace_6', category: 'faith', price: '$40', title: 'Bhagavad Gita Commentary Set', description: 'Complete set of Bhagavad Gita with detailed Sanskrit-English commentary. Like new condition.', tags: ['Books', 'Scripture'] }
    ];
    
    section.innerHTML = `
        <div class="view-controls">
            <h2 class="view-title">Marketplace</h2>
        </div>
        <div class="events-grid">
            ${items.map(item => {
                const buttons = createActionButtons(item.id, 'Marketplace', item.title);
                return `
                <div class="event-card" data-category="${item.category}" data-item-id="${item.id}">
                    ${buttons.actionButtons}
                    <div class="event-content">
                        <span class="event-date">${item.price}</span>
                        <h3>${item.title}</h3>
                        <div class="event-meta">
                            <span>${item.description}</span>
                        </div>
                        <div class="event-tags">
                            ${item.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            }).join('')}
        </div>
    `;
}

function loadPeopleSection() {
    const section = document.getElementById('people-section');
    
    const people = [
        { id: 'people_1', category: 'art', icon: '👥', title: 'Raleigh Classical Music Society', location: 'Raleigh, NC', description: 'Promoting Indian classical music in the Triangle area', tags: ['Organization', 'Music'] },
        { id: 'people_2', category: 'art', icon: '👤', title: 'Priya Sharma - Dance Instructor', location: 'Durham, NC', description: 'Bharatanatyam and Kathak instructor with 20+ years experience', tags: ['Instructor', 'Dance'] },
        { id: 'people_3', category: 'culture', icon: '👥', title: 'Tamil Sangam of RTP', location: 'Morrisville, NC', description: 'Preserving and promoting Tamil language and culture', tags: ['Organization', 'Culture'] },
        { id: 'people_4', category: 'faith', icon: '🕉️', title: 'Hindu Society of North Carolina', location: 'Morrisville, NC', description: 'Premier Hindu temple and cultural center serving the Triangle area', tags: ['Temple', 'Organization'] },
        { id: 'people_5', category: 'faith', icon: '👤', title: 'Pandit Ramesh Sharma', location: 'Cary, NC', description: 'Experienced priest for all Hindu ceremonies and rituals', tags: ['Priest', 'Religious Services'] }
    ];
    
    section.innerHTML = `
        <div class="view-controls">
            <h2 class="view-title">People & Organizations</h2>
        </div>
        <div class="events-grid">
            ${people.map(person => {
                const buttons = createActionButtons(person.id, 'Organization', person.title);
                return `
                <div class="event-card" data-category="${person.category}" data-item-id="${person.id}">
                    ${buttons.actionButtons}
                    <div class="event-image">${person.icon}</div>
                    <div class="event-content">
                        <h3>${person.title}</h3>
                        <div class="event-meta">
                            <span>📍 ${person.location}</span>
                            <span>${person.description}</span>
                        </div>
                        <div class="event-tags">
                            ${person.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            }).join('')}
        </div>
    `;
}
