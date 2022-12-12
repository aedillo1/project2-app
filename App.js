import * as eva from '@eva-design/eva';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout } from '@ui-kitten/components';
import { ApplicationProvider } from '@ui-kitten/components/theme';
import CreateNote from './screens/CreateNote';
import AllNotes from './screens/AllNotes';
import Note from './screens/Note';
import Options from './screens/Options';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Create'/>
    <BottomNavigationTab title='All Notes' />
    <BottomNavigationTab title='Options' />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen
      name='Create'
      component={CreateNote}
      options={{
        title: 'Creating note...',
      }}
    />
    <Screen
      name='AllNotes'
      component={AllNotes}
      options={{
        title: 'Notes',
      }}
    />
    <Screen
      name='Options'
      component={Options}
      options={{
        title: 'Options',
      }}
    />
    <Screen
      name='Note'
      component={Note}
      options={{
        title: 'Note'
      }}
    />
  </Navigator>
);

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
