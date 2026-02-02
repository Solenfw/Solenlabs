import { useMemo } from 'react';
import { drawThreeGeo } from '../../hooks/getThreeGeoJSON';
import geoJsonData from '../../assets/geojson/ne_50m_countries.json';

const Countries = () => {
  const countries = useMemo(() => drawThreeGeo({
    json: geoJsonData,
    radius: 1.0,
    materialOptions: { color: 0x00ff00, opacity: 0.2 }
  }), []);
  return <primitive object={countries} />;
};

export default Countries;