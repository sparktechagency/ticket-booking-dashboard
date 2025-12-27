import { Card, CardContent, Box, Typography } from "@mui/material";
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";
export function MetricCard({
  title,
  value,
  change,
  inverse = false,
  icon: Icon,
  subtitle,
}) {
  const isPositive = inverse ? (change ?? 0) < 0 : (change ?? 0) > 0;

  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 4,
        transition: "all 0.25s ease-in-out",
        transform: "scale(1)",
        "&:hover": {
          boxShadow: 4,
          transform: "scale(1.03)",
        },
      }}
    >
      <CardContent sx={{ p: 2, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {Icon && (
              <Box
                sx={{
                  width: 35,
                  height: 35,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, rgb(219, 234, 254) 0%, rgb(191, 219, 254) 100%)",
                }}
              >
                <Icon size={16} color="rgb(37, 99, 235)" />
              </Box>
            )}
            <p className="font-medium">{title}</p>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <p className="text-2xl font-semibold">{value}</p>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {subtitle && <p className="text-sm text-[#6d7075]">{subtitle}</p>}
            {change !== undefined && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "between",
                  gap: 0.5,
                  color: isPositive ? "success.main" : "error.main",
                }}
              >
                {isPositive ? (
                  <IoMdTrendingUp size={16} />
                ) : (
                  <IoMdTrendingDown size={16} />
                )}
                <p className="text-sm font-semibold">
                  {Math.abs(change).toFixed(2)}%
                </p>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
