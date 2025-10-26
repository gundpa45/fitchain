# Stellar Strider Database System

## Overview

The Stellar Strider database system provides comprehensive tracking of user performance, contest results, and payment history. It includes leaderboards, contest management, and detailed payment disbursement records.

## Features Added

### 🏆 Global Leaderboard
- **Real-time rankings** based on total distance, contests won, and earnings
- **Age category filtering** (18-25, 26-35, 36-45, 46-55, 55+)
- **User statistics** including total distance, contests participated, wins, and earnings
- **NFT collection tracking** for each user

### 🏁 Contest Results & Winners
- **Complete contest history** with participant counts and prize pools
- **Winner tracking** with rankings and prize amounts
- **Contest status management** (upcoming, active, completed, cancelled)
- **Detailed contest information** including requirements and timelines

### 💰 Payment & Prize Distribution History
- **Comprehensive payment tracking** for all transactions
- **Prize distribution records** with dates, amounts, and recipients
- **Transaction status monitoring** (pending, completed, failed)
- **Payment type categorization** (entry fees, prize payouts, refunds, bonuses)

## Database Schema

### Core Tables

#### Users Table
```sql
- id: Primary key
- wallet_address: Unique Stellar wallet address
- username: Display name
- email: Contact email
- age_category: Age group for contests
- total_distance: Cumulative distance tracked
- total_contests: Number of contests participated
- contests_won: Number of contests won
- total_earnings: Total prize money earned
```

#### Contests Table
```sql
- id: Primary key
- title: Contest name
- description: Contest details
- age_category: Target age group
- start_date/end_date: Contest duration
- target_distance: Goal distance
- entry_fee: Cost to participate
- prize_pool: Total prize money
- status: Current contest state
```

#### Prize Distributions Table
```sql
- id: Primary key
- contest_id: Associated contest
- winner_wallet: Winner's wallet address
- rank_position: Final ranking (1st, 2nd, 3rd, etc.)
- prize_amount: Prize money awarded
- prize_type: Currency type (XLM, NFT, etc.)
- transaction_hash: Blockchain transaction ID
- distribution_date: When prize was awarded
- status: Payment status
```

#### Payment History Table
```sql
- id: Primary key
- from_wallet/to_wallet: Transaction parties
- amount: Payment amount
- currency: Payment currency
- transaction_type: Type of payment
- contest_id: Associated contest (if applicable)
- transaction_hash: Blockchain transaction ID
- status: Payment status
- created_at/completed_at: Timestamps
```

## API Endpoints

### Leaderboard Endpoints

#### Global Leaderboard
```
GET /api/leaderboard/global?age_category=26-35&limit=50
```
Returns ranked list of users by performance metrics.

#### Contest Leaderboard
```
GET /api/leaderboard/contest/123
```
Returns rankings for a specific contest.

#### User Rank
```
GET /api/leaderboard/user/WALLET_ADDRESS/rank
```
Returns user's current global ranking.

### Contest Endpoints

#### Contest Winners
```
GET /api/contests/123/winners
```
Returns winners and prize distribution for a contest.

#### Contest Payment Summary
```
GET /api/contests/123/payments
```
Returns all payments related to a specific contest.

### Payment Endpoints

#### User Payment History
```
GET /api/payments/wallet/WALLET_ADDRESS
```
Returns complete payment history for a user.

#### Recent Prize Distributions
```
GET /api/payments/prizes/recent?limit=20
```
Returns recent prize payouts across all contests.

#### Payment Volume Statistics
```
GET /api/payments/stats/volume?date_from=2024-01-01
```
Returns payment volume analytics.

## Frontend Integration

### Leaderboard Component
The new `Leaderboard.jsx` component provides:

1. **Global Leaderboard Tab**
   - Sortable rankings by distance, contests won, earnings
   - Age category filtering
   - User profile information display

2. **Contest Results Tab**
   - Grid view of completed contests
   - Winner information and prize distributions
   - Contest statistics and participation data

3. **Payment History Tab**
   - Chronological list of all prize distributions
   - Payment status indicators
   - Transaction details and amounts

### Navigation Integration
- Added leaderboard button to main navigation
- Integrated with floating action menu
- Accessible from landing page

## Sample Data

The system includes comprehensive sample data:

### Sample Users (5 users)
- FitnessKing: 1,250.5 km, 3 wins, 450.75 XLM earned
- RunnerQueen: 980.3 km, 2 wins, 320.50 XLM earned
- MarathonMaster: 2,100.8 km, 5 wins, 875.25 XLM earned
- SpeedWalker: 750.2 km, 1 win, 125.00 XLM earned
- HealthyHiker: 650.7 km, 1 win, 100.00 XLM earned

### Sample Contests (4 contests)
- New Year Fitness Challenge (completed)
- Spring Marathon Prep (completed)
- Summer Fitness Blast (active)
- Holiday Health Challenge (upcoming)

### Sample Prize Distributions
- Multiple prize payouts across different contests
- Various prize amounts and rankings
- Complete transaction history

## Setup Instructions

### 1. Backend Setup
```bash
# Install dependencies
cd backend
npm install

# Initialize database with sample data
npm run init-db

# Start server
npm run dev
```

### 2. Frontend Configuration
Update `frontend/.env`:
```
VITE_API_BASE_URL=http://localhost:3001/api
```

### 3. Access the System
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/api
- Frontend: http://localhost:5173

## Usage Examples

### View Global Leaderboard
1. Navigate to the app
2. Click "Leaderboard" in navigation or floating menu
3. Select "Global Leaderboard" tab
4. Filter by age category if desired

### Check Contest Winners
1. Go to Leaderboard → Contest Results
2. Browse completed contests
3. Click "View Winners" on any contest
4. See detailed winner information and prize distributions

### Review Payment History
1. Go to Leaderboard → Payment History
2. View chronological list of all prize distributions
3. See payment status, amounts, and transaction details
4. Filter by status or date range

## Security Features

- **Rate limiting**: 100 requests per 15 minutes per IP
- **CORS protection**: Configured for frontend domain
- **Input validation**: All API inputs validated and sanitized
- **SQL injection prevention**: Parameterized queries only
- **Error handling**: Comprehensive error responses

## Performance Optimizations

- **Database indexes**: Optimized queries for leaderboards and payments
- **Caching**: Global leaderboard cache for faster access
- **Pagination**: Configurable limits for large datasets
- **Efficient queries**: Optimized SQL for complex joins

## Future Enhancements

1. **Real-time updates**: WebSocket integration for live leaderboards
2. **Advanced analytics**: Detailed performance metrics and trends
3. **Social features**: User profiles and achievement sharing
4. **Mobile optimization**: Enhanced mobile experience
5. **Blockchain integration**: Direct smart contract interaction

## Troubleshooting

### Database Issues
```bash
# Reset database
rm backend/database/stellar_strider.db
npm run init-db
```

### API Connection Issues
- Check backend server is running on port 3001
- Verify CORS configuration in backend
- Check frontend API_BASE_URL configuration

### Sample Data Issues
- Run `npm run init-db` to regenerate sample data
- Check database file permissions
- Verify SQLite installation

## Contributing

1. Follow the existing database schema patterns
2. Add proper indexes for new queries
3. Include sample data for new features
4. Update API documentation
5. Test all endpoints thoroughly

This database system provides a solid foundation for tracking fitness achievements, managing contests, and maintaining transparent payment records in the Stellar Strider ecosystem.