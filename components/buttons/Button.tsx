import React from 'react';
import styled from 'styled-components/native';
import theme from '../../theme';
interface ButtonProps {
  label: string;
  onPress: (...arg: [any]) => void;
  secondary?: boolean;
}

const ClickArea = styled.TouchableOpacity`
  border-radius: 6px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({secondary}) =>
    secondary ? theme.colors.primary : theme.colors.card};
  background-color: ${({secondary}) =>
    secondary ? theme.colors.card : theme.colors.primary};
  padding: ${({secondary}) => (secondary ? '6px 14px' : '8px 16px')};
  display: flex;
  text-align: center;
  align-self: center;
  margin: 8px 4px;
`;

const Label = styled.Text`
  color: ${theme.colors.text};
`;

const Button = ({label, secondary, onPress = () => {}}: ButtonProps) => {
  return (
    <ClickArea onPress={onPress} secondary={secondary}>
      <Label>{label}</Label>
    </ClickArea>
  );
};

export default Button;
