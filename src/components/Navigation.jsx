import { useState } from "react";
import { Link } from 'react-router-dom';
import "./Navigation.css";

export default function Navigation({ room }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav__top">
        <h1 className="nav__logo">
          <Link to="/" className="nav__logo-link">Momo Insights</Link>
        </h1>

      </div>

      {room && <div className="nav__room">{room}</div>}

    </nav>
  );
}
