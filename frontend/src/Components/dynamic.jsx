import { useState } from "react";

const ToggleButton = () => {
  const [isblack, setisblack] = useState(false);

  const toggleStyle = () => {
    setisblack(!isblack);
  };

  return (
    <div style={{
        width:"70%",
        height:"256px",
        backgroundColor:"gray",
        marginLeft:"4%",
        marginTop:"4%"
    }}>
    <button
      onClick={toggleStyle}
      style={{
        borderRadius: "5px",
        border: "3px solid black",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: isblack ? "blue" : "white",
        color: isblack ? "white" : "black",
        borderColor: isblack ? "white" : "blue",
        transition: "all 0.4s ease",
        marginLeft:"34%",
        marginTop:"15%"
      }}
    >
      {isblack ? "Dark Mode" : "Light Mode"}
    </button>
    </div>
  );
};

export default ToggleButton;