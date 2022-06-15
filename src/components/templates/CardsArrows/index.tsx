import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { IDay } from "../../../types";

interface IProps {
    measure: string;
    cardNumber: number;
    setCardNumber: React.Dispatch<React.SetStateAction<number>>;
}

const CardsWithArrows: React.FC<IProps> = (props: IProps) => {
    const { measure, cardNumber, setCardNumber } = props;
    const [pageIndex, setPageIndex] = useState<number>(0);
    const pageSize = 3;

    const city: string = useAppSelector((state) => state.city);
    const days: IDay[] = useAppSelector((state) => state.days);

    return (
        <>
            <Box
                sx={{
                    width: 1,
                    paddingY: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {pageIndex ? (
                    <IconButton
                        onClick={() => {
                            if (cardNumber - pageIndex === 1) setCardNumber(cardNumber - 1);
                            else if (cardNumber - pageIndex === 2) setCardNumber(cardNumber - 2);
                            setPageIndex(pageIndex - 1);
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                ) : (
                    <Box sx={{ padding: "20px" }} />
                )}
                <Typography variant="h5"> {city} </Typography>
                {pageIndex + pageSize < days.length ? (
                    <IconButton
                        onClick={() => {
                            if (cardNumber - pageIndex === 1) setCardNumber(cardNumber + 1);
                            else if (cardNumber - pageIndex === 0) setCardNumber(cardNumber + 2);
                            setPageIndex(pageIndex + 1);
                        }}
                    >
                        <ArrowForward />
                    </IconButton>
                ) : (
                    <Box sx={{ padding: "20px" }} />
                )}
            </Box>

            <Box
                sx={{
                    width: 1,
                    paddingY: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {days.slice(pageIndex, pageIndex + pageSize).map((day, index) => (
                    <Card
                        key={day.date}
                        sx={{
                            minWidth: "190px",
                            flexGrow: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "8px",
                            opacity: cardNumber === index + pageIndex ? 1 : 0.6,
                            ":hover": {
                                boxShadow: 5,
                                cursor: "pointer",
                            },
                        }}
                        onClick={() => setCardNumber(index + pageIndex)}
                    >
                        <CardHeader
                            sx={{ justifyContent: "center" }}
                            title={day.date.split(",")[0]}
                            subheader={day.date.split(",")[1]}
                        />
                        <CardContent>
                            <Typography variant="h5">
                                {measure === "celsius" ? day.averageTemp.celsius + "°C" : day.averageTemp.fahrenheit + "°F"}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </>
    );
};

export default CardsWithArrows;
