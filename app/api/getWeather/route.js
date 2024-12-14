export async function GET(req) {
  console.log("Fetching weather data...");

  //provided WeatherAPI call
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=2ab0f8da3a97444d956170718243011&q=Dublin&aqi=no"
  );

  //check if the response is valid
  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch weather data" }),
      { status: response.status, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = await response.json();
  console.log("Weather data:", data);

  //extract the temperature and return it as JSON
  const currentTemp = data.current.temp_c;
  return new Response(
    JSON.stringify({ temp: currentTemp }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

