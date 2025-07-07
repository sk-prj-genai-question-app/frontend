import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import "./ProgressCard.css";

const ProgressCard = ({ level, subject, value }) => {
  const data = [
    {
      name: "진행률",
      value,
      fill: "#8884d8",
    },
  ];

  return (
    <div className="progress-card">
      <div className="card-title">
        <div className="level">{level}</div>
        <div className="subject">{subject}</div>
      </div>

      <div className="chart-container">
        <RadialBarChart
          width={140}
          height={140}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="100%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
          />
          <RadialBar
            background
            clockWise
            dataKey="value"
            cornerRadius={5}
          />
        </RadialBarChart>

        <div className="center-label">
          {value}%
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
