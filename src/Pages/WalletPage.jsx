import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/authUtils";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WalletPage = () => {
  const [credit, setCredit] = useState("");
  const [userId, setUserId] = useState(null);
  const [amount, setAmount] = useState("");

  const handleAddFunds = async (e) => {
    e.preventDefault(); // Prevents the form from reloading the page
    if (!amount || !userId) return;

    try {
      const response = await axios.post(
        "https://crowdcast-backend.vercel.app/user/addCredits",
        {
          userId,
          credits: parseFloat(amount),
        }
      );

      if (response.status === 200) {
        setCredit(response.data.totalCredits);
        setAmount("");
        toast.success('Amount added successfully!',{
            position:"bottom-center"
        });
      }
    } catch (error) {
      console.error("Error adding funds:", error);
      toast.error('Failed to add amount');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setCredit(userData.totalCredits);
          setUserId(userData.id);
        } catch (error) {
          console.error("Error fetching user data:", error);
          
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
    <div className="box z-0 w-[79vw]">
      <p className="text-lg">
        Current Wallet Balance:
        <span className="ml-2 text-2xl font-bold text-primary">
          {credit}
        </span>
      </p>
      <form>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            name="amount"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-sm bg-white px-2 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Enter amount to add in balance"
          />
        </div>
      </form>
    </div>
        <button onClick={handleAddFunds} type="submit" className="submit-button btn mt-2">
          Add Money
        </button>
      <ToastContainer />
      </>
  );
};

export default WalletPage;