import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

const mockRewards = {
  points: 120,
  nextReward: 200,
  rewards: [
    { name: 'Free Smoothie', cost: 100 },
    { name: 'Gym Pass', cost: 200 },
  ],
};

export default function RewardsScreen() {
  return (
    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 items-center bg-muted px-4 py-8">
      <View className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <Text className="text-2xl font-bold mb-2">Rewards</Text>
        <View className="mb-4 flex-row items-center">
          <Text className="font-semibold">Points Earned: </Text>
          <Badge color="success">{mockRewards.points}</Badge>
        </View>
        <View className="mb-4">
          <Text className="font-semibold">Progress to Next Reward:</Text>
          <View className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <View className="bg-primary h-3 rounded-full" style={{ width: `${(mockRewards.points / mockRewards.nextReward) * 100}%` }} />
          </View>
          <Text className="text-xs text-gray-500">{mockRewards.points} / {mockRewards.nextReward} pts</Text>
        </View>
        <View className="mb-4">
          <Text className="font-semibold mb-2">Redeem Rewards</Text>
          {mockRewards.rewards.map((r) => (
            <Button key={r.name} className="w-full mb-2" disabled={mockRewards.points < r.cost}>
              {r.name} ({r.cost} pts)
            </Button>
          ))}
        </View>
      </View>
    </MotiView>
  );
} 