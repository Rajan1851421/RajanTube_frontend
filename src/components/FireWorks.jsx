import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ConfettiExample = () => {
 
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const handleFireworks = () => {
    setIsConfettiActive(true);

    // Stop the confetti after 3 seconds
    
  };
  useEffect(()=>{
    setIsConfettiActive(true);
    setTimeout(() => {
      setIsConfettiActive(false);
    }, 3000);
  },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Celebrate with Confetti!</h1>
     
      {isConfettiActive && <Confetti />}
    </div>
  );
};

export default ConfettiExample;
