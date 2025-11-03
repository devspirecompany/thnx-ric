import { useState, useEffect } from 'react';
import '../styles/StudentDashboard.css';
import Sidebar from './shared/sidebar.jsx';
const StudentDashboard = () => {
  // Timer states
  const timePresets = [15, 25, 45, 60];
  const [currentPresetIndex, setCurrentPresetIndex] = useState(1);
  const [selectedMinutes, setSelectedMinutes] = useState(timePresets[1]);
  const [timeRemaining, setTimeRemaining] = useState(timePresets[1] * 60);
  const [isRunning, setIsRunning] = useState(false);
  
  // UI states
  const [userDropdownActive, setUserDropdownActive] = useState(false);
  const [notificationSidebarActive, setNotificationSidebarActive] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'blue', title: 'New Achievement Unlocked!', text: "You've earned the \"Early Bird\" badge", time: '5 minutes ago', unread: true },
    { id: 2, type: 'green', title: 'Study Group Invitation', text: 'Sarah invited you to "Math Finals Review"', time: '1 hour ago', unread: true },
    { id: 3, type: 'orange', title: 'Study Reminder', text: "Don't forget your Physics study session at 3 PM", time: '2 hours ago', unread: false }
  ]);

  const weeklyData = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 6.2 },
    { day: 'Wed', hours: 3.8 },
    { day: 'Thu', hours: 5.5 },
    { day: 'Fri', hours: 4.0 },
    { day: 'Sat', hours: 2.5 },
    { day: 'Sun', hours: 1.5 }
  ];

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            showTimerCompleteAlert();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const decreaseTime = () => {
    if (!isRunning && currentPresetIndex > 0) {
      const newIndex = currentPresetIndex - 1;
      setCurrentPresetIndex(newIndex);
      setSelectedMinutes(timePresets[newIndex]);
      setTimeRemaining(timePresets[newIndex] * 60);
    }
  };

  const increaseTime = () => {
    if (!isRunning && currentPresetIndex < timePresets.length - 1) {
      const newIndex = currentPresetIndex + 1;
      setCurrentPresetIndex(newIndex);
      setSelectedMinutes(timePresets[newIndex]);
      setTimeRemaining(timePresets[newIndex] * 60);
    }
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(selectedMinutes * 60);
  };

  const showTimerCompleteAlert = () => {
    alert('🎉 Session Completed! Great work!');
  };

  const handleNotificationClick = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
    setUnreadCount(notifications.filter(n => n.unread && n.id !== id).length);
  };

  const closeNotificationSidebar = () => {
    setNotificationSidebarActive(false);
  };

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div className="dashboard-container">
     <Sidebar/>

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <h2>Welcome back, Ash! <span className="wave-emoji">👋</span></h2>
            <p>Ready to conquer your goals today? Let's make it productive!</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="stat-trend up">
                <span>▲</span>
                <span>12%</span>
              </div>
            </div>
            <div className="stat-label">Today's Study Hours</div>
            <div className="stat-value">4.5h</div>
            <div className="stat-footer">2.5 hours completed today</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V6.5A2.5 2.5 0 0 0 17.5 4H6.5A2.5 2.5 0 0 0 4 6.5V19.5Z" />
                </svg>
              </div>
              <div className="stat-trend up">
                <span>▲</span>
                <span>8%</span>
              </div>
            </div>
            <div className="stat-label">Weekly Progress</div>
            <div className="stat-value">28h</div>
            <div className="stat-footer">Target: 30 hours per week</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon orange">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" />
                </svg>
              </div>
              <div className="stat-trend up">
                <span>▲</span>
                <span>3 days</span>
              </div>
            </div>
            <div className="stat-label">Study Streak</div>
            <div className="stat-value">15 days</div>
            <div className="stat-footer">Keep it up! Personal best: 21 days</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon cyan">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>
            </div>
            <div className="stat-label">Active Group Sessions</div>
            <div className="stat-value">3</div>
            <div className="stat-footer">2 invitations pending</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Weekly Progress Chart */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Weekly Progress</h3>
              <a href="#" className="card-action">View Details →</a>
            </div>
            <div className="progress-chart">
              {weeklyData.map((data, index) => (
                <div key={data.day} className="progress-bar-wrapper">
                  <div className="progress-bar" style={{ height: '200px' }}>
                    <div 
                      className="progress-fill" 
                      style={{ 
                        height: `${(data.hours / maxHours) * 100}%`,
                        transition: `height 0.8s ease ${index * 100}ms`
                      }}
                    >
                      <div className="progress-value">{data.hours}h</div>
                    </div>
                  </div>
                  <div className="progress-label">{data.day}</div>
                </div>
              ))}
            </div>
            
            {/* Performance Summary */}
            <div className="performance-summary">
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </div>
                  <div className="summary-content">
                    <div className="summary-label">Best Day</div>
                    <div className="summary-value">Monday <span className="summary-highlight">6h 24m</span></div>
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="summary-content">
                    <div className="summary-label">Weekly Total</div>
                    <div className="summary-value"><span className="summary-highlight">28h 15m</span> / 30h</div>
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div className="summary-content">
                    <div className="summary-label">Productivity</div>
                    <div className="summary-value">Up <span className="summary-highlight">12%</span> from last week</div>
                  </div>
                </div>
              </div>
              <div className="insight">
                <div className="insight-icon">💡</div>
                <div className="insight-text">You're most productive in the morning. Try scheduling focused study sessions before 11 AM.</div>
              </div>
            </div>
          </div>

          {/* Timer and Achievements */}
          <div>
            {/* Timer Widget */}
            <div className="timer-widget">
              <div className="timer-display-container">
                <button className="time-nav-btn" onClick={decreaseTime}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <div className="timer-display-wrapper">
                  <div className="timer-display">{formatTime(timeRemaining)}</div>
                  <div className="timer-preset">{selectedMinutes} min</div>
                </div>
                <button className="time-nav-btn" onClick={increaseTime}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
              <div className="timer-controls">
                {!isRunning ? (
                  <button className="timer-btn" id="startBtn" onClick={startTimer}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                ) : (
                  <button className="timer-btn" id="pauseBtn" onClick={pauseTimer}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  </button>
                )}
                <button className="timer-btn" id="resetBtn" onClick={resetTimer}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Next Achievement</h3>
                <a href="#" className="card-action">View All →</a>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                </div>
                <div className="achievement-info">
                  <div className="achievement-title">Study Marathon</div>
                  <div className="achievement-stat">75/100 hours</div>
                  <div className="achievement-progress-bar">
                    <div className="achievement-progress-fill" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <div className="achievement-info">
                  <div className="achievement-title">Streak Master</div>
                  <div className="achievement-stat">15/30 days</div>
                  <div className="achievement-progress-bar">
                    <div className="achievement-progress-fill" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <a href="#" className="card-action">View All →</a>
          </div>
          <div className="activity-item">
            <div className="activity-icon blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
            </div>
            <div className="activity-content">
              <div className="activity-title">Achievement Unlocked!</div>
              <div className="activity-description">You've earned the "Early Bird" badge for studying 5 days in a row before 8 AM</div>
              <div className="activity-time">2 hours ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
            <div className="activity-content">
              <div className="activity-title">Joined Group Study</div>
              <div className="activity-description">You joined "CS101 Finals Prep" study group with 8 members</div>
              <div className="activity-time">5 hours ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon cyan">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V6.5A2.5 2.5 0 0 0 17.5 4H6.5A2.5 2.5 0 0 0 4 6.5V19.5Z" />
              </svg>
            </div>
            <div className="activity-content">
              <div className="activity-title">Study Session Completed</div>
              <div className="activity-description">Completed 2-hour focus session on Data Structures</div>
              <div className="activity-time">Yesterday</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;