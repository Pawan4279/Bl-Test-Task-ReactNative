/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  View,
} from 'react-native';



type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
 
  return (
    <View>
      <Text>Initial commite</Text>
    </View>
  );
}


export default App;
