import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parse } from "../helpers/dataParser";
import { IDay, IWeather } from "../types";

const weatherSlice = createSlice({
    name: "weather",
    initialState: { isPending: false, city: "", days: [] as IDay[] } as IWeather,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataThunk.fulfilled, (state, action: PayloadAction<IWeather>) => {
            state.city = action.payload.city;
            state.days = action.payload.days;
            state.isPending = false;
            return state;
        });
        builder.addCase(fetchDataThunk.pending, (state, action) => {
            state.isPending = true;
            return state;
        });
    },
});

export const fetchDataThunk = createAsyncThunk("fetchData", async () => {
    const promise = await fetch(
        "http://api.openweathermap.org/data/2.5/forecast?q=Moscow,ru&APPID=9f3958381b37aee886842a1b6235fd2e&cnt=40&lang=ru"
    );
    const data = await promise.json();
    const result: IWeather = parse(data);
    return result;
});

export const weatherSliceReducer = weatherSlice.reducer;
