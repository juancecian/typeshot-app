import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home/HomeScreen';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useColorMode } from 'native-base';
import CreateScreen from '../Post/CreateScreen';
import ProfileScreen from '../User/ProfileScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { colorMode } = useColorMode();

  const colors = {
    light: '#fafaf9',
    dark: '#1f2937'
  };

  return (
    <Tab.Navigator initialRouteName="HomeTab">
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={colorMode === 'light' ? 'black' : 'white'}
            />
          ),
          tabBarStyle: {
            backgroundColor:
              colorMode === 'light' ? colors['light'] : colors['dark'],
            borderTopWidth: 0
          },
          tabBarActiveTintColor: colorMode === 'light' ? 'black' : 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: 'Inicio'
        }}
      />
      <Tab.Screen
        name="CreatePostTab"
        component={CreateScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <AntDesign
              name={focused ? 'pluscircle' : 'pluscircleo'}
              size={size}
              color={colorMode === 'light' ? 'black' : 'white'}
              style={{ marginTop: 5 }}
            />
          ),
          tabBarStyle: {
            backgroundColor:
              colorMode === 'light' ? colors['light'] : colors['dark'],
            borderTopWidth: 0
          },
          tabBarActiveTintColor: colorMode === 'light' ? 'black' : 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: '',
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome
              name={focused ? 'user' : 'user-o'}
              size={size}
              color={colorMode === 'light' ? 'black' : 'white'}
            />
          ),
          tabBarStyle: {
            backgroundColor:
              colorMode === 'light' ? colors['light'] : colors['dark'],
            borderTopWidth: 0
          },
          tabBarActiveTintColor: colorMode === 'light' ? 'black' : 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: 'Perfil'
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
