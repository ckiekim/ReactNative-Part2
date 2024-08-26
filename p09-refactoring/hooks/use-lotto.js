import { useEffect, useState } from 'react';
import { getLottoNumbers, getDrawNo, getHistoricalLottoInfo } from '@/utils/lotto-utils';

export default function useLotto() {
  const [lottoNumbers, setLottoNumbers] = useState(null);
  const [newDraw, setNewDraw] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [historicalLottoInfo, setHistoricalLottoInfo] = useState(null);
  const [historicalDrawNo, setHistoricalDrawNo] = useState(0);
  const [drawInput, setDrawInput] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  
  useEffect(() => {
    const numbers = getLottoNumbers();
    setLottoNumbers(numbers);
  }, [newDraw]);

  const getInfo = async () => {
    const result = await getHistoricalLottoInfo(historicalDrawNo);
    // console.log('result =', result);
    if (result !== null)
      setHistoricalLottoInfo(result);
  }
  useEffect(() => {
    if (historicalDrawNo === 0) {
      const drawNo = getDrawNo();
      setHistoricalDrawNo(drawNo);
    }
    getInfo();
  }, [historicalDrawNo]);

  useEffect(() => {
    const drawNo = getDrawNo(selectedDate);
    setHistoricalDrawNo(drawNo);
  }, [selectedDate]);

  const onPressGetLotto = () => {
    setNewDraw(!newDraw);
  };
  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };
  const onChangeDrawNo = () => {
    try {
      const drawNo = parseInt(drawInput);
      setHistoricalDrawNo(drawNo);
    } catch(e) {}
    setDrawInput('');
  };
  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  
  return {
    lottoNumbers, isDatePickerVisible, historicalLottoInfo, drawInput,
    onPressGetLotto, hideDatePicker, showDatePicker, setDrawInput, onChangeDrawNo, handleConfirmDate,
  };
}