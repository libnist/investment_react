
import { useState } from 'react';
import './App.css'

import InputBox from './Components/InputBox';

import { calculateInvestmentResults, formatter } from './util/investment';

import logo from "./assets/investment-calculator-logo.png";

const initialValues = [
  { label: "initial investment", initialValue: 15000 },
  { label: "annual investment", initialValue: 900 },
  { label: "expected return", initialValue: 5.56 },
  { label: "duration", initialValue: 10 },
]

function App() {

  const [calculationValues, setCalculationValues] = useState([...initialValues.map((value) => {return {...value}})]);

  const handleChange = (index) => {
    return (event) => {
      setCalculationValues((prevCalculationValues) => {
        let calculationValues = [...prevCalculationValues.map((value) => {return {...value}})];
        calculationValues[index].initialValue = +event.target.value;
        return calculationValues;
      })
    }
  }

  const input = {
    initialInvestment: calculationValues[0].initialValue,
    annualInvestment: calculationValues[1].initialValue,
    expectedReturn: calculationValues[2].initialValue,
    duration: calculationValues[3].initialValue,
  }

  const result = calculateInvestmentResults(input)

  const initialInvestment = result[0].valueEndOfYear - result[0].interest - result[0].annualInvestment;

  console.log(result)

  return (
    <>
      <div id="user-input" >
        <div className='input-group'>
          <InputBox {...calculationValues[0]} onChange={handleChange(0)}/>

          <InputBox {...calculationValues[1]} onChange={handleChange(1)}/>
        </div>

        <div className='input-group'>
          <InputBox {...calculationValues[2]} onChange={handleChange(2)}/>
          <InputBox {...calculationValues[3]} onChange={handleChange(3)}/>
        </div>

      </div>

      <table id="result">
        <tr>
          <th>Year</th>
          <th>Invetment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Captial</th>
        </tr>
        {result.map((row, rowIndex) => {
          const totalInterest = row.valueEndOfYear - row.annualInvestment * row.year - initialInvestment;
          const totalAmountInvested = row.valueEndOfYear - totalInterest;
          return (
            <tr key={rowIndex}>
              <td>{row.year}</td>
              <td>{formatter.format(row.valueEndOfYear)}</td>
              <td>{formatter.format(row.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          )
        })}
      </table>
    </>
  )
}

export default App
