import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserProfile from './UserProfile';
import ContestDashboard from './ContestDashboard';
import './ContestPage.css';

const ContestPage = ({ onBack }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [contests, setContests] = useState([]);

    useEffect(() => {
        // Check if user has a profile
        const savedProfile = localStorage.getItem('fitchain_user_profile');
        if (savedProfile) {
            setUserProfile(JSON.parse(savedProfile));
        } else {
            setShowProfile(true);
        }

        // Load available contests
        loadContests();
    }, []);

    const loadContests = () => {
        // Sample contests - in real app, fetch from blockchain/API
        const sampleContests = [
            {
                id: 1,
                title: "30-Day Fitness Challenge",
                description: "Complete 30 days of consistent fitness tracking",
                ageCategory: "18-30",
                duration: 30,
                reward: "Fitness Champion NFT + 100 FIT Tokens",
                participants: 1247,
                daysLeft: 15,
                requirements: "Track at least 5km per week",
                status: "active"
            },
            {
                id: 2,
                title: "Senior Wellness Journey",
                description: "Gentle fitness tracking for mature adults",
                ageCategory: "50+",
                duration: 15,
                reward: "Wellness Warrior NFT + 75 FIT Tokens",
                participants: 432,
                daysLeft: 8,
                requirements: "Track at least 2km per week",
                status: "active"
            },
            {
                id: 3,
                title: "Young Athletes Sprint",
                description: "High-intensity challenge for young fitness enthusiasts",
                ageCategory: "18-25",
                duration: 21,
                reward: "Sprint Master NFT + 150 FIT Tokens",
                participants: 892,
                daysLeft: 21,
                requirements: "Track at least 10km per week",
                status: "active"
            },
            {
                id: 4,
                title: "Prime Fitness Challenge",
                description: "Balanced fitness goals for adults in their prime",
                ageCategory: "30-50",
                duration: 25,
                reward: "Prime Athlete NFT + 125 FIT Tokens",
                participants: 756,
                daysLeft: 12,
                requirements: "Track at least 7km per week",
                status: "active"
            }
        ];
        setContests(sampleContests);
    };

    const handleProfileComplete = (profile) => {
        setUserProfile(profile);
        setShowProfile(false);
        localStorage.setItem('fitchain_user_profile', JSON.stringify(profile));
    };

    const getEligibleContests = () => {
        if (!userProfile) return [];

        return contests.filter(contest => {
            const [minAge, maxAge] = contest.ageCategory.includes('+')
                ? [parseInt(contest.ageCategory), 999]
                : contest.ageCategory.split('-').map(age => parseInt(age));

            return userProfile.age >= minAge && userProfile.age <= maxAge;
        });
    };

    return (
        <div className="contest-page">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="contest-container"
            >
                {/* Header */}
                <div className="contest-header">
                    <div className="contest-header-top">
                        <button onClick={onBack} className="back-button">
                            <span>←</span> Back to Tracking
                        </button>
                    </div>
                    <div className="contest-header-content">
                        <h1 className="contest-title">
                            <span className="gradient-text">FitChain Contests</span>
                        </h1>
                        <p className="contest-subtitle">
                            Join age-appropriate fitness challenges and earn exclusive NFT rewards
                        </p>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {showProfile ? (
                        <UserProfile
                            key="profile"
                            onComplete={handleProfileComplete}
                            onSkip={() => setShowProfile(false)}
                        />
                    ) : (
                        <ContestDashboard
                            key="dashboard"
                            userProfile={userProfile}
                            contests={getEligibleContests()}
                            allContests={contests}
                            onEditProfile={() => setShowProfile(true)}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ContestPage;