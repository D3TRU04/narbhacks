import React from 'react';
import { View, Text, Image } from 'react-native';
import { MotiView } from 'moti';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const mockGroup = {
  name: 'Wellness Warriors',
  description: 'A group focused on healthy living and mutual support.',
  members: [
    { name: 'Alice', points: 120, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Bob', points: 90, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Charlie', points: 60, avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  ],
  values: ['Health', 'Community'],
  goals: ['Lose Weight', 'Eat Healthier'],
  inviteLink: 'https://narby.app/invite/abc123',
};

export default function GroupScreen() {
  const navigation = useNavigation();
  return (
    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 items-center bg-muted px-4 py-8">
      <View className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <Text className="text-2xl font-bold mb-2">{mockGroup.name}</Text>
        <Text className="mb-4 text-gray-700 dark:text-gray-200">{mockGroup.description}</Text>
        <View className="mb-4 flex-row flex-wrap items-center">
          <Text className="font-semibold">Shared Values: </Text>
          {mockGroup.values.map((val) => <Badge key={val} className="mr-2 mb-1">{val}</Badge>)}
        </View>
        <View className="mb-4 flex-row flex-wrap items-center">
          <Text className="font-semibold">Group Goals: </Text>
          {mockGroup.goals.map((goal) => <Badge key={goal} color="secondary" className="mr-2 mb-1">{goal}</Badge>)}
        </View>
        <View className="mb-4">
          <Text className="font-semibold mb-2">Leaderboard</Text>
          {mockGroup.members.map((m, i) => (
            <View key={m.name} className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center gap-2">
                <Image source={{ uri: m.avatar }} className="w-8 h-8 rounded-full mr-2" />
                <Text>{m.name}</Text>
              </View>
              <Text className="font-bold">{m.points} pts</Text>
            </View>
          ))}
        </View>
        <View className="mb-2">
          <Button className="w-full mb-2" onPress={() => navigation.navigate('SettingsScreen')}>
            <Icon name="account-plus" size={18} color="#fff" /> Invite Members (Share Link)
          </Button>
          <Button className="w-full" variant="outline" onPress={() => navigation.navigate('SettingsScreen')}>
            <Icon name="qrcode" size={18} color="#0D87E1" /> Show QR Code
          </Button>
        </View>
        <Text className="text-xs text-gray-400 mt-2">Invite link: {mockGroup.inviteLink}</Text>
      </View>
    </MotiView>
  );
} 