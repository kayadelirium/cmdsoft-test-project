import { IDay, ITemperature, IWeather, IWeatherSlice } from "../types";
import moment from "moment";
import "moment/locale/ru";
import { kelvinToCelsius, kelvinToFahrenheit } from "../helpers/temperature";

interface IAuxDateTemp {
    datetime: {
        date: string;
        time: string;
    };
    temperature: ITemperature;
}

export const parse = (data: any): IWeather => {
    const city: string = data.city.name;
    const list: IAuxDateTemp[] = data.list.map((item: any) => {
        const datetime = moment.unix(item.dt).utc().utcOffset(3).locale("ru");
        const newItem: IAuxDateTemp = {
            datetime: {
                date: datetime.format("dddd, Do MMMM"),
                time: datetime.format("LT"),
            },
            temperature: {
                fahrenheit: kelvinToFahrenheit(item.main.temp),
                celsius: kelvinToCelsius(item.main.temp),
            },
        };
        return newItem;
    });

    const dates: string[] = list
        .map((item: IAuxDateTemp) => item.datetime.date)
        .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);

    const days: IDay[] = [];

    dates.forEach((date: string) => {
        const daySlices: IWeatherSlice[] = list
            .filter((item: IAuxDateTemp) => item.datetime.date === date)
            .map((item: IAuxDateTemp) => {
                const slice: IWeatherSlice = { time: item.datetime.time, temperature: item.temperature };
                return slice;
            });
        const avgCelsius = Math.round(daySlices.reduce((r, i) => r + i.temperature.celsius, 0) / (daySlices.length || 1));
        const avgFahrenheit = Math.round(daySlices.reduce((r, i) => r + i.temperature.fahrenheit, 0) / (daySlices.length || 1));

        const day: IDay = {
            date: date,
            weatherSlices: daySlices,
            averageTemp: { celsius: avgCelsius, fahrenheit: avgFahrenheit },
        };
        days.push(day);
    });

    const result: IWeather = {
        city: city,
        days: days,
    };
    return result;
};
