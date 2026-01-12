import { useState } from "react";
import "./Navigation.css";

export default function Navigation({ room }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav__top">
        <h1 className="nav__logo">Momo Insights App</h1>

      </div>

      {room && <div className="nav__room">{room}</div>}

    </nav>
  );
}
