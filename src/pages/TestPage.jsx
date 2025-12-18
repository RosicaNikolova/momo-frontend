import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import MetricsTabs from "../components/MetricsTabs";
import RecentChanges from "../components/RecentChanges";
import Patterns from "../components/Patterns";
import { getTrendData, getChangepointsData, getAnomaliesData } from "../services/fallbackService.js";
import '../styles/pages.css'

export default function TestPage() {
  const [metric, setMetric] = useState("time_in_bed");
  const [trendData, setTrendData] = useState(null);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Map UI metric names to API metric names
        const metricMap = {
          "timeInBed": "time_in_bed",
          "highActivity": "high_activity",
          "lowActivity": "low_activity",
          "atRest": "at_rest"
        };

        const apiMetric = metricMap[metric] || metric;
        const residentId = 1;

        // Fetch all data in parallel (with fallback to mock)
        const [trend, changepoints, anomalies] = await Promise.all([
          getTrendData(apiMetric, residentId),
          getChangepointsData(apiMetric, residentId),
          getAnomaliesData(apiMetric, residentId)
        ]);

        console.log('Trend data received:', trend);
        setTrendData(trend);

        // Build timeline from changepoints and anomalies
        const timeline = [];

        // Add changepoints as shifts
        if (changepoints?.change_point_dates) {
          changepoints.change_point_dates.forEach((date, index) => {
            timeline.push({
              type: "shift",
              date,
              value: changepoints.change_point_values?.[index] || ""
            });
          });
        }

        // Add anomalies as events
        if (anomalies?.anomaly_dates) {
          anomalies.anomaly_dates.forEach((date, index) => {
            timeline.push({
              type: "event",
              date,
              value: anomalies.anomaly_values?.[index] || ""
            });
          });
        }

        // Sort timeline by date
        timeline.sort((a, b) => new Date(a.date) - new Date(b.date));

        setTimelineData(timeline);
      } catch (error) {
        console.error("Error loading data - showing mock data:", error);
        // Even if there's an error, the fallbackService should have provided mock data
        // If we get here, something went very wrong, so just keep current state
        setTimelineData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [metric]);

  return (
    <>
      <Navigation />
      <h3 className="page__room">Room 101</h3>

      <div className="page">
        <MetricsTabs selected={metric} onChange={setMetric} />

        {loading ? (
          <p>Loading data...</p>
        ) : trendData ? (
          <>
            <RecentChanges
              baseline={trendData.baseline_hours}
              lastWeek={trendData.last_7_days_hours}
              difference={trendData.difference_hours}
              description={trendData.description}
            />

            <Patterns events={timelineData} baseline={trendData.baseline_hours} />
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}


