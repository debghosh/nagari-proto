# Indian Community Portal - Triangle Area, NC

A comprehensive web portal for the Indian community in the Research Triangle Park area (Raleigh, Durham, Chapel Hill, NC).

## 🌟 Features

### Public Features
- **Events Calendar**: Browse upcoming cultural, religious, and community events
- **Classifieds**: Post and browse service offerings and requests
- **Marketplace**: Buy and sell items within the community
- **People & Organizations**: Connect with community members and organizations
- **Get Involved**: Volunteer opportunities and civic engagement resources
- **AI Assistant**: Smart search and recommendations

### Authenticated User Features
- **Personal Dashboard**: Customized view of relevant events and content
- **Event Management**: Create, manage, and RSVP to events
- **Community Networking**: Connect with other members
- **Enhanced Marketplace**: Post listings with photos
- **Volunteer Tracking**: Track volunteer hours and impact
- **Exclusive Content**: Access to premium resources and workshops

## 📁 Project Structure

```
indian-community-portal/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All CSS styles
├── js/
│   ├── app.js             # Main JavaScript application logic
│   └── data-loader.js     # Dynamic content loader
├── assets/
│   ├── images/            # Image assets
│   └── icons/             # Icon files
├── docs/
│   └── AUTHENTICATED_FEATURES.md  # Detailed feature documentation
├── config/
│   └── [Configuration files for backend]
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for production) or local development server

### Local Development

1. **Clone or download the project**
   ```bash
   git clone [repository-url]
   cd indian-community-portal
   ```

2. **Start a local web server**
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   npx http-server
   ```
   
   Using PHP:
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Production Deployment

#### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)
1. Upload the entire project folder
2. Set `index.html` as the entry point
3. Deploy

#### Option 2: Traditional Web Server (Apache, Nginx)
1. Copy files to web server directory
2. Configure virtual host
3. Restart web server

#### Option 3: Cloud Platform (AWS, Google Cloud, Azure)
1. Use S3 + CloudFront (AWS) or equivalent
2. Configure CDN for optimal performance
3. Set up SSL certificate

## 🔐 Authentication Setup

The current implementation uses local storage for demo purposes. For production:

### Backend Requirements
1. **Authentication Server**
   - Implement JWT token generation
   - Password hashing (bcrypt, argon2)
   - Email verification
   - Password reset functionality

2. **Database**
   - User profiles and credentials
   - Event and listing data
   - Transaction logs
   - Audit trails

3. **API Endpoints**
   ```
   POST /api/auth/register
   POST /api/auth/login
   POST /api/auth/logout
   POST /api/auth/refresh
   POST /api/auth/reset-password
   GET  /api/user/profile
   PUT  /api/user/profile
   ```

### Security Checklist
- [ ] Implement HTTPS/TLS
- [ ] Set up CORS properly
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Sanitize all user inputs
- [ ] Implement content security policy
- [ ] Set secure cookie flags
- [ ] Regular security audits

## 🔧 Configuration

### Environment Variables
Create a `.env` file for sensitive configuration:

```env
# API Configuration
API_BASE_URL=https://api.yourdomain.com
API_KEY=your_api_key_here

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRY=24h

# Email Service
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your_password_here

# Database
DB_HOST=localhost
DB_NAME=indian_portal
DB_USER=db_user
DB_PASS=db_password

# Third-party Services
GOOGLE_OAUTH_CLIENT_ID=your_client_id
FACEBOOK_APP_ID=your_app_id
STRIPE_PUBLIC_KEY=your_stripe_key
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);
```

### Events Table
```sql
CREATE TABLE events (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    location VARCHAR(500),
    organizer_id UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Customization

### Styling
Modify `/css/styles.css` to customize:
- Colors (CSS variables in `:root`)
- Fonts
- Layout dimensions
- Animations

### Content
Edit `/js/data-loader.js` to:
- Add/remove event categories
- Modify card layouts
- Change default content

### Features
Extend `/js/app.js` to:
- Add new functionality
- Integrate third-party services
- Implement additional user features

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Event browsing and filtering
- [ ] Category navigation
- [ ] Search functionality
- [ ] AI assistant interaction
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Form validation
- [ ] Error handling

### Automated Testing
Consider implementing:
- Unit tests (Jest, Mocha)
- Integration tests
- End-to-end tests (Cypress, Playwright)
- Accessibility tests (axe, WAVE)

## 📱 Progressive Web App (PWA)

To convert to a PWA, add:

1. **manifest.json**
```json
{
  "name": "Indian Community Portal",
  "short_name": "IN Triangle",
  "description": "Community portal for Triangle Area Indian community",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#E87722",
  "icons": [
    {
      "src": "/assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. **Service Worker** for offline functionality

## 🌐 Internationalization (i18n)

To add multiple languages:

1. Create language files:
   ```
   /locales/en.json
   /locales/hi.json
   /locales/ta.json
   ```

2. Implement language switcher
3. Use translation library (i18next)

## 📈 Analytics Integration

### Google Analytics
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Event Tracking
```javascript
// Track user interactions
function trackEvent(category, action, label) {
    if (window.gtag) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Coding Standards
- Use meaningful variable names
- Comment complex logic
- Follow existing code style
- Write tests for new features
- Update documentation

## 📝 License

[Choose appropriate license - MIT, Apache 2.0, etc.]

## 📞 Support

- **Email**: support@intriangledesi.com
- **Documentation**: [Link to detailed docs]
- **Issues**: [Link to issue tracker]

## 🙏 Acknowledgments

- Community members and volunteers
- Open source libraries and tools
- Local organizations and sponsors

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic portal functionality
- ✅ Event browsing
- ✅ Authentication system
- ✅ Get Involved section

### Phase 2 (Q1 2025)
- [ ] Backend API implementation
- [ ] Real-time chat messaging
- [ ] Payment integration
- [ ] Mobile app (React Native)

### Phase 3 (Q2 2025)
- [ ] Advanced AI recommendations
- [ ] Video streaming for events
- [ ] Multi-language support
- [ ] Integration with local government portals

### Phase 4 (Q3 2025)
- [ ] Blockchain-based verification
- [ ] Virtual event hosting
- [ ] Advanced analytics dashboard
- [ ] API for third-party integrations

## 📊 Performance Optimization

- Lazy load images
- Minify CSS and JavaScript
- Use CDN for static assets
- Implement caching strategies
- Optimize database queries
- Use compression (gzip/brotli)

## 🔒 Privacy & Compliance

- GDPR compliance for EU users
- CCPA compliance for California users
- COPPA compliance for users under 13
- Data breach notification procedures
- Regular privacy audits

See [AUTHENTICATED_FEATURES.md](docs/AUTHENTICATED_FEATURES.md) for detailed compliance information.

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Maintained by**: IN Triangle Desi Community Team
