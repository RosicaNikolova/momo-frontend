import { useState } from "react";
import "./Navigation.css";

export default function Navigation({ room }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav__top">
        <h1 className="nav__logo">Momo Insights App</h1>

        <button
          className="nav__toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav-mobile-menu"
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {room && <div className="nav__room">{room}</div>}

      {open && (
        <ul id="nav-mobile-menu" className="nav__menu nav__menu--mobile" role="menu">
          <li role="none"><a href="#" role="menuitem">Home</a></li>
          <li role="none"><a href="#" role="menuitem">About</a></li>
          <li role="none"><a href="#" role="menuitem">Services</a></li>
          <li role="none"><a href="#" role="menuitem">Contact</a></li>
        </ul>
      )}
    </nav>
  );
}
