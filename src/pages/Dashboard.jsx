// src/pages/Dashboard.jsx
import React from "react";
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                // Fetch the user's document from Firestore using their UID
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        };
        fetchUserData();
    }, [currentUser]);

    return (
        <div>
            <h2 className="text-pink-800 text-4xl"> Welcome to Dashboard!</h2>
            {/* <p >Welcome! You are logged in.</p> */}
            {userData ? (
                <div>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>UID:</strong> {userData.uid}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <button onClick={logout}>Log Out</button>
        </div>
    );
}
export default Dashboard;

