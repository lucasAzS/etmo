import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

interface OptionCardProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function OptionCard({ label, selected, onPress }: OptionCardProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        selected && styles.cardSelected
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.card,
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: Colors.dark.primary, // Borda amarela ao selecionar
  },
  text: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  textSelected: {
    color: Colors.dark.primary,
  },
});