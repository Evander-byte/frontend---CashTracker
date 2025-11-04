"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type ProgressBarProps = {
  budgetAmount: number;
  totalSpent: number;
};

export default function ProgressBar({
  budgetAmount,
  totalSpent,
}: ProgressBarProps) {
  const percentage = +((totalSpent / budgetAmount) * 100).toFixed(2);
  return (
    <div className="flex justify-center p-10">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: percentage >= 100 ? "#DC2626" : "#F59E0B",
          trailColor: "#E1E1E1",
          textColor: percentage >= 100 ? "#DC2626" : "#F59E0B",
          textSize: 8,
        })}
        text={`${percentage}%`}
        value={percentage}
      />
    </div>
  );
}
