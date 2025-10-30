// HomePage.jsx - A page component
import Header from '../components/Header'
import Button from '../components/ui/Button'
import '../styles/pages.css'

function HomePage() {
    const handleGetStarted = () => {
        alert('Welcome to Momo Medical!')
    }

    return (
        <div className="page">
            <Header
                title="Momo Medical Platform"
                subtitle="Your healthcare companion"
            />

            <main className="page__content">
                <section className="welcome-section">
                    <h2>Welcome to Our Healthcare Platform</h2>
                    <p>
                        We provide innovative solutions for modern healthcare management.
                        Our platform helps patients and healthcare providers connect seamlessly.
                    </p>

                    <div className="actions">
                        <Button onClick={handleGetStarted} variant="primary" size="large">
                            Get Started
                        </Button>
                        <Button variant="secondary" size="large">
                            Learn More
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default HomePage