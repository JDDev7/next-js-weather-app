"use client";
import CitySelector from "@/components/CitySelector";
import Image from "next/image";
import { useEffect, useState } from "react";
import { sulphurPoint } from "@/lib/utils";

// Define interfaces para tipar los datos
interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainData {
  temp: number;
  humidity: number;
}

interface WeatherResponse {
  weather: WeatherCondition[];
  main: MainData;
  name: string;
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const [weather, setWeather] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [weatherDescription, setWeatherDescription] = useState("");
  const [backgroundClass, setBackgroundClass] = useState("");
  const [containerClass, setContainerClass] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

  function toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
  }

  const handleSelectCity = async (city: string) => {
    if (!city) {
      // Si no se selecciona ninguna ciudad, restablecer el estado
      setWeather(null);
      setBackgroundClass("");
      setContainerClass("");
      setWeatherIcon("");
      return;
    }
    const response = await fetch(`/api/weather?city=${city}`);
    const data: WeatherResponse = await response.json();
    setWeather(data);
  };

  useEffect(() => {
    if (weather) {
      const description = weather.weather[0].description.toUpperCase();
      setWeatherDescription(description);

      switch (true) {
        case description.includes("LLUVIA"):
          setBackgroundClass("lluvia");
          setContainerClass("cont-lluvia");
          setWeatherIcon("/rain.webp");
          break;
        case description.includes("CLARO"):
          setBackgroundClass("claro");
          setContainerClass("cont-claro");
          setWeatherIcon("/clear-sky.webp");
          break;
        case description.includes("SOLEADO"):
          setBackgroundClass("soleado");
          setContainerClass("cont-soleado");
          setWeatherIcon("/sun.webp");
          break;
        case description.includes("NUBES") || description.includes("NUBOSO"):
          setBackgroundClass("nubes");
          setContainerClass("cont-nubes");
          setWeatherIcon("/clouds.webp");
          break;
        case description.includes("LLOVIZNA"):
          setBackgroundClass("llovizna");
          setContainerClass("cont-llovizna");
          setWeatherIcon("/rainy.webp");
          break;
        case description.includes("TORMENTA"):
          setBackgroundClass("tormenta");
          setContainerClass("cont-tormenta");
          setWeatherIcon("/thunder.webp");
          break;
        case description.includes("NIEVE"):
          setBackgroundClass("nieve");
          setContainerClass("cont-nieve");
          setWeatherIcon("/snowflake.webp");
          break;
        case description.includes("NIEBLA"):
          setBackgroundClass("niebla");
          setContainerClass("cont-niebla");
          setWeatherIcon("/fog.webp");
          break;
        default:
          setBackgroundClass("bg");
          break;
      }
    }
  }, [weather]);

  return (
    <section className={`main-container ${containerClass}`}>
      <div className={`main-section`}>
        <CitySelector onSelectCity={handleSelectCity} />
        {weather ? (
          <div className={`weather-container ${backgroundClass}`}>
            <Image
              src={weatherIcon}
              alt="Weather Icon"
              width={100}
              height={100}
              className="weather-icon"
            />
            <h2 className="weather-name">{weather.name}</h2>
            <p className="weather-text">
              {toTitleCase(weather.weather?.[0]?.description)}
            </p>
            <p className="weather-text">Temperatura</p>
            <h3 className={`weather-temp ${sulphurPoint.className}`}>
              {weather.main.temp}°C
            </h3>
            <p className="weather-text">Humedad</p>
            <h4 className={`weather-humidity ${sulphurPoint.className}`}>
              {weather.main.humidity}%
            </h4>
          </div>
        ) : (
          <div className={`weather-container ${backgroundClass}`}>
            <h2 className={`weather-name ${sulphurPoint.className}`}>
              Elige una ciudad en el desplegable
            </h2>
            <p className={`weather-text ${sulphurPoint.className}`}>
              Aquí verás la descripción del tiempo actual
            </p>
            <p className={`weather-text ${sulphurPoint.className}`}>
              Aquí verás la temperatura
            </p>
            <p className={`weather-text ${sulphurPoint.className}`}>
              Aquí verás el % de humedad
            </p>
          </div>
        )}
      </div>
    </section>
  );
}