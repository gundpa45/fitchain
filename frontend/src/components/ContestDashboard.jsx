import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContestCard from './ContestCard';
import UserStats from './UserStats';
import NFTRewards from './NFTRewards';
import './ContestDashboard.css';

const ContestDashboard = ({ userProfile, contests, allContests, onEditProfile }) => {
    const [activeTab, setActiveTab] = useState('available');
    const [joinedContests, setJoinedContests] = useState([]);
    const [userStats, setUserStats] = useState({
        totalDistance: 0,
        totalWorkouts: 0,
        currentStreak: 0,
        nftsEarned: 0,
        tokensEarned: 0,
        rank: 0
    });

    useEffect(() => {
        // Load user's joined contests and stats
        loadUserData();
    }, []);

    const loadUserData = () => {
        // In real app, fetch from blockchain/API
        const savedContests = localStorage.getItem('fitchain_joined_contests');
        if (savedContests) {
            setJoinedContests(JSON.parse(savedContests));
        }

        // Sample user stats
        setUserStats({
            totalDistance: 127.5,
            totalWorkouts: 23,
            currentStreak: 7,
            nftsEarned: 2,
            tokensEarned: 350,
            rank: 156
        });
    };

    const handleJoinContest = (contestId) => {
        const contest = contests.find(c => c.id === contestId);
        if (contest) {
            const newJoinedContest = {
                ...contest,
                joinedAt: new Date().toISOString(),
                progress: 0,
                status: 'active'
            };

            const updatedJoined = [...joinedContests, newJoinedContest];
            setJoinedContests(updatedJoined);
            localStorage.setItem('fitchain_joined_contests', JSON.stringify(updatedJoined));
        }
    };

    const getAgeCategory = (age) => {
        if (age >= 18 && age <= 25) return '18-25';
        if (age >= 26 && age <= 35) return '26-35';
        if (age >= 36 && age <= 50) return '36-50';
        if (age >= 51) return '50+';
        return 'Unknown';
    };

    const availableContests = contests.filter(
        contest => !joinedContests.some(joined => joined.id === contest.id)
    );

    const completedContests = joinedContests.filter(contest => contest.status === 'completed');

    return (
        <div className="contest-dashboard">
            {/* User Profile Summary */}
            <div className="profile-summary">
                <div className="profile-info">
                    <div className="avatar">
                        {userProfile?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="user-details">
                        <h3>{userProfile?.username || 'Anonymous User'}</h3>
                        <p>Age: {userProfile?.age} • Category: {getAgeCategory(userProfile?.age)}</p>
                        <p>Level: {userProfile?.fitnessLevel || 'Not set'}</p>
                    </div>
                </div>
                <button onClick={onEditProfile} className="edit-profile-btn">
                    Edit Profile
                </button>
            </div>

            {/* User Stats */}
            <UserStats stats={userStats} />

            {/* Contest Tabs */}
            <div className="contest-tabs">
                <button
                    className={`tab ${activeTab === 'available' ? 'active' : ''}`}
                    onClick={() => setActiveTab('available')}
                >
                    Available Contests ({availableContests.length})
                </button>
                <button
                    className={`tab ${activeTab === 'joined' ? 'active' : ''}`}
                    onClick={() => setActiveTab('joined')}
                >
                    My Contests ({joinedContests.length})
                </button>
                <button
                    className={`tab ${activeTab === 'rewards' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rewards')}
                >
                    NFT Rewards ({userStats.nftsEarned})
                </button>
            </div>

            {/* Contest Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'available' && (
                    <motion.div
                        key="available"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="contest-grid"
                    >
                        {availableContests.length > 0 ? (
                            availableContests.map(contest => (
                                <ContestCard
                                    key={contest.id}
                                    contest={contest}
                                    userAge={userProfile?.age}
                                    onJoin={handleJoinContest}
                                    isJoined={false}
                                />
                            ))
                        ) : (
                            <div className="no-contests">
                                <h3>No Available Contests</h3>
                                <p>All contests for your age category have been joined!</p>
                            </div>
                        )}
                    </motion.div>
                )}

                {activeTab === 'joined' && (
                    <motion.div
                        key="joined"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="contest-grid"
                    >
                        {joinedContests.length > 0 ? (
                            joinedContests.map(contest => (
                                <ContestCard
                                    key={contest.id}
                                    contest={contest}
                                    userAge={userProfile?.age}
                                    onJoin={handleJoinContest}
                                    isJoined={true}
                                />
                            ))
                        ) : (
                            <div className="no-contests">
                                <h3>No Joined Contests</h3>
                                <p>Join a contest to start earning NFT rewards!</p>
                            </div>
                        )}
                    </motion.div>
                )}

                {activeTab === 'rewards' && (
                    <motion.div
                        key="rewards"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <NFTRewards
                            userStats={userStats}
                            completedContests={completedContests}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Age Category Info */}
            {userProfile && (
                <div className="age-category-info">
                    <h4>Your Competition Category</h4>
                    <div className="category-card">
                        <span className="category-badge">{getAgeCategory(userProfile.age)}</span>
                        <p>You compete with users in your age group for fair competition</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContestDashboard;