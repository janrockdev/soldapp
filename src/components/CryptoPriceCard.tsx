"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_KEY = process.env.NEXT_PUBLIC_FMP_API_KEY || "";

interface PriceData {
  price: number;
  change: number;
  changesPercentage: number;
}

interface HistoricalData {
  date: string;
  close: number;
}

export default function CryptoPriceCard({ symbol, name }: { symbol: string; name: string }) {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPriceData = async () => {
    if (!API_KEY) {
      setError("API key is missing");
      return;
    }
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/stable/quote?symbol=${symbol}&apikey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(`Price data for ${symbol}:`, data);
      if (data && Array.isArray(data) && data[0]?.price) {
        setPriceData({
          price: data[0].price,
          change: data[0].change || 0,
          changesPercentage: data[0].changesPercentage || 0,
        });
      } else {
        setError(`No valid price data for ${symbol}. Response: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Unknown error";
      setError(`Failed to fetch price data for ${symbol}: ${errorMessage}`);
      console.error(`Price fetch error for ${symbol}:`, err);
    }
  };

  const fetchHistoricalData = async () => {
    if (!API_KEY) {
      setError("API key is missing");
      return;
    }
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/stable/historical-price-eod/light?symbol=${symbol}&apikey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(`Historical data for ${symbol}:`, data);
      if (data && Array.isArray(data) && data.length > 0 && data[0]?.price) {
        setHistoricalData(
          data.slice(0, 30).map((item: { date: string; price: number }) => ({
            date: item.date,
            close: item.price, // Map price to close
          }))
        );
      } else {
        setError(`No historical data available for ${symbol}. Response: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Unknown error";
      setError(`Failed to fetch historical data for ${symbol}: ${errorMessage}`);
      console.error(`Historical fetch error for ${symbol}:`, err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchPriceData(), fetchHistoricalData()]);
      setLoading(false);
    };
    fetchData();

    const interval = setInterval(fetchPriceData, 30000);
    return () => clearInterval(interval);
  }, [symbol]);

  const chartData = {
    labels: historicalData.map((item) => item.date).reverse(),
    datasets: [
      {
        label: `${name} Price`,
        data: historicalData.map((item) => item.close).reverse(),
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255, 255, 255)",
        fill: false,
        tension: 0.5
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle><p className="text-2xl font-bold">{name} ({symbol})</p></CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {priceData && !loading && !error && (
          <div className="space-y-4">
            <div>
                <p className="text-4xl font-bold">${priceData.price.toFixed(2)}</p>
              <p
                className={`text-sm ${
                  priceData.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {priceData.change >= 0 ? "+" : ""}${priceData.change.toFixed(2)} (
                {priceData.changesPercentage.toFixed(2)}%)
              </p>
            </div>
            <div className="h-32">
              {historicalData.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <p className="text-center text-muted-foreground">No chart data available</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}