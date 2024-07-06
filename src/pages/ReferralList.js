import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';

const ReferralComponent = () => {
    const authUser = useAuthUser();  // Extract authentication user
    const userId = authUser()?.userId;

    const [referrals, setReferrals] = useState([]);
    

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const response = await axios.get(`https://quiet-ravine-44147-35b8bde85fde.herokuapp.com/api/user/referrals/${userId}`);
                setReferrals(response.data.referrals);
            } catch (error) {
                console.error('Error fetching referrals:', error);
            }
        };

        fetchReferrals();
    }, [userId]);

    return (
        <div className="container">
            <h1>Referral List</h1>
    
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USERNAME</th>
                        <th>EMAIL</th>
                    </tr>
                </thead>
                <tbody>
                    {referrals.map(referral => (
                        <tr key={referral.id}>
                            <td>{referral.id}</td>
                            <td>{referral.username}</td>
                            <td>{referral.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReferralComponent;
