import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const city = searchParams.get("city");
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!city && !(lat && lon)) {
        return NextResponse.json({error:"Debes proporcionar una ciudad o coordenadas"}, {status: 400});
    }

    try {
        const url = 'https://api.openweathermap.org/data/2.5/weather'
        const params = {
            q: city,
            lat: lat,
            lon: lon,
            appid: API_KEY,
            units: 'metric',
            lang: "es"
        };

        const response = await axios.get(url, {params});
        return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({error: "Error al obtener el clima"}, {status: 500});
    }
}