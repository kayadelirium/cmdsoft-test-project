import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface IProps {
    measure: string;
    setMeasure: React.Dispatch<React.SetStateAction<string>>;
}

const MeasureButtons: React.FC<IProps> = (props: IProps) => {
    const { measure, setMeasure } = props;
    return (
        <FormControl fullWidth>
            <RadioGroup
                sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "8px" }}
                defaultValue="celsius"
                name="radio-buttons-group"
                value={measure}
                onChange={(e) => setMeasure(e.target.value)}
            >
                <FormControlLabel
                    sx={{ alignSelf: "center", font: "14px" }}
                    value="celsius"
                    control={<Radio />}
                    label="По Цельсию"
                />
                <FormControlLabel sx={{ alignSelf: "center" }} value="fahrenheit" control={<Radio />} label="По Фаренгейту" />
            </RadioGroup>
        </FormControl>
    );
};

export default MeasureButtons;
