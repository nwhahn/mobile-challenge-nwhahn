import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import RangeSlider from 'rn-range-slider';
import theme from '../../theme';

const thumbRadius = 12;
const Thumb = styled.View`
  width: ${thumbRadius * 2}px;
  height: ${thumbRadius * 2}px;
  border-radius: ${thumbRadius}px;
  border-width: 2px;
  border-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  background-color: ${theme.colors.primary};
`;

const Label = styled.Text`
  color: ${theme.colors.text};
`;
const LabelWrapper = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 8px;
  padding-bottom: ${({paddingBottom}) => paddingBottom || 16}px;
`;
const Notch = styled.View`
  width: 8px;
  height: 8px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: ${theme.colors.primary};
  border-left-width: 4px;
  border-right-width: 4px;
  border-top-width: 8px;
`;
const Rail = styled.View`
  flex: 1;
  height: 4px;
  border-radius: 4px;
  background-color: ${theme.colors.text};
`;

const RailSelected = styled.View`
  height: 4px;
  border-radius: 4px;
  background-color: ${theme.colors.primary};
`;

const SliderWrapper = styled.View`
  padding-top: 24px;
`;

interface SliderProps {
  min: number;
  max: number;
  initialMin?: number;
  initialMax?: number;
  label?: string;
  setMin: (min: number) => void;
  setMax: (min: number) => void;
  renderValue?: (val: number) => string | number;
}

const Slider = ({
  min = 0,
  max = 100,
  initialMin = min,
  initialMax = max,
  label,
  setMin = () => {},
  setMax = () => {},
  renderValue,
}: SliderProps) => {
  const [low, setLow] = useState(initialMin || min);
  const [high, setHigh] = useState(initialMax || max);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    value => <Label>{renderValue ? renderValue(value) : value}</Label>,
    [renderValue],
  );
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback(
    (l, h) => {
      setLow(l);
      setMin(l);
      setHigh(h);
      setMax(h);
    },
    [setMax, setMin],
  );
  return (
    <SliderWrapper>
      {label && (
        <LabelWrapper paddingBottom={24}>
          <Label>{label}</Label>
        </LabelWrapper>
      )}
      <RangeSlider
        min={min}
        max={max}
        low={low}
        high={high}
        step={Math.floor((max - min) / 100)}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
      <LabelWrapper paddingBottom={8}>
        {renderLabel(low)}
        {renderLabel(high)}
      </LabelWrapper>
    </SliderWrapper>
  );
};

export default Slider;
