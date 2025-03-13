import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default function SalesChart({
  bookings,
  numDays,
}: {
  bookings: {
    created_at: string;
    totalPrice: number;
    extrasPrice: number;
  }[];
  numDays: number;
}) {
  const { isDarkMode } = useDarkMode();

  // Create an array of dates from today to numDays ago, inclusive
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  // Create an array of objects with the label, total sales, and extras price
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(new Date(booking.created_at), date))
        .reduce((acc, booking) => acc + booking.totalPrice, 0),
      extrasPrice: bookings
        .filter((booking) => isSameDay(new Date(booking.created_at), date))
        .reduce((acc, booking) => acc + booking.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as={"h2"}>
        Sales from {format(allDates[0], "MMM dd yyyy")} -{" "}
        {format(allDates[allDates.length - 1], "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer width={"100%"} height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{
              fill: colors.text,
            }}
            tickLine={{
              stroke: colors.text,
            }}
          />
          <YAxis
            unit={`$`}
            tick={{
              fill: colors.text,
            }}
            tickLine={{
              stroke: colors.text,
            }}
          />
          <CartesianGrid strokeDasharray={"4"} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
            }}
          />

          <Area
            dataKey={"totalSales"}
            type={"monotone"}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit={"$"}
          />

          <Area
            dataKey={"extrasSales"}
            type={"monotone"}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit={"$"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
