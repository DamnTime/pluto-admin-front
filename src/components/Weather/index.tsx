import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getWeather } from '@/api/glabol';
import style from './style.scss';

interface IWeatherProps {}

const timeImg = {
  day: 'http://api.map.baidu.com/images/weather/day/qing.png',
  night: 'http://api.map.baidu.com/images/weather/night/qing.png',
};

const Weather: React.FC<IWeatherProps> = props => {
  const [weatherInfo, setWeatherInfo] = useState<any>({});

  const fetchWeather = async () => {
    const res = (await getWeather()) || {};
    setWeatherInfo((res.lives || [])[0] || {});
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const currentHour = moment().hour();

  return Object.keys(weatherInfo).length > 0 ? (
    <div className={style['weather-container']}>
      <img
        src={currentHour <= 18 ? timeImg.day : timeImg.night}
        alt=""
        className={style['weather-time-img']}
      />
      <span className={style['weather-txt']}>{weatherInfo.weather}</span>
      <span className={style['weather-txt']}>{`${weatherInfo.temperature}°C`}</span>
      <span className={style['weather-txt']}>{`风向：${weatherInfo.winddirection}风`}</span>
    </div>
  ) : null;
};

export default Weather;
