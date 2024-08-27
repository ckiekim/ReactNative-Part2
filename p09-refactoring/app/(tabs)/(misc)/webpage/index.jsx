import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import Button from '@/components/Button';
import Spacer from '@/components/Spacer';
import useWebpage from '@/hooks/use-webpage';
import { webpageSection } from '@/assets/data/mock-webpage-scrap';
import { COLOR } from '@/constants/bus-color';
const weekNames = '일월화수목금토'.split('');

export default function WebpageScreen() {
  const {
    sectionData
  } = useWebpage();
  const safeAreaInset = useSafeAreaInsets();    // {"bottom": 0, "left": 0, "right": 0, "top": 25}

  // const ListHeaderComponent = () => (
  //   <View style={styles.headerContainer}>
  //     <Text style={{ padding: 20, fontSize: 16, color: COLOR.WHITE }}>List Header</Text>
  //   </View>
  // );
  const renderSectionHeader = ({ section: { title } }) => {
    const weekday = new Date(title).getDay();
    return (
      <View style={styles.sectionHeader}>
        <Text style={{ color: COLOR.GRAY_4, fontSize: 12 }}>{`${title} (${weekNames[weekday]})`}</Text>
      </View>
    );
  };
  const renderItem = ({ item: webpage }) => {
    return (
      <View style={{ paddingHorizontal: 4 }}>
        <Text>{webpage.title}</Text>
        <Text>{webpage.url}</Text>
      </View>
    );
  };
  const ItemSeparatorComponent = () => (
    <View style={{ width: '100%', height: 1, backgroundColor: COLOR.GRAY_1 }} />
  );
  const ListFooterComponent = () => (
    <Spacer space={20} />
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sectionData}
        style={{ flex: 1, width: '100%' }}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
      />

      <View style={{ position:'absolute', right:24, bottom:24 + safeAreaInset.bottom }}>
        <Link href="/webpage/add" asChild>
          <Button>
            <View style={styles.addButton}>
              <Ionicons name="add" size={32} color="white" />
            </View>
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
  },
  headerContainer: {
    flex: 1, backgroundColor: COLOR.GRAY_3, justifyContent: 'center', alignItems: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 12, paddingBottom: 5, backgroundColor: COLOR.GRAY_1, 
    borderTopWidth: 0.5, borderBottomWidth: 0.5, borderTopColor: COLOR.GRAY_2, borderBottomColor: COLOR.GRAY_2
  },
  addButton: {
    width:52, height:52, borderRadius:26, alignItems:'center', justifyContent:'center', backgroundColor:'black'
  }
});