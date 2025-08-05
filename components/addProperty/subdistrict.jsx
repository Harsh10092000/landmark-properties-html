import { haryanaCities } from './city.jsx';

export const getSubDistrictsByCity = (cityName) => {
  const city = haryanaCities.find(city => city.name === cityName);
  return city ? city.districts : [];
};

export const getAllSubDistricts = () => {
  return haryanaCities.reduce((allDistricts, city) => {
    return [...allDistricts, ...city.districts];
  }, []);
};

export default getSubDistrictsByCity;
