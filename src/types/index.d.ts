export interface IWeather {
    isPending?: boolean;
    city: string;
    days: IDay[];
}
export interface IDay {
    date: string;
    averageTemp: ITemperature;
    weatherSlices: IWeatherSlice[];
}
export interface IWeatherSlice {
    time: string;
    temperature: ITemperature;
}
export interface ITemperature {
    fahrenheit: number;
    celsius: number;
}
