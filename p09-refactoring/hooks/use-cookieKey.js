import { useEffect, useState } from 'react';

const getRandomCookieKey = () => {
  const cookieLen = 15;
  const randomNum = Math.ceil(Math.random() * cookieLen);
  return `cookie_${randomNum}`;
}

export default function useCookieKey() {
  const [cookieKey, setCookieKey] = useState('');

  useEffect(() => {
    const randomCookieKey = getRandomCookieKey();
    setCookieKey(randomCookieKey);
  }, []);

  return {
    cookieKey,
  };
}