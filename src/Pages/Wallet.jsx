import React, { useState } from 'react';
import ConfirmAdModal from '../Components/ConfirmAdModal'
import { NavLink } from 'react-router-dom';
function Wallet() {
  const [isModelOpen, setisModelOpen] = useState(false);

    const toggleModelOpen = () => {
      setisModelOpen(!isModelOpen);
    }
  return (
    <div>Wallet
      <NavLink onClick={toggleModelOpen} className="hover:underline opacity-100">
        Publish
      </NavLink>
      {isModelOpen && (
        <ConfirmAdModal onClose={toggleModelOpen} />
      )}
    </div>
  )
}

export default Wallet