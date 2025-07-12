import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Toggle } from '../components/Toggle';

const mockLocation = {
  name: 'Planet Fitness',
  type: 'Gym',
  impact: '+20',
  impactType: 'positive',
  alternatives: ['Anytime Fitness', 'Local Park', 'Yoga Studio'],
};

export default function LocationDetailsScreen() {
  const [favorite, setFavorite] = useState(false);
  const [avoid, setAvoid] = useState(false);

  return (
    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 items-center bg-muted px-4 py-8">
      <View className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <Text className="text-2xl font-bold mb-2">{mockLocation.name}</Text>
        <Badge color="primary" className="mb-2">{mockLocation.type}</Badge>
        <View className="mb-4">
          <Text className="font-semibold">Impact on Points: </Text>
          <Badge color={mockLocation.impactType === 'positive' ? 'success' : 'error'}>{mockLocation.impact}</Badge>
        </View>
        <View className="flex-row gap-4 mb-4">
          <Toggle checked={favorite} onChange={setFavorite} label="Favorite" />
          <Toggle checked={avoid} onChange={setAvoid} label="Avoid" />
        </View>
        <View>
          <Text className="font-semibold mb-2">Suggested Alternatives Nearby</Text>
          {mockLocation.alternatives.map((alt) => (
            <Text key={alt} className="ml-4 text-gray-700 dark:text-gray-200">• {alt}</Text>
          ))}
        </View>
      </View>
    </MotiView>
  );
} 