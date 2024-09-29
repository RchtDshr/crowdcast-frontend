import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export async function getCurrentUser(token) {
  try {

    const response = await fetch('http://localhost:5000/user/getUser', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user data');
    }
    const data = await response.json(); // Read the response body once

    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}