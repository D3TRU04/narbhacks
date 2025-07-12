import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <SkeletonPlaceholder borderRadius={12} backgroundColor="#e0e7ef">
        <View className="flex-1 items-center px-4 py-8">
          <View style={{ width: 340, height: 220, borderRadius: 20, marginBottom: 24 }} />
          <View style={{ width: 200, height: 30, borderRadius: 8, marginBottom: 16 }} />
          <View style={{ width: 320, height: 50, borderRadius: 12, marginBottom: 16 }} />
          <View style={{ width: 320, height: 50, borderRadius: 12 }} />
        </View>
      </SkeletonPlaceholder>
    );
  }

  return (
    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 items-center bg-gradient-to-b from-primary/10 to-white px-4 py-8">
      <View className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <View className="h-48 w-full bg-gradient-to-tr from-primary/30 to-accent rounded-lg items-center justify-center mb-4">
          <Icon name="map-marker-radius" size={48} color="#0D87E1" />
          <Text className="text-gray-500 text-center mt-2">[Map Placeholder]</Text>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-lg font-semibold">Daily Points</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-2xl font-bold text-primary">+120</Text>
              <Badge color="success">Earned</Badge>
              <Badge color="error">-30</Badge>
            </View>
          </View>
          <Button variant="outline" onPress={() => navigation.navigate('RewardsScreen')}>
            <Icon name="gift-outline" size={18} color="#0D87E1" /> View Rewards
          </Button>
        </View>
        <View className="flex-row gap-2">
          <Button className="flex-1" onPress={() => navigation.navigate('LocationDetailsScreen')}>
            <Icon name="map-marker-check" size={18} color="#fff" /> Check-in at Location
          </Button>
          <Button className="flex-1" variant="outline" onPress={() => navigation.navigate('GroupScreen')}>
            <Icon name="account-group-outline" size={18} color="#0D87E1" /> View Group
          </Button>
        </View>
      </View>
    </MotiView>
  );
} 