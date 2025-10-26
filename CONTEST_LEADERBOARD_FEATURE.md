# 👑 Contest Leaderboard Feature

## Overview

The **Contest Leaderboard** is a comprehensive component that displays contest-specific leaderboards with crown icons for winners, participant IDs, and detailed contest information. This feature allows users to view winners and rankings for each individual contest event.

## 🎯 Key Features

### 1. **Contest Selection Interface**
- **Visual Contest Cards** - Each contest displayed as an interactive card
- **Contest Status Badges** - Shows if contest is completed, active, or upcoming
- **Contest Information** - Participants count, prize pool, target distance
- **Contest ID Display** - Unique identifier for each contest
- **Age Category** - Shows target age group for the contest

### 2. **Winner Identification System**
- **👑 Crown Icon** - First place winners get a crown symbol
- **🥈🥉 Medal Icons** - Second and third place get silver/bronze medals
- **Winner Badge** - "🏆 CHAMPION" badge for first place
- **Winning Distance** - "🎯 WINNING DISTANCE" label for winners
- **User ID Display** - Shows unique user identifier for each participant

### 3. **Detailed Leaderboard Display**
- **Rank-based Styling** - Different colors and effects for top 3 positions
- **Participant Information** - Username, wallet address, and user ID
- **Distance Tracking** - Current distance achieved by each participant
- **Completion Status** - Shows if participant completed the contest
- **Contest Summary** - Champion info, winning distance, prize pool

## 🏆 Visual Hierarchy

### **First Place (Winner)**
- **👑 Crown Icon** with "WINNER" text
- **Gold border and glow effect**
- **"🏆 CHAMPION" badge** next to username
- **"🎯 WINNING DISTANCE" label** for their distance
- **Special highlighting** throughout the row

### **Second Place**
- **🥈 Silver medal icon**
- **Silver border styling**
- **Standard participant information**

### **Third Place**
- **🥉 Bronze medal icon**
- **Bronze border styling**
- **Standard participant information**

### **Other Participants**
- **#4, #5, etc.** rank numbers
- **Standard styling** with hover effects
- **Complete participant information**

## 📊 Data Display

### **Contest Information**
```
🆔 Contest ID: #1
✅ Completed
👥 26-35 (Age Category)
```

### **Participant Details**
```
👑 WINNER
MarathonMaster 🏆 CHAMPION
GAHK7E...TODB4A
110.8 km 🎯 WINNING DISTANCE
ID: TODB4A
✅ Completed
```

## 🔗 API Integration

### **Endpoints Used**
- `GET /api/contests` - Fetch all contests
- `GET /api/contests/{id}/winners` - Get contest leaderboard
- `GET /api/contests/{id}` - Get contest details

### **Data Structure**
```json
{
  "success": true,
  "data": {
    "contest": {
      "id": 1,
      "title": "New Year Fitness Challenge",
      "status": "completed"
    },
    "winners": [
      {
        "user_wallet": "GAHK7EEG2WWHVKDNT4CEQFZGKF4LGDSW2IVM4S5DP42RBW3K6BTODB4A",
        "username": "MarathonMaster",
        "current_distance": 110.8,
        "rank_position": 1,
        "completed": true
      }
    ]
  }
}
```

## 🎨 Styling Features

### **Interactive Elements**
- **Hover effects** on contest cards and leaderboard rows
- **Selection highlighting** for chosen contest
- **Smooth animations** for state transitions
- **Responsive design** for all screen sizes

### **Status Indicators**
- **Completed**: ✅ Green with success styling
- **Active**: 🔥 Blue with pulsing animation
- **Upcoming**: ⏳ Orange with warning styling

### **Rank-based Colors**
- **1st Place**: Gold (#FFD700) with glow effects
- **2nd Place**: Silver (#C0C0C0) styling
- **3rd Place**: Bronze (#CD7F32) styling
- **Others**: Standard white/gray styling

## 🚀 Navigation

### **Access Points**
1. **Landing Page Navigation** - "Champions" button
2. **Mobile Menu** - "👑 Champions" option
3. **Floating Action Menu** - Crown icon button
4. **Direct URL** - Navigate to contest leaderboard page

### **Page Structure**
```
App → Contest Leaderboard
├── Contest Selection Grid
├── Selected Contest Info
├── Leaderboard Table
└── Contest Summary
```

## 📱 Responsive Design

### **Desktop (1200px+)**
- **Grid layout** for contest cards
- **Full table** with all columns visible
- **Side-by-side** contest info and leaderboard

### **Tablet (768px-1200px)**
- **Responsive grid** adjusts to screen size
- **Condensed table** with smaller spacing
- **Stacked layout** for contest details

### **Mobile (< 768px)**
- **Single column** contest cards
- **Card-based** leaderboard (no table)
- **Vertical stacking** of all elements
- **Touch-friendly** buttons and interactions

## 🎯 User Experience

### **Loading States**
- **Spinner animations** while fetching data
- **Skeleton loading** for smooth transitions
- **Error handling** with retry options

### **Empty States**
- **No contests** - Helpful message and guidance
- **No participants** - Contest exists but no data
- **Connection errors** - Clear error messages with retry

### **Interactive Feedback**
- **Visual feedback** on hover and selection
- **Smooth transitions** between states
- **Clear visual hierarchy** for easy scanning

## 🔧 Technical Implementation

### **Component Structure**
```
ContestLeaderboard.jsx
├── Contest Selection Grid
├── Leaderboard Display
├── Winner Highlighting
├── API Integration
└── Responsive Layout

ContestLeaderboard.css
├── Contest Card Styling
├── Leaderboard Table Styles
├── Winner Special Effects
├── Responsive Breakpoints
└── Animation Definitions
```

### **State Management**
- **contests** - List of all contests
- **selectedContest** - Currently selected contest
- **leaderboard** - Participants for selected contest
- **loading** - Loading state management
- **error** - Error state handling

## 📈 Sample Data

### **Contest 1: New Year Fitness Challenge**
```
👑 1st: MarathonMaster - 110.8 km ✅
🥈 2nd: FitnessKing - 105.5 km ✅
🥉 3rd: RunnerQueen - 98.2 km ⏳
#4: SpeedWalker - 87.3 km ⏳
```

### **Contest 2: Spring Marathon Prep**
```
👑 1st: FitnessKing - 205.7 km ✅
🥈 2nd: RunnerQueen - 195.3 km ⏳
🥉 3rd: MarathonMaster - 189.1 km ⏳
```

## 🎉 Key Benefits

1. **Clear Winner Identification** - Crown icons and special styling make winners obvious
2. **Comprehensive Information** - Shows all relevant contest and participant data
3. **User ID Display** - Helps identify participants with unique IDs
4. **Contest-Specific Views** - Each contest has its own dedicated leaderboard
5. **Real-time Status** - Shows current contest status and participant progress
6. **Mobile-Friendly** - Works perfectly on all device sizes
7. **Professional Design** - Clean, modern interface with smooth animations

## 🔗 Access Instructions

1. **Start the application**:
   ```bash
   # Backend (if not running)
   cd backend && npm run dev
   
   # Frontend
   cd frontend && npm run dev
   ```

2. **Navigate to Contest Leaderboard**:
   - Visit: http://localhost:5174
   - Click "Champions" in navigation
   - Or use floating action menu (crown icon)

3. **View Contest Winners**:
   - Select any contest card
   - View detailed leaderboard with winners
   - See crown icons for champions
   - Check user IDs and completion status

The Contest Leaderboard feature provides a comprehensive, visually appealing way to view contest results with clear winner identification and detailed participant information! 🏆👑