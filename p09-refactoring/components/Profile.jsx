import { Image, View, Text } from 'react-native';
import styled from 'styled-components/native';
import Margin from './Margin';

const Container = styled.View`
  flex-direction: row; align-items: center
`;
const ProfileImage = styled.Image`
  width: ${(props) => props.size}px; 
  height: ${(props) => props.size}px; 
  borderRadius: ${(props) => props.size * 0.4}px;
`;
const TextContainer = styled.View`
  flex: 1; justify-content: center; margin-left: 10px;
`;
const NameText = styled.Text`
  font-weight: ${props => props.isMe ? 'bold' : 'normal'}; 
  font-size: ${props => props.isMe ? 16 : 15}px;
`;
const IntroText = styled.Text`
  font-size: ${props => props.isMe ? 12 : 11}px; color: grey;
`;

export default function Profile({ uri, name, introduction, isMe }) {
  const size = isMe ? 50 : 40;
  const height = isMe ? 6 : 2;

  return (
    // <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Container>
      <ProfileImage source={{ uri }} size={size} />
      <TextContainer>
        {/* <Text style={{ fontWeight: isMe ? 'bold' : undefined, fontSize: fontSize }}>{name}</Text> */}
        <NameText isMe={isMe}>{name}</NameText>
        {!!introduction && (
          <View>
            <Margin height={height} />
            <IntroText isMe={isMe}>{introduction}</IntroText>
          </View>
        )}
      </TextContainer>
    {/* </View> */}
    </Container>
  );
}