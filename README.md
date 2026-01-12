# momo-frontend
Momo Insights Application

React application that visualizes bed sensor insights from Momo Medical's Bedsense API, helping caregivers in elderly care homes monitor resident sleep patterns and behavioral changes.

//Features
Sleep Trend Analysis: Visual comparison of recent patterns (7 days) against baseline with circular dial indicators
Anomaly Detection: Timeline display of unusual behavior days with severity indicators
Change Point Detection: Visual markers showing when sleep patterns shifted significantly
Multi-Metric Views: Switch between time in bed, activity levels, and rest metrics

//Tech Stack
Framework: React 19, Vite 7
HTTP Client: Axios
Animations: Framer Motion
Styling: CSS with modern gradients and glassmorphism
Linting: ESLint with React hooks plugin

//Quick Start
# Clone repository
git clone https://github.com/RosicaNikolova/momo-frontend.git
cd momo-frontend

# Install dependencies
npm install

# Run application
npm run dev

Application available at: http://localhost:5173

Note: For full functionality, run the momo-backend on http://localhost:8000. The app falls back to local mock data when backend is unavailable.

//API Integration
Connects to the momo-backend FastAPI service:

                     Endpoint	                                           Description
GET /api/insights/trend/{metric}/{resident_id}	                    Get sleep trend comparison
GET /api/insights/changepoints/{metric}/{resident_id}	            Detect pattern shifts
GET /api/insights/anomalies/{metric}/{resident_id}	                Detect anomalies

Supported metrics: time_in_bed, at_rest, low_activity, high_activity

//Project Structure
momo-frontend/
├── src/
│   ├── components/
│   │   ├── RecentChanges.jsx       # Dial comparison view
│   │   ├── Patterns.jsx            # Timeline visualization
│   │   ├── MetricsTabs.jsx         # Metric selector
│   │   └── Navigation.jsx          # Top navigation
│   ├── services/
│   │   ├── trendService.js         # Trend API calls
│   │   ├── changepointsService.js  # Changepoints API calls
│   │   ├── anomaliesService.js     # Anomalies API calls
│   │   ├── fallbackService.js      # Auto-fallback wrapper
│   │   └── localMockService.js     # Local mock data
│   ├── pages/
│   │   └── TestPage.jsx            # Simplified dashboard
│   ├── data/
│   │   └── mock_dataset.json       # Fallback mock data
│   └── utils/
│       └── api.js                  # Axios configuration
├── package.json
└── vite.config.js

//Available Scripts
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint