import { drawEarthQuakePoint } from '@utils/earthquakeUtils';
import { magnitudeToColor, magnitudeToSize } from '@utils/colorScale';



const EarthquakeMarkers = ({ earthquakes } : { earthquakes: any[] }) => {
  return (
    <>
      {earthquakes.map((eq, index) => {
        const lat = eq.geometry.coordinates[1];
        const lon = eq.geometry.coordinates[0];
        const mag = eq.properties.mag;
        const marker = drawEarthQuakePoint(lat, lon, { 
          size: magnitudeToSize(mag),
          color: magnitudeToColor(mag),
        });
        return <primitive key={index} object={marker} />;
      })}
    </>
  );
};

export default EarthquakeMarkers;