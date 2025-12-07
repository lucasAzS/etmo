export interface WordData {
    id: string;
    word: string;
    synonyms: string[];
    meaning: string;
    origin: string; // e.g., "Latim", "Grego"
    example: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
}

export const ETIMUS_WORDS: WordData[] = [
    {
        id: '1',
        word: 'Efêmero',
        synonyms: ['Passageiro', 'Transitório', 'Breve', 'Temporário'],
        meaning: 'Que dura pouco tempo; que é passageiro ou transitório.',
        origin: 'Grego "ephemeros"',
        example: 'A beleza da flor é efêmera.'
    },
    {
        id: '2',
        word: 'Sempiterno',
        synonyms: ['Eterno', 'Perpétuo', 'Imortal', 'Infinito'],
        meaning: 'Que dura para sempre; que não tem fim.',
        origin: 'Latim "sempiternus"',
        example: 'O amor de mãe é sempiterno.'
    },
    {
        id: '3',
        word: 'Rocambolesco',
        synonyms: ['Incrível', 'Fantástico', 'Mirabolante', 'Estranho'],
        meaning: 'Que é cheio de peripécias, aventuras ou acontecimentos extraordinários.',
        origin: 'Do personagem Rocambole (Ponson du Terrail)',
        example: 'O filme teve um final rocambolesco.'
    },
    {
        id: '4',
        word: 'Pernóstico',
        synonyms: ['Presunçoso', 'Pedante', 'Arrogante', 'Pretensioso'],
        meaning: 'Que denota pretensão; que é presumido ou arrogante.',
        origin: 'Desconhecida (provável latim "praenosticus"? - uso popular)',
        example: 'Aquele rapaz tem um ar pernóstico.'
    },
    {
        id: '5',
        word: 'Idílico',
        synonyms: ['Bucólico', 'Pastoral', 'Poético', 'Sereno'],
        meaning: 'Relativo a idílio; que é suave, terno e poético como um idílio.',
        origin: 'Grego "eidyllion"',
        example: 'Eles viveram um romance idílico no campo.'
    }
];

export const DAILY_QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 'q1',
        question: 'A palavra "Caminhar" tem qual origem?',
        correctAnswer: 'Latim', // (vulg. camminare)
        options: ['Latim', 'Francês', 'Grego', 'Inglês']
    },
    {
        id: 'q2',
        question: 'De onde vem a palavra "Hambúrguer"?',
        correctAnswer: 'Alemão',
        options: ['Inglês', 'Alemão', 'Francês', 'Holandês']
    },
    {
        id: 'q3',
        question: 'Qual a origem da palavra "Saudade"?',
        correctAnswer: 'Latim', // (solitas, -atis)
        options: ['Latim', 'Árabe', 'Grego', 'Celta']
    },
    {
        id: 'q4',
        question: 'A palavra "Robô" vem de qual língua?',
        correctAnswer: 'Tcheco', // (robota)
        options: ['Inglês', 'Tcheco', 'Russo', 'Alemão']
    },
    {
        id: 'q5',
        question: 'De onde se origina "Café"?',
        correctAnswer: 'Árabe', // (qahwa)
        options: ['Árabe', 'Turco', 'Etíope', 'Persa']
    }
];

export const DICTIONARY_DATA: WordData[] = [...ETIMUS_WORDS];
