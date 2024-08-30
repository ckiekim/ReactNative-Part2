function twoDigit(num) {
  return num < 10 ? '0'+num : ''+num;
}
function getKey(createdDate) {
  const date = new Date(createdDate);
  return `${date.getFullYear()}-${twoDigit(date.getMonth()+1)}-${twoDigit(date.getDate())}`;
}

export function getSectionData(webpageList) {
  const keys = [];
  webpageList.forEach(item => {
    const date = new Date(item.createdAt);
    const key = `${date.getFullYear()}-${twoDigit(date.getMonth()+1)}-${twoDigit(date.getDate())}`;
    if (keys.filter(k => k === key).length === 0)
      keys.push(key);
  });
  
  const sorted_keys = keys.sort().reverse();
  const sectionData = [];
  sorted_keys.forEach(key => {
    const data = webpageList.filter(item => getKey(item.createdAt) === key);
    sectionData.push({ title: key, data });
  });
  return sectionData;
}
