import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { Button } from '../components/Button';
import { Spinner } from '../components/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const tabs = ['Login', 'Sign Up', 'Forgot Password'];

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState('Login');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleAuth = async () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
      if (onboardingComplete === 'true') {
        navigation.navigate('MainTabs');
      } else {
        navigation.navigate('OnboardingScreen');
      }
    }, 1200);
  };

  return (
    <View className="flex-1 items-center justify-center bg-muted px-4">
      <View className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-md">
        <View className="flex-row justify-center mb-6 gap-2">
          {tabs.map(tab => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'primary' : 'outline'}
              onPress={() => setActiveTab(tab)}
              className="flex-1 mx-1"
            >
              {tab}
            </Button>
          ))}
        </View>
        <AnimatePresence>
          {activeTab === 'Login' && (
            <MotiView
              key="login"
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              transition={{ type: 'timing', duration: 300 }}
              style={{ gap: 12 }}
            >
              <TextInput className="w-full p-3 rounded border mb-2" placeholder="Email" keyboardType="email-address" />
              <TextInput className="w-full p-3 rounded border mb-2" placeholder="Password" secureTextEntry />
              <Button onPress={() => { setLoading(true); setTimeout(() => setLoading(false), 1200); }} loading={loading} className="w-full">Login</Button>
            </MotiView>
          )}
          {activeTab === 'Sign Up' && (
            <MotiView
              key="signup"
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              transition={{ type: 'timing', duration: 300 }}
              style={{ gap: 12 }}
            >
              <TextInput className="w-full p-3 rounded border mb-2" placeholder="Email" keyboardType="email-address" />
              <TextInput className="w-full p-3 rounded border mb-2" placeholder="Password" secureTextEntry />
              <TextInput className="w-full p-3 rounded border mb-2" placeholder="Username" />
              <TextInput className="w-full p-3 rounded border mb-2" placeholder="Profile Photo URL" />
              <Button onPress={() => { setLoading(true); setTimeout(() => setLoading(false), 1200); }} loading={loading} className="w-full">Sign Up</Button>
            </MotiView>
          )}
          {activeTab === 'Forgot Password' && (
            <MotiView
              key="forgot"
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
              transition={{ type: 'timing', duration: 300 }}
              style={{ gap: 12 }}
            >
              <TextInput className="w-full p-3 rounded border mb-2" placeholder="Email" keyboardType="email-address" />
              <Button onPress={() => { setLoading(true); setTimeout(() => setLoading(false), 1200); }} loading={loading} className="w-full">Send Reset Link</Button>
            </MotiView>
          )}
        </AnimatePresence>
      </View>
    </View>
  );
} 