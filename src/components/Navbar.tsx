import Link from "next/link";
import React from "react";
import axios from "axios";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout"); 
           
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="hidden lg:block">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
          <Link className="relative nav_link" href="/">
            HOME
          </Link>
          <Link className="relative nav_link" href="/">
            CATEGORIES
          </Link>
          <Link className="relative nav_link" href="/">
            ACCESSORIES
          </Link>
          <Link className="relative nav_link" href="/">
            OFFERS
          </Link>
        </div>
        <div className="logout">
          {" "}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
