# Facilitator Assessment Dashboard

## Overview

This is a Flask-based web application designed for assessing facilitators during workshop sessions. The application provides a modern, minimalist dashboard interface for evaluating facilitators across multiple dimensions (communication, collaboration, leadership, problem-solving, adaptability) using a star rating system. It's specifically tailored for the "Mission: Sync" workshop conducted by Google Manila L&D. The interface has been completely redesigned to match modern task management app aesthetics with card-based layouts, subtle shadows, and clean typography.

## System Architecture

### Frontend Architecture
- **Technology**: HTML5, CSS3, JavaScript (ES6+)
- **Design System**: Custom minimal design inspired by modern task management apps
- **Layout**: Three-panel layout (sidebar navigation, main content with cards, detail panel)
- **Icons**: Font Awesome 6.4.0
- **Architecture Pattern**: Client-side MVC with vanilla JavaScript
- **State Management**: LocalStorage for persistence
- **Visual Style**: Card-based interface with soft shadows, rounded corners, and subtle color-coded priority badges

### Backend Architecture
- **Framework**: Flask (Python)
- **Pattern**: Simple MVC structure
- **Session Management**: Flask sessions with configurable secret key
- **Environment Configuration**: Environment variables for secrets

### File Structure
```
/
├── app.py              # Main Flask application
├── main.py             # Application entry point
├── templates/
│   └── index.html      # Main dashboard template
└── static/
    ├── css/
    │   └── style.css   # Custom styles
    └── js/
        └── dashboard.js # Dashboard functionality
```

## Key Components

### 1. Flask Application (`app.py`)
- Minimal Flask setup with single route
- Session management configuration
- Development-ready with debug mode
- Environment-aware secret key handling

### 2. Dashboard Interface (`templates/index.html`)
- Three-panel minimalist layout (sidebar, main content, detail panel)
- Left sidebar with icon-based navigation
- Main content area with card-based assessment sections (TODO, IN PROGRESS, COMPLETED)
- Right detail panel for assessment details and notes
- Team and activity selection controls in compact form
- Interactive star rating system within assessment cards
- Real-time session information display with modern typography

### 3. Frontend Logic (`static/js/dashboard.js`)
- FacilitatorDashboard class managing application state
- Rating system with 5 assessment dimensions
- LocalStorage integration for data persistence
- Event handling for user interactions

### 4. Styling (`static/css/style.css`)
- Complete minimalist redesign inspired by modern task management applications
- Three-panel layout with clean borders and subtle shadows
- Card-based interface with hover effects and smooth transitions
- Color-coded priority badges (high: red, medium: orange, low: green)
- Responsive design that adapts to mobile with collapsible panels
- Modern typography using system fonts
- Subtle animations for improved user feedback

## Data Flow

1. **User Interaction**: User selects team and activity through dropdown menus
2. **Rating Input**: User provides ratings using interactive star system
3. **State Management**: JavaScript class maintains current assessment state
4. **Data Persistence**: LocalStorage saves assessment data client-side
5. **Real-time Updates**: Dashboard reflects changes immediately

### Assessment Dimensions
- Communication
- Collaboration
- Leadership
- Problem-solving
- Adaptability

## External Dependencies

### Frontend Dependencies (CDN)
- **Bootstrap 5.3.0**: UI framework for responsive design
- **Font Awesome 6.4.0**: Icon library for visual elements

### Backend Dependencies
- **Flask**: Web framework for Python
- **Python Standard Library**: OS module for environment variables

## Deployment Strategy

### Development Environment
- **Host**: 0.0.0.0 (allows external connections)
- **Port**: 5000
- **Debug Mode**: Enabled for development
- **Session Secret**: Configurable via environment variable

### Production Considerations
- Session secret should be set via `SESSION_SECRET` environment variable
- Debug mode should be disabled
- Consider adding WSGI server (Gunicorn, uWSGI)
- Static file serving should be handled by web server

## Changelog
- July 08, 2025: Initial setup with Bootstrap-based design
- July 08, 2025: Complete UI/UX redesign - Implemented minimalist task management app interface with card-based layout, three-panel design (sidebar navigation, main content cards, detail panel), color-coded priority badges, and modern typography. Replaced Bootstrap with custom CSS for cleaner aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.