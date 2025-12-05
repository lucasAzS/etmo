import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
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
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: '#1A1A1A', // Texto preto para contraste no amarelo
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic', // O charme da fonte do design
  },
});