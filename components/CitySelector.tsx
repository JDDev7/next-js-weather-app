"use client";

import React from 'react';
import { CITIES_BY_REGION } from '@/utils/constants';
import styles from '@/components/CitySelector.module.css';


interface CitySelectorProps {
  onSelectCity: (city: string) => void;
}

const CitySelector = ({ onSelectCity }: CitySelectorProps) => {
  return (
    <select onChange={(e) => onSelectCity(e.target.value)} className={styles.citySelector}>
      <option value="">Selecciona una ciudad</option>
      {Object.entries(CITIES_BY_REGION).map(([region, cities]) => (
        <optgroup label={region} key={region}>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default CitySelector;