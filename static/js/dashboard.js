// Dashboard JavaScript - Facilitator Assessment Tool (Redesigned)
class FacilitatorDashboard {
    constructor() {
        this.ratings = {
            communication: 0,
            collaboration: 0,
            leadership: 0,
            'problem-solving': 0,
            adaptability: 0
        };
        this.currentTeam = '';
        this.currentActivity = '';
        this.notes = '';
        this.selectedCard = null;
        
        this.init();
    }

    init() {
        this.initializeMockData();
        this.setupEventListeners();
        this.updateCurrentTime();
        this.loadSavedData();
        this.updateCurrentSelection();
        this.updateDashboardStats();
        
        // Update time every minute
        setInterval(() => this.updateCurrentTime(), 60000);
    }

    initializeMockData() {
        // Check if mock data already exists
        if (localStorage.getItem('assessment-history')) {
            return;
        }

        // Create realistic mock assessment data
        const mockAssessments = [
            {
                sessionId: 'session-001',
                team: 'alpha',
                activity: 'crash-landing',
                ratings: {
                    communication: 4,
                    collaboration: 5,
                    leadership: 3,
                    'problem-solving': 4,
                    adaptability: 4
                },
                notes: 'Team Alpha showed excellent collaboration during the crash landing simulation. Strong communication under pressure, but leadership could be more decisive.',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                duration: 45
            },
            {
                sessionId: 'session-002',
                team: 'beta',
                activity: 'crash-landing',
                ratings: {
                    communication: 3,
                    collaboration: 4,
                    leadership: 4,
                    'problem-solving': 5,
                    adaptability: 3
                },
                notes: 'Team Beta demonstrated exceptional problem-solving skills. Quick to adapt strategy when initial approach failed. Communication was clear and focused.',
                timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
                duration: 42
            },
            {
                sessionId: 'session-003',
                team: 'gamma',
                activity: 'lunar-logistics',
                ratings: {
                    communication: 5,
                    collaboration: 4,
                    leadership: 5,
                    'problem-solving': 4,
                    adaptability: 4
                },
                notes: 'Outstanding performance from Team Gamma. Natural leaders emerged and coordinated the team effectively. Excellent resource management and strategic thinking.',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                duration: 52
            },
            {
                sessionId: 'session-004',
                team: 'alpha',
                activity: 'lunar-logistics',
                ratings: {
                    communication: 4,
                    collaboration: 5,
                    leadership: 4,
                    'problem-solving': 3,
                    adaptability: 5
                },
                notes: 'Team Alpha adapted well to the logistics challenge. Strong teamwork and flexibility when plans changed. Some hesitation in initial problem-solving phase.',
                timestamp: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(),
                duration: 48
            },
            {
                sessionId: 'session-005',
                team: 'beta',
                activity: 'lunar-logistics',
                ratings: {
                    communication: 4,
                    collaboration: 3,
                    leadership: 3,
                    'problem-solving': 4,
                    adaptability: 4
                },
                notes: 'Team Beta showed good individual skills but struggled with coordination. Communication breakdowns in the middle phase but recovered well.',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
                duration: 55
            },
            {
                sessionId: 'session-006',
                team: 'gamma',
                activity: 'final-mission',
                ratings: {
                    communication: 5,
                    collaboration: 5,
                    leadership: 4,
                    'problem-solving': 5,
                    adaptability: 5
                },
                notes: 'Exceptional performance in the final mission. Team Gamma demonstrated mastery of all key competencies. Seamless coordination and innovative problem-solving.',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
                duration: 63
            }
        ];

        // Store mock data
        localStorage.setItem('assessment-history', JSON.stringify(mockAssessments));
        
        // Initialize mock teams data
        const mockTeams = {
            alpha: {
                members: ['Sarah Johnson', 'Mike Chen', 'Lisa Rodriguez', 'James Wilson', 'Ana Martinez'],
                completedActivities: ['crash-landing', 'lunar-logistics'],
                currentActivity: 'final-mission',
                averageRating: 4.2,
                status: 'active'
            },
            beta: {
                members: ['David Kim', 'Emma Thompson', 'Carlos Ruiz', 'Sophie Laurent'],
                completedActivities: ['crash-landing', 'lunar-logistics'],
                currentActivity: null,
                averageRating: 3.8,
                status: 'active'
            },
            gamma: {
                members: ['Alex Petrov', 'Maria Santos', 'Tom Anderson', 'Priya Patel', 'Jean Dupont'],
                completedActivities: ['crash-landing', 'lunar-logistics', 'final-mission'],
                currentActivity: null,
                averageRating: 4.6,
                status: 'completed'
            },
            delta: {
                members: ['Ryan O\'Connor', 'Nina Johansson', 'Omar Hassan', 'Rachel Green'],
                completedActivities: [],
                currentActivity: null,
                averageRating: 0,
                status: 'pending'
            },
            epsilon: {
                members: ['Lucas Silva', 'Yuki Tanaka', 'Isabella Lopez', 'Max Mueller', 'Zara Khan'],
                completedActivities: ['crash-landing'],
                currentActivity: 'lunar-logistics',
                averageRating: 3.9,
                status: 'active'
            },
            zeta: {
                members: ['Chris Lee', 'Fatima Al-Rashid', 'Diego Morales', 'Ingrid Larsson'],
                completedActivities: ['crash-landing'],
                currentActivity: 'lunar-logistics',
                averageRating: 4.1,
                status: 'active'
            }
        };

        localStorage.setItem('teams-data', JSON.stringify(mockTeams));

        // Initialize mock activities data
        const mockActivities = {
            'crash-landing': {
                name: 'Crash Landing',
                description: 'Emergency response and team coordination simulation',
                estimatedDuration: 45,
                teamsParticipated: 6,
                teamsCompleted: 6,
                successRate: 83,
                status: 'completed',
                icon: 'fas fa-plane-departure',
                averageRating: 4.0
            },
            'lunar-logistics': {
                name: 'Lunar Logistics',
                description: 'Resource management and strategic planning challenge',
                estimatedDuration: 50,
                teamsParticipated: 4,
                teamsCompleted: 4,
                successRate: 75,
                status: 'in-progress',
                icon: 'fas fa-rocket',
                averageRating: 4.1
            },
            'final-mission': {
                name: 'Final Mission',
                description: 'Comprehensive leadership and problem-solving finale',
                estimatedDuration: 60,
                teamsParticipated: 1,
                teamsCompleted: 1,
                successRate: 100,
                status: 'pending',
                icon: 'fas fa-flag-checkered',
                averageRating: 4.8
            }
        };

        localStorage.setItem('activities-data', JSON.stringify(mockActivities));

        // Initialize mock calendar events
        const mockEvents = [
            {
                id: 'event-001',
                title: 'Team Alpha - Crash Landing',
                team: 'alpha',
                activity: 'crash-landing',
                date: '2025-07-06',
                time: '10:00 AM',
                status: 'completed',
                facilitator: 'Dr. Sarah Mitchell'
            },
            {
                id: 'event-002',
                title: 'Team Beta - Crash Landing',
                team: 'beta',
                activity: 'crash-landing',
                date: '2025-07-06',
                time: '2:00 PM',
                status: 'completed',
                facilitator: 'Dr. Sarah Mitchell'
            },
            {
                id: 'event-003',
                title: 'Team Gamma - Lunar Logistics',
                team: 'gamma',
                activity: 'lunar-logistics',
                date: '2025-07-07',
                time: '9:00 AM',
                status: 'completed',
                facilitator: 'Dr. Sarah Mitchell'
            },
            {
                id: 'event-004',
                title: 'Team Alpha - Lunar Logistics',
                team: 'alpha',
                activity: 'lunar-logistics',
                date: '2025-07-07',
                time: '2:00 PM',
                status: 'completed',
                facilitator: 'Dr. Sarah Mitchell'
            },
            {
                id: 'event-005',
                title: 'Team Beta - Lunar Logistics',
                team: 'beta',
                activity: 'lunar-logistics',
                date: '2025-07-08',
                time: '10:00 AM',
                status: 'completed',
                facilitator: 'Dr. Sarah Mitchell'
            },
            {
                id: 'event-006',
                title: 'Team Gamma - Final Mission',
                team: 'gamma',
                activity: 'final-mission',
                date: '2025-07-08',
                time: '2:00 PM',
                status: 'completed',
                facilitator: 'Dr. Sarah Mitchell'
            },
            {
                id: 'event-007',
                title: 'Team Delta - Crash Landing',
                team: 'delta',
                activity: 'crash-landing',
                date: '2025-07-09',
                time: '9:00 AM',
                status: 'scheduled',
                facilitator: 'Dr. Sarah Mitchell'
            },
            {
                id: 'event-008',
                title: 'Team Epsilon - Lunar Logistics',
                team: 'epsilon',
                activity: 'lunar-logistics',
                date: '2025-07-09',
                time: '2:00 PM',
                status: 'scheduled',
                facilitator: 'Dr. Sarah Mitchell'
            },
            {
                id: 'event-009',
                title: 'Team Zeta - Lunar Logistics',
                team: 'zeta',
                activity: 'lunar-logistics',
                date: '2025-07-10',
                time: '11:00 AM',
                status: 'scheduled',
                facilitator: 'Dr. Sarah Mitchell'
            }
        ];

        localStorage.setItem('calendar-events', JSON.stringify(mockEvents));

        // Initialize dashboard settings
        const defaultSettings = {
            autoSave: true,
            confirmDialogs: true,
            keyboardShortcuts: true,
            exportFormat: 'json',
            includeTimestamps: true,
            theme: 'light',
            notifications: true
        };

        localStorage.setItem('dashboard-settings', JSON.stringify(defaultSettings));
    }

    setupEventListeners() {
        // Sidebar menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // Switch views based on clicked menu item
                const section = item.dataset.section;
                this.switchView(section);
            });
        });

        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Team and Activity Selection
        document.getElementById('team-select').addEventListener('change', (e) => {
            this.currentTeam = e.target.value;
            this.updateCurrentSelection();
            this.saveToLocalStorage();
        });

        document.getElementById('activity-select').addEventListener('change', (e) => {
            this.currentActivity = e.target.value;
            this.updateCurrentSelection();
            this.saveToLocalStorage();
        });

        // Assessment Cards
        document.querySelectorAll('.assessment-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't select if clicking on stars
                if (e.target.classList.contains('star')) return;
                
                this.selectCard(card);
            });
        });

        // Star Rating System
        document.querySelectorAll('.star-rating').forEach(ratingContainer => {
            const dimension = ratingContainer.getAttribute('data-dimension');
            const stars = ratingContainer.querySelectorAll('.star');
            
            stars.forEach((star, index) => {
                // Click handler
                star.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.setRating(dimension, index + 1);
                });

                // Hover effects
                star.addEventListener('mouseenter', () => {
                    this.highlightStars(ratingContainer, index + 1);
                });

                // Keyboard navigation
                star.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.setRating(dimension, index + 1);
                    }
                });

                // Make stars focusable
                star.setAttribute('tabindex', '0');
            });

            // Reset hover effect when leaving the rating container
            ratingContainer.addEventListener('mouseleave', () => {
                this.updateStarDisplay(dimension);
            });
        });

        // Notes input
        document.getElementById('notes').addEventListener('input', (e) => {
            this.notes = e.target.value;
            this.saveToLocalStorage();
        });

        // Action buttons
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetAssessment();
        });

        document.getElementById('save-btn').addEventListener('click', () => {
            this.saveAssessment();
        });

        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportData();
        });

        // Toast close button
        document.querySelector('.toast-close').addEventListener('click', () => {
            this.hideToast();
        });

        // Settings buttons
        document.getElementById('save-settings')?.addEventListener('click', () => {
            this.saveSettings();
        });

        document.getElementById('export-all-data')?.addEventListener('click', () => {
            this.exportAllData();
        });

        document.getElementById('clear-local-data')?.addEventListener('click', () => {
            this.clearLocalData();
        });

        // Calendar navigation
        document.getElementById('prev-week')?.addEventListener('click', () => {
            this.navigateWeek(-1);
        });

        document.getElementById('next-week')?.addEventListener('click', () => {
            this.navigateWeek(1);
        });

        // Mobile detail panel toggle
        this.setupMobileHandlers();
    }

    switchView(section) {
        // Hide all views
        document.querySelectorAll('.view-section').forEach(view => {
            view.classList.remove('active');
        });

        // Show selected view
        const targetView = document.getElementById(`${section}-view`);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Update page title based on section
        const titles = {
            'assessments': 'My Assessments',
            'analytics': 'Assessment Analytics',
            'teams': 'Team Overview',
            'activities': 'Workshop Activities',
            'calendar': 'Session Calendar',
            'settings': 'Dashboard Settings'
        };
        
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle && titles[section]) {
            pageTitle.textContent = titles[section];
        }

        // Load data for specific views
        if (section === 'analytics') {
            this.updateAnalytics();
        } else if (section === 'teams') {
            this.updateTeamsView();
        } else if (section === 'activities') {
            this.updateActivitiesView();
        } else if (section === 'calendar') {
            this.updateCalendarView();
        } else if (section === 'settings') {
            this.loadSettings();
        } else if (section === 'assessments') {
            this.updateDashboardStats();
        }
    }

    updateAnalytics() {
        // Calculate real analytics from stored assessments
        const history = JSON.parse(localStorage.getItem('assessment-history') || '[]');
        
        if (history.length > 0) {
            // Calculate average rating
            const allRatings = history.flatMap(assessment => Object.values(assessment.ratings));
            const validRatings = allRatings.filter(rating => rating > 0);
            const avgRating = validRatings.length > 0 ? 
                (validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length).toFixed(1) : 
                '0.0';
            
            // Update analytics display
            const avgRatingEl = document.getElementById('avg-rating');
            if (avgRatingEl) avgRatingEl.textContent = avgRating;

            // Update dimension averages
            const dimensions = ['communication', 'collaboration', 'leadership', 'problem-solving', 'adaptability'];
            dimensions.forEach(dimension => {
                const dimensionRatings = history
                    .map(assessment => assessment.ratings[dimension])
                    .filter(rating => rating > 0);
                
                if (dimensionRatings.length > 0) {
                    const avg = dimensionRatings.reduce((sum, rating) => sum + rating, 0) / dimensionRatings.length;
                    const barFill = document.querySelector(`.dimension-bar:nth-child(${dimensions.indexOf(dimension) + 1}) .bar-fill`);
                    const barValue = document.querySelector(`.dimension-bar:nth-child(${dimensions.indexOf(dimension) + 1}) .bar-value`);
                    
                    if (barFill) barFill.style.width = `${(avg / 5) * 100}%`;
                    if (barValue) barValue.textContent = avg.toFixed(1);
                }
            });
        }
    }

    saveSettings() {
        const settings = {
            autoSave: document.getElementById('auto-save')?.checked || false,
            confirmDialogs: document.getElementById('confirm-dialogs')?.checked || false,
            keyboardShortcuts: document.getElementById('keyboard-shortcuts')?.checked || false,
            exportFormat: document.getElementById('export-format')?.value || 'json',
            includeTimestamps: document.getElementById('include-timestamps')?.checked || false
        };

        localStorage.setItem('dashboard-settings', JSON.stringify(settings));
        this.showToast('Settings saved successfully!', 'success');
    }

    exportAllData() {
        const allData = {
            assessmentHistory: JSON.parse(localStorage.getItem('assessment-history') || '[]'),
            currentState: JSON.parse(localStorage.getItem('facilitator-assessment') || '{}'),
            settings: JSON.parse(localStorage.getItem('dashboard-settings') || '{}'),
            exportedAt: new Date().toISOString()
        };

        const dataStr = JSON.stringify(allData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `facilitator-assessment-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showToast('All data exported successfully!', 'success');
    }

    clearLocalData() {
        if (confirm('Are you sure you want to clear all local data? This action cannot be undone.')) {
            localStorage.removeItem('facilitator-assessment');
            localStorage.removeItem('assessment-history');
            localStorage.removeItem('dashboard-settings');
            
            // Reset UI
            this.resetAssessment();
            
            this.showToast('All local data cleared', 'info');
        }
    }

    navigateWeek(direction) {
        // Simple week navigation simulation
        const currentWeekEl = document.getElementById('current-week');
        if (currentWeekEl) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + (direction * 7));
            
            const startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Monday
            
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6); // Sunday
            
            const formatDate = (date) => {
                return date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                });
            };
            
            currentWeekEl.textContent = `${formatDate(startDate)}-${formatDate(endDate)}, ${currentDate.getFullYear()}`;
        }
    }

    updateTeamsView() {
        const teamsData = JSON.parse(localStorage.getItem('teams-data') || '{}');
        const teamsGrid = document.querySelector('.teams-grid');
        
        if (!teamsGrid) return;
        
        // Clear existing content
        teamsGrid.innerHTML = '';
        
        // Generate team cards from mock data
        Object.entries(teamsData).forEach(([teamKey, teamData]) => {
            const completionPercentage = Math.round((teamData.completedActivities.length / 3) * 100);
            const statusClass = teamData.status === 'completed' ? 'completed' : 
                              teamData.status === 'active' ? 'active' : 'pending';
            
            const teamCard = document.createElement('div');
            teamCard.className = 'team-card';
            teamCard.dataset.team = teamKey;
            
            teamCard.innerHTML = `
                <div class="team-header">
                    <h3>Team ${teamKey.charAt(0).toUpperCase() + teamKey.slice(1)}</h3>
                    <span class="team-status ${statusClass}">${teamData.status.charAt(0).toUpperCase() + teamData.status.slice(1)}</span>
                </div>
                <div class="team-stats">
                    <div class="stat">
                        <span class="stat-label">Members</span>
                        <span class="stat-value">${teamData.members.length}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Avg Rating</span>
                        <span class="stat-value">${teamData.averageRating > 0 ? teamData.averageRating.toFixed(1) : '-'}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Activities</span>
                        <span class="stat-value">${teamData.completedActivities.length}/3</span>
                    </div>
                </div>
                <div class="team-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${completionPercentage}%"></div>
                    </div>
                    <span class="progress-text">${completionPercentage === 100 ? 'Complete' : completionPercentage === 0 ? 'Not Started' : 'In Progress'}</span>
                </div>
            `;
            
            teamsGrid.appendChild(teamCard);
        });
    }

    updateActivitiesView() {
        const activitiesData = JSON.parse(localStorage.getItem('activities-data') || '{}');
        const activitiesList = document.querySelector('.activities-list');
        
        if (!activitiesList) return;
        
        // Clear existing content
        activitiesList.innerHTML = '';
        
        // Generate activity cards from mock data
        Object.entries(activitiesData).forEach(([activityKey, activityData]) => {
            const activityCard = document.createElement('div');
            activityCard.className = 'activity-card';
            
            activityCard.innerHTML = `
                <div class="activity-header">
                    <div class="activity-icon">
                        <i class="${activityData.icon}"></i>
                    </div>
                    <div class="activity-info">
                        <h3>${activityData.name}</h3>
                        <p>${activityData.description}</p>
                    </div>
                    <div class="activity-status ${activityData.status.replace('-', '-')}">${activityData.status.charAt(0).toUpperCase() + activityData.status.slice(1).replace('-', ' ')}</div>
                </div>
                <div class="activity-metrics">
                    <div class="metric">
                        <span class="metric-label">Teams Participated</span>
                        <span class="metric-value">${activityData.teamsParticipated}/6</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Average Duration</span>
                        <span class="metric-value">${activityData.estimatedDuration} min</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Success Rate</span>
                        <span class="metric-value">${activityData.successRate}%</span>
                    </div>
                </div>
            `;
            
            activitiesList.appendChild(activityCard);
        });
    }

    updateCalendarView() {
        const eventsData = JSON.parse(localStorage.getItem('calendar-events') || '[]');
        const calendarGrid = document.querySelector('.calendar-grid');
        
        if (!calendarGrid) return;
        
        // Clear existing content
        calendarGrid.innerHTML = '';
        
        // Group events by date
        const eventsByDate = {};
        eventsData.forEach(event => {
            if (!eventsByDate[event.date]) {
                eventsByDate[event.date] = [];
            }
            eventsByDate[event.date].push(event);
        });
        
        // Generate calendar days
        const today = new Date();
        const currentWeek = [];
        
        // Generate 7 days starting from Monday
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - today.getDay() + 1 + i); // Start from Monday
            currentWeek.push(date);
        }
        
        currentWeek.forEach(date => {
            const dateStr = date.toISOString().split('T')[0];
            const dayEvents = eventsByDate[dateStr] || [];
            
            const dayCard = document.createElement('div');
            dayCard.className = 'calendar-day';
            
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const dayDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            
            let eventsHtml = '';
            dayEvents.forEach(event => {
                const isToday = dateStr === today.toISOString().split('T')[0];
                const statusClass = event.status === 'completed' ? 'completed' : 
                                  event.status === 'scheduled' ? 'pending' : 'in-progress';
                
                eventsHtml += `
                    <div class="event ${isToday ? 'current' : ''}">
                        <span class="event-time">${event.time}</span>
                        <span class="event-title">${event.title}</span>
                        <span class="event-status ${statusClass}">${event.status.charAt(0).toUpperCase() + event.status.slice(1)}</span>
                    </div>
                `;
            });
            
            dayCard.innerHTML = `
                <div class="day-header">
                    <span class="day-name">${dayName}</span>
                    <span class="day-date">${dayDate}</span>
                </div>
                <div class="day-events">
                    ${eventsHtml || '<div class="no-events">No events scheduled</div>'}
                </div>
            `;
            
            calendarGrid.appendChild(dayCard);
        });
    }

    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('dashboard-settings') || '{}');
        
        // Apply settings to form elements
        if (document.getElementById('auto-save')) {
            document.getElementById('auto-save').checked = settings.autoSave !== false;
        }
        if (document.getElementById('confirm-dialogs')) {
            document.getElementById('confirm-dialogs').checked = settings.confirmDialogs !== false;
        }
        if (document.getElementById('keyboard-shortcuts')) {
            document.getElementById('keyboard-shortcuts').checked = settings.keyboardShortcuts !== false;
        }
        if (document.getElementById('export-format')) {
            document.getElementById('export-format').value = settings.exportFormat || 'json';
        }
        if (document.getElementById('include-timestamps')) {
            document.getElementById('include-timestamps').checked = settings.includeTimestamps !== false;
        }
    }

    updateDashboardStats() {
        // Load recent assessments and update dashboard overview
        const history = JSON.parse(localStorage.getItem('assessment-history') || '[]');
        
        // Update metrics in the main dashboard if elements exist
        const totalAssessments = history.length;
        if (totalAssessments > 0) {
            // Calculate average rating
            const allRatings = history.flatMap(assessment => Object.values(assessment.ratings));
            const validRatings = allRatings.filter(rating => rating > 0);
            const avgRating = validRatings.length > 0 ? 
                (validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length).toFixed(1) : 
                '0.0';
            
            // Update session info if element exists
            const sessionInfoEl = document.querySelector('.session-info');
            if (sessionInfoEl) {
                const recentAssessment = history[history.length - 1];
                const teamName = this.getTeamDisplayName(recentAssessment.team);
                const activityName = this.getActivityDisplayName(recentAssessment.activity);
                
                sessionInfoEl.innerHTML = `
                    <div class="info-item">
                        <span class="info-label">Recent Session</span>
                        <span class="info-value">${teamName} - ${activityName}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Total Assessments</span>
                        <span class="info-value">${totalAssessments}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Average Rating</span>
                        <span class="info-value">${avgRating}/5.0</span>
                    </div>
                `;
            }
        }
    }

    selectCard(card) {
        // Remove previous selection
        document.querySelectorAll('.assessment-card').forEach(c => c.classList.remove('selected'));
        
        // Add selection to clicked card
        card.classList.add('selected');
        this.selectedCard = card;
        
        // Update detail panel
        this.updateDetailPanel(card);
        
        // Show detail panel on mobile
        if (window.innerWidth <= 768) {
            document.querySelector('.detail-panel').classList.add('open');
        }
    }

    updateDetailPanel(card) {
        const assessment = card.dataset.assessment;
        const title = card.querySelector('h4').textContent;
        
        // Update detail header
        document.querySelector('.detail-title span').textContent = title;
    }

    updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Update multiple time displays
        const timeElements = document.querySelectorAll('#assessment-time, #session-time');
        timeElements.forEach(el => {
            if (el) el.textContent = timeString;
        });
        
        // Update date
        const dateString = now.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric'
        });
        const currentDateEl = document.getElementById('current-date');
        if (currentDateEl) {
            currentDateEl.textContent = `${dateString} - ${dateString}`;
        }
    }

    updateCurrentSelection() {
        const teamText = this.currentTeam ? 
            `${this.getTeamDisplayName(this.currentTeam)}` : 
            'No team selected';
        
        const activityText = this.currentActivity ? 
            `${this.getActivityDisplayName(this.currentActivity)}` : 
            'No activity selected';

        const currentTeamEl = document.getElementById('current-team');
        const currentActivityEl = document.getElementById('current-activity');
        
        if (currentTeamEl) currentTeamEl.textContent = teamText;
        if (currentActivityEl) currentActivityEl.textContent = activityText;
    }

    getTeamDisplayName(teamValue) {
        const teams = {
            'alpha': 'Team Alpha',
            'beta': 'Team Beta',
            'gamma': 'Team Gamma',
            'delta': 'Team Delta',
            'epsilon': 'Team Epsilon',
            'zeta': 'Team Zeta'
        };
        return teams[teamValue] || teamValue;
    }

    getActivityDisplayName(activityValue) {
        const activities = {
            'crash-landing': 'Crash Landing',
            'lunar-logistics': 'Lunar Logistics',
            'final-mission': 'Final Mission'
        };
        return activities[activityValue] || activityValue;
    }

    setRating(dimension, rating) {
        this.ratings[dimension] = rating;
        this.updateStarDisplay(dimension);
        this.updateRatingDisplay(dimension, rating);
        this.saveToLocalStorage();
        
        // Add visual feedback
        const card = document.querySelector(`[data-assessment="${dimension}"]`);
        if (card) {
            card.classList.add('fade-in');
            setTimeout(() => card.classList.remove('fade-in'), 500);
        }
    }

    updateRatingDisplay(dimension, rating) {
        const ratingElement = document.getElementById(`${dimension}-rating`);
        if (ratingElement) {
            ratingElement.textContent = rating;
        }
    }

    highlightStars(container, rating) {
        const stars = container.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#ffb400';
            } else {
                star.style.color = '#e5e5e7';
            }
        });
    }

    updateStarDisplay(dimension) {
        const container = document.querySelector(`[data-dimension="${dimension}"]`);
        if (!container) return;
        
        const stars = container.querySelectorAll('.star');
        const rating = this.ratings[dimension];
        
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
                star.style.color = '#ffb400';
            } else {
                star.classList.remove('active');
                star.style.color = '#e5e5e7';
            }
        });
    }

    resetAssessment() {
        if (confirm('Are you sure you want to reset the current assessment? This action cannot be undone.')) {
            // Reset ratings
            this.ratings = {
                communication: 0,
                collaboration: 0,
                leadership: 0,
                'problem-solving': 0,
                adaptability: 0
            };

            // Reset UI
            Object.keys(this.ratings).forEach(dimension => {
                this.updateStarDisplay(dimension);
                this.updateRatingDisplay(dimension, 0);
            });

            // Reset notes
            const notesEl = document.getElementById('notes');
            if (notesEl) {
                notesEl.value = '';
                this.notes = '';
            }

            // Reset selections
            document.getElementById('team-select').value = '';
            document.getElementById('activity-select').value = '';
            this.currentTeam = '';
            this.currentActivity = '';
            this.updateCurrentSelection();

            // Clear localStorage
            localStorage.removeItem('facilitator-assessment');

            this.showToast('Assessment reset successfully', 'info');
        }
    }

    saveAssessment() {
        if (!this.validateAssessment()) {
            return;
        }

        const assessment = this.prepareAssessmentData();
        
        // Simulate saving (in real app, this would be an API call)
        console.log('Saving assessment:', assessment);
        
        // Add to session history
        this.addToHistory(assessment);
        
        this.showToast('Assessment saved successfully!', 'success');
    }

    exportData() {
        if (!this.validateAssessment()) {
            return;
        }

        const assessment = this.prepareAssessmentData();
        const dataStr = JSON.stringify(assessment, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `assessment-${assessment.team}-${assessment.activity}-${assessment.timestamp}.json`;
        link.click();
        
        this.showToast('Data exported successfully!', 'success');
    }

    validateAssessment() {
        if (!this.currentTeam) {
            this.showToast('Please select a team', 'error');
            return false;
        }

        if (!this.currentActivity) {
            this.showToast('Please select an activity', 'error');
            return false;
        }

        const hasRatings = Object.values(this.ratings).some(rating => rating > 0);
        if (!hasRatings) {
            this.showToast('Please provide at least one rating', 'error');
            return false;
        }

        return true;
    }

    prepareAssessmentData() {
        return {
            team: this.currentTeam,
            activity: this.currentActivity,
            ratings: { ...this.ratings },
            notes: this.notes,
            timestamp: new Date().toISOString(),
            facilitator: 'Current User', // In real app, this would be from auth
            sessionId: this.generateSessionId()
        };
    }

    generateSessionId() {
        return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    addToHistory(assessment) {
        const history = JSON.parse(localStorage.getItem('assessment-history') || '[]');
        history.push(assessment);
        
        // Keep only last 50 assessments
        if (history.length > 50) {
            history.splice(0, history.length - 50);
        }
        
        localStorage.setItem('assessment-history', JSON.stringify(history));
    }

    saveToLocalStorage() {
        const currentState = {
            team: this.currentTeam,
            activity: this.currentActivity,
            ratings: this.ratings,
            notes: this.notes,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('facilitator-assessment', JSON.stringify(currentState));
    }

    loadSavedData() {
        const savedData = localStorage.getItem('facilitator-assessment');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                
                // Restore selections
                if (data.team) {
                    const teamSelect = document.getElementById('team-select');
                    if (teamSelect) {
                        teamSelect.value = data.team;
                        this.currentTeam = data.team;
                    }
                }
                
                if (data.activity) {
                    const activitySelect = document.getElementById('activity-select');
                    if (activitySelect) {
                        activitySelect.value = data.activity;
                        this.currentActivity = data.activity;
                    }
                }
                
                // Restore ratings
                if (data.ratings) {
                    this.ratings = { ...data.ratings };
                    Object.keys(this.ratings).forEach(dimension => {
                        this.updateStarDisplay(dimension);
                        this.updateRatingDisplay(dimension, this.ratings[dimension]);
                    });
                }
                
                // Restore notes
                if (data.notes) {
                    const notesEl = document.getElementById('notes');
                    if (notesEl) {
                        notesEl.value = data.notes;
                        this.notes = data.notes;
                    }
                }
                
                this.updateCurrentSelection();
                
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        if (toast && toastMessage) {
            // Update message
            toastMessage.textContent = message;
            
            // Update icon based on type
            const icon = toast.querySelector('.toast-content i');
            if (icon) {
                icon.className = type === 'error' ? 'fas fa-exclamation-triangle' : 
                                type === 'info' ? 'fas fa-info-circle' : 
                                'fas fa-check-circle';
            }
            
            // Show toast
            toast.classList.add('show');
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                this.hideToast();
            }, 3000);
        }
    }

    hideToast() {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.remove('show');
        }
    }

    setupMobileHandlers() {
        // Close detail panel on mobile
        document.querySelector('.close-btn').addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                document.querySelector('.detail-panel').classList.remove('open');
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                document.querySelector('.detail-panel').classList.remove('open');
            }
        });
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FacilitatorDashboard();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+S to save
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        document.getElementById('save-btn').click();
    }
    
    // Ctrl+E to export
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        document.getElementById('export-btn').click();
    }
    
    // Ctrl+R to reset (with confirmation)
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        document.getElementById('reset-btn').click();
    }
    
    // Escape to close detail panel on mobile
    if (e.key === 'Escape' && window.innerWidth <= 768) {
        document.querySelector('.detail-panel').classList.remove('open');
    }
});

// Add CSS class for card selection
const style = document.createElement('style');
style.textContent = `
    .assessment-card.selected {
        border-color: #007aff;
        box-shadow: 0 4px 16px rgba(0, 122, 255, 0.2);
    }
    
    .assessment-card.fade-in {
        animation: cardPulse 0.5s ease-out;
    }
    
    @keyframes cardPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);