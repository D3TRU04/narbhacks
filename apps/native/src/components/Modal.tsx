import React from 'react';
import { Modal as RNModal, View, TouchableOpacity, Text } from 'react-native';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ open, onClose, children }: Props) {
  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/40 items-center justify-center">
        <View className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 min-w-[300px] relative">
          <TouchableOpacity onPress={onClose} className="absolute top-2 right-2 z-10">
            <View><Text className="text-gray-400 text-2xl">×</Text></View>
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </RNModal>
  );
} 