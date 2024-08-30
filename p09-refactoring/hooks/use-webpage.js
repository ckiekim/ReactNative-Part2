import { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getOpenGraphData } from '@/utils/open-graph-tag-utils';
import { getSectionData } from '@/utils/webpage-utils';
import { webpageList } from '@/assets/data/mock-webpage-scrap';

const WEBPAGE_KEY = 'webpage-key';

export default function useWebpage() {
  const navigation = useNavigation();
  const [webpageHistory, setWebpageHistory] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [linkText, setLinkText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [metaData, setMetaData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const initData = async () => {
    try {
      const result = await AsyncStorage.getItem(WEBPAGE_KEY);
      if (result !== null)
          setWebpageHistory(JSON.parse(result));
      else
        setWebpageHistory(webpageList);
    } catch(error) {
      console.error('Failed to fetch data from AsyncStorage', error);
    }
  }
  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (webpageHistory !== null) {
      // console.log('webpageHistory length:', webpageHistory.length);
      const result = getSectionData(webpageHistory);
      // console.log('sectionData:', result);
      setSectionData(result);
      setRefreshing(false);
    }
  }, [webpageHistory]);

  const addLink = async () => {
    setIsLoading(true);
    const result = await getOpenGraphData(linkText);
    setMetaData(result);
    // console.log(result);
    setIsLoading(false);
    setLinkText('');
  };
  
  const saveLink = async () => {
    const newPage = { title: metaData?.site_name || metaData.title, url: metaData.url, createdAt: new Date().toISOString() };
    const newHistory = [...webpageHistory, newPage];
    // console.log('saveLink() newHistory length:', newHistory.length);
    await AsyncStorage.setItem(WEBPAGE_KEY, JSON.stringify(newHistory));
    setWebpageHistory(newHistory);
    setMetaData(null);
    navigation.navigate('index');
  };

  const gotoHome = () => {
    setMetaData(null);
    navigation.goBack();
  };

  const initLink = async () => {
    await AsyncStorage.setItem(WEBPAGE_KEY, JSON.stringify(webpageList));
    setWebpageHistory(webpageList);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await initData();
    } catch(error) {
      console.error('Error during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  }

  return {
    linkText, isLoading, metaData, sectionData, refreshing,
    setLinkText, addLink, saveLink, gotoHome, initLink, onRefresh,
  };
}