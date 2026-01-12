import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchResidents } from '../services/residentsService';
import './Sidebar.css';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        loadResidents();
    }, []);

    const loadResidents = async () => {
        try {
            setLoading(true);
            const data = await fetchResidents(0, 50);
            setResidents(data);
            setError(null);
        } catch (err) {
            setError('Failed to load residents');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                className="sidebar-toggle"
                onClick={toggleSidebar}
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            >
                {isOpen ? '✕' : '☰'}
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
                <div className="sidebar__header">
                    <h2 className="sidebar__title">Residents</h2>
                    <button
                        className="sidebar__close"
                        onClick={toggleSidebar}
                        aria-label="Close sidebar"
                    >
                        ✕
                    </button>
                </div>

                <div className="sidebar__content">
                    {loading && (
                        <div className="sidebar__loading">Loading residents...</div>
                    )}

                    {error && (
                        <div className="sidebar__error">{error}</div>
                    )}

                    {!loading && !error && residents.length > 0 && (
                        <ul className="sidebar__list">
                            {residents.map((resident) => (
                                <li key={resident.id} className="sidebar__item">
                                    <Link
                                        to={`/resident/${resident.id}`}
                                        className={`sidebar__link ${location.pathname === `/resident/${resident.id}`
                                                ? 'sidebar__link--active'
                                                : ''
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="sidebar__room">Room {resident.room_number}</div>
                                        <div className="sidebar__name">{resident.name}</div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {!loading && !error && residents.length === 0 && (
                        <div className="sidebar__empty">No residents found</div>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}
        </>
    );
}

export default Sidebar;
