import { GameButton } from '@/components/GameButton';
import { GameCard } from '@/components/GameCard';
import { OptionCard } from '@/components/OptionCard';
import { ThemedText } from '@/components/themed-text';
import { DAILY_QUIZ_QUESTIONS } from '@/constants/etimus-data';
import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DailyQuizScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [lives, setLives] = useState(3);
    const [finished, setFinished] = useState(false);

    const resetQuiz = () => {
        setCurrentIndex(0);
        setLives(3);
        setFinished(false);
        setSelected(null);
    };

    const currentQuestion = DAILY_QUIZ_QUESTIONS[currentIndex];

    const handleConfirm = () => {
        if (!selected) return;

        if (selected === currentQuestion.correctAnswer) {
            if (currentIndex < DAILY_QUIZ_QUESTIONS.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setSelected(null);
            } else {
                setFinished(true);
                Alert.alert("Parabéns!", "Você completou o Quiz Diário de hoje.");
            }
        } else {
            setLives(prev => {
                const newLives = prev - 1;
                if (newLives === 0) {
                    setFinished(true);
                    Alert.alert("Game Over", "Suas tentativas acabaram.");
                } else {
                    Alert.alert("Errado", `Você tem mais ${newLives} tentativas.`);
                }
                return newLives;
            });
        }
    };

    if (finished) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ThemedText type="title">Quiz Finalizado</ThemedText>
                <ThemedText style={{ marginTop: 10, marginBottom: 30 }}>Volte amanhã para mais!</ThemedText>
                <GameButton title="Reiniciar Quiz" onPress={resetQuiz} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="serifTitle">Quiz Diário</ThemedText>
                <ThemedText style={styles.lives}>Vidas: {lives}</ThemedText>
            </View>

            <GameCard style={styles.questionCard}>
                <ThemedText style={styles.questionNumber}>Pergunta {currentIndex + 1}/{DAILY_QUIZ_QUESTIONS.length}</ThemedText>
                <ThemedText style={styles.questionText}>{currentQuestion.question}</ThemedText>
            </GameCard>

            <View style={styles.optionsList}>
                {currentQuestion.options.map((option) => (
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.dark.background, padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
    lives: { color: 'red', fontSize: 18, fontWeight: 'bold' },
    questionCard: { marginBottom: 30, alignItems: 'center' },
    questionNumber: { color: Colors.dark.textSecondary, marginBottom: 10 },
    questionText: { color: Colors.dark.text, fontSize: 22, textAlign: 'center', fontStyle: 'italic' },
    optionsList: { flex: 1 },
    footer: { marginBottom: 20 },
});
