import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getOpenGraphData } from '@/utils/open-graph-tag-utils';
import { getSectionData } from '@/utils/webpage-utils';
import { webpageList } from '@/assets/data/mock-webpage-scrap';

const WEBPAGE_KEY = 'webpage-key';

export default function useWebpage() {
  const [webpageHistory, setWebpageHistory] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const [linkText, setLinkText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [metaData, setMetaData] = useState(null);

  const initData = async () => {
    const result = await AsyncStorage(WEBPAGE_KEY);
    console.log('result:', result);
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

  const saveLink = () => {
    const newPage = { title: metaData.title, url: linkText, createdAt: new Date().toISOString() };
    const newHistory = [...webpageHistory, newPage];
    AsyncStorage.setItem(WEBPAGE_KEY, JSON.stringify(newHistory));
    setWebpageHistory(newHistory);
  }

  return {
    linkText, isLoading, metaData, sectionData,
    setLinkText, addLink, saveLink,
  }
}