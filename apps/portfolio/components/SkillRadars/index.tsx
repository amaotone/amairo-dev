import { Box, SimpleGrid } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";

import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export const SkillRaders: React.FC = () => {
  return (
    <SimpleGrid columns={[1, 3]} spacing={3}>
      <Box>
        <Radar
          datasetIdKey="radar"
          data={{
            labels: ["Python", "Ruby", "Rust", "TypeScript", "Go", "HTML/CSS"],
            datasets: [
              {
                label: "Language",
                data: [5, 3, 3, 4, 3, 5],
              },
            ],
          }}
          options={{
            color: "#319795",
            scales: {
              r: {
                suggestedMax: 5,
                suggestedMin: 0,
              },
            },
            elements: {
              point: {
                radius: 2,
                borderColor: "white",
                backgroundColor: "#319795",
              },
              line: {
                fill: true,
                backgroundColor: "#31979533",
                borderColor: "#319795",
                borderWidth: 1,
              },
            },
          }}
        />
      </Box>
      <Box>
        <Radar
          datasetIdKey="radar"
          data={{
            labels: [
              "Git/GitHub",
              "Docker",
              "GCP",
              "CI/CD",
              "Terraform",
              "Security",
            ],
            datasets: [{ label: "DevOps", data: [5, 4, 4, 4, 3, 2] }],
          }}
          options={{
            color: "#ED8936",
            scales: {
              r: {
                suggestedMax: 5,
                suggestedMin: 0,
              },
            },
            elements: {
              point: {
                radius: 3,
                borderColor: "white",
                backgroundColor: "#ED8936",
              },
              line: {
                fill: true,
                backgroundColor: "#ED893633",
                borderColor: "#ED8936",
                borderWidth: 1,
              },
            },
          }}
        />
      </Box>
      <Box>
        <Radar
          datasetIdKey="radar"
          data={{
            labels: ["Tabular", "Image", "NLP", "Finance", "Bayes", "MLOps"],
            datasets: [{ label: "Machine Learning", data: [5, 4, 4, 4, 2, 4] }],
          }}
          options={{
            color: "#9F7AEA",
            scales: {
              r: {
                suggestedMax: 5,
                suggestedMin: 0,
              },
            },
            elements: {
              point: {
                radius: 3,
                borderColor: "white",
                backgroundColor: "#9F7AEA",
              },
              line: {
                fill: true,
                backgroundColor: "#9F7AEA33",
                borderColor: "#9F7AEA",
                borderWidth: 1,
              },
            },
          }}
        />
      </Box>
    </SimpleGrid>
  );
};
