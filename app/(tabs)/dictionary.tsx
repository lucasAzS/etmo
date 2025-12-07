import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DICTIONARY_DATA, WordData } from '@/constants/etimus-data';
import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DictionaryScreen() {
    const [search, setSearch] = useState('');
    const [selectedWord, setSelectedWord] = useState<WordData | null>(null);

    const filteredData = DICTIONARY_DATA.filter(item =>
        item.word.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="serifTitle">Dicionário</ThemedText>
            </View>

            <View style={styles.searchContainer}>
                <IconSymbol name="magnifyingglass" size={20} color={Colors.dark.textSecondary} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar palavra..."
                    placeholderTextColor={Colors.dark.textSecondary}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={filteredData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.wordItem} onPress={() => setSelectedWord(item)}>
                        <ThemedText style={styles.wordTitle}>{item.word}</ThemedText>
                        <ThemedText numberOfLines={1} style={styles.wordMeaning}>{item.meaning}</ThemedText>
                    </TouchableOpacity>
                )}
            />

            <Modal visible={!!selectedWord} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedWord && (
                            <>
                                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedWord(null)}>
                                    <IconSymbol name="xmark.circle.fill" size={30} color={Colors.dark.text} />
                                </TouchableOpacity>
                                <ThemedText style={styles.modalWord}>{selectedWord.word}</ThemedText>
                                <ThemedText style={styles.modalOrigin}>Origem: {selectedWord.origin}</ThemedText>

                                <View style={styles.divider} />

                                <ThemedText type="subtitle" style={styles.sectionTitle}>Significado</ThemedText>
                                <ThemedText style={styles.modalText}>{selectedWord.meaning}</ThemedText>

                                <ThemedText type="subtitle" style={styles.sectionTitle}>Sinônimos</ThemedText>
                                <ThemedText style={styles.modalText}>{selectedWord.synonyms.join(', ')}</ThemedText>

                                <ThemedText type="subtitle" style={styles.sectionTitle}>Exemplo</ThemedText>
                                <ThemedText style={[styles.modalText, { fontStyle: 'italic' }]}>"{selectedWord.example}"</ThemedText>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.dark.background, padding: 20 },
    header: { alignItems: 'center', marginBottom: 20, marginTop: 10 },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.dark.card,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: Colors.dark.text,
        fontSize: 16
    },
    wordItem: {
        backgroundColor: Colors.dark.card,
        padding: 16,
        marginBottom: 10,
        borderRadius: 12,
        borderLeftWidth: 3,
        borderLeftColor: Colors.dark.primary
    },
    wordTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.dark.text },
    wordMeaning: { color: Colors.dark.textSecondary, marginTop: 4 },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
    modalContent: { backgroundColor: Colors.dark.card, padding: 24, borderRadius: 20, minHeight: 400 },
    closeButton: { alignSelf: 'flex-end', marginBottom: 10 },
    modalWord: { fontSize: 36, fontWeight: 'bold', color: Colors.dark.primary, textAlign: 'center', fontFamily: 'serif', fontStyle: 'italic' },
    modalOrigin: { textAlign: 'center', color: Colors.dark.textSecondary, marginBottom: 20 },
    divider: { height: 1, backgroundColor: Colors.dark.border, marginVertical: 10 },
    sectionTitle: { marginTop: 15, marginBottom: 5, color: Colors.dark.primary },
    modalText: { color: Colors.dark.text, fontSize: 16, lineHeight: 24 }
});
