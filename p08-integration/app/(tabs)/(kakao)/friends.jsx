import { useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import Division from '@/components/Division';
import FriendSection from '@/components/FriendSection';
import Header from '@/components/FriendHeader';
import Margin from '@/components/Margin';
import Profile from '@/components/Profile';
import TabBar from '@/components/TabBar';
import { myProfile, friendProfiles } from '@/assets/data/mockFriendsData';

export default function FriendsScreen() {
  const [isOpened, setIsOpened] = useState(true);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const renderItem = ({ item }) => (
    <Profile
      uri={item.uri}
      name={item.name}
      introduction={item.introduction}
      isMe={false}      
    />
  );
  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: 'white' }}>
      <Header />
      <Margin height={10} />
      <Profile 
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
        isMe={true}
      />
      <Margin height={15} />
      <Division />
      <Margin height={8} />
      <FriendSection 
        friendProfileLen={friendProfiles.length} 
        onPressArrow={handleArrow}
        isOpened={isOpened}
      />
      <Margin height={8} />  
    </View>
  );
  const handleArrow = () => { setIsOpened(!isOpened) };

  return (
    <View style={styles.container}>
      <FlatList                 // ScrollView에 비해서 FlatList의 성능이 엄청 좋음/
        data={isOpened ? friendProfiles : []}
        contentContainerStyle={{ padding: 10 }}
        keyExtractor={(_, index) => index}      // parameter의 모양이 renderItem 과는 다름
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={() => <Margin height={6} />}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={() => <Margin height={8} />}
        showsVerticalScrollIndicator={false}
      />
      <TabBar
        selectedTabIdx={selectedTabIdx}
        setSelectedTabIdx={setSelectedTabIdx}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});