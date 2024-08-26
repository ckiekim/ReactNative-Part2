import { Text, View } from "react-native";

import { COLOR } from "@/constants/lotto-color";

export default function LottoBall({ number, isHistorical }) {
  const digit = Math.floor((number - 1) / 10);
  const color = COLOR[`LEVEL${digit}`];
  const size = isHistorical ? 36 : 40;
  const fontSize = isHistorical ? 15 : 16;
  const borderSize = isHistorical ? 18 : 20;
  const marginSize = isHistorical ? 2 : 4;

  return (
    <View
      style={{
        backgroundColor: color, width: size, height: size, 
        borderRadius: borderSize, borderColor: color, borderWidth: 1,
        justifyContent: 'center', alignItems: 'center', marginHorizontal: marginSize,
      }}
    >
      <Text style={{ fontSize, color: 'white', fontWeight: 'bold' }}>{number}</Text>
    </View>
  )
}