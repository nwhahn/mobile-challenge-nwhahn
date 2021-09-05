import React from 'react';
import {ColorValue} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import Theme from '../../theme';
interface IconButtonProps {
  name: string;
  size?: number;
  color?: ColorValue;
  backgroundColor?: ColorValue;
  onPress: () => void;
}

const ClickArea = styled.TouchableOpacity`
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({color}) => color};
  background-color: ${({color}) => color};
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

const IconButton = ({
  name,
  size,
  backgroundColor,
  color,
  onPress,
}: IconButtonProps) => {
  return (
    <ClickArea onPress={onPress} color={backgroundColor} size={size}>
      <Icon name={name} size={size} color={color} />
    </ClickArea>
  );
};

IconButton.defaultProps = {
  size: 20,
  color: Theme.colors.text,
  backgroundColor: 'transparent',
  onPress: () => {},
};
export default IconButton;
