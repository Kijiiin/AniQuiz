// codenames.js
// Modulo Codenames - USA multiplayer.js (NON LO MODIFICA) e CodenamesLogic

(function() {
    'use strict';

    // ---------- STATO LOCALE ----------
    let gameState = null;
    let myPlayerId = null;
    let myTeam = null;        // 'RED' o 'BLUE'
    let myRole = null;        // 'SPY' o 'AGENT'
    let isSpyView = false;   // true = vede i colori
    let playersInRoom = {};

    // ---------- DOM REFS ----------
    const $ = id => document.getElementById(id);

    // ---------- UI RENDER ----------
    function getCardColorClass(color) {
        switch(color) {
            case 'RED': return 'card-red';
            case 'BLUE': return 'card-blue';
            case 'NEUTRAL': return 'card-neutral';
            case 'BLACK': return 'card-black';
            default: return 'card-hidden';
        }
    }

    function renderBoard() {
        const container = $('board');
        if (!container || !gameState) return;
        container.innerHTML = '';

        gameState.board.forEach((card, index) => {
            const div = document.createElement('div');
            div.className = 'card';
            div.dataset.index = index;

            if (card.revealed) {
                div.classList.add('revealed', getCardColorClass(card.color));
                div.textContent = card.word;
            } else {
                div.classList.add('card-hidden');
                div.textContent = card.word;
                // Il capo-spia vede i colori in bordo
                if (isSpyView) {
                    div.style.borderColor = getCardColorClass(card.color).replace('card-', '');
                    div.style.borderWidth = '4px';
                    div.style.borderStyle = 'solid';
                }
            }

            div.addEventListener('click', () => onCardClick(index));
            container.appendChild(div);
        });

        updateInfo();
    }

    function updateInfo() {
        if (!gameState) return;

        const turnEl = $('turn-info');
        const clueEl = $('clue-info');
        const scoreEl = $('score-info');
        const statusEl = $('status');

        // Turno
        if (turnEl) {
            const teamName = gameState.turn === 'RED' ? '🔴 Rossi' : '🔵 Blu';
            turnEl.textContent = `🎯 Turno: ${teamName}`;
            turnEl.className = 'turn ' + (gameState.turn === 'RED' ? 'red' : 'blue');
        }

        // Indizio
        if (clueEl) {
            if (gameState.phase === 'AGENTI_TURNO' && gameState.currentClue) {
                clueEl.textContent = `📝 "${gameState.currentClue}" (${gameState.guessesLeft} tentativi)`;
            } else if (gameState.phase === 'SPIA_TURNO') {
                clueEl.textContent = '📝 In attesa di indizio...';
            } else if (gameState.gameOver) {
                clueEl.textContent = `🏆 VINTO! ${gameState.winner === 'RED' ? '🔴 Rossi' : '🔵 Blu'}`;
            } else {
                clueEl.textContent = '📝 ---';
            }
        }

        // Punteggio
        if (scoreEl) {
            scoreEl.textContent = `🔴 ${gameState.redCardsLeft} | 🔵 ${gameState.blueCardsLeft}`;
        }

        // Status
        if (statusEl) {
            if (gameState.gameOver) {
                statusEl.innerHTML = `<span class="success">🏆 Partita terminata! Vince ${gameState.winner === 'RED' ? '🔴 Rossi' : '🔵 Blu'}!</span>`;
            } else if (gameState.phase === 'SPIA_TURNO') {
                const isMyTurn = (gameState.turn === 'RED' && myTeam === 'RED') ||
                                 (gameState.turn === 'BLUE' && myTeam === 'BLUE');
                if (isMyTurn && myRole === 'SPY') {
                    statusEl.innerHTML = `<span class="info">🧠 Sei il capo-spia! Inserisci un indizio.</span>`;
                } else {
                    statusEl.innerHTML = `<span class="info">⏳ ${gameState.turn === 'RED' ? '🔴 Rossi' : '🔵 Blu'} stanno pensando a un indizio...</span>`;
                }
            } else if (gameState.phase === 'AGENTI_TURNO') {
                const isMyTurn = (gameState.turn === 'RED' && myTeam === 'RED') ||
                                 (gameState.turn === 'BLUE' && myTeam === 'BLUE');
                if (isMyTurn && myRole === 'AGENT') {
                    statusEl.innerHTML = `<span class="success">🎯 Tocca a te! Clicca una carta per indovinare.</span>`;
                } else {
                    statusEl.innerHTML = `<span class="info">⏳ ${gameState.turn === 'RED' ? '🔴 Rossi' : '🔵 Blu'} stanno indovinando...</span>`;
                }
            }
        }

        // Mostra/nasconde controlli
        const controls = $('controls');
        if (controls) {
            const isMyTurn = gameState.phase === 'SPIA_TURNO' &&
                             ((gameState.turn === 'RED' && myTeam === 'RED') ||
                              (gameState.turn === 'BLUE' && myTeam === 'BLUE')) &&
                             myRole === 'SPY' &&
                             !gameState.gameOver;

            const clueInput = $('clue-input');
            const numberInput = $('number-input');
            const submitBtn = $('btn-submit-clue');
            const endTurnBtn = $('btn-end-turn');

            if (clueInput) clueInput.style.display = isMyTurn ? 'inline-block' : 'none';
            if (numberInput) numberInput.style.display = isMyTurn ? 'inline-block' : 'none';
            if (submitBtn) submitBtn.style.display = isMyTurn ? 'inline-block' : 'none';

            // Pulsante "Passa turno" visibile solo agli agenti della squadra di turno
            const isAgentTurn = gameState.phase === 'AGENTI_TURNO' &&
                                ((gameState.turn === 'RED' && myTeam === 'RED') ||
                                 (gameState.turn === 'BLUE' && myTeam === 'BLUE')) &&
                                myRole === 'AGENT' &&
                                !gameState.gameOver;
            if (endTurnBtn) {
                endTurnBtn.style.display = isAgentTurn ? 'inline-block' : 'none';
            }
        }
    }

    function updatePlayerList() {
        const container = $('player-list-container');
        if (!container) return;
        const ids = Object.keys(playersInRoom);
        if (ids.length === 0) {
            container.innerHTML = '<span style="opacity:0.6;">Nessun giocatore in stanza</span>';
            return;
        }
        let html = '';
        ids.forEach(id => {
            const p = playersInRoom[id];
            const isMe = (id === myPlayerId);
            let teamLabel = '';
            if (gameState) {
                if (gameState.redSpy === id) teamLabel = ' 🔴 Capo';
                else if (gameState.blueSpy === id) teamLabel = ' 🔵 Capo';
                else if (gameState.redAgents.includes(id)) teamLabel = ' 🔴 Agente';
                else if (gameState.blueAgents.includes(id)) teamLabel = ' 🔵 Agente';
            }
            html += `<span${isMe ? ' style="font-weight:bold;text-decoration:underline;"' : ''}>
                ${p.name || 'Anonimo'}${teamLabel}${isMe ? ' (tu)' : ''}
            </span>`;
        });
        container.innerHTML = html;
    }

    // ---------- AZIONI LOCALI ----------
    function onCardClick(index) {
        if (!gameState || gameState.gameOver) return;
        if (gameState.phase !== 'AGENTI_TURNO') {
            setStatus('⏳ Non è il momento di indovinare', 'info');
            return;
        }
        if (myRole !== 'AGENT') {
            setStatus('🧠 Solo gli agenti possono indovinare', 'info');
            return;
        }

        const turnTeam = gameState.turn;
        const myAgents = turnTeam === 'RED' ? gameState.redAgents : gameState.blueAgents;
        if (!myAgents.includes(myPlayerId)) {
            setStatus('⏳ Non è il turno della tua squadra', 'info');
            return;
        }

        // Applica logica locale
        const result = CodenamesLogic.guessCard(gameState, index, myPlayerId);
        if (result.success) {
            gameState = result.state;
            renderBoard();
            // Invia a tutti gli altri
            Multiplayer.sendAction('codenames:guess', { cardIndex: index });
            if (result.gameOver) {
                setStatus(`🏆 VINCE ${result.winner === 'RED' ? '🔴 Rossi' : '🔵 Blu'}!`, 'success');
            } else if (result.turnEnded) {
                setStatus(`⏳ Turno passato a ${gameState.turn === 'RED' ? '🔴 Rossi' : '🔵 Blu'}`, 'info');
            } else if (result.canContinue) {
                setStatus(`✅ Indovinato! Ancora ${gameState.guessesLeft} tentativi`, 'success');
            }
        } else {
            setStatus('❌ ' + result.error, 'error');
        }
    }

    function onSubmitClue() {
        const input = $('clue-input');
        const numberInput = $('number-input');
        if (!input || !numberInput) return;

        const clue = input.value.trim();
        const number = parseInt(numberInput.value);
        if (!clue) { setStatus('❌ Inserisci un indizio', 'error'); return; }
        if (!number || number < 1 || number > 9) {
            setStatus('❌ Numero deve essere tra 1 e 9', 'error');
            return;
        }

        const result = CodenamesLogic.giveClue(gameState, clue, number, myPlayerId);
        if (result.success) {
            gameState = result.state;
            renderBoard();
            Multiplayer.sendAction('codenames:clue', { clue, number });
            input.value = '';
            setStatus(`📨 Indizio "${clue}" inviato! (${number} carte)`, 'success');
        } else {
            setStatus('❌ ' + result.error, 'error');
        }
    }

    function onEndTurn() {
        if (!gameState || gameState.gameOver) return;
        const result = CodenamesLogic.endTurn(gameState, myPlayerId);
        if (result.success) {
            gameState = result.state;
            renderBoard();
            Multiplayer.sendAction('codenames:endTurn', {});
            setStatus(`⏳ Turno passato a ${gameState.turn === 'RED' ? '🔴 Rossi' : '🔵 Blu'}`, 'info');
        } else {
            setStatus('❌ ' + result.error, 'error');
        }
    }

    function onAssignRole(team, role) {
        if (!gameState) {
            setStatus('❌ Partita non inizializzata. Connettiti prima.', 'error');
            return;
        }
        if (gameState.started) {
            setStatus('❌ Partita già iniziata, non puoi cambiare ruolo', 'error');
            return;
        }

        const result = CodenamesLogic.assignPlayer(gameState, myPlayerId, team, role);
        if (result) {
            gameState = result;
            myTeam = team;
            myRole = role;
            isSpyView = (role === 'SPY');
            renderBoard();
            updatePlayerList();
            Multiplayer.sendAction('codenames:assign', {
                playerId: myPlayerId,
                team: team,
                role: role
            });
            setStatus(`✅ Assegnato come ${role === 'SPY' ? 'Capo-spia' : 'Agente'} ${team === 'RED' ? '🔴 Rosso' : '🔵 Blu'}`, 'success');
        }
    }

    function onStartGame() {
        if (!gameState) { setStatus('❌ Partita non inizializzata', 'error'); return; }
        const result = CodenamesLogic.startGame(gameState);
        if (result.success) {
            gameState = result.state;
            renderBoard();
            Multiplayer.sendAction('codenames:start', {});
            setStatus('▶️ Partita iniziata!', 'success');
        } else {
            setStatus('❌ ' + result.error, 'error');
        }
    }

    function setStatus(msg, type) {
        const el = $('status');
        if (!el) return;
        const cls = type === 'error' ? 'error' : type === 'success' ? 'success' : 'info';
        el.innerHTML = `<span class="${cls}">${msg}</span>`;
    }

    // ---------- EVENTI MULTIPLAYER ----------
    function onConnected(data) {
        myPlayerId = data.playerId;
        console.log('✅ Connesso! ID:', myPlayerId);

        // Aggiorna lista giocatori
        playersInRoom = data.players || {};
        updatePlayerList();

        // Se siamo il primo, inizializziamo il gioco
        const playerCount = Object.keys(playersInRoom).length;
        if (playerCount === 1) {
            gameState = CodenamesLogic.initGame('RED');
            Multiplayer.sendState(gameState);
            renderBoard();
            setStatus('🎮 Hai creato la stanza! Assegna i ruoli e avvia.', 'info');
        }

        // Mostra game area, nascondi lobby
        $('lobby').classList.add('hidden');
        $('game-area').classList.add('visible');

        // Aggiorna stato dei giocatori
        updatePlayerList();
    }

    function onStateReceived(state) {
        if (!state) return;
        gameState = state;

        // Rileggi il mio ruolo dallo stato
        if (gameState.redSpy === myPlayerId) {
            myTeam = 'RED';
            myRole = 'SPY';
            isSpyView = true;
        } else if (gameState.blueSpy === myPlayerId) {
            myTeam = 'BLUE';
            myRole = 'SPY';
            isSpyView = true;
        } else if (gameState.redAgents.includes(myPlayerId)) {
            myTeam = 'RED';
            myRole = 'AGENT';
            isSpyView = false;
        } else if (gameState.blueAgents.includes(myPlayerId)) {
            myTeam = 'BLUE';
            myRole = 'AGENT';
            isSpyView = false;
        }

        renderBoard();
        updatePlayerList();
    }

    function onPlayersUpdate(players) {
        playersInRoom = players || {};
        updatePlayerList();
    }

    function onPlayerJoined(player) {
        if (player && player.id) {
            playersInRoom[player.id] = player;
            updatePlayerList();
            setStatus(`👋 ${player.name || 'Anonimo'} è entrato in stanza`, 'info');
        }
    }

    function onPlayerLeft(playerId) {
        delete playersInRoom[playerId];
        updatePlayerList();
        setStatus(`👋 Un giocatore ha lasciato la stanza`, 'info');
    }

    function onActionReceived(playerId, action, data) {
        if (!action || !action.startsWith('codenames:')) return;
        const cmd = action.replace('codenames:', '');

        switch(cmd) {
            case 'clue':
                const r1 = CodenamesLogic.giveClue(gameState, data.clue, data.number, playerId);
                if (r1.success) {
                    gameState = r1.state;
                    renderBoard();
                    setStatus(`📨 ${playersInRoom[playerId]?.name || 'Qualcuno'} ha dato un indizio`, 'info');
                }
                break;

            case 'guess':
                const r2 = CodenamesLogic.guessCard(gameState, data.cardIndex, playerId);
                if (r2.success) {
                    gameState = r2.state;
                    renderBoard();
                    if (r2.gameOver) {
                        setStatus(`🏆 VINCE ${r2.winner === 'RED' ? '🔴 Rossi' : '🔵 Blu'}!`, 'success');
                    } else if (r2.turnEnded) {
                        setStatus(`⏳ Turno passato a ${gameState.turn === 'RED' ? '🔴 Rossi' : '🔵 Blu'}`, 'info');
                    } else if (r2.canContinue) {
                        setStatus(`✅ ${playersInRoom[playerId]?.name || 'Qualcuno'} ha indovinato!`, 'success');
                    }
                }
                break;

            case 'endTurn':
                const r3 = CodenamesLogic.endTurn(gameState, playerId);
                if (r3.success) {
                    gameState = r3.state;
                    renderBoard();
                    setStatus(`⏳ Turno passato a ${gameState.turn === 'RED' ? '🔴 Rossi' : '🔵 Blu'}`, 'info');
                }
                break;

            case 'assign':
                const r4 = CodenamesLogic.assignPlayer(gameState, data.playerId, data.team, data.role);
                if (r4) {
                    gameState = r4;
                    // Rileggi il mio ruolo
                    if (gameState.redSpy === myPlayerId) {
                        myTeam = 'RED'; myRole = 'SPY'; isSpyView = true;
                    } else if (gameState.blueSpy === myPlayerId) {
                        myTeam = 'BLUE'; myRole = 'SPY'; isSpyView = true;
                    } else if (gameState.redAgents.includes(myPlayerId)) {
                        myTeam = 'RED'; myRole = 'AGENT'; isSpyView = false;
                    } else if (gameState.blueAgents.includes(myPlayerId)) {
                        myTeam = 'BLUE'; myRole = 'AGENT'; isSpyView = false;
                    }
                    renderBoard();
                    updatePlayerList();
                    const p = playersInRoom[data.playerId];
                    setStatus(`🎯 ${p?.name || 'Qualcuno'} è ora ${data.role === 'SPY' ? 'Capo-spia' : 'Agente'} ${data.team === 'RED' ? '🔴 Rosso' : '🔵 Blu'}`, 'info');
                }
                break;

            case 'start':
                const r5 = CodenamesLogic.startGame(gameState);
                if (r5.success) {
                    gameState = r5.state;
                    renderBoard();
                    setStatus('▶️ Partita iniziata!', 'success');
                }
                break;
        }
    }

    // ---------- INIZIALIZZAZIONE ----------
    function init() {
        // Pulsanti lobby
        $('btn-connect').addEventListener('click', () => {
            const name = $('player-name').value.trim() || 'Anonimo';
            const room = $('room-code').value.trim() || 'default';
            Multiplayer.connect({
                playerName: name,
                room: room,
                server: 'wss://anime-multiplayer-server.onrender.com' // <-- CAMBIA CON IL TUO URL
            });
        });

        // Pulsanti ruolo
        $('btn-assign-red-spy').addEventListener('click', () => onAssignRole('RED', 'SPY'));
        $('btn-assign-red-agent').addEventListener('click', () => onAssignRole('RED', 'AGENT'));
        $('btn-assign-blue-spy').addEventListener('click', () => onAssignRole('BLUE', 'SPY'));
        $('btn-assign-blue-agent').addEventListener('click', () => onAssignRole('BLUE', 'AGENT'));

        // Pulsante avvia
        $('btn-start').addEventListener('click', onStartGame);

        // Pulsanti gioco
        $('btn-submit-clue').addEventListener('click', onSubmitClue);
        $('btn-end-turn').addEventListener('click', onEndTurn);

        // Enter key per indizio
        $('clue-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') onSubmitClue();
        });

        // Registra eventi Multiplayer
        Multiplayer.on('connected', onConnected);
        Multiplayer.on('state', onStateReceived);
        Multiplayer.on('players', onPlayersUpdate);
        Multiplayer.on('playerJoined', onPlayerJoined);
        Multiplayer.on('playerLeft', onPlayerLeft);
        Multiplayer.on('action', onActionReceived);

        // Nasconde game area all'inizio
        $('game-area').classList.remove('visible');
        $('lobby').classList.remove('hidden');

        console.log('🎮 Codenames caricato!');
    }

    // Avvia quando DOM è pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
