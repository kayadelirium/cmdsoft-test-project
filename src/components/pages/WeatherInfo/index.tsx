import { Box } from "@mui/material";
import { useState } from "react";
import BarChart from "../../templates/BarChart";
import CardsWithArrows from "../../templates/CardsArrows";
import MeasureButtons from "../../templates/MeasureButtons";

const WeatherInfo: React.FC = () => {
    const [measure, setMeasure] = useState<string>("celsius");
    const [cardNumber, setCardNumber] = useState<number>(0);

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: "600px",
                }}
            >
                <MeasureButtons measure={measure} setMeasure={setMeasure} />
                <CardsWithArrows measure={measure} cardNumber={cardNumber} setCardNumber={setCardNumber} />
                <BarChart measure={measure} cardNumber={cardNumber} />
            </Box>
        </Box>
    );
};

export default WeatherInfo;
