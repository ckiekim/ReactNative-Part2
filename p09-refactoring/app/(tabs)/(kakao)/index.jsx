import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, SectionList, Switch, Text, View, TouchableOpacity, RefreshControl } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import dayjs from 'dayjs';

import BookmarkButton from '@/components/bus/BookmarkButton';
import BusInfo from '@/components/bus/BusInfo';
import Margin from '@/components/Margin';
import useTheme from '@/hooks/use-theme';
import { 
  busStop, getSections, getBusNumColorByType, getRemainedTimeText, getSeatStatusText 
} from '@/assets/data/mock-bus-data';

export default function KakaoBusScreen() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);
  const { isDark, NEW_COLOR, toggleIsDark } = useTheme();

  const onRefresh = () => {
    console.log('call onRefresh');
    setRefreshing(true);
  };
  useEffect(() => {
    if (refreshing) {
      setNow(dayjs());
      setTimeout(() => {
        setRefreshing(false);     // API refetch 완료되는 시점
      }, 300);
    }
  }, [refreshing]);
  useEffect(() => {
    const si = setInterval(() => {
      const newNow = dayjs();
      setNow(newNow);
    }, 5000);
    return () => {      // unmount 될때 실행하는 코드
      clearInterval(si);
    }
  }, []);

  const onPressBusStopBookmark = () => { };
  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: NEW_COLOR.GRAY_3_GRAY_2 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Margin height={8} />
        <Text style={{ color: NEW_COLOR.WHITE_BLACK, fontSize: 13 }}>{busStop.id}</Text>
        <Margin height={2} />
        <Text style={{ color: NEW_COLOR.WHITE_BLACK, fontSize: 20 }}>{busStop.name}</Text>
        <Margin height={6} />
        <Text style={{ color: NEW_COLOR.GRAY_1_GRAY_4, fontSize: 14 }}>{busStop.directionDescription}</Text>
      </View>
      <Margin height={16} />
      <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center' }}>
        <BookmarkButton 
          isBookmarked={true}
          onPressBookmark={onPressBusStopBookmark}
          size={24}
          style={{ borderWidth: 0.3, borderColor: NEW_COLOR.GRAY_1_GRAY_4, borderRadius: 16, padding: 4 }}
          NEW_COLOR={NEW_COLOR}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Switch
            value={isDark}
            onValueChange={toggleIsDark}
          />
          <Text style={{ marginLeft: 1, color: NEW_COLOR.WHITE_BLACK }}>
            {isDark ? 'Dark' : 'Light'} mode
          </Text>
        </View>
      </View>
      <Margin height={24} />
    </View>
  );
  const renderSectionHeader = ({ section: { title } }) => (
    <View 
      style={{ paddingHorizontal: 12, paddingBottom: 5, backgroundColor: NEW_COLOR.GRAY_1_GRAY_4, 
      borderTopWidth: 0.5, borderBottomWidth: 0.5, 
      borderTopColor: NEW_COLOR.GRAY_2_GRAY_3, borderBottomColor: NEW_COLOR.GRAY_2_GRAY_3 }}
    >
      <Text style={{ color: NEW_COLOR.GRAY_4_GRAY_1, fontSize: 12 }}>{title}</Text>
    </View>
  );
  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);

    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;   // ?? 앞의 값이 null 또는 undefined 일 때 뒤의 값으로 할당
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
      ? [null]
      : [firstNextBusInfo, secondNextBusInfo];

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return { hasInfo: false, remainedTimeText: '도착정보 없음' };
      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return { hasInfo: true, remainedTimeText, numOfRemainedStops, seatStatusText };
    });

    return (
      <BusInfo
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => {}}
        num={bus.num}
        numColor={numColor}
        directionDescription={bus.directionDescription}
        processedNextBusInfos={processedNextBusInfos}
        NEW_COLOR={NEW_COLOR}
      />
    )
  };
  const ItemSeparatorComponent = () => (
    <View style={{ width: '100%', height: 1, backgroundColor: NEW_COLOR.GRAY_1_GRAY_4 }} />
  );
  const ListFooterComponent = () => (
    <Margin height={20} />
  )

  return (
    <SafeAreaView style={{
      ...styles.container,
      backgroundColor: NEW_COLOR.WHITE_BLACK
    }}>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: NEW_COLOR.GRAY_3_GRAY_2 }}>
        <TouchableOpacity style={{ padding: 10 }}>
          <AntDesign name="left" size={20} color={NEW_COLOR.WHITE_BLACK} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <AntDesign name="home" size={20} color={NEW_COLOR.WHITE_BLACK} />
        </TouchableOpacity>
      </View>
      <SectionList 
        style={{ flex: 1, width: '100%' }}
        sections={sections}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});