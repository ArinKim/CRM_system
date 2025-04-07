import { useState, useEffect } from "react";
import { DailySalesChartAPI } from "../components/Chart/DailySalesChartAPI";

export default function FetchingTestPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await DailySalesChartAPI.get();
        setError("");
        setSales(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <ul className="row">
      {sales.map((item) => (
        <li key={item.id}>{item.id}</li>
      ))}
    </ul>
  );
}
