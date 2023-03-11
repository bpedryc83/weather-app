import { useCallback, useState } from 'react';
import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  
  const [cityData, setCityData] = useState('');
  const [pending, setPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleCityChange = useCallback(city => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cdc6641aedc3ce096a17b204cf9c7370&units=metric`)
   .then(res => {
      setPending(false);
      setIsError(false);  
      if (res.status === 200){
        return res.json()
        .then(data => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main
          };
        setCityData(weatherData);
        });
      }
      else {
        setIsError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity handleCityChange={handleCityChange} />
      {(cityData && !isError) && <WeatherSummary cityData={cityData}/>}
      {pending && <Loader />}
      {isError && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;