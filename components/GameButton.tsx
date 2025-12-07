import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../constants/theme';

interface GameButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function GameButton({ title, onPress, style }: GameButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.dark.primary,
    width: '100%',
    paddingVertical: 18,
    borderRadius: 999, // Pill shape
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    color: '#000000', // Black text on yellow background
    fontSize: 20,
    fontWeight: '800', // Extra bold
    fontFamily: 'serif',
    fontStyle: 'italic',
  },
});