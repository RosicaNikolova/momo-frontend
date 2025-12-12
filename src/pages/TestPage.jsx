import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import MetricsTabs from "../components/MetricsTabs";
import RecentChanges from "../components/RecentChanges";
import Patterns from "../components/Patterns";
import { getTrendData, getChangepointsData, getAnomaliesData } from "../services/localMockService.js";
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
          "lowActivity": "low_activity"
        };
        
        const apiMetric = metricMap[metric] || metric;
        const residentId = 1;

        // Fetch trend data
        const trend = await getTrendData(apiMetric, residentId);
        setTrendData(trend);

        // Fetch changepoints and anomalies to build timeline
        const changepoints = await getChangepointsData(apiMetric, residentId);
        const anomalies = await getAnomaliesData(apiMetric, residentId);

        // Build timeline from changepoints and anomalies
        const timeline = [];

        // Add changepoints as shifts
        if (changepoints?.change_point_dates) {
          changepoints.change_point_dates.forEach((date, index) => {
            timeline.push({
              type: "shift",
              date: new Date(date).toISOString().split('T')[0]
            });
          });
        }

        // Add anomalies as events
        if (anomalies?.anomaly_dates) {
          anomalies.anomaly_dates.forEach((date, index) => {
            timeline.push({
              type: "event",
              date: new Date(date).toISOString().split('T')[0],
              duration: anomalies.anomaly_values?.[index] || "Unknown"
            });
          });
        }

        // Sort timeline by date
        timeline.sort((a, b) => new Date(a.date) - new Date(b.date));

        setTimelineData(timeline);
      } catch (error) {
        console.error("Error loading data:", error);
        setTimelineData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [metric]);

  // Convert hours to hours and minutes format
  const formatHours = (hours) => {
    if (!hours && hours !== 0) return "N/A";
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <>
      <Navigation />

      <div className="page">
        <MetricsTabs selected={metric} onChange={setMetric} />

        {loading ? (
          <p>Loading data...</p>
        ) : trendData ? (
          <>
            <RecentChanges
              baseline={formatHours(trendData.baseline_hours)}
              lastWeek={formatHours(trendData.last_7_days_hours)}
              difference={formatHours(Math.abs(trendData.difference_hours))}
            />

            <Patterns events={timelineData} />
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}


