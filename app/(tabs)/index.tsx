import { GameButton } from '@/components/GameButton';
import { GameCard } from '@/components/GameCard';
import { OptionCard } from '@/components/OptionCard';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ETIMUS_WORDS, WordData } from '@/constants/etimus-data';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EtimusScreen() {
  const [view, setView] = useState<'lobby' | 'game'>('lobby');
  const [currentWord, setCurrentWord] = useState<WordData | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (view === 'game') {
      loadNewRound();
    }
  }, [view]);

  const loadNewRound = () => {
    // Pick a random word
    const randomWord = ETIMUS_WORDS[Math.floor(Math.random() * ETIMUS_WORDS.length)];
    setCurrentWord(randomWord);
    setSelected(null);

    // Generate options: Correct synonym + 3 distractors from other words
    const correct = randomWord.synonyms[0];
    const distractors = ETIMUS_WORDS
      .filter(w => w.id !== randomWord.id)
      .map(w => w.synonyms[0])
      .slice(0, 3);

    const allOptions = [correct, ...distractors].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleConfirm = () => {
    if (!selected || !currentWord) return;

    const isCorrect = currentWord.synonyms.includes(selected);

    if (isCorrect) {
      Alert.alert("Correto!", `Sinônimo: ${selected}\nSignificado: ${currentWord.meaning}`, [
        { text: "Próximo", onPress: loadNewRound }
      ]);
    } else {
      Alert.alert("Incorreto", "Tente novamente.");
    }
  };

  const LobbyView = () => (
    <ScrollView contentContainerStyle={styles.lobbyContainer}>
      <View style={styles.header}>
        <ThemedText type="serifTitle" style={styles.lobbyTitle}>Etimus</ThemedText>
      </View>

      <View style={styles.statCard}>
        <ThemedText type="subtitle" style={styles.statTitle}>Quis diário</ThemedText>
        <View style={styles.statRow}>
          <IconSymbol name="bolt.fill" size={24} color={Colors.dark.primary} />
          <ThemedText style={styles.statValue}> 19 </ThemedText>
          <ThemedText style={styles.statLabel}>dias{"\n"}seguidos</ThemedText>
        </View>
        <GameButton title="Jogar" onPress={() => router.push('/daily-quiz')} style={styles.smallButton} />
      </View>

      <View style={styles.statCard}>
        <ThemedText type="subtitle" style={styles.statTitle}>Desafio livre</ThemedText>
        <View style={styles.statRow}>
          <IconSymbol name="bolt.fill" size={24} color={Colors.dark.primary} />
          <ThemedText style={styles.statValue}> 5 </ThemedText>
          <ThemedText style={styles.statLabel}>acertos{"\n"}seguidos</ThemedText>
        </View>
        <GameButton title="Jogar" onPress={() => setView('game')} style={styles.smallButton} />
      </View>
    </ScrollView>
  );

  const GameView = () => {
    if (!currentWord) return null;
    return (
      <View style={styles.gameContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setView('lobby')} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={Colors.dark.textSecondary} />
          </TouchableOpacity>
          <ThemedText type="serifTitle">Etimus</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        <GameCard style={styles.questionCard}>
          <ThemedText style={styles.instruction}>Substitua a palavra por um sinônimo:</ThemedText>
          <ThemedText style={styles.sentence}>
            "{currentWord.example.split(currentWord.word).map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <ThemedText style={styles.targetWord}>{currentWord.word}</ThemedText>}
              </React.Fragment>
            ))}"
          </ThemedText>
        </GameCard>

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
            onPress={handleConfirm}
            style={{ opacity: selected ? 1 : 0.6 }}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {view === 'lobby' ? <LobbyView /> : <GameView />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background, padding: 20 },
  gameContainer: { flex: 1 },
  lobbyContainer: { paddingBottom: 40, alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10, width: '100%' },
  backButton: { padding: 10 },

  lobbyTitle: { fontSize: 42, marginBottom: 40 },

  statCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  statTitle: { color: Colors.dark.text, marginBottom: 10, fontSize: 24, fontFamily: 'serif', fontStyle: 'italic' },
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  statValue: { color: Colors.dark.text, fontSize: 32, fontWeight: 'bold', marginHorizontal: 5 },
  statLabel: { color: Colors.dark.textSecondary, fontSize: 12, lineHeight: 14 },
  smallButton: { width: '80%', paddingVertical: 12 },

  questionCard: { marginBottom: 30, alignItems: 'center' },
  instruction: { color: Colors.dark.textSecondary, fontSize: 16, marginBottom: 12 },
  targetWord: { color: Colors.dark.primary, fontWeight: 'bold' }, // Only used inline now
  sentence: { color: Colors.dark.text, fontSize: 22, fontStyle: 'italic', textAlign: 'center', lineHeight: 32 },

  optionsList: { flex: 1, width: '100%' },
  footer: { marginBottom: 20 },
});