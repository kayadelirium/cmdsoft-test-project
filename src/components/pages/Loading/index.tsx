import { Box, CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Loading;
