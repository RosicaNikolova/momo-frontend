// HomePage.jsx - A page component
import Header from '../components/Header'
import TrendDisplay from '../components/TrendDisplay'
import ChangepointsDisplay from '../components/ChangepointsDisplay'
import AnomaliesDisplay from '../components/AnomaliesDisplay'
import '../styles/pages.css'

function HomePage() {

    return (
        <div className="page">
            <Header
                title="Momo Medical Platform"
                subtitle="Your healthcare companion"
            />

            <main className="page__content">
                <TrendDisplay />
                <ChangepointsDisplay />
                <AnomaliesDisplay />
            </main>
        </div>
    )
}

export default HomePage