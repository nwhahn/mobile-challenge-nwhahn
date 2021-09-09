/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {BarChart, LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';

import ChartCard from '../components/cards/ChartCard';
import {useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';
import {useTheme} from '@react-navigation/native';

const Wrapper = styled.View`
  flex: 1;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`;
const StyledFlatList = styled.FlatList`
  width: 100%;
`;
const Separator = styled.View`
  height: 16px;
`;
const ChartsScreen = () => {
  const {colors} = useTheme();
  const {text, primary} = colors;
  const landings = useAppSelector(
    ({
      data: {
        landings: fullLandings,
        search: {query = ''},
        filteredItems,
      },
    }: RootState) => (query?.length > 0 ? filteredItems : fullLandings),
  );
  const renderYearChart = () => {
    const data = landings
      .map(({year}) => new Date(year).getFullYear())
      .filter(item => !isNaN(item));
    const dataMap = data.reduce(
      (map: {[year: number]: number} = {}, num): {[year: number]: number} => {
        map[num] = (map[num] || 0) + 1;
        return map;
      },
      {},
    );
    const uniqueData = Object.keys(dataMap).map(value => parseInt(value, 10));
    const maxYear = Math.max(...uniqueData);
    const minYear = Math.min(...uniqueData);
    const maxCount = Math.max(...Object.values(dataMap));
    const minCount = 0;
    const NumberOfPoints = 10;
    return (
      <>
        <YAxis
          data={data}
          style={{height: 176, position: 'absolute', bottom: 40, left: 8}}
          contentInset={{top: 4}}
          svg={{
            fill: `${text}50`,
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(_, index) =>
            Math.floor(((maxCount - minCount) / NumberOfPoints + 1) * index) +
            minCount
          }
        />
        <LineChart
          style={{height: 200, flex: 1, paddingLeft: 8}}
          data={uniqueData}
          yAccessor={({item}) => dataMap[item]}
          svg={{stroke: primary}}
          contentInset={{top: 20, bottom: 20}}>
          <Grid svg={{stroke: `${text}50`}} belowChart />
        </LineChart>
        <XAxis
          data={Array.from({length: NumberOfPoints})}
          formatLabel={(_, index) =>
            Math.floor(
              ((maxYear - minYear) / (NumberOfPoints - 1)) * index + minYear,
            )
          }
          contentInset={{left: 18, right: 12}}
          svg={{fontSize: 10, fill: `${text}50`}}
        />
      </>
    );
  };

  const generateMinGroupNumbers = (
    data: Array<number>,
    NumberOfPoints: number,
  ): Array<number> => {
    const maxMass = Math.max(...data); // Remove top items in case theres wild out of range numbers

    const increment = maxMass / (NumberOfPoints - 1);
    return Array.from({length: NumberOfPoints}).map((_, index) =>
      Math.floor(increment * index),
    );
  };
  const generateGroup = (
    data: Array<number>,
    minGroupNumbers: Array<number>,
    NumberOfPoints: number,
  ) =>
    data.reduce(
      (grouped: Array<number> = [], num): Array<number> => {
        const index = minGroupNumbers
          .concat([Infinity])
          .findIndex(el => el > num);
        grouped[index - 1] = (grouped?.[index - 1] || 0) + 1;
        return grouped;
      },
      Array.from({length: NumberOfPoints}).map(() => 0),
    );

  const renderMassDistribution = () => {
    const data = landings
      .filter(({mass}) => mass)
      .map(({mass}) => parseInt(mass, 10))
      .sort((a, b) => a - b);
    const NumberOfPoints = 15;
    let minGroupNumbers = generateMinGroupNumbers(data, NumberOfPoints);

    let grouped = generateGroup(data, minGroupNumbers, NumberOfPoints);

    return (
      <>
        <YAxis
          data={grouped}
          style={{height: 176, position: 'absolute', bottom: 40, left: 4}}
          contentInset={{top: 4}}
          svg={{
            fill: `${text}50`,
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={value => value}
        />
        <BarChart
          style={{height: 200, flex: 1, paddingLeft: 12}}
          data={grouped}
          svg={{stroke: primary, fill: primary}}
          contentInset={{top: 20, bottom: 20, left: 8}}>
          <Grid svg={{stroke: `${text}50`}} belowChart />
        </BarChart>
        <XAxis
          data={minGroupNumbers}
          formatLabel={value => {
            const val = minGroupNumbers[value];
            if (val / 1000000 > 1) {
              return `${(val / 1000000).toFixed(0)}Mg`;
            }
            if (val / 1000 > 1) {
              return `${val / 1000}kg`;
            }
            return `${val}g`;
          }}
          contentInset={{left: 18, right: 12}}
          svg={{fontSize: 8, fill: `${text}50`}}
        />
      </>
    );
  };
  const items = [
    {label: 'Year', renderChart: renderYearChart},
    {label: 'Mass Distribution', renderChart: renderMassDistribution},
  ];
  return (
    <Wrapper>
      <StyledFlatList
        data={items}
        keyExtractor={item => item.label}
        renderItem={({item}) => <ChartCard {...item} />}
        ItemSeparatorComponent={Separator}
      />
    </Wrapper>
  );
};

export default ChartsScreen;
