import { Text, View } from 'react-native';

import AlarmButton from './AlarmButton';
import BookmarkButton from './BookmarkButton';
import Margin from '../Margin';
import NextBusInfo from './NextBusInfo';

export default function BusInfo({
  isBookmarked, onPressBookmark, num, numColor, directionDescription, processedNextBusInfos, NEW_COLOR,
}) {
  return (
    <View style={{ backgroundColor: NEW_COLOR.WHITE_BLACK }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.8, flexDirection: 'row', alignItems: 'center' }}>
          <BookmarkButton
            isBookmarked={isBookmarked} 
            onPressBookmark={onPressBookmark}
            size={20}
            style={{ padding: 10 }}
            NEW_COLOR={NEW_COLOR}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
            <Text style={{ color: NEW_COLOR.GRAY_2_GRAY_3, fontSize: 9, marginRight: 4 }}>
              {directionDescription} 방향
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            {processedNextBusInfos.map((info, index) => (
              <NextBusInfo 
                key={`next-bus-info-${index}`}
                hasInfo={info.hasInfo}
                remainedTimeText={info.remainedTimeText} 
                numOfRemainedStops={info.numOfRemainedStops} 
                seatStatusText={info.seatStatusText}
                NEW_COLOR={NEW_COLOR}
              />
            ))}
          </View>
          <AlarmButton 
            onPressAlarm={() => {}} 
            style={{ padding: 10 }} 
            NEW_COLOR={NEW_COLOR}
          />
        </View>
      </View>
      <Margin height={4} />
    </View>
  );
}