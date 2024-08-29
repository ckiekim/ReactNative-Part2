import { Pressable } from "react-native";

export default function Button(props) {
  return (
    <Pressable
      {...props}
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      onPress={props.onPress}
      hitSlop={props.hitSlop ?? {left: 0, top: 0, bottom: 0}}
      style={{
        paddingHorizontal: props.paddingHorizontal,
        paddingVertical: props.paddingVertical
      }}
    >
      {props.children}
    </Pressable>
  );
}