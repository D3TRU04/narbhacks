import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfettiCannon from 'react-native-confetti-cannon';

const values = ['Health', 'Growth', 'Community', 'Fun', 'Discipline', 'Balance'];
const goals = ['Lose Weight', 'Gain Muscle', 'Eat Healthier', 'Sleep Better', 'Reduce Stress'];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // If onboarding is already complete, skip
    AsyncStorage.getItem('onboardingComplete').then(val => {
      if (val === 'true') navigation.navigate('DashboardScreen');
    });
  }, []);

  const completeOnboarding = async () => {
    setShowConfetti(true);
    await AsyncStorage.setItem('onboardingComplete', 'true');
    setTimeout(() => {
      setShowConfetti(false);
      navigation.navigate('DashboardScreen');
    }, 1800);
  };

  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-b from-primary/10 to-white px-4">
      <View className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-md">
        <AnimatePresence>
          {step === 0 && (
            <MotiView key="welcome" from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0, translateY: -20 }} transition={{ type: 'timing', duration: 300 }}>
              <Text className="text-2xl font-bold mb-4">Welcome to Narby!</Text>
              <Text className="mb-6">Your journey to healthier habits starts here. Let's set up your experience.</Text>
              <Button className="w-full" onPress={() => setStep(1)}>Get Started</Button>
            </MotiView>
          )}
          {step === 1 && (
            <MotiView key="values" from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0, translateY: -20 }} transition={{ type: 'timing', duration: 300 }}>
              <Text className="text-xl font-semibold mb-2">Select your personal values</Text>
              <View className="flex-row flex-wrap gap-2 mb-4">
                {values.map(val => (
                  <Button
                    key={val}
                    variant={selectedValues.includes(val) ? 'primary' : 'outline'}
                    onPress={() => setSelectedValues(v => v.includes(val) ? v.filter(x => x !== val) : [...v, val])}
                  >
                    {val}
                  </Button>
                ))}
              </View>
              <Button className="w-full" onPress={() => setStep(2)} disabled={selectedValues.length === 0}>Next</Button>
            </MotiView>
          )}
          {step === 2 && (
            <MotiView key="goals" from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0, translateY: -20 }} transition={{ type: 'timing', duration: 300 }}>
              <Text className="text-xl font-semibold mb-2">Select your health goals</Text>
              <View className="flex-row flex-wrap gap-2 mb-4">
                {goals.map(goal => (
                  <Button
                    key={goal}
                    variant={selectedGoals.includes(goal) ? 'primary' : 'outline'}
                    onPress={() => setSelectedGoals(g => g.includes(goal) ? g.filter(x => x !== goal) : [...g, goal])}
                  >
                    {goal}
                  </Button>
                ))}
              </View>
              <Button className="w-full" onPress={() => setStep(3)} disabled={selectedGoals.length === 0}>Next</Button>
            </MotiView>
          )}
          {step === 3 && (
            <MotiView key="group" from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} exit={{ opacity: 0, translateY: -20 }} transition={{ type: 'timing', duration: 300 }}>
              <Text className="text-xl font-semibold mb-2">Create or Join a Group</Text>
              <TextInput className="w-full p-3 rounded border mb-2" placeholder="Group Name" value={groupName} onChangeText={setGroupName} />
              <TextInput className="w-full p-3 rounded border mb-2" placeholder="Description" value={groupDesc} onChangeText={setGroupDesc} />
              <Button className="w-full mb-2" onPress={completeOnboarding}>Create Group</Button>
              <Button className="w-full" variant="outline" onPress={completeOnboarding}>Join with Invite Link</Button>
            </MotiView>
          )}
        </AnimatePresence>
        {showConfetti && <ConfettiCannon count={80} origin={{x: 180, y: 0}} fadeOut fallSpeed={2500} explosionSpeed={350} />} 
      </View>
    </View>
  );
} 