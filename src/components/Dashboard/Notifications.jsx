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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaTimes,
  FaPaperPlane,
  FaBell,
  FaMobileAlt,
  FaClock,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
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
import PushNotificationChart from "../Chart/NotificationChart/PushNotificationChart";

export default function Notifications() {
  // Year filters for each chart
  const [deliverabilityYear, setDeliverabilityYear] = useState("2025");
  const [digestYear, setDigestYear] = useState("2025");
  const [optInYear, setOptInYear] = useState("2025");
  // const [latencyYear, setLatencyYear] = useState("2025");

  // Deliverability Data - 12 months (Push/SMS/Email: sent, delivered, opened, clicked)
  const allDeliverabilityData = {
    2023: [
      {
        month: "Jan",
        pushSent: 45000,
        pushDelivered: 43200,
        pushOpened: 19440,
        pushClicked: 7776,
        smsSent: 28000,
        smsDelivered: 27440,
        smsOpened: 16464,
        smsClicked: 8232,
        emailSent: 38000,
        emailDelivered: 36100,
        emailOpened: 14440,
        emailClicked: 5776,
      },
      {
        month: "Feb",
        pushSent: 48000,
        pushDelivered: 46080,
        pushOpened: 20736,
        pushClicked: 8294,
        smsSent: 30000,
        smsDelivered: 29400,
        smsOpened: 17640,
        smsClicked: 8820,
        emailSent: 41000,
        emailDelivered: 38950,
        emailOpened: 15580,
        emailClicked: 6232,
      },
      {
        month: "Mar",
        pushSent: 52000,
        pushDelivered: 49920,
        pushOpened: 22464,
        pushClicked: 8986,
        smsSent: 33000,
        smsDelivered: 32340,
        smsOpened: 19404,
        smsClicked: 9702,
        emailSent: 44000,
        emailDelivered: 41800,
        emailOpened: 16720,
        emailClicked: 6688,
      },
      {
        month: "Apr",
        pushSent: 54000,
        pushDelivered: 51840,
        pushOpened: 23328,
        pushClicked: 9331,
        smsSent: 35000,
        smsDelivered: 34300,
        smsOpened: 20580,
        smsClicked: 10290,
        emailSent: 46000,
        emailDelivered: 43700,
        emailOpened: 17480,
        emailClicked: 6992,
      },
      {
        month: "May",
        pushSent: 58000,
        pushDelivered: 55680,
        pushOpened: 25056,
        pushClicked: 10022,
        smsSent: 38000,
        smsDelivered: 37240,
        smsOpened: 22344,
        smsClicked: 11172,
        emailSent: 49000,
        emailDelivered: 46550,
        emailOpened: 18620,
        emailClicked: 7448,
      },
      {
        month: "Jun",
        pushSent: 62000,
        pushDelivered: 59520,
        pushOpened: 26784,
        pushClicked: 10714,
        smsSent: 41000,
        smsDelivered: 40180,
        smsOpened: 24108,
        smsClicked: 12054,
        emailSent: 52000,
        emailDelivered: 49400,
        emailOpened: 19760,
        emailClicked: 7904,
      },
      {
        month: "Jul",
        pushSent: 65000,
        pushDelivered: 62400,
        pushOpened: 28080,
        pushClicked: 11232,
        smsSent: 43000,
        smsDelivered: 42140,
        smsOpened: 25284,
        smsClicked: 12642,
        emailSent: 54000,
        emailDelivered: 51300,
        emailOpened: 20520,
        emailClicked: 8208,
      },
      {
        month: "Aug",
        pushSent: 69000,
        pushDelivered: 66240,
        pushOpened: 29808,
        pushClicked: 11923,
        smsSent: 46000,
        smsDelivered: 45080,
        smsOpened: 27048,
        smsClicked: 13524,
        emailSent: 57000,
        emailDelivered: 54150,
        emailOpened: 21660,
        emailClicked: 8664,
      },
      {
        month: "Sep",
        pushSent: 72000,
        pushDelivered: 69120,
        pushOpened: 31104,
        pushClicked: 12442,
        smsSent: 48000,
        smsDelivered: 47040,
        smsOpened: 28224,
        smsClicked: 14112,
        emailSent: 59000,
        emailDelivered: 56050,
        emailOpened: 22420,
        emailClicked: 8968,
      },
      {
        month: "Oct",
        pushSent: 76000,
        pushDelivered: 72960,
        pushOpened: 32832,
        pushClicked: 13133,
        smsSent: 51000,
        smsDelivered: 49980,
        smsOpened: 29988,
        smsClicked: 14994,
        emailSent: 62000,
        emailDelivered: 58900,
        emailOpened: 23560,
        emailClicked: 9424,
      },
      {
        month: "Nov",
        pushSent: 79000,
        pushDelivered: 75840,
        pushOpened: 34128,
        pushClicked: 13651,
        smsSent: 53000,
        smsDelivered: 51940,
        smsOpened: 31164,
        smsClicked: 15582,
        emailSent: 64000,
        emailDelivered: 60800,
        emailOpened: 24320,
        emailClicked: 9728,
      },
      {
        month: "Dec",
        pushSent: 83000,
        pushDelivered: 79680,
        pushOpened: 35856,
        pushClicked: 14342,
        smsSent: 56000,
        smsDelivered: 54880,
        smsOpened: 32928,
        smsClicked: 16464,
        emailSent: 67000,
        emailDelivered: 63650,
        emailOpened: 25460,
        emailClicked: 10184,
      },
    ],
    2024: [
      {
        month: "Jan",
        pushSent: 86000,
        pushDelivered: 82560,
        pushOpened: 37152,
        pushClicked: 14861,
        smsSent: 58000,
        smsDelivered: 56840,
        smsOpened: 34104,
        smsClicked: 17052,
        emailSent: 69000,
        emailDelivered: 65550,
        emailOpened: 26220,
        emailClicked: 10488,
      },
      {
        month: "Feb",
        pushSent: 90000,
        pushDelivered: 86400,
        pushOpened: 38880,
        pushClicked: 15552,
        smsSent: 61000,
        smsDelivered: 59780,
        smsOpened: 35868,
        smsClicked: 17934,
        emailSent: 72000,
        emailDelivered: 68400,
        emailOpened: 27360,
        emailClicked: 10944,
      },
      {
        month: "Mar",
        pushSent: 95000,
        pushDelivered: 91200,
        pushOpened: 41040,
        pushClicked: 16416,
        smsSent: 64000,
        smsDelivered: 62720,
        smsOpened: 37632,
        smsClicked: 18816,
        emailSent: 75000,
        emailDelivered: 71250,
        emailOpened: 28500,
        emailClicked: 11400,
      },
      {
        month: "Apr",
        pushSent: 99000,
        pushDelivered: 95040,
        pushOpened: 42768,
        pushClicked: 17107,
        smsSent: 67000,
        smsDelivered: 65660,
        smsOpened: 39396,
        smsClicked: 19698,
        emailSent: 78000,
        emailDelivered: 74100,
        emailOpened: 29640,
        emailClicked: 11856,
      },
      {
        month: "May",
        pushSent: 104000,
        pushDelivered: 99840,
        pushOpened: 44928,
        pushClicked: 17971,
        smsSent: 71000,
        smsDelivered: 69580,
        smsOpened: 41748,
        smsClicked: 20874,
        emailSent: 82000,
        emailDelivered: 77900,
        emailOpened: 31160,
        emailClicked: 12464,
      },
      {
        month: "Jun",
        pushSent: 109000,
        pushDelivered: 104640,
        pushOpened: 47088,
        pushClicked: 18835,
        smsSent: 75000,
        smsDelivered: 73500,
        smsOpened: 44100,
        smsClicked: 22050,
        emailSent: 86000,
        emailDelivered: 81700,
        emailOpened: 32680,
        emailClicked: 13072,
      },
      {
        month: "Jul",
        pushSent: 114000,
        pushDelivered: 109440,
        pushOpened: 49248,
        pushClicked: 19699,
        smsSent: 78000,
        smsDelivered: 76440,
        smsOpened: 45864,
        smsClicked: 22932,
        emailSent: 89000,
        emailDelivered: 84550,
        emailOpened: 33820,
        emailClicked: 13528,
      },
      {
        month: "Aug",
        pushSent: 120000,
        pushDelivered: 115200,
        pushOpened: 51840,
        pushClicked: 20736,
        smsSent: 82000,
        smsDelivered: 80360,
        smsOpened: 48216,
        smsClicked: 24108,
        emailSent: 93000,
        emailDelivered: 88350,
        emailOpened: 35340,
        emailClicked: 14136,
      },
      {
        month: "Sep",
        pushSent: 125000,
        pushDelivered: 120000,
        pushOpened: 54000,
        pushClicked: 21600,
        smsSent: 86000,
        smsDelivered: 84280,
        smsOpened: 50568,
        smsClicked: 25284,
        emailSent: 97000,
        emailDelivered: 92150,
        emailOpened: 36860,
        emailClicked: 14744,
      },
      {
        month: "Oct",
        pushSent: 131000,
        pushDelivered: 125760,
        pushOpened: 56592,
        pushClicked: 22637,
        smsSent: 90000,
        smsDelivered: 88200,
        smsOpened: 52920,
        smsClicked: 26460,
        emailSent: 101000,
        emailDelivered: 95950,
        emailOpened: 38380,
        emailClicked: 15352,
      },
      {
        month: "Nov",
        pushSent: 137000,
        pushDelivered: 131520,
        pushOpened: 59184,
        pushClicked: 23674,
        smsSent: 94000,
        smsDelivered: 92120,
        smsOpened: 55272,
        smsClicked: 27636,
        emailSent: 105000,
        emailDelivered: 99750,
        emailOpened: 39900,
        emailClicked: 15960,
      },
      {
        month: "Dec",
        pushSent: 143000,
        pushDelivered: 137280,
        pushOpened: 61776,
        pushClicked: 24710,
        smsSent: 98000,
        smsDelivered: 96040,
        smsOpened: 57624,
        smsClicked: 28812,
        emailSent: 109000,
        emailDelivered: 103550,
        emailOpened: 41420,
        emailClicked: 16568,
      },
    ],
    2025: [
      {
        month: "Jan",
        pushSent: 150000,
        pushDelivered: 144000,
        pushOpened: 64800,
        pushClicked: 25920,
        smsSent: 103000,
        smsDelivered: 100940,
        smsOpened: 60564,
        smsClicked: 30282,
        emailSent: 114000,
        emailDelivered: 108300,
        emailOpened: 43320,
        emailClicked: 17328,
      },
      {
        month: "Feb",
        pushSent: 157000,
        pushDelivered: 150720,
        pushOpened: 67824,
        pushClicked: 27130,
        smsSent: 108000,
        smsDelivered: 105840,
        smsOpened: 63504,
        smsClicked: 31752,
        emailSent: 119000,
        emailDelivered: 113050,
        emailOpened: 45220,
        emailClicked: 18088,
      },
      {
        month: "Mar",
        pushSent: 165000,
        pushDelivered: 158400,
        pushOpened: 71280,
        pushClicked: 28512,
        smsSent: 114000,
        smsDelivered: 111720,
        smsOpened: 67032,
        smsClicked: 33516,
        emailSent: 125000,
        emailDelivered: 118750,
        emailOpened: 47500,
        emailClicked: 19000,
      },
      {
        month: "Apr",
        pushSent: 172000,
        pushDelivered: 165120,
        pushOpened: 74304,
        pushClicked: 29722,
        smsSent: 119000,
        smsDelivered: 116620,
        smsOpened: 69972,
        smsClicked: 34986,
        emailSent: 130000,
        emailDelivered: 123500,
        emailOpened: 49400,
        emailClicked: 19760,
      },
      {
        month: "May",
        pushSent: 181000,
        pushDelivered: 173760,
        pushOpened: 78192,
        pushClicked: 31277,
        smsSent: 125000,
        smsDelivered: 122500,
        smsOpened: 73500,
        smsClicked: 36750,
        emailSent: 136000,
        emailDelivered: 129200,
        emailOpened: 51680,
        emailClicked: 20672,
      },
      {
        month: "Jun",
        pushSent: 189000,
        pushDelivered: 181440,
        pushOpened: 81648,
        pushClicked: 32659,
        smsSent: 131000,
        smsDelivered: 128380,
        smsOpened: 77028,
        smsClicked: 38514,
        emailSent: 142000,
        emailDelivered: 134900,
        emailOpened: 53960,
        emailClicked: 21584,
      },
      {
        month: "Jul",
        pushSent: 198000,
        pushDelivered: 190080,
        pushOpened: 85536,
        pushClicked: 34214,
        smsSent: 137000,
        smsDelivered: 134260,
        smsOpened: 80556,
        smsClicked: 40278,
        emailSent: 148000,
        emailDelivered: 140600,
        emailOpened: 56240,
        emailClicked: 22496,
      },
      {
        month: "Aug",
        pushSent: 208000,
        pushDelivered: 199680,
        pushOpened: 89856,
        pushClicked: 35942,
        smsSent: 144000,
        smsDelivered: 141120,
        smsOpened: 84672,
        smsClicked: 42336,
        emailSent: 155000,
        emailDelivered: 147250,
        emailOpened: 58900,
        emailClicked: 23560,
      },
      {
        month: "Sep",
        pushSent: 217000,
        pushDelivered: 208320,
        pushOpened: 93744,
        pushClicked: 37498,
        smsSent: 151000,
        smsDelivered: 147980,
        smsOpened: 88788,
        smsClicked: 44394,
        emailSent: 162000,
        emailDelivered: 153900,
        emailOpened: 61560,
        emailClicked: 24624,
      },
      {
        month: "Oct",
        pushSent: 228000,
        pushDelivered: 218880,
        pushOpened: 98496,
        pushClicked: 39398,
        smsSent: 159000,
        smsDelivered: 155820,
        smsOpened: 93492,
        smsClicked: 46746,
        emailSent: 170000,
        emailDelivered: 161500,
        emailOpened: 64600,
        emailClicked: 25840,
      },
      {
        month: "Nov",
        pushSent: 238000,
        pushDelivered: 228480,
        pushOpened: 102816,
        pushClicked: 41126,
        smsSent: 166000,
        smsDelivered: 162680,
        smsOpened: 97608,
        smsClicked: 48804,
        emailSent: 177000,
        emailDelivered: 168150,
        emailOpened: 67260,
        emailClicked: 26904,
      },
      {
        month: "Dec",
        pushSent: 250000,
        pushDelivered: 240000,
        pushOpened: 108000,
        pushClicked: 43200,
        smsSent: 175000,
        smsDelivered: 171500,
        smsOpened: 102900,
        smsClicked: 51450,
        emailSent: 186000,
        emailDelivered: 176700,
        emailOpened: 70680,
        emailClicked: 28272,
      },
    ],
  };

  // Daily Digest Success Rate by Channel - 12 months
  const allDigestData = {
    2023: [
      {
        month: "Jan",
        twilioSent: 8500,
        twilioDelivered: 8245,
        twilioRate: 97.0,
        appleSent: 7200,
        appleDelivered: 7056,
        appleRate: 98.0,
        firebaseSent: 6100,
        firebaseDelivered: 5734,
        firebaseRate: 94.0,
      },
      {
        month: "Feb",
        twilioSent: 9000,
        twilioDelivered: 8730,
        twilioRate: 97.0,
        appleSent: 7600,
        appleDelivered: 7448,
        appleRate: 98.0,
        firebaseSent: 6500,
        firebaseDelivered: 6110,
        firebaseRate: 94.0,
      },
      {
        month: "Mar",
        twilioSent: 9500,
        twilioDelivered: 9215,
        twilioRate: 97.0,
        appleSent: 8100,
        appleDelivered: 7938,
        appleRate: 98.0,
        firebaseSent: 7000,
        firebaseDelivered: 6580,
        firebaseRate: 94.0,
      },
      {
        month: "Apr",
        twilioSent: 9800,
        twilioDelivered: 9506,
        twilioRate: 97.0,
        appleSent: 8400,
        appleDelivered: 8232,
        appleRate: 98.0,
        firebaseSent: 7300,
        firebaseDelivered: 6862,
        firebaseRate: 94.0,
      },
      {
        month: "May",
        twilioSent: 10300,
        twilioDelivered: 9991,
        twilioRate: 97.0,
        appleSent: 8900,
        appleDelivered: 8722,
        appleRate: 98.0,
        firebaseSent: 7800,
        firebaseDelivered: 7332,
        firebaseRate: 94.0,
      },
      {
        month: "Jun",
        twilioSent: 10800,
        twilioDelivered: 10476,
        twilioRate: 97.0,
        appleSent: 9400,
        appleDelivered: 9212,
        appleRate: 98.0,
        firebaseSent: 8200,
        firebaseDelivered: 7708,
        firebaseRate: 94.0,
      },
      {
        month: "Jul",
        twilioSent: 11200,
        twilioDelivered: 10864,
        twilioRate: 97.0,
        appleSent: 9800,
        appleDelivered: 9604,
        appleRate: 98.0,
        firebaseSent: 8600,
        firebaseDelivered: 8084,
        firebaseRate: 94.0,
      },
      {
        month: "Aug",
        twilioSent: 11700,
        twilioDelivered: 11349,
        twilioRate: 97.0,
        appleSent: 10300,
        appleDelivered: 10094,
        appleRate: 98.0,
        firebaseSent: 9100,
        firebaseDelivered: 8554,
        firebaseRate: 94.0,
      },
      {
        month: "Sep",
        twilioSent: 12100,
        twilioDelivered: 11737,
        twilioRate: 97.0,
        appleSent: 10700,
        appleDelivered: 10486,
        appleRate: 98.0,
        firebaseSent: 9500,
        firebaseDelivered: 8930,
        firebaseRate: 94.0,
      },
      {
        month: "Oct",
        twilioSent: 12600,
        twilioDelivered: 12222,
        twilioRate: 97.0,
        appleSent: 11200,
        appleDelivered: 10976,
        appleRate: 98.0,
        firebaseSent: 10000,
        firebaseDelivered: 9400,
        firebaseRate: 94.0,
      },
      {
        month: "Nov",
        twilioSent: 13000,
        twilioDelivered: 12610,
        twilioRate: 97.0,
        appleSent: 11600,
        appleDelivered: 11368,
        appleRate: 98.0,
        firebaseSent: 10400,
        firebaseDelivered: 9776,
        firebaseRate: 94.0,
      },
      {
        month: "Dec",
        twilioSent: 13500,
        twilioDelivered: 13095,
        twilioRate: 97.0,
        appleSent: 12100,
        appleDelivered: 11858,
        appleRate: 98.0,
        firebaseSent: 10900,
        firebaseDelivered: 10246,
        firebaseRate: 94.0,
      },
    ],
    2024: [
      {
        month: "Jan",
        twilioSent: 14000,
        twilioDelivered: 13580,
        twilioRate: 97.0,
        appleSent: 12600,
        appleDelivered: 12348,
        appleRate: 98.0,
        firebaseSent: 11400,
        firebaseDelivered: 10716,
        firebaseRate: 94.0,
      },
      {
        month: "Feb",
        twilioSent: 14600,
        twilioDelivered: 14162,
        twilioRate: 97.0,
        appleSent: 13200,
        appleDelivered: 12936,
        appleRate: 98.0,
        firebaseSent: 12000,
        firebaseDelivered: 11280,
        firebaseRate: 94.0,
      },
      {
        month: "Mar",
        twilioSent: 15300,
        twilioDelivered: 14841,
        twilioRate: 97.0,
        appleSent: 13900,
        appleDelivered: 13622,
        appleRate: 98.0,
        firebaseSent: 12700,
        firebaseDelivered: 11938,
        firebaseRate: 94.0,
      },
      {
        month: "Apr",
        twilioSent: 15900,
        twilioDelivered: 15423,
        twilioRate: 97.0,
        appleSent: 14500,
        appleDelivered: 14210,
        appleRate: 98.0,
        firebaseSent: 13300,
        firebaseDelivered: 12502,
        firebaseRate: 94.0,
      },
      {
        month: "May",
        twilioSent: 16700,
        twilioDelivered: 16199,
        twilioRate: 97.0,
        appleSent: 15200,
        appleDelivered: 14896,
        appleRate: 98.0,
        firebaseSent: 14000,
        firebaseDelivered: 13160,
        firebaseRate: 94.0,
      },
      {
        month: "Jun",
        twilioSent: 17400,
        twilioDelivered: 16878,
        twilioRate: 97.0,
        appleSent: 15900,
        appleDelivered: 15582,
        appleRate: 98.0,
        firebaseSent: 14700,
        firebaseDelivered: 13818,
        firebaseRate: 94.0,
      },
      {
        month: "Jul",
        twilioSent: 18200,
        twilioDelivered: 17654,
        twilioRate: 97.0,
        appleSent: 16700,
        appleDelivered: 16366,
        appleRate: 98.0,
        firebaseSent: 15500,
        firebaseDelivered: 14570,
        firebaseRate: 94.0,
      },
      {
        month: "Aug",
        twilioSent: 19100,
        twilioDelivered: 18527,
        twilioRate: 97.0,
        appleSent: 17500,
        appleDelivered: 17150,
        appleRate: 98.0,
        firebaseSent: 16300,
        firebaseDelivered: 15322,
        firebaseRate: 94.0,
      },
      {
        month: "Sep",
        twilioSent: 19900,
        twilioDelivered: 19303,
        twilioRate: 97.0,
        appleSent: 18300,
        appleDelivered: 17934,
        appleRate: 98.0,
        firebaseSent: 17100,
        firebaseDelivered: 16074,
        firebaseRate: 94.0,
      },
      {
        month: "Oct",
        twilioSent: 20800,
        twilioDelivered: 20176,
        twilioRate: 97.0,
        appleSent: 19200,
        appleDelivered: 18816,
        appleRate: 98.0,
        firebaseSent: 18000,
        firebaseDelivered: 16920,
        firebaseRate: 94.0,
      },
      {
        month: "Nov",
        twilioSent: 21700,
        twilioDelivered: 21049,
        twilioRate: 97.0,
        appleSent: 20100,
        appleDelivered: 19698,
        appleRate: 98.0,
        firebaseSent: 18900,
        firebaseDelivered: 17766,
        firebaseRate: 94.0,
      },
      {
        month: "Dec",
        twilioSent: 22700,
        twilioDelivered: 22019,
        twilioRate: 97.0,
        appleSent: 21100,
        appleDelivered: 20678,
        appleRate: 98.0,
        firebaseSent: 19900,
        firebaseDelivered: 18706,
        firebaseRate: 94.0,
      },
    ],
    2025: [
      {
        month: "Jan",
        twilioSent: 23700,
        twilioDelivered: 22989,
        twilioRate: 97.0,
        appleSent: 22100,
        appleDelivered: 21658,
        appleRate: 98.0,
        firebaseSent: 20900,
        firebaseDelivered: 19646,
        firebaseRate: 94.0,
      },
      {
        month: "Feb",
        twilioSent: 24800,
        twilioDelivered: 24056,
        twilioRate: 97.0,
        appleSent: 23200,
        appleDelivered: 22736,
        appleRate: 98.0,
        firebaseSent: 22000,
        firebaseDelivered: 20680,
        firebaseRate: 94.0,
      },
      {
        month: "Mar",
        twilioSent: 26000,
        twilioDelivered: 25220,
        twilioRate: 97.0,
        appleSent: 24400,
        appleDelivered: 23912,
        appleRate: 98.0,
        firebaseSent: 23200,
        firebaseDelivered: 21808,
        firebaseRate: 94.0,
      },
      {
        month: "Apr",
        twilioSent: 27100,
        twilioDelivered: 26287,
        twilioRate: 97.0,
        appleSent: 25500,
        appleDelivered: 24990,
        appleRate: 98.0,
        firebaseSent: 24300,
        firebaseDelivered: 22842,
        firebaseRate: 94.0,
      },
      {
        month: "May",
        twilioSent: 28400,
        twilioDelivered: 27548,
        twilioRate: 97.0,
        appleSent: 26700,
        appleDelivered: 26166,
        appleRate: 98.0,
        firebaseSent: 25500,
        firebaseDelivered: 23970,
        firebaseRate: 94.0,
      },
      {
        month: "Jun",
        twilioSent: 29700,
        twilioDelivered: 28809,
        twilioRate: 97.0,
        appleSent: 27900,
        appleDelivered: 27342,
        appleRate: 98.0,
        firebaseSent: 26700,
        firebaseDelivered: 25098,
        firebaseRate: 94.0,
      },
      {
        month: "Jul",
        twilioSent: 31100,
        twilioDelivered: 30167,
        twilioRate: 97.0,
        appleSent: 29300,
        appleDelivered: 28714,
        appleRate: 98.0,
        firebaseSent: 28000,
        firebaseDelivered: 26320,
        firebaseRate: 94.0,
      },
      {
        month: "Aug",
        twilioSent: 32600,
        twilioDelivered: 31622,
        twilioRate: 97.0,
        appleSent: 30700,
        appleDelivered: 30086,
        appleRate: 98.0,
        firebaseSent: 29400,
        firebaseDelivered: 27636,
        firebaseRate: 94.0,
      },
      {
        month: "Sep",
        twilioSent: 34100,
        twilioDelivered: 33077,
        twilioRate: 97.0,
        appleSent: 32200,
        appleDelivered: 31556,
        appleRate: 98.0,
        firebaseSent: 30900,
        firebaseDelivered: 29046,
        firebaseRate: 94.0,
      },
      {
        month: "Oct",
        twilioSent: 35700,
        twilioDelivered: 34629,
        twilioRate: 97.0,
        appleSent: 33800,
        appleDelivered: 33124,
        appleRate: 98.0,
        firebaseSent: 32500,
        firebaseDelivered: 30550,
        firebaseRate: 94.0,
      },
      {
        month: "Nov",
        twilioSent: 37300,
        twilioDelivered: 36181,
        twilioRate: 97.0,
        appleSent: 35400,
        appleDelivered: 34692,
        appleRate: 98.0,
        firebaseSent: 34100,
        firebaseDelivered: 32054,
        firebaseRate: 94.0,
      },
      {
        month: "Dec",
        twilioSent: 39100,
        twilioDelivered: 37927,
        twilioRate: 97.0,
        appleSent: 37200,
        appleDelivered: 36456,
        appleRate: 98.0,
        firebaseSent: 35900,
        firebaseDelivered: 33746,
        firebaseRate: 94.0,
      },
    ],
  };

  // Opt-in Rates by Platform and Country - 12 months
  const allOptInData = {
    2023: {
      byPlatform: [
        {
          month: "Jan",
          iosPush: 68,
          androidPush: 52,
          iosSMS: 45,
          androidSMS: 38,
        },
        {
          month: "Feb",
          iosPush: 69,
          androidPush: 53,
          iosSMS: 46,
          androidSMS: 39,
        },
        {
          month: "Mar",
          iosPush: 70,
          androidPush: 54,
          iosSMS: 47,
          androidSMS: 40,
        },
        {
          month: "Apr",
          iosPush: 71,
          androidPush: 55,
          iosSMS: 48,
          androidSMS: 41,
        },
        {
          month: "May",
          iosPush: 72,
          androidPush: 56,
          iosSMS: 49,
          androidSMS: 42,
        },
        {
          month: "Jun",
          iosPush: 73,
          androidPush: 57,
          iosSMS: 50,
          androidSMS: 43,
        },
        {
          month: "Jul",
          iosPush: 74,
          androidPush: 58,
          iosSMS: 51,
          androidSMS: 44,
        },
        {
          month: "Aug",
          iosPush: 75,
          androidPush: 59,
          iosSMS: 52,
          androidSMS: 45,
        },
        {
          month: "Sep",
          iosPush: 76,
          androidPush: 60,
          iosSMS: 53,
          androidSMS: 46,
        },
        {
          month: "Oct",
          iosPush: 77,
          androidPush: 61,
          iosSMS: 54,
          androidSMS: 47,
        },
        {
          month: "Nov",
          iosPush: 78,
          androidPush: 62,
          iosSMS: 55,
          androidSMS: 48,
        },
        {
          month: "Dec",
          iosPush: 79,
          androidPush: 63,
          iosSMS: 56,
          androidSMS: 49,
        },
      ],
      byCountry: [
        { country: "USA", pushRate: 72, smsRate: 58 },
        { country: "Canada", pushRate: 68, smsRate: 54 },
        { country: "UK", pushRate: 65, smsRate: 51 },
        { country: "Australia", pushRate: 70, smsRate: 56 },
        { country: "Germany", pushRate: 62, smsRate: 48 },
        { country: "Others", pushRate: 58, smsRate: 45 },
      ],
    },
    2024: {
      byPlatform: [
        {
          month: "Jan",
          iosPush: 80,
          androidPush: 64,
          iosSMS: 57,
          androidSMS: 50,
        },
        {
          month: "Feb",
          iosPush: 81,
          androidPush: 65,
          iosSMS: 58,
          androidSMS: 51,
        },
        {
          month: "Mar",
          iosPush: 82,
          androidPush: 66,
          iosSMS: 59,
          androidSMS: 52,
        },
        {
          month: "Apr",
          iosPush: 83,
          androidPush: 67,
          iosSMS: 60,
          androidSMS: 53,
        },
        {
          month: "May",
          iosPush: 84,
          androidPush: 68,
          iosSMS: 61,
          androidSMS: 54,
        },
        {
          month: "Jun",
          iosPush: 85,
          androidPush: 69,
          iosSMS: 62,
          androidSMS: 55,
        },
        {
          month: "Jul",
          iosPush: 86,
          androidPush: 70,
          iosSMS: 63,
          androidSMS: 56,
        },
        {
          month: "Aug",
          iosPush: 87,
          androidPush: 71,
          iosSMS: 64,
          androidSMS: 57,
        },
        {
          month: "Sep",
          iosPush: 88,
          androidPush: 72,
          iosSMS: 65,
          androidSMS: 58,
        },
        {
          month: "Oct",
          iosPush: 89,
          androidPush: 73,
          iosSMS: 66,
          androidSMS: 59,
        },
        {
          month: "Nov",
          iosPush: 90,
          androidPush: 74,
          iosSMS: 67,
          androidSMS: 60,
        },
        {
          month: "Dec",
          iosPush: 91,
          androidPush: 75,
          iosSMS: 68,
          androidSMS: 61,
        },
      ],
      byCountry: [
        { country: "USA", pushRate: 82, smsRate: 68 },
        { country: "Canada", pushRate: 78, smsRate: 64 },
        { country: "UK", pushRate: 75, smsRate: 61 },
        { country: "Australia", pushRate: 80, smsRate: 66 },
        { country: "Germany", pushRate: 72, smsRate: 58 },
        { country: "Others", pushRate: 68, smsRate: 55 },
      ],
    },
    2025: {
      byPlatform: [
        {
          month: "Jan",
          iosPush: 92,
          androidPush: 76,
          iosSMS: 69,
          androidSMS: 62,
        },
        {
          month: "Feb",
          iosPush: 93,
          androidPush: 77,
          iosSMS: 70,
          androidSMS: 63,
        },
        {
          month: "Mar",
          iosPush: 94,
          androidPush: 78,
          iosSMS: 71,
          androidSMS: 64,
        },
        {
          month: "Apr",
          iosPush: 95,
          androidPush: 79,
          iosSMS: 72,
          androidSMS: 65,
        },
        {
          month: "May",
          iosPush: 96,
          androidPush: 80,
          iosSMS: 73,
          androidSMS: 66,
        },
        {
          month: "Jun",
          iosPush: 96,
          androidPush: 81,
          iosSMS: 74,
          androidSMS: 67,
        },
        {
          month: "Jul",
          iosPush: 97,
          androidPush: 82,
          iosSMS: 75,
          androidSMS: 68,
        },
        {
          month: "Aug",
          iosPush: 97,
          androidPush: 83,
          iosSMS: 76,
          androidSMS: 69,
        },
        {
          month: "Sep",
          iosPush: 98,
          androidPush: 84,
          iosSMS: 77,
          androidSMS: 70,
        },
        {
          month: "Oct",
          iosPush: 98,
          androidPush: 85,
          iosSMS: 78,
          androidSMS: 71,
        },
        {
          month: "Nov",
          iosPush: 99,
          androidPush: 86,
          iosSMS: 79,
          androidSMS: 72,
        },
        {
          month: "Dec",
          iosPush: 99,
          androidPush: 87,
          iosSMS: 80,
          androidSMS: 73,
        },
      ],
      byCountry: [
        { country: "USA", pushRate: 92, smsRate: 78 },
        { country: "Canada", pushRate: 88, smsRate: 74 },
        { country: "UK", pushRate: 85, smsRate: 71 },
        { country: "Australia", pushRate: 90, smsRate: 76 },
        { country: "Germany", pushRate: 82, smsRate: 68 },
        { country: "Others", pushRate: 78, smsRate: 65 },
      ],
    },
  };

  // Latency Data - 12 months (trigger to notification, notification to action)
  // const allLatencyData = {
  //   2023: [
  //     { month: "Jan", triggerToNotif: 2.8, notifToAction: 45 },
  //     { month: "Feb", triggerToNotif: 2.7, notifToAction: 43 },
  //     { month: "Mar", triggerToNotif: 2.6, notifToAction: 41 },
  //     { month: "Apr", triggerToNotif: 2.5, notifToAction: 40 },
  //     { month: "May", triggerToNotif: 2.4, notifToAction: 38 },
  //     { month: "Jun", triggerToNotif: 2.3, notifToAction: 36 },
  //     { month: "Jul", triggerToNotif: 2.2, notifToAction: 35 },
  //     { month: "Aug", triggerToNotif: 2.1, notifToAction: 33 },
  //     { month: "Sep", triggerToNotif: 2.0, notifToAction: 32 },
  //     { month: "Oct", triggerToNotif: 1.9, notifToAction: 30 },
  //     { month: "Nov", triggerToNotif: 1.8, notifToAction: 29 },
  //     { month: "Dec", triggerToNotif: 1.7, notifToAction: 27 },
  //   ],
  //   2024: [
  //     { month: "Jan", triggerToNotif: 1.6, notifToAction: 26 },
  //     { month: "Feb", triggerToNotif: 1.5, notifToAction: 25 },
  //     { month: "Mar", triggerToNotif: 1.4, notifToAction: 24 },
  //     { month: "Apr", triggerToNotif: 1.3, notifToAction: 23 },
  //     { month: "May", triggerToNotif: 1.2, notifToAction: 22 },
  //     { month: "Jun", triggerToNotif: 1.1, notifToAction: 21 },
  //     { month: "Jul", triggerToNotif: 1.0, notifToAction: 20 },
  //     { month: "Aug", triggerToNotif: 0.95, notifToAction: 19 },
  //     { month: "Sep", triggerToNotif: 0.9, notifToAction: 18 },
  //     { month: "Oct", triggerToNotif: 0.85, notifToAction: 17 },
  //     { month: "Nov", triggerToNotif: 0.8, notifToAction: 16 },
  //     { month: "Dec", triggerToNotif: 0.75, notifToAction: 15 },
  //   ],
  //   2025: [
  //     { month: "Jan", triggerToNotif: 0.7, notifToAction: 14 },
  //     { month: "Feb", triggerToNotif: 0.68, notifToAction: 13.5 },
  //     { month: "Mar", triggerToNotif: 0.65, notifToAction: 13 },
  //     { month: "Apr", triggerToNotif: 0.63, notifToAction: 12.5 },
  //     { month: "May", triggerToNotif: 0.6, notifToAction: 12 },
  //     { month: "Jun", triggerToNotif: 0.58, notifToAction: 11.5 },
  //     { month: "Jul", triggerToNotif: 0.55, notifToAction: 11 },
  //     { month: "Aug", triggerToNotif: 0.53, notifToAction: 10.5 },
  //     { month: "Sep", triggerToNotif: 0.5, notifToAction: 10 },
  //     { month: "Oct", triggerToNotif: 0.48, notifToAction: 9.5 },
  //     { month: "Nov", triggerToNotif: 0.45, notifToAction: 9 },
  //     { month: "Dec", triggerToNotif: 0.43, notifToAction: 8.5 },
  //   ],
  // };

  const deliverabilityData = allDeliverabilityData[deliverabilityYear];
  const digestData = allDigestData[digestYear];
  const optInData = allOptInData[optInYear];
  // const latencyData = allLatencyData[latencyYear];

  const COLORS = [
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
    "#10b981",
    "#34d399",
    "#6ee7b7",
  ];

  // Generate table data for pagination
  // const generateNotificationData = () => {
  //   const names = [
  //     "John Doe",
  //     "Jane Smith",
  //     "Bob Johnson",
  //     "Alice Williams",
  //     "Charlie Brown",
  //     "Diana Prince",
  //     "Edward Norton",
  //     "Fiona Apple",
  //     "George Miller",
  //     "Hannah Montana",
  //   ];
  //   const channels = ["Twilio SMS", "Apple Push", "Firebase", "Email"];
  //   const types = [
  //     "Event Reminder",
  //     "Daily Digest",
  //     "Invite",
  //     "Leave-By Alert",
  //   ];
  //   const statuses = ["Delivered", "Opened", "Clicked", "Failed"];
  //   const data = [];

  //   for (let i = 1; i <= 40; i++) {
  //     const channel = channels[i % channels.length];
  //     const status = statuses[i % statuses.length];
  //     data.push({
  //       id: String(i),
  //       userId: `user_${100 + i}`,
  //       userName: names[i % names.length],
  //       channel,
  //       type: types[i % types.length],
  //       status,
  //       latency: (Math.random() * 2 + 0.3).toFixed(2),
  //       sentAt: `2024-12-${String(Math.floor(Math.random() * 28) + 1).padStart(
  //         2,
  //         "0"
  //       )} ${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(
  //         Math.floor(Math.random() * 60)
  //       ).padStart(2, "0")}`,
  //       actionAt:
  //         status === "Clicked" || status === "Opened"
  //           ? `${Math.floor(Math.random() * 60)} sec`
  //           : "-",
  //     });
  //   }
  //   return data;
  // };

  // const notificationData = generateNotificationData();

  // const paginatedData = notificationData.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleView = (record) => {
  //   setSelectedRecord(record);
  //   setModalMode("view");
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedRecord(null);
  // };

  return (
    <div style={{ padding: "32px" }}>
      {/* Charts Row 1: Deliverability Funnel & Daily Digest Success */}
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
                Push Notification Deliverability
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={deliverabilityYear}
                  onChange={(e) => setDeliverabilityYear(e.target.value)}
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
              Sent → Delivered → Opened → Clicked
            </p>
            <PushNotificationChart deliverabilityData={deliverabilityData} />
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
                Daily Digest Success by Channel
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={digestYear}
                  onChange={(e) => setDigestYear(e.target.value)}
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
              Twilio, Apple Push, Firebase delivery rates
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={digestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="twilioDelivered"
                  fill="#3b82f6"
                  name="Twilio Delivered"
                />
                <Bar
                  yAxisId="left"
                  dataKey="appleDelivered"
                  fill="#10b981"
                  name="Apple Delivered"
                />
                <Bar
                  yAxisId="left"
                  dataKey="firebaseDelivered"
                  fill="#f59e0b"
                  name="Firebase Delivered"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="twilioRate"
                  stroke="#1e40af"
                  strokeWidth={2}
                  name="Twilio %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="appleRate"
                  stroke="#065f46"
                  strokeWidth={2}
                  name="Apple %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="firebaseRate"
                  stroke="#92400e"
                  strokeWidth={2}
                  name="Firebase %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Opt-in Rates by Platform & Country */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        {/* <Card
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
                Opt-in Rates by Platform
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={optInYear}
                  onChange={(e) => setOptInYear(e.target.value)}
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
              iOS vs Android push and SMS permissions
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={optInData.byPlatform}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
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
                  dataKey="iosPush"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="iOS Push %"
                />
                <Line
                  type="monotone"
                  dataKey="androidPush"
                  stroke="#60a5fa"
                  strokeWidth={3}
                  name="Android Push %"
                />
                <Line
                  type="monotone"
                  dataKey="iosSMS"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="iOS SMS %"
                />
                <Line
                  type="monotone"
                  dataKey="androidSMS"
                  stroke="#34d399"
                  strokeWidth={3}
                  name="Android SMS %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}

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
                Opt-in Rates by Country
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={optInYear}
                  onChange={(e) => setOptInYear(e.target.value)}
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
              Geographic permission patterns
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={optInData.byCountry} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis
                  dataKey="country"
                  type="category"
                  width={100}
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
                <Bar dataKey="pushRate" fill="#3b82f6" name="Push Opt-in %" />
                <Bar dataKey="smsRate" fill="#10b981" name="SMS Opt-in %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3: Latency Metrics */}
      {/*  
       <Card
        elevation={2}
        sx={{
          borderRadius: 4,
          background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          mb: 3,
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
              Notification Latency Pipeline
            </p>
            <FormControl sx={{ minWidth: 100 }} size="small">
              <Select
                value={latencyYear}
                onChange={(e) => setLatencyYear(e.target.value)}
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
            Trigger → Notification (seconds) & Notification → User Action
            (seconds)
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis
                yAxisId="left"
                stroke="#6b7280"
                label={{ value: "Seconds", angle: -90, position: "insideLeft" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6b7280"
                label={{ value: "Seconds", angle: 90, position: "insideRight" }}
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
                yAxisId="left"
                dataKey="triggerToNotif"
                fill="#3b82f6"
                name="Trigger → Notification (s)"
                barSize={30}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="notifToAction"
                stroke="#10b981"
                strokeWidth={3}
                name="Notification → Action (s)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> 
      */}

      {/* Data Table */}

      {/* <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Channel</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Latency (s)</TableCell>
              <TableCell>Sent At</TableCell>
              <TableCell>Action Time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((record) => (
              <TableRow key={record.id} hover>
                <TableCell>
                  <div>
                    <div>{record.userName}</div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {record.userId}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    label={record.channel}
                    size="small"
                    color={
                      record.channel === "Twilio SMS"
                        ? "secondary"
                        : record.channel === "Apple Push"
                        ? "primary"
                        : record.channel === "Firebase"
                        ? "warning"
                        : "info"
                    }
                  />
                </TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>
                  <Chip
                    label={record.status}
                    size="small"
                    color={
                      record.status === "Delivered"
                        ? "success"
                        : record.status === "Opened"
                        ? "info"
                        : record.status === "Clicked"
                        ? "primary"
                        : "error"
                    }
                  />
                </TableCell>
                <TableCell>{record.latency}s</TableCell>
                <TableCell>{record.sentAt}</TableCell>
                <TableCell>{record.actionAt}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleView(record)}>
                    <FaEye size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={notificationData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer> */}

      {/* <Dialog
        open={isModalOpen}
        onClose={closeModal}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            {modalMode === "view"
              ? "View Notification"
              : modalMode === "edit"
              ? "Edit Notification"
              : "Send Notification"}
          </span>
          <IconButton onClick={closeModal} size="small">
            <FaTimes size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {modalMode === "view" && selectedRecord ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px",
                marginTop: "8px",
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
                  User Name
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.userName}</p>
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
                  User ID
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                  }}
                >
                  {selectedRecord.userId}
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
                  Channel
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.channel}</p>
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
                  Type
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.type}</p>
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
                  Status
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.status}</p>
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
                <p style={{ margin: 0 }}>{selectedRecord.latency}s</p>
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
                  Sent At
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.sentAt}</p>
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
                  Action Time
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.actionAt}</p>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
                marginTop: "8px",
              }}
            >
              <TextField
                fullWidth
                label="User ID"
                defaultValue={selectedRecord?.userId || ""}
                size="small"
              />
              <TextField
                fullWidth
                label="User Name"
                defaultValue={selectedRecord?.userName || ""}
                size="small"
              />
              <FormControl fullWidth size="small">
                <InputLabel>Channel</InputLabel>
                <Select
                  defaultValue={selectedRecord?.channel || ""}
                  label="Channel"
                >
                  <MenuItem value="">Select Channel</MenuItem>
                  <MenuItem value="Twilio SMS">Twilio SMS</MenuItem>
                  <MenuItem value="Apple Push">Apple Push</MenuItem>
                  <MenuItem value="Firebase">Firebase</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select defaultValue={selectedRecord?.type || ""} label="Type">
                  <MenuItem value="">Select Type</MenuItem>
                  <MenuItem value="Event Reminder">Event Reminder</MenuItem>
                  <MenuItem value="Daily Digest">Daily Digest</MenuItem>
                  <MenuItem value="Invite">Invite</MenuItem>
                  <MenuItem value="Leave-By Alert">Leave-By Alert</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
