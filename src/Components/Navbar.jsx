import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/authUtils";

export default function Navbar() {
  const [credit, setCredit] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setCredit(userData.totalCredits);
        } catch (error) {
          console.error("Error setting user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="fixed z-1000 left-[20vw] w-[80vw] bg-white flex justify-between items-center p-4">
      <div className="appname flex justify-center items-center gap-2">
        <img src="./logo.png" alt="logo" className="w-[45px] h-[45px] " />
        <h1 className="font-bold text-2xl">CrowdCast</h1>
      </div>

      
    </div>
  );
}
