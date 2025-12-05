import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Hook de navegação do Expo Router

import { Colors } from '../../constants/theme';
import { GameButton } from '@/components/GameButton';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Etimus</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Card Quis Diário */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quis diário</Text>
          <View style={styles.statsRow}>
            <Ionicons name="flash" size={20} color={Colors.dark.primary} />
            <Text style={styles.statsValue}>19 <Text style={styles.statsLabel}>dias seguidos</Text></Text>
          </View>
          {/* Ao clicar, vai para a rota /quiz */}
          <GameButton title="Jogar" onPress={() => router.push('/quiz')} />
        </View>

        {/* Card Desafio Livre */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Desafio livre</Text>
          <View style={styles.statsRow}>
            <Ionicons name="flash-outline" size={20} color={Colors.dark.primary} />
            <Text style={styles.statsValue}>5 <Text style={styles.statsLabel}>acertos seguidos</Text></Text>
          </View>
          <GameButton title="Continuar" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background, padding: 20 },
  logo: { fontSize: 40, color: Colors.dark.text, fontFamily: 'serif', fontStyle: 'italic', textAlign: 'center', marginVertical: 20 },
  content: { gap: 20 },
  card: { backgroundColor: Colors.dark.card, padding: 24, borderRadius: 20, alignItems: 'center' },
  cardTitle: { color: Colors.dark.text, fontSize: 22, fontFamily: 'serif', fontStyle: 'italic', marginBottom: 10 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  statsValue: { color: Colors.dark.text, fontSize: 20, fontWeight: 'bold', marginLeft: 8 },
  statsLabel: { fontSize: 14, fontWeight: 'normal', color: Colors.dark.textSecondary },
});