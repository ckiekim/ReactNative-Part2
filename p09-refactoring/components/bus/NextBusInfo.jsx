import { Text, View } from 'react-native';
import { COLOR } from '@/constants/bus-color';

export default function NextBusInfo({ 
  hasInfo, remainedTimeText, numOfRemainedStops, seatStatusText, NEW_COLOR,
}) {
  if (!hasInfo)
    return <Text style={{ fontSize: 12, color: NEW_COLOR.GRAY_2_GRAY3 }}>도착정보 없음</Text>

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 11, color: NEW_COLOR.BLACK_WHITE, marginRight: 10 }}>
        {remainedTimeText}
      </Text>
      <View 
        style={{ flexDirection: 'row', alignItems: 'center', padding: 2,
          borderWidth: 0.6, borderColor: NEW_COLOR.GRAY_1_GRAY_4, borderRadius: 3 }}
      >
        <Text style={{ fontSize: 10, color: NEW_COLOR.GRAY_3_GRAY_2, marginRight: 4 }}>
          {numOfRemainedStops}번째전
        </Text>
        <Text style={{ fontSize: 10, color: COLOR.CORAL }}>
          {seatStatusText}
        </Text>
      </View>
    </View>
  );
}