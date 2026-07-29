// codenames-logic.js
// Logica di gioco Codenames - NESSUNA DIPENDENZA DA MULTIPLAYER O UI

const CodenamesLogic = (function() {
    'use strict';

    // ---------- POOL DI PAROLE ----------
    const WORD_POOL = [
        "Forchetta", "Deserto", "Pianeta", "Catena", "Orologio", "Albero",
        "Fuoco", "Acqua", "Vento", "Montagna", "Isola", "Tesoro", "Mappa",
        "Bussola", "Lanterna", "Ombra", "Specchio", "Sveglia", "Tavolo",
        "Sedia", "Finestra", "Porta", "Scala", "Ponte", "Castello", "Corsa",
        "Palla", "Rete", "Corda", "Chiave", "Soffitto", "Giardino", "Tempesta",
        "Fulmine", "Raggio", "Ghiaccio", "Neve", "Sabbia", "Onda", "Fiume",
        "Lago", "Stella", "Luna", "Sole", "Nuvola", "Arco", "Freccia", "Scudo",
        "Spada", "Corona", "Trono", "Tappeto", "Quadro", "Scultura", "Fontana",
        "Barriera", "Anello", "Collana", "Bracciale", "Orecchino", "Cintura",
        "Cappello", "Scarpa", "Guanto", "Sciarpa", "Ombrello", "Valigia",
        "Zaino", "Borsa", "Portafoglio", "Moneta", "Banconota", "Assegno",
        "Carta", "Penna", "Matita", "Gomma", "Righello", "Libro", "Quaderno",
        "Diario", "Agenda", "Calendario", "Cucchiaio", "Coltello", "Piatto",
        "Bicchiere", "Tazza", "Pentola", "Padella", "Forno", "Frigo",
        "Lavastoviglie", "Microonde", "Tostapane", "Bollitore", "Caffè", "Tè",
        "Latte", "Succo", "Vino", "Birra", "Vodka", "Whisky", "Pizza", "Pasta",
        "Riso", "Pane", "Formaggio", "Salame", "Prosciutto", "Uova", "Pollo",
        "Manzo", "Maiale", "Pesce", "Gamberi", "Polpo", "Seppia", "Vongole",
        "Melone", "Anguria", "Fragola", "Mela", "Pera", "Arancia", "Limone",
        "Banana", "Uva", "Ciliegia", "Pesca", "Albicocca", "Mango", "Kiwi",
        "Ananas", "Cocco", "Cane", "Gatto", "Topo", "Coniglio", "Cavallo",
        "Mucca", "Maiale", "Pecora", "Capra", "Giraffa", "Elefante", "Leone",
        "Tigre", "Orso", "Lupo", "Volpe", "Aquila", "Falco", "Gabbiano",
        "Pinguino", "Cigno", "Anatra", "Gallina", "Tacchino", "Balena",
        "Delfino", "Squalo", "Medusa", "Cometa", "Asteroide", "Galassia",
        "Nebulosa", "Macchina", "Camion", "Moto", "Bicicletta", "Treno",
        "Aereo", "Elicottero", "Nave", "Sottomarino", "Razzo", "Satellite",
        "Telescopio", "Microscopio"
    ];

    // ---------- FUNZIONI DI GIOCO ----------

    function generateColorMap(firstTeam) {
        let colors = [];
        if (firstTeam === "RED") {
            colors = Array(9).fill("RED").concat(Array(8).fill("BLUE"));
        } else {
            colors = Array(9).fill("BLUE").concat(Array(8).fill("RED"));
        }
        colors = colors.concat(Array(7).fill("NEUTRAL"));
        colors.push("BLACK");

        for (let i = colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [colors[i], colors[j]] = [colors[j], colors[i]];
        }
        return colors;
    }

    function initGame(firstTeam) {
        const shuffled = [...WORD_POOL].sort(() => 0.5 - Math.random());
        const words = shuffled.slice(0, 25);
        const colorMap = generateColorMap(firstTeam);

        const board = words.map((w, i) => ({
            word: w,
            color: colorMap[i],
            revealed: false
        }));

        return {
            phase: "SPIA_TURNO",      // SPIA_TURNO | AGENTI_TURNO | GAME_OVER
            turn: firstTeam,          // "RED" o "BLUE"
            board: board,
            redSpy: null,
            blueSpy: null,
            redAgents: [],
            blueAgents: [],
            currentClue: "",
            maxGuesses: 0,
            guessesLeft: 0,
            redCardsLeft: board.filter(c => c.color === "RED").length,
            blueCardsLeft: board.filter(c => c.color === "BLUE").length,
            gameOver: false,
            winner: null,
            started: false,
            turnHistory: []
        };
    }

    function assignPlayer(state, playerId, team, role) {
        if (!state || state.started) return null;

        // Rimuovi da ruoli precedenti
        if (state.redSpy === playerId) state.redSpy = null;
        if (state.blueSpy === playerId) state.blueSpy = null;
        state.redAgents = state.redAgents.filter(id => id !== playerId);
        state.blueAgents = state.blueAgents.filter(id => id !== playerId);

        if (team === "RED") {
            if (role === "SPY") state.redSpy = playerId;
            else state.redAgents.push(playerId);
        } else {
            if (role === "SPY") state.blueSpy = playerId;
            else state.blueAgents.push(playerId);
        }
        return state;
    }

    function startGame(state) {
        if (!state.redSpy || !state.blueSpy) {
            return { success: false, error: "Entrambe le squadre devono avere un capo-spia" };
        }
        if (state.redAgents.length === 0 || state.blueAgents.length === 0) {
            return { success: false, error: "Entrambe le squadre devono avere almeno un agente" };
        }
        if (state.started) {
            return { success: false, error: "Partita già iniziata" };
        }

        state.started = true;
        state.phase = "SPIA_TURNO";
        state.turn = "RED";
        return { success: true, state: state };
    }

    function giveClue(state, clue, number, playerId) {
        if (!state.started) return { success: false, error: "Partita non iniziata" };
        if (state.phase !== "SPIA_TURNO") return { success: false, error: "Non è il momento di dare un indizio" };
        if (state.gameOver) return { success: false, error: "Partita già terminata" };

        const expectedSpy = state.turn === "RED" ? state.redSpy : state.blueSpy;
        if (playerId !== expectedSpy) {
            return { success: false, error: "Non sei il capo-spia di questo turno" };
        }

        if (!clue || clue.trim().length < 2) {
            return { success: false, error: "Indizio troppo corto (minimo 2 caratteri)" };
        }
        if (number < 1 || number > 9) {
            return { success: false, error: "Il numero deve essere tra 1 e 9" };
        }

        const clueLower = clue.trim().toLowerCase();
        const boardWords = state.board.map(c => c.word.toLowerCase());
        if (boardWords.includes(clueLower)) {
            return { success: false, error: "L'indizio non può essere una delle parole sulla griglia" };
        }

        state.currentClue = clue.trim();
        state.maxGuesses = number;
        state.guessesLeft = number + 1;
        state.phase = "AGENTI_TURNO";

        state.turnHistory.push({
            team: state.turn,
            clue: clue.trim(),
            guesses: number,
            timestamp: Date.now()
        });

        return { success: true, state: state };
    }

    function guessCard(state, index, playerId) {
        if (!state.started) return { success: false, error: "Partita non iniziata" };
        if (state.phase !== "AGENTI_TURNO") return { success: false, error: "Non è il momento di indovinare" };
        if (state.gameOver) return { success: false, error: "Partita già terminata" };
        if (index < 0 || index > 24) return { success: false, error: "Indice non valido" };

        const card = state.board[index];
        if (card.revealed) return { success: false, error: "Carta già rivelata" };

        const turnTeam = state.turn;
        const agents = turnTeam === "RED" ? state.redAgents : state.blueAgents;
        if (!agents.includes(playerId)) {
            return { success: false, error: "Non sei nella squadra che deve giocare" };
        }

        card.revealed = true;

        if (card.color === "RED") state.redCardsLeft--;
        else if (card.color === "BLUE") state.blueCardsLeft--;

        state.guessesLeft--;

        const result = {
            color: card.color,
            word: card.word,
            isGameOver: false
        };

        // Carta nera → sconfitta istantanea
        if (card.color === "BLACK") {
            state.gameOver = true;
            state.phase = "GAME_OVER";
            state.winner = turnTeam === "RED" ? "BLUE" : "RED";
            result.isGameOver = true;
            return {
                success: true,
                state: state,
                result: result,
                gameOver: true,
                winner: state.winner
            };
        }

        // Controlla vittoria
        if (state.redCardsLeft === 0) {
            state.gameOver = true;
            state.phase = "GAME_OVER";
            state.winner = "RED";
            result.isGameOver = true;
            return {
                success: true,
                state: state,
                result: result,
                gameOver: true,
                winner: "RED"
            };
        }
        if (state.blueCardsLeft === 0) {
            state.gameOver = true;
            state.phase = "GAME_OVER";
            state.winner = "BLUE";
            result.isGameOver = true;
            return {
                success: true,
                state: state,
                result: result,
                gameOver: true,
                winner: "BLUE"
            };
        }

        // Se la carta è dell'avversario o neutra, il turno finisce
        if (card.color !== turnTeam) {
            state.phase = "SPIA_TURNO";
            state.turn = state.turn === "RED" ? "BLUE" : "RED";
            state.guessesLeft = 0;
            state.currentClue = "";
            return {
                success: true,
                state: state,
                result: result,
                turnEnded: true
            };
        }

        // Se ha finito i tentativi, finisce il turno
        if (state.guessesLeft === 0) {
            state.phase = "SPIA_TURNO";
            state.turn = state.turn === "RED" ? "BLUE" : "RED";
            state.currentClue = "";
            return {
                success: true,
                state: state,
                result: result,
                turnEnded: true
            };
        }

        // Altrimenti può continuare
        return {
            success: true,
            state: state,
            result: result,
            canContinue: true
        };
    }

    function endTurn(state, playerId) {
        if (!state.started) return { success: false, error: "Partita non iniziata" };
        if (state.phase !== "AGENTI_TURNO") return { success: false, error: "Non è il momento di passare" };
        if (state.gameOver) return { success: false, error: "Partita già terminata" };

        const turnTeam = state.turn;
        const agents = turnTeam === "RED" ? state.redAgents : state.blueAgents;
        if (!agents.includes(playerId)) {
            return { success: false, error: "Non sei nella squadra che sta giocando" };
        }

        state.phase = "SPIA_TURNO";
        state.turn = state.turn === "RED" ? "BLUE" : "RED";
        state.guessesLeft = 0;
        state.currentClue = "";

        return { success: true, state: state };
    }

    // ---------- API PUBBLICA ----------
    return {
        initGame: initGame,
        assignPlayer: assignPlayer,
        startGame: startGame,
        giveClue: giveClue,
        guessCard: guessCard,
        endTurn: endTurn,
        WORD_POOL: WORD_POOL
    };

})();

// Esporta nel globale
if (typeof window !== 'undefined') {
    window.CodenamesLogic = CodenamesLogic;
}
