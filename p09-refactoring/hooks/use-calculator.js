import { useState } from 'react';

export default function useCalculator() {
  const [input, setInput] = useState(0);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [tempInput, setTempInput] = useState(null);
  const [tempOperator, setTempOperator] = useState(null);
  const [equalClicked, setEqualClicked] = useState(false);

  const hasInput = !!input;     // input ? true : false;

  const onPressNum = (num) => {
    setEqualClicked(false);
    if (!currentOperator) {
      const newInput = `${input}${num}`;
      setInput(Number(newInput));
    } else {
      setInput(num);
      setTempOperator(currentOperator);
      setCurrentOperator(null);
    }
  }
  const onPressOperator = (op) => {
    if (op !== '=') {
      setEqualClicked(false);
      setCurrentOperator(op);
      setTempInput(input);
    } else {
      let value = eval(`${tempInput} ${tempOperator} ${input}`);
      if (equalClicked) {
        value = eval(`${input} ${tempOperator} ${tempInput}`);
      } else {
        setTempInput(input);
        setEqualClicked(true);
      }
      setResult(value);
      setInput(value);
    }
  }
  const onPressReset = () => {
    setInput(0); 
    if (!hasInput || equalClicked) {
      setTempInput(0); setCurrentOperator(null); setTempOperator(null); 
      setResult(null); setEqualClicked(false);
    }
  }

  return {
    input, currentOperator, result, tempInput, tempOperator, hasInput, equalClicked,
    onPressNum, onPressOperator, onPressReset
  }
}