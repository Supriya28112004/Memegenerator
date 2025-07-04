// src/pages/Signup.jsx
import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // 1. Create the user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Create a user document in Firestore
            // We use user.uid as the unique document ID
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                role: 'user',
                createdAt: Timestamp.fromDate(new Date())
            });

            // 3. Navigate to the login page on success
            navigate('/login');

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-amber-50 ">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm  border-b-pink-800 border-2">
    <h2 className="text-2xl font-semibold text-center mb-6 text-black">Sign Up</h2>
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
      >
        Sign Up
      </button>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
    </form>
  </div>
</div>

        </div>
    );
}
export default Signup;

