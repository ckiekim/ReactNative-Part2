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

  const initData = async () => {
    const result = await AsyncStorage.getItem(WEBPAGE_KEY);
    // console.log('initData result:', result);
    if (result !== null)
      setWebpageHistory(JSON.parse(result));
    else
      setWebpageHistory(webpageList);
  }
  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (webpageHistory !== null) {
      const result = getSectionData(webpageHistory);
      console.log('sectionData:', result);
      setSectionData(result);
    }
  }, [webpageHistory]);

  const addLink = async () => {
    setIsLoading(true);
    const result = await getOpenGraphData(linkText);
    setMetaData(result);
    // console.log(result);
    setIsLoading(false);
    setLinkText('');
  }
  
  const saveLink = async () => {
    const newPage = { title: metaData?.site_name || metaData.title, url: metaData.url, createdAt: new Date().toISOString() };
    const newHistory = [...webpageHistory, newPage];
    const _dump = await AsyncStorage.setItem(WEBPAGE_KEY, JSON.stringify(newHistory));
    setWebpageHistory(newHistory);
    setMetaData(null);
    console.log('before navigate');
    navigation.navigate('index', );
  }
  const gotoHome = () => {
    setMetaData(null);
    navigation.goBack();
  }

  const initLink = async () => {
    const _dump = await AsyncStorage.setItem(WEBPAGE_KEY, JSON.stringify(webpageList));
    setWebpageHistory(webpageList);
  }

  return {
    linkText, isLoading, metaData, sectionData,
    setLinkText, addLink, saveLink, gotoHome, initLink,
  }
}