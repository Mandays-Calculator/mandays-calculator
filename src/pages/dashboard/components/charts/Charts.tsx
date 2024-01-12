import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { Theme, useTheme } from "@mui/material/styles";

type ColorVariants =
  | "primary"
  | "primary1"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

const getColorFromTheme = (
  theme: Theme,
  colorVariant: ColorVariants | string
): string => {
  switch (colorVariant) {
    case "primary":
      return theme.palette.primary.main;
    case "primary1":
      return theme.palette.primary.light;
    case "secondary":
      return theme.palette.secondary.main;
    case "error":
      return theme.palette.error.main;
    case "warning":
      return theme.palette.warning.main;
    case "success":
      return theme.palette.success.main;
    case "info":
      return theme.palette.info.light;
    default:
      return theme.palette.grey[500];
  }
};

interface ChartProps {
  type: "doughnut" | "bar" | "line" | "pie";
  data: number[];
  labels?: string[];
  colors?: ColorVariants[] | string[];
}

const labelColors: { [key: string]: string } = {
  "On Track": "#4CAF50", // Green
  "On Hold": "#FFC400", // Yellow
  Delayed: "#FF3D00", // Red
};

const Charts: React.FC<ChartProps> = ({ type, data, labels, colors = [] }) => {
  const chartWrapperRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const theme = useTheme();

  const calculateAlphaColor = (color: string, alpha: number): string =>
    `${color}${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0")}`;

  useEffect(() => {
    if (chartRef.current && chartWrapperRef.current) {
      const resolvedLabels = labels || ["On Track", "On Hold", "Delayed"];

      const resolvedColors =
        colors.length > 0
          ? colors.map((color) =>
              typeof color === "string"
                ? getColorFromTheme(theme, color) || color
                : color
            )
          : resolvedLabels.map(
              (label) => labelColors[label] || getColorFromTheme(theme, "info")
            );

      const chartConfig: ChartConfiguration = {
        type,
        data: {
          labels: resolvedLabels,
          datasets: [
            {
              data,
              backgroundColor: resolvedColors.map((color) =>
                calculateAlphaColor(color, 0.7)
              ),
              borderColor: resolvedColors.map((color) =>
                calculateAlphaColor(color, 1)
              ),
              borderWidth: 2,
              //   spacing: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1,
          plugins: {
            legend: {
              display: type === "doughnut" || type === "pie",
              position: "right",
              align: "center",
              labels: {
                usePointStyle: true,
                pointStyleWidth: 17,
              },
            },
          },
        },
      };

      const chart = new Chart(chartRef.current, chartConfig);

      return () => {
        chart.destroy();
      };
    }
  }, [type, data, labels, colors, theme]);

  return (
    <div ref={chartWrapperRef}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Charts;
