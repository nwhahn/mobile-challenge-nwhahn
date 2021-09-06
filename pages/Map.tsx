import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import Svg, {G, Text, Circle} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';
import {useAppSelector} from '../redux/hooks';
import ZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {IconButton} from '../components/buttons';
import {LandingListItem} from '../components/cards';
import {MeteoriteLanding} from '../types';
const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ZoomButtonsWrapper = styled.View`
  background-color: ${({color}) => color};
  position: absolute;
  border-radius: 8px;
  padding: 8px;
  bottom: 16px;
  right: 16px;
  z-index: 3;
`;

const DirectionButtonsWrapper = styled.View`
  background-color: ${({color}) => color};
  position: absolute;
  border-radius: 32px;
  padding: 8px;
  bottom: 16px;
  left: 16px;
  z-index: 3;
  flex-direction: row;
`;
const LeftButtonWrapper = styled.View`
  justify-content: center;
`;

const RightButtonWrapper = styled.View`
  justify-content: center;
`;

const VerticalButtonsWrapper = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;
const LandingDataWrapper = styled.View`
  top: 16px;
  position: absolute;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  z-index: 1;
`;
const Map = () => {
  const {colors} = useTheme();
  const zoomableViewRef = useRef<ZoomableView>();
  const data = useAppSelector(
    ({data: {mapBox, landings, landingIdIndexes, filteredItems, search}}) => ({
      mapBox,
      landings,
      filteredItems: search.enabled ? filteredItems : landings,
      landingIdIndexes,
    }),
  );

  const {minX, minY, maxX, maxY} = data.mapBox;
  const [landingData, setLandingData] = useState<MeteoriteLanding | null>(null);
  const getLandingById = (id: string) => {
    const {landings, landingIdIndexes} = data;
    return landings[landingIdIndexes[id]];
  };

  return (
    <Wrapper>
      {landingData && (
        <LandingDataWrapper>
          <LandingListItem data={landingData} />
        </LandingDataWrapper>
      )}
      <DirectionButtonsWrapper color={colors.primary}>
        <LeftButtonWrapper>
          <IconButton
            name={'arrow-back-outline'}
            onPress={() => {
              zoomableViewRef.current!.moveBy(-30, 0);
            }}
          />
        </LeftButtonWrapper>
        <VerticalButtonsWrapper>
          <IconButton
            name={'arrow-up-outline'}
            onPress={() => {
              zoomableViewRef.current!.moveBy(0, -30);
            }}
          />
          <IconButton
            name={'arrow-down-outline'}
            onPress={() => {
              zoomableViewRef.current!.moveBy(0, 30);
            }}
          />
        </VerticalButtonsWrapper>
        <RightButtonWrapper>
          <IconButton
            name={'arrow-forward-outline'}
            onPress={() => {
              zoomableViewRef.current!.moveBy(30, 0);
            }}
          />
        </RightButtonWrapper>
      </DirectionButtonsWrapper>
      <ZoomButtonsWrapper color={colors.primary}>
        <IconButton
          name={'add-outline'}
          backgroundColor={colors.primary}
          onPress={() => {
            zoomableViewRef.current!.zoomBy(0.5);
          }}
        />
        <IconButton
          name={'remove-outline'}
          backgroundColor={colors.primary}
          onPress={() => zoomableViewRef.current!.zoomBy(-0.5)}
        />
      </ZoomButtonsWrapper>
      <ZoomableView
        ref={zoomableViewRef}
        initialZoom={2}
        maxZoom={10}
        minZoom={1}
        zoomStep={0.25}
        bindToBorders={true}
        initialOffsetX={maxX - minX / 2}
        initialOffsetY={maxY - minY / 2}>
        <Svg
          width={maxX - minX * 10}
          height={maxY - minY * 10}
          viewBox={`0 0 ${(maxX - minX) * 5} ${(maxY - minY) * 5}`}>
          {data.filteredItems.map(({id, geolocation, name}) => {
            if (!geolocation) {
              return null;
            }
            const {coordinates} = geolocation;
            const [x, y] = coordinates;
            return (
              <G
                key={id}
                id={`landing-${id}`}
                origin={`${(x - minX) * 5},${(y - minY) * 5}`}>
                <Circle
                  key={id}
                  cx={(x - minX) * 5}
                  cy={(y - minY) * 5}
                  r={3}
                  fill={landingData?.id === id ? colors.text : colors.primary}
                  strokeWidth={
                    10 * zoomableViewRef?.current?.state?.zoomLevel || 1
                  }
                  onPress={() => {
                    setLandingData(getLandingById(id));
                  }}
                />
                <Text
                  x={(x - minX) * 5}
                  y={
                    (y - minY) * 5 +
                    10 *
                      ((zoomableViewRef?.current?.state?.zoomLevel || 1) / 1.5)
                  }
                  fill={colors.text}
                  stroke={'none'}
                  textAnchor={'middle'}
                  fontSize={
                    8 *
                    ((zoomableViewRef?.current?.state?.zoomLevel || 1) / 1.5)
                  }>
                  {name}
                </Text>
              </G>
            );
          })}
        </Svg>
      </ZoomableView>
    </Wrapper>
  );
};

export default Map;
