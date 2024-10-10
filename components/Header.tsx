import React from "react";

const Header = () => {
  const title = "Estimate App"; // Inline constant

  return (
    <header style={{ padding: "10px", backgroundColor: "#f4f4f4" }}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;