import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { format } from 'react-string-format';

const ko = require('../assets/lang/lang.ko.json');
const en = require('../assets/lang/lang.en.json');
const es = require('../assets/lang/lang.es.json');
const ja = require('../assets/lang/lang.ja.json');
const zh = require('../assets/lang/lang.zh.json');

const LOCALE_KEY = 'locale';
const deviceLanguage = getLocales()[0].languageCode;
const i18n = new I18n({
  ko, en, es, ja, zh
});
// i18n.locale = deviceLanguage;

export default function useTranslation() {
  const [locale, _setLocale] = useState(null);

  const setLocale = (v) => {
    _setLocale(v);
    AsyncStorage.setItem(LOCALE_KEY, v);
  }

  const init = async () => {
    const asl = await AsyncStorage.getItem(LOCALE_KEY);
    if (asl !== null)
      _setLocale(asl);
    else
      _setLocale(deviceLanguage);
  }
  useEffect(() => {
    init()
  }, []);

  return {
    t: scope => i18n.t(scope, { locale }),
    locale,
    setLocale,
    format,
  }
}