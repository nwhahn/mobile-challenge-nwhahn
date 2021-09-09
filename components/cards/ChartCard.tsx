import React from 'react';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import theme from '../../theme';
interface ChartCardProps {
  label: string;
  renderChart: Function;
}

const Wrapper = styled.View`
  background-color: ${({color}) => color};
  padding: 16px;
  border-radius: 8px;
`;

const Header = styled.Text`
  color: ${theme.colors.text};
  align-self: flex-end;
  font-weight: bold;
  font-size: 20px;
`;

const ChartCard = ({label, renderChart = () => null}: ChartCardProps) => {
  const {colors} = useTheme();
  const {card} = colors;
  return (
    <Wrapper color={card}>
      <Header>{label}</Header>
      {renderChart()}
    </Wrapper>
  );
};

ChartCard.defaultProps = {
  variant: 'line',
  label: 'Chart',
};

export default ChartCard;
