import { GameCard } from '@/components/GameCard';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        {/* Place holder avatar icon */}
                        <IconSymbol name="person.fill" size={60} color={Colors.dark.background} style={{ alignSelf: 'center', marginTop: 10 }} />
                    </View>
                    <ThemedText type="title" style={styles.username}>Explorador</ThemedText>
                    <ThemedText style={styles.level}>Nível 5 - Mestre das Palavras</ThemedText>
                </View>

                <View style={styles.statsRow}>
                    <GameCard style={styles.statCard}>
                        <ThemedText style={styles.statValue}>85%</ThemedText>
                        <ThemedText style={styles.statLabel}>Precisão</ThemedText>
                    </GameCard>
                    <GameCard style={styles.statCard}>
                        <ThemedText style={styles.statValue}>124</ThemedText>
                        <ThemedText style={styles.statLabel}>Palavras</ThemedText>
                    </GameCard>
                </View>

                <ThemedText type="subtitle" style={styles.sectionTitle}>Conquistas</ThemedText>
                <GameCard style={styles.achievementsCard}>
                    <View style={styles.achievementRow}>
                        <IconSymbol name="star.fill" size={24} color={Colors.dark.primary} />
                        <ThemedText style={styles.achievementText}>Primeira Vitória</ThemedText>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.achievementRow}>
                        <IconSymbol name="flame.fill" size={24} color={Colors.dark.primary} />
                        <ThemedText style={styles.achievementText}>Sequência de 5 dias</ThemedText>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.achievementRow}>
                        <IconSymbol name="book.fill" size={24} color={Colors.dark.primary} />
                        <ThemedText style={styles.achievementText}>Erudito Iniciante</ThemedText>
                    </View>
                </GameCard>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.dark.background },
    scrollContent: { padding: 20 },
    profileHeader: { alignItems: 'center', marginBottom: 30 },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.dark.primary,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: Colors.dark.card
    },
    username: { marginBottom: 5, color: Colors.dark.text },
    level: { color: Colors.dark.textSecondary },

    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    statCard: { flex: 0.48, alignItems: 'center', paddingVertical: 20 },
    statValue: { fontSize: 24, fontWeight: 'bold', color: Colors.dark.primary },
    statLabel: { color: Colors.dark.textSecondary },

    sectionTitle: { marginBottom: 15 },
    achievementsCard: { padding: 0 },
    achievementRow: { flexDirection: 'row', alignItems: 'center', padding: 15 },
    achievementText: { marginLeft: 15, fontSize: 16, color: Colors.dark.text, fontWeight: '500' },
    divider: { height: 1, backgroundColor: Colors.dark.border, marginLeft: 50 }
});
