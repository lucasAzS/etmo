import { GameButton } from '@/components/GameButton';
import { GameCard } from '@/components/GameCard';
import { OptionCard } from '@/components/OptionCard';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ETIMUS_WORDS, WordData } from '@/constants/etimus-data';
import { HAS_LAUNCHED_KEY } from '@/constants/storage';
import { Colors } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EtimusScreen() {
  const [view, setView] = useState<'lobby' | 'game'>('lobby');
  const [currentWord, setCurrentWord] = useState<WordData | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [isFirstAccess, setIsFirstAccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    checkFirstAccess();
  }, []);

  const checkFirstAccess = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED_KEY);
      if (hasLaunched === null) {
        setIsFirstAccess(true);
        await AsyncStorage.setItem(HAS_LAUNCHED_KEY, 'true');
      } else {
        setIsFirstAccess(false);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const resetFirstAccess = async () => {
    await AsyncStorage.removeItem(HAS_LAUNCHED_KEY);
    setIsFirstAccess(true);
    Alert.alert("Resetado", "App agora está em estado de 'Primeiro Acesso'.");
  };

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
      <ThemedText style={styles.topLabel}>HOME{isFirstAccess ? ' - PRIMEIRO ACESSO' : ''}</ThemedText>

      <View style={styles.header}>
        <ThemedText type="serifTitle" lightColor={Colors.dark.text} style={styles.lobbyTitle}>Etimus</ThemedText>
      </View>

      <GameButton title="Jogar" onPress={() => setView('game')} style={styles.mainButton} textStyle={styles.mainButtonText} />

      <View style={styles.menuCard}>
        <ThemedText type="subtitle" style={styles.cardTitle}>Quis diário</ThemedText>
        <GameButton title="Jogar" onPress={() => router.push('/daily-quiz')} style={styles.cardButton} />
      </View>

      <View style={styles.menuCard}>
        <ThemedText type="subtitle" style={styles.cardTitle}>Desafio livre</ThemedText>
        <GameButton title="Jogar" onPress={() => setView('game')} style={styles.cardButton} />
      </View>

      <View style={[styles.menuCard, { borderColor: 'red', borderWidth: 1 }]}>
        <ThemedText type="subtitle" style={[styles.cardTitle, { fontSize: 18 }]}>Área de Testes</ThemedText>
        <GameButton
          title="Resetar 1º Acesso"
          onPress={resetFirstAccess}
          style={[styles.cardButton, { backgroundColor: '#442222' }]}
          textStyle={{ fontSize: 14 }}
        />
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
          <ThemedText type="serifTitle" lightColor=''>Etimus</ThemedText>
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
  topLabel: { color: Colors.dark.textSecondary, fontSize: 12, marginBottom: 20, alignSelf: 'flex-start', textTransform: 'uppercase' },
  header: { alignItems: 'center', marginBottom: 20, width: '100%' }, // Changed to center
  backButton: { padding: 10 },

  lobbyTitle: { fontSize: 48, marginBottom: 10, fontStyle: 'italic' },

  mainButton: { width: '80%', marginBottom: 30, paddingVertical: 14, borderRadius: 25 },
  mainButtonText: { fontSize: 20, fontWeight: 'bold' },

  menuCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333', // Subtle border
  },
  cardTitle: { color: Colors.dark.text, marginBottom: 15, fontSize: 24, fontFamily: 'serif', fontStyle: 'italic' },
  cardButton: { width: '90%', paddingVertical: 12, borderRadius: 25 },

  // Game styles mostly unchanged
  questionCard: { marginBottom: 30, alignItems: 'center' },
  instruction: { color: Colors.dark.textSecondary, fontSize: 16, marginBottom: 12 },
  targetWord: { color: Colors.dark.primary, fontWeight: 'bold' }, // Only used inline now
  sentence: { color: Colors.dark.text, fontSize: 22, fontStyle: 'italic', textAlign: 'center', lineHeight: 32 },

  optionsList: { flex: 1, width: '100%' },
  footer: { marginBottom: 20 },
});