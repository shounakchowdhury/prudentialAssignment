import React from 'react';
import type { Node } from 'react';
import { SafeAreaView } from 'react-native';
import Home from './Home';

const App: () => Node = () => {

  return (
    <SafeAreaView>
      <Home/>
    </SafeAreaView>
  );
};

export default App;
