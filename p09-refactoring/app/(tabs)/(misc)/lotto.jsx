import { FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import LottoBall from '@/components/lotto/LottoBall';
import Spacer from '@/components/Spacer';
import useLotto from '@/hooks/use-lotto';

export default function LottoScreen() {
  const { 
    lottoNumbers, isDatePickerVisible, historicalLottoInfo, drawInput,
    onPressGetLotto, hideDatePicker, showDatePicker, setDrawInput, onChangeDrawNo, handleConfirmDate,
  } = useLotto();

  

  const ListHeaderComponent = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spacer space={30} />
      <Text style={{ fontSize: 24, fontWeight: 500 }}>추천 번호</Text>
      <Spacer space={20} />
    </View>
  );
  const renderItem = ({ item }) => (
    <LottoBall number={item} />
  );

  const onPressBackground = () => {
    hideDatePicker();
    Keyboard.dismiss();
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={onPressBackground}>
      <View style={styles.container}>
        <FlatList
          data={lottoNumbers}
          keyExtractor={(_, index) => 'lotto'+index}
          numColumns={6}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
        />
        <Spacer space={20} />
        <TouchableOpacity 
          onPress={onPressGetLotto}
          style={{ width: '80%', backgroundColor: '#222', justifyContent: 'center', alignItems: 'center', 
            paddingTop: 14, paddingBottom: 18 }}
        >
          <Text style={{ fontSize: 20, color: 'white' }}>새번호 추출</Text>
        </TouchableOpacity>
        <Spacer space={20} />
      </View>

      <View style={styles.historyContainer}>
        <Spacer space={32} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>회차: {historicalLottoInfo?.drawNo}</Text>
          <Spacer isHorizontal space={20} />
          <TextInput 
            value={drawInput}
            onChangeText={text => setDrawInput(text.replace(/[^0-9]/g, ''))}
            placeholder='회차 입력후 엔터'
            onSubmitEditing={onChangeDrawNo}
            style={{ paddingHorizontal: 10, paddingVertical: 3, borderColor: '#808080', borderWidth: 0.5 }}
            keyboardType="numeric"
            inputMode="numeric"
            maxLength={4}
          />
        </View>
        <Spacer space={16} />
        <View style={{ flexDirection: 'row' }}>
          <Text>날짜: {historicalLottoInfo?.drawDate}</Text>
          <Spacer isHorizontal space={20} />
          <TouchableOpacity 
            onPress={showDatePicker} 
            style={{ backgroundColor: '#444', alignItems: 'center' }}
          >
            <Text style={{ color: 'white', paddingHorizontal: 10, paddingTop: 2, paddingBottom: 4 }}>다른 날짜</Text>
          </TouchableOpacity>
        </View>
        <Spacer space={24} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {historicalLottoInfo?.lottoNumbers.map((number, index) => (
            <LottoBall key={'hli'+index} number={number} isHistorical />
          ))}
          <Text style={{ marginHorizontal: 2, fontSize: 16 }}>＋</Text>
          <LottoBall number={historicalLottoInfo?.bonusNumber} isHistorical />
        </View>
        <Spacer space={24} />
        <Text>1등 상금: {new Intl.NumberFormat('ko-KR').format(historicalLottoInfo?.firstPrize)} 원</Text>
        <Spacer space={16} />
        <Text>1등 당첨자수: {historicalLottoInfo?.noWinners}</Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});