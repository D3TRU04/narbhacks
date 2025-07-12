import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthScreen from "../screens/AuthScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import DashboardScreen from "../screens/DashboardScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import GroupScreen from "../screens/GroupScreen";
import RewardsScreen from "../screens/RewardsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = '';
          if (route.name === 'DashboardScreen') iconName = focused ? 'home' : 'home-outline';
          if (route.name === 'GroupScreen') iconName = focused ? 'account-group' : 'account-group-outline';
          if (route.name === 'RewardsScreen') iconName = focused ? 'gift' : 'gift-outline';
          if (route.name === 'SettingsScreen') iconName = focused ? 'cog' : 'cog-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0D87E1',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18, height: 60 },
      })}
    >
      <Tab.Screen name="DashboardScreen" component={DashboardScreen} />
      <Tab.Screen name="GroupScreen" component={GroupScreen} />
      <Tab.Screen name="RewardsScreen" component={RewardsScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="LocationDetailsScreen" component={LocationDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
