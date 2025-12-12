import { useState } from "react";
import "./Navigation.css";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <h1 className="nav__logo">Momo Insights</h1>

      {/* Mobile Menu Button */}
      <button className="nav__toggle" onClick={() => setOpen(!open)}>
        {open ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {open && (
        <ul className="nav__menu nav__menu--mobile">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      )}
    </nav>
  );
}