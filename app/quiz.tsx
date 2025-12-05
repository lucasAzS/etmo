import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/theme';
import { OptionCard } from '@/components/OptionCard';
import { GameButton } from '@/components/GameButton';

export default function QuizScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const question = "A palavra “caminhar” tem qual origem?";
  const options = ["Latin", "Francês", "Grego", "Inglês"];

  return (
    <SafeAreaView style={styles.container}>
       {/* Botão de voltar simples se necessário, ou use o do header nativo */}
      <Text style={styles.headerTitle}>Quis Diário</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
      </View>

      <View style={styles.optionsList}>
        {options.map((option) => (
          <OptionCard
            key={option}
            label={option}
            selected={selected === option}
            onPress={() => setSelected(option)}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <GameButton 
          title="Confirmar" 
          onPress={() => {
            if (selected) {
                // Lógica futura aqui
                router.back(); // Volta para a home
            }
          }} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background, padding: 20 },
  headerTitle: { fontSize: 24, color: Colors.dark.text, fontFamily: 'serif', fontStyle: 'italic', textAlign: 'center', marginBottom: 40, marginTop: 10 },
  questionContainer: { backgroundColor: Colors.dark.card, padding: 20, borderRadius: 12, marginBottom: 30 },
  questionText: { color: Colors.dark.text, fontSize: 20, textAlign: 'center', fontStyle: 'italic', lineHeight: 28 },
  optionsList: { flex: 1 },
  footer: { marginBottom: 20 },
});