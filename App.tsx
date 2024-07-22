
import React from 'react';
import type {PropsWithChildren} from 'react';
import {Text, View} from 'react-native';
import MainNavigation from './src/mainNavigation/MainNavigation';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  return <MainNavigation />; //navigation
}

export default App;
