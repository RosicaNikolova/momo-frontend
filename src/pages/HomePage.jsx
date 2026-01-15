import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchResidents } from '../services/residentsService';
import './HomePage.css';

function groupByFloor(residents) {
  return residents.reduce((acc, r) => {
    const floor = r.floor || String(r.room_number).charAt(0) || '0';
    if (!acc[floor]) acc[floor] = [];
    acc[floor].push(r);
    return acc;
  }, {});
}

function floorLabel(floor) {
  if (String(floor) === '1') return 'Palliative Care';
  if (String(floor) === '2') return 'Rehabillitation';
  return `Floor ${floor}`;
}

export default function HomePage() {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchResidents(0, 200);
        if (mounted) setResidents(data || []);
      } catch (err) {
        console.error(err);
        if (mounted) setError('Unable to load residents');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const grouped = groupByFloor(residents);

  return (
    <main className="home container">
      <header className="home__header">
        <h1 className="home__title">Momo Insights</h1>
        <p className="home__subtitle">Which resident would you like to analyse today?</p>
      </header>

      <section className="home__content">
        {loading && <div className="home__loading">Loading residents…</div>}
        {error && <div className="home__error">{error}</div>}

        {!loading && !error && residents.length === 0 && (
          <div className="home__empty">No residents available.</div>
        )}

        {!loading && !error && residents.length > 0 && (
          <div className="home__grid">
            {Object.keys(grouped).sort().map((floor) => (
              <div key={floor} className="home__floor">
                <h3 className="home__floor-title">{floorLabel(floor)}</h3>
                <ul className="home__list">
                  {grouped[floor]
                    .sort((a, b) => a.room_number.localeCompare(b.room_number))
                    .map((r) => (
                      <li key={r.id} className="home__item">
                        <Link to={`/resident/${r.id}`} className="home__link">
                          <div className="home__room">Room {r.room_number}</div>
                          <div className="home__name">{r.name}</div>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
