// HomePage.jsx - A page component
import Navigation from '../components/Navigation'
import TrendDisplay from '../components/TrendDisplay'
import ChangepointsDisplay from '../components/ChangepointsDisplay'
import AnomaliesDisplay from '../components/AnomaliesDisplay'
import '../styles/pages.css'

function HomePage() {
    return (
        <>
            <Navigation />

            <div className="page">
                <main className="page__content">
                    <TrendDisplay />
                    <ChangepointsDisplay />
                    <AnomaliesDisplay />
                </main>
            </div>
        </>
    )
}

export default HomePage
