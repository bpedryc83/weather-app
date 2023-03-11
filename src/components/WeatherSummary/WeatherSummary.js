import styles from './WeatherSummary.module.scss';

const WeatherSummary = props => {
  return (
    <section className={styles.weatherSummary}>
      <img
        className={styles.weatherIcon}
        alt={props.cityData.description}
        src={`${process.env.PUBLIC_URL}/images/weather-icons/${props.cityData.icon}.png`} />
      <div className={styles.weatherInfo}>
        <h2>{props.cityData.city}</h2>
        <p>
          <strong>Temp:</strong> {props.cityData.temp}
        </p>
      </div>
    </section>
  );
};

export default WeatherSummary;