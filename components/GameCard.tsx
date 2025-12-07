import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface GameCardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export function GameCard({ children, style }: GameCardProps) {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'transparent', // Design shows no specific background for the "question area", just text on the screen.
        // Wait, looking at "Quis Diário", the question is just text on background.
        // Looking at "Etimus", the "Substitua a palavra..." is also just text on background.
        // The GameCard might not need a background color at all, or a very subtle one.
        // Let's make it transparent but keep spacing.
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
});
