import { useCallback, useEffect } from 'react';
import { RefreshControl, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Button from '@/components/Button';
import Spacer from '@/components/Spacer';
import useWebpage from '@/hooks/use-webpage';
import { COLOR } from '@/constants/webpage-color';
const weekNames = '일월화수목금토'.split('');

export default function WebpageScreen() {
  const isFocused = useIsFocused();
  const { sectionData, refreshing, initLink, onRefresh, } = useWebpage();
  const safeAreaInset = useSafeAreaInsets();    // {"bottom": 0, "left": 0, "right": 0, "top": 25}

  useEffect(() => {
    if (isFocused) {
      // console.log('==================== isFocused ========================');
      onRefresh();
    }
  }, [isFocused]);
  
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
      <View style={{ paddingHorizontal: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text>{webpage.title}</Text>
          <Text>{webpage.url}</Text>
        </View>
        <Link href={{ pathname: 'view', params: { uri: webpage.url } }} asChild>
        {/* <Link href="view" asChild> */}
          <Button>
            <View style={styles.viewButton}>
              <Ionicons name="eye-outline" size={16} color="grey" />
            </View>
          </Button>
        </Link>
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
      {sectionData &&
        <SectionList
          sections={sectionData}
          style={{ flex: 1, width: '100%' }}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ListFooterComponent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      }
      <View style={{ position: 'absolute', right: 24, bottom: 24 + safeAreaInset.bottom, 
          flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={initLink}>
          <View style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={24} color="grey" />
          </View>
        </TouchableOpacity>
        <Spacer isHorizontal space={12} />
        <Link href="add" asChild>
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
  viewButton: {
    width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems:'center',
    borderColor: 'grey', borderWidth: 0.6, borderStyle: 'dashed'
  },
  addButton: {
    width:52, height:52, borderRadius:26, alignItems:'center', justifyContent:'center', backgroundColor:'black'
  },
  deleteButton: {
    width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems:'center',
    borderColor: 'grey', borderWidth: 0.6, borderStyle: 'dashed'
  }
});