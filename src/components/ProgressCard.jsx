import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import "./ProgressCard.css";

const ProgressCard = ({ title, value }) => {
  const data = [
    {
      name: "진행률",
      value,
      fill: "#8884d8",
    },
  ];

  return (
    <div className="progress-card">
      <h4>{title}</h4>

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

        {/* 👇 원 안에 퍼센트 숫자 넣기 */}
        <div className="center-label">
          {value}%
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
