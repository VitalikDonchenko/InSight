import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await fetch('https://api.nasa.gov/insight_weather/?api_key=8QqDYXjjLylcetDGv5s4gPC7W5Pu0soNZAb8fUUH&feedtype=json&ver=1.0', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  console.log(result);
  const arraySol = result.sol_keys;
  const arrDates = [];
  const minTemp = [];
  const maxTemp = [];
  const minAtmoPressure = [];
  const maxAtmoPressure = [];
  for (let i = 0; i < arraySol.length; i++) {
    arrDates.push(result[arraySol[i]].First_UTC.slice(0, 10));
    minTemp.push(Math.round(result[arraySol[i]].AT.mn));
    maxTemp.push(Math.round(result[arraySol[i]].AT.mx));
    minAtmoPressure.push(Math.round(result[arraySol[i]].PRE.mn));
    maxAtmoPressure.push(Math.round(result[arraySol[i]].PRE.mx));
  }
  const arrAllArr = {};
  for (let i = 0; i < 7; i++) {
    arrAllArr[`key${[i]}`] = {
      sol: arraySol[i],
      date: arrDates[i],
      minTemp: minTemp[i],
      maxTemp: maxTemp[i],
      minAtmo: minAtmoPressure[i],
      maxAtmo: maxAtmoPressure[i],
    };
  }
  res.render('index', { arrAllArr });
});

export default router;
