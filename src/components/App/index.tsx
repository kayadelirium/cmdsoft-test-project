import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchDataThunk } from "../../redux/weatherSlice";
import Loading from "../pages/Loading";
import WeatherInfo from "../pages/WeatherInfo";

const App: React.FC = () => {
    const isPending = useAppSelector((state) => state.isPending);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchDataThunk());
    }, [dispatch]);

    return isPending ? <Loading /> : <WeatherInfo />;
};

export default App;
