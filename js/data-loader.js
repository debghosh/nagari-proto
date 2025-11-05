// ================================================
// Data Loader - Loads content dynamically
// ================================================

// This file will be used to load event data from API or JSON files
// For now, it includes the static content from the portal

document.addEventListener('DOMContentLoaded', function() {
    loadEventsSection();
    loadClassifiedsSection();
    loadMarketplaceSection();
    loadPeopleSection();
});

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
    return `
        <!-- Art Events -->
        <div class="event-card" data-category="art">
            <div class="event-image">🎵</div>
            <div class="event-content">
                <span class="event-date">Dec 15, 2024</span>
                <h3>Carnatic Music Concert</h3>
                <div class="event-meta">
                    <span>📍 Cary Arts Center, Cary NC</span>
                    <span>🕐 7:00 PM - 9:30 PM</span>
                    <span>👤 Raleigh Classical Music Society</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag">Music</span>
                    <span class="event-tag">Classical</span>
                </div>
            </div>
        </div>

        <div class="event-card" data-category="art">
            <div class="event-image">💃</div>
            <div class="event-content">
                <span class="event-date">Dec 22, 2024</span>
                <h3>Bharatanatyam Workshop</h3>
                <div class="event-meta">
                    <span>📍 Durham Community Center</span>
                    <span>🕐 2:00 PM - 5:00 PM</span>
                    <span>👤 Priya Sharma</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag">Dance</span>
                    <span class="event-tag">Workshop</span>
                </div>
            </div>
        </div>

        <div class="event-card" data-category="art">
            <div class="event-image">🎭</div>
            <div class="event-content">
                <span class="event-date">Feb 1, 2025</span>
                <h3>Hindi Theatre Production</h3>
                <div class="event-meta">
                    <span>📍 Fletcher Opera Theater, Raleigh</span>
                    <span>🕐 7:30 PM - 10:00 PM</span>
                    <span>👤 RTP Theatre Group</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag">Theatre</span>
                    <span class="event-tag">Hindi</span>
                </div>
            </div>
        </div>

        <!-- Culture Events -->
        <div class="event-card" data-category="culture">
            <div class="event-image">🪔</div>
            <div class="event-content">
                <span class="event-date">Jan 1, 2025</span>
                <h3>Pongal Celebration</h3>
                <div class="event-meta">
                    <span>📍 Morrisville Community Park</span>
                    <span>🕐 10:00 AM - 4:00 PM</span>
                    <span>👤 Tamil Sangam of RTP</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag">Festival</span>
                    <span class="event-tag">Family</span>
                </div>
            </div>
        </div>

        <!-- Health Events -->
        <div class="event-card" data-category="health">
            <div class="event-image">🧘</div>
            <div class="event-content">
                <span class="event-date">Jan 15, 2025</span>
                <h3>Yoga and Meditation Retreat</h3>
                <div class="event-meta">
                    <span>📍 Jordan Lake Retreat Center</span>
                    <span>🕐 9:00 AM - 5:00 PM</span>
                    <span>👤 Dr. Anita Patel</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag">Yoga</span>
                    <span class="event-tag">Wellness</span>
                </div>
            </div>
        </div>

        <div class="event-card" data-category="health">
            <div class="event-image">🌿</div>
            <div class="event-content">
                <span class="event-date">Jan 20, 2025</span>
                <h3>Ayurveda Workshop</h3>
                <div class="event-meta">
                    <span>📍 Wellness Center, Durham</span>
                    <span>🕐 2:00 PM - 5:00 PM</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag">Ayurveda</span>
                    <span class="event-tag">Health</span>
                </div>
            </div>
        </div>

        <!-- Faith Events -->
        <div class="event-card" data-category="faith">
            <div class="event-image">🕉️</div>
            <div class="event-content">
                <span class="event-date">Jan 25, 2025</span>
                <h3>Bhagavad Gita Study Circle</h3>
                <div class="event-meta">
                    <span>📍 Hindu Temple, Morrisville</span>
                    <span>🕐 6:00 PM - 8:00 PM</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag">Spiritual</span>
                    <span class="event-tag">Study</span>
                </div>
            </div>
        </div>

        <div class="event-card" data-category="faith">
            <div class="event-image">🙏</div>
            <div class="event-content">
                <span class="event-date">Feb 5, 2025</span>
                <h3>Meditation & Kirtan Evening</h3>
                <div class="event-meta">
                    <span>📍 ISKCON Temple, Cary</span>
                    <span>🕐 7:00 PM - 9:00 PM</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag">Meditation</span>
                    <span class="event-tag">Music</span>
                </div>
            </div>
        </div>

        <!-- Culinary Events -->
        <div class="event-card" data-category="culinary">
            <div class="event-image">🍛</div>
            <div class="event-content">
                <span class="event-date">Jan 10, 2025</span>
                <h3>North Indian Cooking Class</h3>
                <div class="event-meta">
                    <span>📍 Culinary Arts Studio, Chapel Hill</span>
                    <span>🕐 6:00 PM - 8:30 PM</span>
                    <span>👤 Chef Rajesh Kumar</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag">Cooking</span>
                    <span class="event-tag">Workshop</span>
                </div>
            </div>
        </div>

        <div class="event-card" data-category="culinary">
            <div class="event-image">🥘</div>
            <div class="event-content">
                <span class="event-date">Jan 18, 2025</span>
                <h3>South Indian Tiffin Workshop</h3>
                <div class="event-meta">
                    <span>📍 Community Kitchen, Raleigh</span>
                    <span>🕐 10:00 AM - 1:00 PM</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag">Cooking</span>
                    <span class="event-tag">South Indian</span>
                </div>
            </div>
        </div>

        <div class="event-card" data-category="culinary">
            <div class="event-image">🍰</div>
            <div class="event-content">
                <span class="event-date">Feb 8, 2025</span>
                <h3>Indian Desserts Masterclass</h3>
                <div class="event-meta">
                    <span>📍 Baking Studio, Durham</span>
                    <span>🕐 3:00 PM - 6:00 PM</span>
                </div>
                <div class="event-tags">
                    <span class="event-tag">Desserts</span>
                    <span class="event-tag">Baking</span>
                </div>
            </div>
        </div>
    `;
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
    section.innerHTML = `
        <div class="view-controls">
            <h2 class="view-title">Classifieds</h2>
        </div>
        <div class="events-grid">
            <div class="event-card" data-category="art">
                <div class="event-content">
                    <span class="event-date" style="background: #138808;">OFFERED</span>
                    <h3>Tabla Lessons Available</h3>
                    <div class="event-meta">
                        <span>Experienced tabla player offering lessons for beginners and intermediate students.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Music</span>
                        <span class="event-tag">Teaching</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="art">
                <div class="event-content">
                    <span class="event-date">NEEDED</span>
                    <h3>Looking for Kathak Dance Teacher</h3>
                    <div class="event-meta">
                        <span>Seeking qualified Kathak dance instructor for 8-year-old daughter.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Dance</span>
                        <span class="event-tag">Kids</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="culinary">
                <div class="event-content">
                    <span class="event-date" style="background: #138808;">OFFERED</span>
                    <h3>Home Cooked Indian Meals</h3>
                    <div class="event-meta">
                        <span>Authentic North and South Indian meals prepared fresh. Catering available.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Culinary</span>
                        <span class="event-tag">Catering</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="health">
                <div class="event-content">
                    <span class="event-date" style="background: #138808;">OFFERED</span>
                    <h3>Ayurvedic Consultation</h3>
                    <div class="event-meta">
                        <span>Certified Ayurvedic practitioner offering personalized wellness consultations.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Health</span>
                        <span class="event-tag">Ayurveda</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="faith">
                <div class="event-content">
                    <span class="event-date" style="background: #138808;">OFFERED</span>
                    <h3>Sanskrit & Vedic Studies Tutoring</h3>
                    <div class="event-meta">
                        <span>Qualified teacher offering Sanskrit language and Vedic philosophy lessons for all ages.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Education</span>
                        <span class="event-tag">Spiritual</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="faith">
                <div class="event-content">
                    <span class="event-date">NEEDED</span>
                    <h3>Priest for Home Puja</h3>
                    <div class="event-meta">
                        <span>Looking for qualified priest to conduct Griha Pravesh ceremony in early January.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Religious Services</span>
                        <span class="event-tag">Ceremony</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadMarketplaceSection() {
    const section = document.getElementById('marketplace-section');
    section.innerHTML = `
        <div class="view-controls">
            <h2 class="view-title">Marketplace</h2>
        </div>
        <div class="events-grid">
            <div class="event-card" data-category="art">
                <div class="event-content">
                    <span class="event-date">$350</span>
                    <h3>Tabla Set - Like New</h3>
                    <div class="event-meta">
                        <span>Professional quality tabla set, barely used. Includes case, cushion, and maintenance tools.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Instruments</span>
                        <span class="event-tag">Music</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="art">
                <div class="event-content">
                    <span class="event-date">$45</span>
                    <h3>Indian Classical Music Books</h3>
                    <div class="event-meta">
                        <span>Comprehensive guide to Hindustani classical music. Set of 5 books in excellent condition.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Books</span>
                        <span class="event-tag">Education</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="art">
                <div class="event-content">
                    <span class="event-date">$120</span>
                    <h3>Bharatanatyam Dance Costume</h3>
                    <div class="event-meta">
                        <span>Beautiful silk costume in red and gold. Size medium. Worn only once for performance.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Costumes</span>
                        <span class="event-tag">Dance</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="health">
                <div class="event-content">
                    <span class="event-date">$25</span>
                    <h3>Yoga Props Set</h3>
                    <div class="event-meta">
                        <span>Complete yoga props set including blocks, strap, bolster, and mat. Lightly used.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Health</span>
                        <span class="event-tag">Yoga</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="faith">
                <div class="event-content">
                    <span class="event-date">$150</span>
                    <h3>Puja Items Collection</h3>
                    <div class="event-meta">
                        <span>Complete set of brass puja items including bells, diya, thali, and idols. Excellent condition.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Religious Items</span>
                        <span class="event-tag">Brass</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="faith">
                <div class="event-content">
                    <span class="event-date">$40</span>
                    <h3>Bhagavad Gita Commentary Set</h3>
                    <div class="event-meta">
                        <span>Complete set of Bhagavad Gita with detailed Sanskrit-English commentary. Like new condition.</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Books</span>
                        <span class="event-tag">Scripture</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadPeopleSection() {
    const section = document.getElementById('people-section');
    section.innerHTML = `
        <div class="view-controls">
            <h2 class="view-title">People & Organizations</h2>
        </div>
        <div class="events-grid">
            <div class="event-card" data-category="art">
                <div class="event-image">👥</div>
                <div class="event-content">
                    <h3>Raleigh Classical Music Society</h3>
                    <div class="event-meta">
                        <span>📍 Raleigh, NC</span>
                        <span>Promoting Indian classical music in the Triangle area</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Organization</span>
                        <span class="event-tag">Music</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="art">
                <div class="event-image">👤</div>
                <div class="event-content">
                    <h3>Priya Sharma - Dance Instructor</h3>
                    <div class="event-meta">
                        <span>📍 Durham, NC</span>
                        <span>Bharatanatyam and Kathak instructor with 20+ years experience</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Instructor</span>
                        <span class="event-tag">Dance</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="culture">
                <div class="event-image">👥</div>
                <div class="event-content">
                    <h3>Tamil Sangam of RTP</h3>
                    <div class="event-meta">
                        <span>📍 Morrisville, NC</span>
                        <span>Preserving and promoting Tamil language and culture</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Organization</span>
                        <span class="event-tag">Culture</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="faith">
                <div class="event-image">🕉️</div>
                <div class="event-content">
                    <h3>Hindu Society of North Carolina</h3>
                    <div class="event-meta">
                        <span>📍 Morrisville, NC</span>
                        <span>Premier Hindu temple and cultural center serving the Triangle area</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Temple</span>
                        <span class="event-tag">Organization</span>
                    </div>
                </div>
            </div>

            <div class="event-card" data-category="faith">
                <div class="event-image">👤</div>
                <div class="event-content">
                    <h3>Pandit Ramesh Sharma</h3>
                    <div class="event-meta">
                        <span>📍 Cary, NC</span>
                        <span>Experienced priest for all Hindu ceremonies and rituals</span>
                    </div>
                    <div class="event-tags">
                        <span class="event-tag">Priest</span>
                        <span class="event-tag">Religious Services</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}
