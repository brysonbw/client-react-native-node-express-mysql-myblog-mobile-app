import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';

import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import CreateScreen from './screens/CreateScreen';
import ViewScreen from './screens/ViewScreen';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  options={{ header: () => <Header title="MyBlog" /> }} name="home" component={HomeScreen} />
        <Stack.Screen options={{ header: () => <Header title="MyBlog" /> }} name="create blog" component={CreateScreen} />
        <Stack.Screen options={{ header: () => <Header title="MyBlog" /> }} name="view blog" component={ViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;