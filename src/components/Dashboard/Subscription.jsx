import { useState } from "react";
import {
  Card,
  CardContent,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Modal,
  Box,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaTimes,
  FaBug,
  FaServer,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { toast } from "sonner";
import { MetricCard } from "../UI/MetricCard";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 700,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 0,
  maxHeight: "90vh",
  overflow: "auto",
};

export default function Reliability() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Year filters for each chart
  const [crashYear, setCrashYear] = useState("2024");
  const [apiYear, setApiYear] = useState("2024");
  const [thirdPartyYear, setThirdPartyYear] = useState("2024");

  // Crash Rate Data by App Version and Device - 12 months
  const allCrashData = {
    2023: {
      byVersion: [
        { month: "Jan", v210: 2.8, v211: 0, v212: 0 },
        { month: "Feb", v210: 2.6, v211: 1.9, v212: 0 },
        { month: "Mar", v210: 2.4, v211: 1.7, v212: 0 },
        { month: "Apr", v210: 2.2, v211: 1.5, v212: 1.2 },
        { month: "May", v210: 2.0, v211: 1.3, v212: 1.0 },
        { month: "Jun", v210: 1.8, v211: 1.1, v212: 0.8 },
        { month: "Jul", v210: 1.6, v211: 0.9, v212: 0.7 },
        { month: "Aug", v210: 1.4, v211: 0.8, v212: 0.6 },
        { month: "Sep", v210: 1.2, v211: 0.7, v212: 0.5 },
        { month: "Oct", v210: 1.0, v211: 0.6, v212: 0.4 },
        { month: "Nov", v210: 0.9, v211: 0.5, v212: 0.35 },
        { month: "Dec", v210: 0.8, v211: 0.4, v212: 0.3 },
      ],
      byDevice: [
        { device: "iPhone 14 Pro", crashRate: 0.25, sessions: 145 },
        { device: "iPhone 13", crashRate: 0.32, sessions: 128 },
        { device: "Pixel 7", crashRate: 0.45, sessions: 95 },
        { device: "Samsung S22", crashRate: 0.52, sessions: 87 },
        { device: "iPhone 12", crashRate: 0.38, sessions: 112 },
        { device: "Others", crashRate: 0.55, sessions: 183 },
      ],
    },
    2024: {
      byVersion: [
        { month: "Jan", v210: 0.7, v211: 0.35, v212: 0.28, v213: 0 },
        { month: "Feb", v210: 0.6, v211: 0.32, v212: 0.25, v213: 0.52 },
        { month: "Mar", v210: 0.5, v211: 0.28, v212: 0.22, v213: 0.45 },
        { month: "Apr", v210: 0.4, v211: 0.25, v212: 0.2, v213: 0.38 },
        { month: "May", v210: 0.35, v211: 0.22, v212: 0.18, v213: 0.32 },
        { month: "Jun", v210: 0.3, v211: 0.2, v212: 0.16, v213: 0.28 },
        { month: "Jul", v210: 0.25, v211: 0.18, v212: 0.14, v213: 0.24 },
        { month: "Aug", v210: 0.22, v211: 0.16, v212: 0.12, v213: 0.2 },
        { month: "Sep", v210: 0.2, v211: 0.14, v212: 0.11, v213: 0.18 },
        { month: "Oct", v210: 0.18, v211: 0.12, v212: 0.1, v213: 0.16 },
        { month: "Nov", v210: 0.16, v211: 0.11, v212: 0.09, v213: 0.14 },
        { month: "Dec", v210: 0.14, v211: 0.1, v212: 0.08, v213: 0.12 },
      ],
      byDevice: [
        { device: "iPhone 15 Pro", crashRate: 0.08, sessions: 185 },
        { device: "iPhone 14 Pro", crashRate: 0.12, sessions: 165 },
        { device: "Pixel 8", crashRate: 0.18, sessions: 125 },
        { device: "Samsung S23", crashRate: 0.22, sessions: 115 },
        { device: "iPhone 13", crashRate: 0.15, sessions: 142 },
        { device: "Others", crashRate: 0.28, sessions: 218 },
      ],
    },
    2025: {
      byVersion: [
        { month: "Jan", v212: 0.07, v213: 0.11, v214: 0.35 },
        { month: "Feb", v212: 0.06, v213: 0.1, v214: 0.28 },
        { month: "Mar", v212: 0.05, v213: 0.09, v214: 0.22 },
        { month: "Apr", v212: 0.04, v213: 0.08, v214: 0.18 },
        { month: "May", v212: 0.04, v213: 0.07, v214: 0.15 },
        { month: "Jun", v212: 0.03, v213: 0.06, v214: 0.12 },
        { month: "Jul", v212: 0.03, v213: 0.05, v214: 0.1 },
        { month: "Aug", v212: 0.02, v213: 0.05, v214: 0.09 },
        { month: "Sep", v212: 0.02, v213: 0.04, v214: 0.08 },
        { month: "Oct", v212: 0.02, v213: 0.04, v214: 0.07 },
        { month: "Nov", v212: 0.01, v213: 0.03, v214: 0.06 },
        { month: "Dec", v212: 0.01, v213: 0.03, v214: 0.05 },
      ],
      byDevice: [
        { device: "iPhone 16 Pro", crashRate: 0.03, sessions: 225 },
        { device: "iPhone 15 Pro", crashRate: 0.05, sessions: 205 },
        { device: "Pixel 9", crashRate: 0.08, sessions: 155 },
        { device: "Samsung S24", crashRate: 0.1, sessions: 145 },
        { device: "iPhone 14 Pro", crashRate: 0.06, sessions: 172 },
        { device: "Others", crashRate: 0.12, sessions: 248 },
      ],
    },
  };

  // API & Edge Function Performance - 12 months
  const allApiData = {
    2023: [
      {
        month: "Jan",
        apiLatency: 185,
        edgeLatency: 95,
        apiErrors: 2.8,
        edgeErrors: 1.5,
        timeouts: 0.8,
      },
      {
        month: "Feb",
        apiLatency: 180,
        edgeLatency: 92,
        apiErrors: 2.6,
        edgeErrors: 1.4,
        timeouts: 0.75,
      },
      {
        month: "Mar",
        apiLatency: 175,
        edgeLatency: 88,
        apiErrors: 2.4,
        edgeErrors: 1.3,
        timeouts: 0.7,
      },
      {
        month: "Apr",
        apiLatency: 170,
        edgeLatency: 85,
        apiErrors: 2.2,
        edgeErrors: 1.2,
        timeouts: 0.65,
      },
      {
        month: "May",
        apiLatency: 165,
        edgeLatency: 82,
        apiErrors: 2.0,
        edgeErrors: 1.1,
        timeouts: 0.6,
      },
      {
        month: "Jun",
        apiLatency: 160,
        edgeLatency: 78,
        apiErrors: 1.8,
        edgeErrors: 1.0,
        timeouts: 0.55,
      },
      {
        month: "Jul",
        apiLatency: 155,
        edgeLatency: 75,
        apiErrors: 1.6,
        edgeErrors: 0.9,
        timeouts: 0.5,
      },
      {
        month: "Aug",
        apiLatency: 150,
        edgeLatency: 72,
        apiErrors: 1.5,
        edgeErrors: 0.8,
        timeouts: 0.45,
      },
      {
        month: "Sep",
        apiLatency: 145,
        edgeLatency: 68,
        apiErrors: 1.4,
        edgeErrors: 0.75,
        timeouts: 0.42,
      },
      {
        month: "Oct",
        apiLatency: 140,
        edgeLatency: 65,
        apiErrors: 1.3,
        edgeErrors: 0.7,
        timeouts: 0.4,
      },
      {
        month: "Nov",
        apiLatency: 135,
        edgeLatency: 62,
        apiErrors: 1.2,
        edgeErrors: 0.65,
        timeouts: 0.38,
      },
      {
        month: "Dec",
        apiLatency: 130,
        edgeLatency: 58,
        apiErrors: 1.1,
        edgeErrors: 0.6,
        timeouts: 0.35,
      },
    ],
    2024: [
      {
        month: "Jan",
        apiLatency: 125,
        edgeLatency: 55,
        apiErrors: 1.0,
        edgeErrors: 0.55,
        timeouts: 0.32,
      },
      {
        month: "Feb",
        apiLatency: 120,
        edgeLatency: 52,
        apiErrors: 0.95,
        edgeErrors: 0.5,
        timeouts: 0.3,
      },
      {
        month: "Mar",
        apiLatency: 115,
        edgeLatency: 48,
        apiErrors: 0.9,
        edgeErrors: 0.48,
        timeouts: 0.28,
      },
      {
        month: "Apr",
        apiLatency: 110,
        edgeLatency: 45,
        apiErrors: 0.85,
        edgeErrors: 0.45,
        timeouts: 0.26,
      },
      {
        month: "May",
        apiLatency: 105,
        edgeLatency: 42,
        apiErrors: 0.8,
        edgeErrors: 0.42,
        timeouts: 0.24,
      },
      {
        month: "Jun",
        apiLatency: 100,
        edgeLatency: 38,
        apiErrors: 0.75,
        edgeErrors: 0.4,
        timeouts: 0.22,
      },
      {
        month: "Jul",
        apiLatency: 95,
        edgeLatency: 35,
        apiErrors: 0.7,
        edgeErrors: 0.38,
        timeouts: 0.2,
      },
      {
        month: "Aug",
        apiLatency: 90,
        edgeLatency: 32,
        apiErrors: 0.65,
        edgeErrors: 0.35,
        timeouts: 0.18,
      },
      {
        month: "Sep",
        apiLatency: 85,
        edgeLatency: 28,
        apiErrors: 0.6,
        edgeErrors: 0.32,
        timeouts: 0.16,
      },
      {
        month: "Oct",
        apiLatency: 80,
        edgeLatency: 25,
        apiErrors: 0.55,
        edgeErrors: 0.3,
        timeouts: 0.14,
      },
      {
        month: "Nov",
        apiLatency: 75,
        edgeLatency: 22,
        apiErrors: 0.5,
        edgeErrors: 0.28,
        timeouts: 0.12,
      },
      {
        month: "Dec",
        apiLatency: 70,
        edgeLatency: 18,
        apiErrors: 0.45,
        edgeErrors: 0.25,
        timeouts: 0.1,
      },
    ],
    2025: [
      {
        month: "Jan",
        apiLatency: 65,
        edgeLatency: 15,
        apiErrors: 0.42,
        edgeErrors: 0.22,
        timeouts: 0.09,
      },
      {
        month: "Feb",
        apiLatency: 62,
        edgeLatency: 14,
        apiErrors: 0.4,
        edgeErrors: 0.2,
        timeouts: 0.08,
      },
      {
        month: "Mar",
        apiLatency: 58,
        edgeLatency: 13,
        apiErrors: 0.38,
        edgeErrors: 0.18,
        timeouts: 0.07,
      },
      {
        month: "Apr",
        apiLatency: 55,
        edgeLatency: 12,
        apiErrors: 0.35,
        edgeErrors: 0.16,
        timeouts: 0.065,
      },
      {
        month: "May",
        apiLatency: 52,
        edgeLatency: 11,
        apiErrors: 0.32,
        edgeErrors: 0.15,
        timeouts: 0.06,
      },
      {
        month: "Jun",
        apiLatency: 48,
        edgeLatency: 10,
        apiErrors: 0.3,
        edgeErrors: 0.14,
        timeouts: 0.055,
      },
      {
        month: "Jul",
        apiLatency: 45,
        edgeLatency: 9,
        apiErrors: 0.28,
        edgeErrors: 0.13,
        timeouts: 0.05,
      },
      {
        month: "Aug",
        apiLatency: 42,
        edgeLatency: 8,
        apiErrors: 0.25,
        edgeErrors: 0.12,
        timeouts: 0.045,
      },
      {
        month: "Sep",
        apiLatency: 38,
        edgeLatency: 7,
        apiErrors: 0.22,
        edgeErrors: 0.11,
        timeouts: 0.04,
      },
      {
        month: "Oct",
        apiLatency: 35,
        edgeLatency: 6,
        apiErrors: 0.2,
        edgeErrors: 0.1,
        timeouts: 0.035,
      },
      {
        month: "Nov",
        apiLatency: 32,
        edgeLatency: 5,
        apiErrors: 0.18,
        edgeErrors: 0.09,
        timeouts: 0.03,
      },
      {
        month: "Dec",
        apiLatency: 28,
        edgeLatency: 4,
        apiErrors: 0.15,
        edgeErrors: 0.08,
        timeouts: 0.025,
      },
    ],
  };

  // Third-Party Health (Twilio, Open-Meteo, Maps) - 12 months
  const allThirdPartyData = {
    2023: [
      {
        month: "Jan",
        twilioUptime: 99.2,
        twilioLatency: 245,
        meteoUptime: 99.5,
        meteoLatency: 185,
        mapsUptime: 99.7,
        mapsLatency: 125,
      },
      {
        month: "Feb",
        twilioUptime: 99.3,
        twilioLatency: 238,
        meteoUptime: 99.6,
        meteoLatency: 180,
        mapsUptime: 99.75,
        mapsLatency: 120,
      },
      {
        month: "Mar",
        twilioUptime: 99.4,
        twilioLatency: 232,
        meteoUptime: 99.65,
        meteoLatency: 175,
        mapsUptime: 99.8,
        mapsLatency: 115,
      },
      {
        month: "Apr",
        twilioUptime: 99.45,
        twilioLatency: 225,
        meteoUptime: 99.7,
        meteoLatency: 170,
        mapsUptime: 99.82,
        mapsLatency: 110,
      },
      {
        month: "May",
        twilioUptime: 99.5,
        twilioLatency: 218,
        meteoUptime: 99.72,
        meteoLatency: 165,
        mapsUptime: 99.85,
        mapsLatency: 105,
      },
      {
        month: "Jun",
        twilioUptime: 99.55,
        twilioLatency: 212,
        meteoUptime: 99.75,
        meteoLatency: 160,
        mapsUptime: 99.87,
        mapsLatency: 100,
      },
      {
        month: "Jul",
        twilioUptime: 99.6,
        twilioLatency: 205,
        meteoUptime: 99.78,
        meteoLatency: 155,
        mapsUptime: 99.88,
        mapsLatency: 95,
      },
      {
        month: "Aug",
        twilioUptime: 99.62,
        twilioLatency: 198,
        meteoUptime: 99.8,
        meteoLatency: 150,
        mapsUptime: 99.9,
        mapsLatency: 92,
      },
      {
        month: "Sep",
        twilioUptime: 99.65,
        twilioLatency: 192,
        meteoUptime: 99.82,
        meteoLatency: 145,
        mapsUptime: 99.91,
        mapsLatency: 88,
      },
      {
        month: "Oct",
        twilioUptime: 99.68,
        twilioLatency: 185,
        meteoUptime: 99.84,
        meteoLatency: 140,
        mapsUptime: 99.92,
        mapsLatency: 85,
      },
      {
        month: "Nov",
        twilioUptime: 99.7,
        twilioLatency: 178,
        meteoUptime: 99.85,
        meteoLatency: 135,
        mapsUptime: 99.93,
        mapsLatency: 82,
      },
      {
        month: "Dec",
        twilioUptime: 99.72,
        twilioLatency: 172,
        meteoUptime: 99.87,
        meteoLatency: 130,
        mapsUptime: 99.94,
        mapsLatency: 78,
      },
    ],
    2024: [
      {
        month: "Jan",
        twilioUptime: 99.75,
        twilioLatency: 165,
        meteoUptime: 99.88,
        meteoLatency: 125,
        mapsUptime: 99.95,
        mapsLatency: 75,
      },
      {
        month: "Feb",
        twilioUptime: 99.78,
        twilioLatency: 158,
        meteoUptime: 99.89,
        meteoLatency: 120,
        mapsUptime: 99.95,
        mapsLatency: 72,
      },
      {
        month: "Mar",
        twilioUptime: 99.8,
        twilioLatency: 152,
        meteoUptime: 99.9,
        meteoLatency: 115,
        mapsUptime: 99.96,
        mapsLatency: 68,
      },
      {
        month: "Apr",
        twilioUptime: 99.82,
        twilioLatency: 145,
        meteoUptime: 99.91,
        meteoLatency: 110,
        mapsUptime: 99.96,
        mapsLatency: 65,
      },
      {
        month: "May",
        twilioUptime: 99.84,
        twilioLatency: 138,
        meteoUptime: 99.92,
        meteoLatency: 105,
        mapsUptime: 99.97,
        mapsLatency: 62,
      },
      {
        month: "Jun",
        twilioUptime: 99.85,
        twilioLatency: 132,
        meteoUptime: 99.93,
        meteoLatency: 100,
        mapsUptime: 99.97,
        mapsLatency: 58,
      },
      {
        month: "Jul",
        twilioUptime: 99.87,
        twilioLatency: 125,
        meteoUptime: 99.94,
        meteoLatency: 95,
        mapsUptime: 99.98,
        mapsLatency: 55,
      },
      {
        month: "Aug",
        twilioUptime: 99.88,
        twilioLatency: 118,
        meteoUptime: 99.94,
        meteoLatency: 90,
        mapsUptime: 99.98,
        mapsLatency: 52,
      },
      {
        month: "Sep",
        twilioUptime: 99.89,
        twilioLatency: 112,
        meteoUptime: 99.95,
        meteoLatency: 85,
        mapsUptime: 99.98,
        mapsLatency: 48,
      },
      {
        month: "Oct",
        twilioUptime: 99.9,
        twilioLatency: 105,
        meteoUptime: 99.95,
        meteoLatency: 80,
        mapsUptime: 99.99,
        mapsLatency: 45,
      },
      {
        month: "Nov",
        twilioUptime: 99.91,
        twilioLatency: 98,
        meteoUptime: 99.96,
        meteoLatency: 75,
        mapsUptime: 99.99,
        mapsLatency: 42,
      },
      {
        month: "Dec",
        twilioUptime: 99.92,
        twilioLatency: 92,
        meteoUptime: 99.96,
        meteoLatency: 70,
        mapsUptime: 99.99,
        mapsLatency: 38,
      },
    ],
    2025: [
      {
        month: "Jan",
        twilioUptime: 99.93,
        twilioLatency: 85,
        meteoUptime: 99.97,
        meteoLatency: 65,
        mapsUptime: 99.99,
        mapsLatency: 35,
      },
      {
        month: "Feb",
        twilioUptime: 99.94,
        twilioLatency: 82,
        meteoUptime: 99.97,
        meteoLatency: 62,
        mapsUptime: 99.99,
        mapsLatency: 33,
      },
      {
        month: "Mar",
        twilioUptime: 99.94,
        twilioLatency: 78,
        meteoUptime: 99.97,
        meteoLatency: 58,
        mapsUptime: 99.99,
        mapsLatency: 30,
      },
      {
        month: "Apr",
        twilioUptime: 99.95,
        twilioLatency: 75,
        meteoUptime: 99.98,
        meteoLatency: 55,
        mapsUptime: 99.99,
        mapsLatency: 28,
      },
      {
        month: "May",
        twilioUptime: 99.95,
        twilioLatency: 72,
        meteoUptime: 99.98,
        meteoLatency: 52,
        mapsUptime: 100,
        mapsLatency: 25,
      },
      {
        month: "Jun",
        twilioUptime: 99.96,
        twilioLatency: 68,
        meteoUptime: 99.98,
        meteoLatency: 48,
        mapsUptime: 100,
        mapsLatency: 22,
      },
      {
        month: "Jul",
        twilioUptime: 99.96,
        twilioLatency: 65,
        meteoUptime: 99.98,
        meteoLatency: 45,
        mapsUptime: 100,
        mapsLatency: 20,
      },
      {
        month: "Aug",
        twilioUptime: 99.97,
        twilioLatency: 62,
        meteoUptime: 99.99,
        meteoLatency: 42,
        mapsUptime: 100,
        mapsLatency: 18,
      },
      {
        month: "Sep",
        twilioUptime: 99.97,
        twilioLatency: 58,
        meteoUptime: 99.99,
        meteoLatency: 38,
        mapsUptime: 100,
        mapsLatency: 15,
      },
      {
        month: "Oct",
        twilioUptime: 99.98,
        twilioLatency: 55,
        meteoUptime: 99.99,
        meteoLatency: 35,
        mapsUptime: 100,
        mapsLatency: 12,
      },
      {
        month: "Nov",
        twilioUptime: 99.98,
        twilioLatency: 52,
        meteoUptime: 99.99,
        meteoLatency: 32,
        mapsUptime: 100,
        mapsLatency: 10,
      },
      {
        month: "Dec",
        twilioUptime: 99.98,
        twilioLatency: 48,
        meteoUptime: 99.99,
        meteoLatency: 28,
        mapsUptime: 100,
        mapsLatency: 8,
      },
    ],
  };

  const crashData = allCrashData[crashYear];
  const apiData = allApiData[apiYear];
  const thirdPartyData = allThirdPartyData[thirdPartyYear];

  const COLORS = [
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
    "#10b981",
    "#34d399",
    "#f59e0b",
  ];

  // Calculate current metrics from latest month
  const latestCrash = crashData.byVersion[crashData.byVersion.length - 1];
  const avgCrashRate = (
    Object.values(latestCrash)
      .filter((v) => typeof v === "number")
      .reduce((a, b) => a + b, 0) /
    Object.values(latestCrash).filter((v) => typeof v === "number").length
  ).toFixed(3);
  const latestApi = apiData[apiData.length - 1];
  const latestThirdParty = thirdPartyData[thirdPartyData.length - 1];
  const avgThirdPartyUptime = (
    (latestThirdParty.twilioUptime +
      latestThirdParty.meteoUptime +
      latestThirdParty.mapsUptime) /
    3
  ).toFixed(2);

  // Generate table data for crash/error logs
  const generateErrorData = () => {
    const services = [
      "Events API",
      "User Auth",
      "Notifications",
      "Maps Service",
      "Weather API",
      "Database",
    ];
    const endpoints = [
      "/api/events",
      "/auth/verify",
      "/notifications/send",
      "/maps/geocode",
      "/weather/forecast",
      "/db/query",
    ];
    const errorTypes = [
      "TimeoutError",
      "500 Internal",
      "429 Rate Limit",
      "503 Unavailable",
      "NetworkError",
      "ValidationError",
    ];
    const devices = [
      "iPhone 15 Pro",
      "Pixel 8",
      "Samsung S23",
      "iPhone 14",
      "Pixel 7",
      "iPhone 13",
    ];
    const versions = ["v2.1.2", "v2.1.3", "v2.1.4"];
    const data = [];

    for (let i = 1; i <= 50; i++) {
      const errorType = errorTypes[i % errorTypes.length];
      const severity =
        errorType.includes("Timeout") || errorType.includes("503")
          ? "High"
          : errorType.includes("500")
          ? "Critical"
          : errorType.includes("429")
          ? "Medium"
          : "Low";

      data.push({
        id: String(i),
        service: services[i % services.length],
        endpoint: endpoints[i % endpoints.length],
        errorType,
        severity,
        count: Math.floor(Math.random() * 150) + 10,
        device: devices[i % devices.length],
        version: versions[i % versions.length],
        latency: Math.floor(Math.random() * 500) + 50,
        timestamp: `2024-12-${String(
          Math.floor(Math.random() * 28) + 1
        ).padStart(2, "0")} ${String(Math.floor(Math.random() * 24)).padStart(
          2,
          "0"
        )}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
      });
    }
    return data;
  };

  const errorData = generateErrorData();

  const filteredData = errorData.filter(
    (record) =>
      record.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.errorType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.version.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleDelete = (record) => {
    if (
      confirm(
        `Are you sure you want to delete error log for ${record.service}?`
      )
    ) {
      toast.success(`Error log for ${record.service} deleted successfully`);
      console.log("Deleting:", record);
    }
  };

  const handleSave = () => {
    if (modalMode === "add") {
      toast.success("Error log added successfully");
    } else {
      toast.success("Error log updated successfully");
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div style={{ padding: "32px" }}>
      {/* Top Row Metrics - Reliability KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <MetricCard
          title="Crash Rate"
          value={`${avgCrashRate}%`}
          change={-45.2}
          icon={FaBug}
          subtitle="Avg across all versions"
        />
        <MetricCard
          title="API Latency"
          value={`${latestApi.apiLatency}ms`}
          change={-62.5}
          icon={FaServer}
          subtitle="Average response time"
        />
        <MetricCard
          title="Error Rate"
          value={`${latestApi.apiErrors}%`}
          change={-85.7}
          icon={FaExclamationTriangle}
          subtitle="API + Edge functions"
        />
        <MetricCard
          title="3rd Party Uptime"
          value={`${avgThirdPartyUptime}%`}
          change={0.8}
          icon={FaClock}
          subtitle="Twilio, Maps, Weather"
        />
      </div>

      {/* Charts Row 1: Crash Rate by Version & Device */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Crash Rate by App Version
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={crashYear}
                  onChange={(e) => setCrashYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Crash percentage by version - prioritize fixes for highest rates
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={crashData.byVersion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis
                  stroke="#6b7280"
                  label={{
                    value: "Crash Rate %",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                {Object.keys(crashData.byVersion[0])
                  .filter((k) => k !== "month")
                  .map((key, idx) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={COLORS[idx]}
                      strokeWidth={3}
                      name={key.toUpperCase().replace("V", "v")}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Crash Rate by Device
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={crashYear}
                  onChange={(e) => setCrashYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Device-specific crash rates - identify problem devices
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={crashData.byDevice} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis
                  dataKey="device"
                  type="category"
                  width={120}
                  stroke="#6b7280"
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="crashRate" fill="#ef4444" name="Crash Rate %" />
                <Line
                  dataKey="sessions"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Sessions (k)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: API/Edge Performance & Error Rates */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                API & Edge Function Latency
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={apiYear}
                  onChange={(e) => setApiYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Backend response times - monitor speed and stability
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={apiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis
                  stroke="#6b7280"
                  label={{
                    value: "Latency (ms)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="apiLatency"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="API Latency (ms)"
                />
                <Line
                  type="monotone"
                  dataKey="edgeLatency"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Edge Latency (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Error Rates & Timeouts
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={apiYear}
                  onChange={(e) => setApiYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              API errors, edge errors, and timeout rates
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={apiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis
                  stroke="#6b7280"
                  label={{
                    value: "Error Rate %",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="apiErrors"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  name="API Errors %"
                />
                <Area
                  type="monotone"
                  dataKey="edgeErrors"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  name="Edge Errors %"
                />
                <Area
                  type="monotone"
                  dataKey="timeouts"
                  stackId="1"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  name="Timeouts %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3: Third-Party Service Health */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Third-Party Service Uptime
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={thirdPartyYear}
                  onChange={(e) => setThirdPartyYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Twilio, Open-Meteo, Maps - ensure integrations are reliable
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={thirdPartyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis
                  stroke="#6b7280"
                  domain={[98, 100]}
                  label={{
                    value: "Uptime %",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="twilioUptime"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  name="Twilio %"
                />
                <Line
                  type="monotone"
                  dataKey="meteoUptime"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Open-Meteo %"
                />
                <Line
                  type="monotone"
                  dataKey="mapsUptime"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Maps %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Third-Party Service Latency
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={thirdPartyYear}
                  onChange={(e) => setThirdPartyYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              External service response times - detect slowdowns
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={thirdPartyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis
                  stroke="#6b7280"
                  label={{
                    value: "Latency (ms)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="twilioLatency"
                  fill="#8b5cf6"
                  name="Twilio (ms)"
                />
                <Bar
                  dataKey="meteoLatency"
                  fill="#3b82f6"
                  name="Open-Meteo (ms)"
                />
                <Bar dataKey="mapsLatency" fill="#10b981" name="Maps (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Table - Error Logs */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 4, mb: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <TextField
            fullWidth
            placeholder="Search by service, endpoint, error type, device, or version..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
          <Button
            variant="contained"
            startIcon={<FaPlus size={16} />}
            onClick={handleAdd}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              whiteSpace: "nowrap",
            }}
          >
            Add Log
          </Button>
        </div>
      </Paper>

      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell>Service</TableCell>
              <TableCell>Endpoint</TableCell>
              <TableCell>Error Type</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Device</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Latency</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((record) => (
              <TableRow key={record.id} hover>
                <TableCell>{record.service}</TableCell>
                <TableCell
                  sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
                >
                  {record.endpoint}
                </TableCell>
                <TableCell>
                  <Chip
                    label={record.errorType}
                    size="small"
                    color={
                      record.errorType.includes("500")
                        ? "error"
                        : record.errorType.includes("Timeout") ||
                          record.errorType.includes("503")
                        ? "warning"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={record.severity}
                    size="small"
                    color={
                      record.severity === "Critical"
                        ? "error"
                        : record.severity === "High"
                        ? "warning"
                        : record.severity === "Medium"
                        ? "info"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell>{record.count}</TableCell>
                <TableCell>{record.device}</TableCell>
                <TableCell
                  sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
                >
                  {record.version}
                </TableCell>
                <TableCell>{record.latency}ms</TableCell>
                <TableCell sx={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  {record.timestamp}
                </TableCell>
                <TableCell align="right">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "4px",
                    }}
                  >
                    <IconButton size="small" onClick={() => handleView(record)}>
                      <FaEye size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(record)}
                    >
                      <FaEdit size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(record)}
                    >
                      <FaTrash size={16} />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal for View/Add/Edit */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={modalStyle}>
          <div
            style={{
              padding: "24px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
              {modalMode === "view"
                ? "View Error Log"
                : modalMode === "edit"
                ? "Edit Error Log"
                : "Add Error Log"}
            </p>
            <IconButton onClick={closeModal} size="small">
              <FaTimes size={20} />
            </IconButton>
          </div>

          <div style={{ padding: "24px" }}>
            {modalMode === "view" && selectedRecord ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Service
                  </p>
                  <p style={{ margin: 0 }}>{selectedRecord.service}</p>
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Endpoint
                  </p>
                  <p style={{ margin: 0, fontFamily: "monospace" }}>
                    {selectedRecord.endpoint}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Error Type
                  </p>
                  <p style={{ margin: 0 }}>{selectedRecord.errorType}</p>
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Severity
                  </p>
                  <p style={{ margin: 0 }}>{selectedRecord.severity}</p>
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Count
                  </p>
                  <p style={{ margin: 0 }}>{selectedRecord.count}</p>
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Device
                  </p>
                  <p style={{ margin: 0 }}>{selectedRecord.device}</p>
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Version
                  </p>
                  <p style={{ margin: 0, fontFamily: "monospace" }}>
                    {selectedRecord.version}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Latency
                  </p>
                  <p style={{ margin: 0 }}>{selectedRecord.latency}ms</p>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Timestamp
                  </p>
                  <p style={{ margin: 0 }}>{selectedRecord.timestamp}</p>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                }}
              >
                <TextField
                  fullWidth
                  label="Service"
                  defaultValue={selectedRecord?.service || ""}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Endpoint"
                  defaultValue={selectedRecord?.endpoint || ""}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Error Type"
                  defaultValue={selectedRecord?.errorType || ""}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Severity"
                  defaultValue={selectedRecord?.severity || ""}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Count"
                  type="number"
                  defaultValue={selectedRecord?.count || ""}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Device"
                  defaultValue={selectedRecord?.device || ""}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Version"
                  defaultValue={selectedRecord?.version || ""}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Latency (ms)"
                  type="number"
                  defaultValue={selectedRecord?.latency || ""}
                  size="small"
                />
              </div>
            )}
          </div>

          {modalMode !== "view" && (
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <Button onClick={closeModal} sx={{ textTransform: "none" }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{ textTransform: "none" }}
              >
                {modalMode === "edit" ? "Update" : "Add"}
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
