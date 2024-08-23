import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import LoadingView from '@/components/LoadingView';
import LangButton from '@/components/LangButton';
import useCookieKey from '@/hooks/use-cookieKey';
import useTransition from '@/hooks/use-translation';
import { SafeAreaView } from 'react-native-safe-area-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const { t, locale, setLocale, format } = useTransition();
  const { cookieKey } = useCookieKey();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [fontsLoaded, error] = useFonts({
  //   'RIDIBatang': require('@/assets/fonts/RIDIBatang.otf'),
  // });

  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  const todayText = format(t('today_is'), y, m, d);

  useEffect(() => {
    if (cookieKey !== '')
      setIsLoaded(true);
  }, [cookieKey]);
  useEffect(() => {
    if (locale !== null)    // && fontsLoaded)
      SplashScreen.hideAsync();
  }, [locale]);    // , fontsLoaded]);

  if (!isLoaded)
    return <LoadingView />

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        // ref={ref}
        resizeMode="cover"
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('@/assets/images/background.json')}
      />

      <SafeAreaView style={{ flex: 1}}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonsContainer}>
            {['ko', 'en', 'es', 'ja', 'zh'].map((country) => (
              <LangButton 
                key={country}
                onPress={() => setLocale(country)}
                isSelected={country === locale}
                text={country.toUpperCase()}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayText: {
    // fontFamily: 'RIDIBatang',
    position: 'absolute',
    top: 70,
    fontSize: 13,
    color: '#8b658f',
  },
  cookieText: {
    // fontFamily: 'RIDIBatang',
    fontSize: 22,
    color: '#372538',
    textAlign: 'center',
    marginHorizontal: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 25,
  },
});