import React from 'react'
import '../../styles/StudentDashboard.css';
import { useState, useEffect } from "react";

const Sidebar = () => {
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
    <div className='dashboard-container'>
        
         {/* Top Navigation */}
      <nav className="topnav">
        <div className="nav-left">
          <div className="logo-nav">
            <img src="../imgs/SpireWorksLogo.png" alt="SpireWorks Logo" />
            <h1>SpireWorks</h1>
          </div>
          <div className="search-bar">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-icon" onClick={() => setNotificationSidebarActive(true)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 5a5 5 0 0 1 5 5v2l1.5 3H3.5L5 12v-2a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 17a2 2 0 1 0 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </div>
          <div className="user-menu" onClick={() => setUserDropdownActive(!userDropdownActive)}>
            <div className="user-avatar">AQ</div>
            <div className="user-info">
              <div className="user-name">Ash Quicho</div>
              <div className="user-role">Student</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* User Dropdown */}
          <div className={`user-dropdown ${userDropdownActive ? 'active' : ''}`}>
            <a href="#" className="dropdown-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>View Profile</span>
            </a>
            <a href="#" className="dropdown-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m5.66-15.66l-4.24 4.24m0 6.84l-4.24 4.24M23 12h-6m-6 0H1m18.36-5.66l-4.24 4.24m0 6.84l-4.24 4.24"></path>
              </svg>
              <span>Settings</span>
            </a>
            <a href="#" className="dropdown-item logout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Notification Sidebar */}
      <div className={`notification-sidebar ${notificationSidebarActive ? 'active' : ''}`}>
        <div className="notification-header">
          <h3>Notifications</h3>
          <button className="close-notification" onClick={closeNotificationSidebar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="notification-list">
          {notifications.map(notif => (
            <div 
              key={notif.id}
              className={`notification-item ${notif.unread ? 'unread' : ''}`}
              onClick={() => handleNotificationClick(notif.id)}
            >
              <div className={`notification-icon ${notif.type}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              </div>
              <div className="notification-content">
                <div className="notification-title">{notif.title}</div>
                <div className="notification-text">{notif.text}</div>
                <div className="notification-time">{notif.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Overlay */}
      {notificationSidebarActive && (
        <div className="notification-overlay" onClick={closeNotificationSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <a href="/student-dashboard" className="menu-item active">
          <span className="menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3V17H17" />
              <path d="M5 13L9 9L12 12L17 7" />
            </svg>
          </span>
          <span className="menu-text">Dashboard</span>
        </a>
        <a href="/study-timer" className="menu-item">
          <span className="menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="10" cy="10" r="7" />
              <path d="M10 6V10L13 11" />
            </svg>
          </span>
          <span className="menu-text">Study Timer</span>
        </a>
        <a href="#" className="menu-item">
          <span className="menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 18V16C17 14.8954 16.1046 14 15 14H9C7.89543 14 7 14.8954 7 16V18" />
              <circle cx="12" cy="7" r="3" />
            </svg>
          </span>
          <span className="menu-text">Group Study</span>
        </a>
        <a href="#" className="menu-item">
          <span className="menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 18L5 15L3 7L10 2L17 7L15 15L10 18Z" />
              <path d="M8 10L10 12L13 9" />
            </svg>
          </span>
          <span className="menu-text">Achievements</span>
        </a>
        <a href="#" className="menu-item">
          <span className="menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6C4.89543 2 4 2.89543 4 4V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V4C16 2.89543 15.1046 2 14 2Z" />
            </svg>
          </span>
          <span className="menu-text">My Files</span>
        </a>
        <a href="#" className="menu-item">
          <span className="menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 13V17M7 10V17M13 7V17M3 17H17" />
            </svg>
          </span>
          <span className="menu-text">Productivity Tracker</span>
        </a>
      </aside>
    </div>
  )
}

export default Sidebar