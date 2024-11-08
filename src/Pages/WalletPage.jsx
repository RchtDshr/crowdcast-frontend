import React, { useEffect, useState } from 'react';
import { Button, Input, Card, Typography, Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { getCurrentUser } from "../utils/authUtils";
import axios from 'axios';

const { Title, Text } = Typography;

const WalletPage = () => {
    const [credit, setCredit] = useState("");
    const [userId, setUserId] = useState(null); // Store userId from userData
    const [amount, setAmount] = useState("");

    const handleAddFunds = async () => {
        if (!amount || !userId) return;

        try {
            const response = await axios.post('http://localhost:5000/user/addCredits', {
                userId,
                credits: parseFloat(amount)
            });

            // Update credit balance if the request was successful
            if (response.status === 200) {
                setCredit(response.data.totalCredits);
                setAmount(''); // Clear the input field
            }
        } catch (error) {
            console.error("Error adding funds:", error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const userData = await getCurrentUser(token);
                    
                    setCredit(userData.totalCredits);
                    setUserId(userData.id); // Set userId for use in the request
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <Card
                style={{
                    maxWidth: 600,
                    margin: 'auto',
                    backgroundColor: '#ffffff',
                    borderRadius: 8,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                }}
            >
                <Title level={3} style={{ textAlign: 'center' }}>
                    Wallet Balance
                </Title>
                <Text style={{ fontSize: 24, fontWeight: 500, display: 'block', textAlign: 'center', marginBottom: 20 }}>
                    <span className="ml-2 text-2xl font-bold text-primary">{credit}</span>
                </Text>

                <Row gutter={16} justify="center">
                    <Col>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{
                                width: '200px',
                                borderRadius: 6,
                                padding: '10px',
                                marginBottom: 10,
                            }}
                        />
                    </Col>
                </Row>

                <Row gutter={16} justify="center" style={{ marginBottom: 20 }}>
                    <Col>
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            onClick={handleAddFunds}
                            style={{
                                backgroundColor: '#009b67',
                                borderColor: '#4caf50',
                                borderRadius: 6,
                                padding: '0 20px',
                                marginTop: 30,
                            }}
                        >
                            Add Funds
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default WalletPage;
