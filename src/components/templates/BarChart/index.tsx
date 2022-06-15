import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { IDay } from "../../../types";

import { Chart as ChartJS, registerables } from "chart.js";
import { useAppSelector } from "../../../redux/store";
ChartJS.register(...registerables);

interface IProps {
    cardNumber: number;
    measure: string;
}

const BarChart: React.FC<IProps> = (props: IProps) => {
    const { cardNumber, measure } = props;

    const days: IDay[] = useAppSelector((state) => state.days);
    const day = days[cardNumber] ? days[cardNumber] : null;

    const labels = day?.weatherSlices.map((slice) => slice.time);
    const temperature = day?.weatherSlices.map((slice) =>
        measure === "celsius" ? slice.temperature.celsius : slice.temperature.fahrenheit
    );

    return day ? (
        <Box>
            <Bar
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: day.date,
                            barThickness: 40,
                            data: temperature,
                            backgroundColor: [
                                "rgba(0, 99, 132, 0.6)",
                                "rgba(30, 99, 132, 0.6)",
                                "rgba(60, 99, 132, 0.6)",
                                "rgba(90, 99, 132, 0.6)",
                                "rgba(120, 99, 132, 0.6)",
                                "rgba(150, 99, 132, 0.6)",
                                "rgba(180, 99, 132, 0.6)",
                                "rgba(210, 99, 132, 0.6)",
                                "rgba(240, 99, 132, 0.6)",
                            ],
                            borderColor: [
                                "#272d2f",
                                "rgba(30, 99, 132, 1)",
                                "rgba(60, 99, 132, 1)",
                                "rgba(90, 99, 132, 1)",
                                "rgba(120, 99, 132, 1)",
                                "rgba(150, 99, 132, 1)",
                                "rgba(180, 99, 132, 1)",
                                "rgba(210, 99, 132, 1)",
                                "rgba(240, 99, 132, 1)",
                            ],
                            borderWidth: 2,
                        },
                    ],
                }}
                options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            font: {
                                size: 16,
                            },
                            text: day.date,
                        },
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function (value, index, values) {
                                    return measure === "celsius" ? value + "°C" : value + "°F";
                                },
                            },
                        },
                    },
                }}
            />
        </Box>
    ) : (
        <></>
    );
};

export default BarChart;
