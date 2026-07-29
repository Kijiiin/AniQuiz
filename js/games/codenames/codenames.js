// codenames.js
// Modulo Codenames - USA multiplayer.js (NON LO MODIFICA) e CodenamesLogic

(function() {
    'use strict';

    // ---------- STATO LOCALE ----------
    let gameState = null;
    let myPlayerId = null;
    let myTeam = null;
    let myRole = null;
    let isSpyView = false;
    let playersInRoom = {};
    let isHost = false;
    let roleAssignments = {};

    // ---------- DOM REFS ----------
    const $ = id => document.getElementById(id);

    // ---------- UTILITY ----------
    function setStatus(msg, type) {
        const el = $('status');
        if (!el) return;
        const cls = type === 'error' ? 'error' : type === 'success' ? 'success' : 'info';
        el.innerHTML = `<span class="${cls}">${msg}</span>`;
    }

    function setRoleStatus(msg, type) {
        const el = $('role-status');
        if (!el) return;
        const cls = type === 'error' ? 'error' : type === 'success' ? 'success' : 'info';
        el.innerHTML = `<span class="${cls}">${msg}</span>`;
    }

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

    // ---------- UPDATE INFO (CORRETTO) ----------
    function updateInfo() {
        if (!gameState) return;

        const turnEl = $('turn-info');
        const clueEl = $('clue-info');
        const scoreEl = $('score-info');

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
        if (gameState.gameOver) {
            setStatus(`🏆 Partita terminata! Vince ${gameState.winner === 'RED' ? '🔴 Rossi' : '🔵 Blu'}!`, 'success');
        } else if (gameState.phase === 'SPIA_TURNO') {
            const isMyTurn = (gameState.turn === 'RED' && myTeam === 'RED') ||
                             (gameState.turn === 'BLUE' && myTeam === 'BLUE');
            if (isMyTurn && myRole === 'SPY') {
                setStatus('🧠 Sei il capo-spia! Inserisci un indizio.', 'info');
            } else {
                setStatus(`⏳ ${gameState.turn === 'RED' ? '🔴 Rossi' : '🔵 Blu'} stanno pensando a un indizio...`, 'info');
            }
        } else if (gameState.phase === 'AGENTI_TURNO') {
            const isMyTurn = (gameState.turn === 'RED' && myTeam === 'RED') ||
                             (gameState.turn === 'BLUE' && myTeam === 'BLUE');
            if (isMyTurn && myRole === 'AGENT') {
                setStatus('🎯 Tocca a te! Clicca una carta per indovinare.', 'success');
            } else {
                setStatus(`⏳ ${gameState.turn === 'RED' ? '🔴 Rossi' : '🔵 Blu'} stanno indovinando...`, 'info');
            }
        }

        // ---------- CONTROLLI (CORRETTO) ----------
        const controls = $('controls');
        if (!controls) return;

        if (!gameState.started || gameState.gameOver) {
            controls.classList.add('hidden');
            return;
        }

        const isSpyTurn = gameState.phase === 'SPIA_TURNO' &&
                          ((gameState.turn === 'RED' && myTeam === 'RED') ||
                           (gameState.turn === 'BLUE' && myTeam === 'BLUE')) &&
                          myRole === 'SPY';

        const isAgentTurn = gameState.phase === 'AGENTI_TURNO' &&
                            ((gameState.turn === 'RED' && myTeam === 'RED') ||
                             (gameState.turn === 'BLUE' && myTeam === 'BLUE')) &&
                            myRole === 'AGENT';

        if (!isSpyTurn && !isAgentTurn) {
            controls.classList.add('hidden');
            return;
        }

        controls.classList.remove('hidden');

        const clueInput = $('clue-input');
        const numberInput = $('number-input');
        const submitBtn = $('btn-submit-clue');
        const endTurnBtn = $('btn-end-turn');

        if (isSpyTurn) {
            if (clueInput) { clueInput.style.display = 'inline-block'; setTimeout(() => clueInput.focus(), 100); }
            if (numberInput) numberInput.style.display = 'inline-block';
            if (submitBtn) submitBtn.style.display = 'inline-block';
            if (endTurnBtn) endTurnBtn.style.display = 'none';
        } else {
            if (clueInput) clueInput.style.display = 'none';
            if (numberInput) numberInput.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'none';
            if (endTurnBtn) endTurnBtn.style.display = 'inline-block';
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
            if (gameState && gameState.started) {
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

    // ---------- GESTIONE RUOLI (host) ----------
    function renderRoleAssignment() {
        const container = $('player-role-list');
        if (!container) return;
        container.innerHTML = '';

        const ids = Object.keys(playersInRoom);
        if (ids.length === 0) {
            container.innerHTML = '<span style="opacity:0.6;">Nessun giocatore connesso</span>';
            return;
        }

        ids.forEach(id => {
            const p = playersInRoom[id];
            const isMe = (id === myPlayerId);
            const div = document.createElement('div');
            div.className = 'player-row';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'name';
            nameSpan.textContent = p.name || 'Anonimo';
            div.appendChild(nameSpan);

            if (isMe) {
                const badge = document.createElement('span');
                badge.className = 'badge';
                badge.textContent = '(tu)';
                div.appendChild(badge);
            }
            if (isHost) {
                const badge = document.createElement('span');
                badge.className = 'badge';
                badge.textContent = '👑 host';
                badge.style.color = '#f1c40f';
                div.appendChild(badge);
            }

            const select = document.createElement('select');
            select.id = `role-select-${id}`;
            const options = [
                { value: '', text: '— Seleziona ruolo —' },
                { value: 'RED_SPY', text: '🔴 Capo-spia' },
                { value: 'RED_AGENT', text: '🔴 Agente' },
                { value: 'BLUE_SPY', text: '🔵 Capo-spia' },
                { value: 'BLUE_AGENT', text: '🔵 Agente' }
            ];
            options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.text;
                select.appendChild(option);
            });

            if (roleAssignments[id]) {
                select.value = roleAssignments[id];
            }

            if (!isHost) {
                select.disabled = true;
            } else {
                select.addEventListener('change', () => {
                    roleAssignments[id] = select.value || null;
                    Multiplayer.sendAction('codenames:assignRole', {
                        playerId: id,
                        role: select.value
                    });
                    checkAllAssigned();
                });
            }

            div.appendChild(select);
            container.appendChild(div);
        });

        checkAllAssigned();
    }

    function checkAllAssigned() {
        const ids = Object.keys(playersInRoom);
        const startBtn = $('btn-start-game');
        const statusEl = $('role-status');

        if (ids.length < 2) {
            setRoleStatus('⏳ In attesa di almeno 2 giocatori...', 'info');
            startBtn.disabled = true;
            return;
        }

        const allAssigned = ids.every(id => roleAssignments[id] && roleAssignments[id] !== '');
        const allValid = ids.every(id => {
            const role = roleAssignments[id];
            return role && ['RED_SPY', 'RED_AGENT', 'BLUE_SPY', 'BLUE_AGENT'].includes(role);
        });

        if (allAssigned && allValid) {
            const redSpyCount = ids.filter(id => roleAssignments[id] === 'RED_SPY').length;
            const blueSpyCount = ids.filter(id => roleAssignments[id] === 'BLUE_SPY').length;
            const redAgents = ids.filter(id => roleAssignments[id] === 'RED_AGENT').length;
            const blueAgents = ids.filter(id => roleAssignments[id] === 'BLUE_AGENT').length;

            if (redSpyCount !== 1 || blueSpyCount !== 1) {
                setRoleStatus('⚠️ Ogni squadra deve avere esattamente 1 capo-spia!', 'error');
                startBtn.disabled = true;
                return;
            }
            if (redAgents < 1 || blueAgents < 1) {
                setRoleStatus('⚠️ Ogni squadra deve avere almeno 1 agente!', 'error');
                startBtn.disabled = true;
                return;
            }

            setRoleStatus('✅ Tutti i ruoli sono assegnati! Avvia la partita.', 'success');
            startBtn.disabled = false;
        } else {
            const missing = ids.filter(id => !roleAssignments[id] || roleAssignments[id] === '');
            const names = missing.map(id => playersInRoom[id]?.name || id);
            setRoleStatus(`⏳ In attesa di ruoli per: ${names.join(', ')}`, 'info');
            startBtn.disabled = true;
        }
    }

    // ---------- AZIONI LOCALI ----------
    function onCardClick(index) {
        if (!gameState || gameState.gameOver) return;
        if (!gameState.started) {
            setStatus('⏳ La partita non è ancora iniziata!', 'info');
            return;
        }
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

        const result = CodenamesLogic.guessCard(gameState, index, myPlayerId);
        if (result.success) {
            gameState = result.state;
            renderBoard();
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

    function onStartGame() {
        if (!isHost) {
            setStatus('❌ Solo l\'host può avviare la partita!', 'error');
            return;
        }
        if (!gameState) {
            setStatus('❌ Partita non inizializzata', 'error');
            return;
        }

        for (const id in roleAssignments) {
            const role = roleAssignments[id];
            if (!role) continue;
            const team = role.startsWith('RED') ? 'RED' : 'BLUE';
            const roleType = role.endsWith('SPY') ? 'SPY' : 'AGENT';
            CodenamesLogic.assignPlayer(gameState, id, team, roleType);
        }

        const result = CodenamesLogic.startGame(gameState);
        if (result.success) {
            gameState = result.state;
            Multiplayer.sendState(gameState);
            Multiplayer.sendAction('codenames:start', {});

            $('role-assignment').classList.add('hidden');
            $('game-area').classList.add('visible');
            renderBoard();
            setStatus('▶️ Partita iniziata!', 'success');
        } else {
            setStatus('❌ ' + result.error, 'error');
        }
    }

    // ---------- EVENTI MULTIPLAYER ----------
    function onConnected(data) {
        myPlayerId = data.playerId;
        console.log('✅ Connesso! ID:', myPlayerId);

        playersInRoom = data.players || {};
        const playerIds = Object.keys(playersInRoom);
        isHost = (playerIds.length === 1);

        $('role-assignment').classList.remove('hidden');
        $('game-area').classList.remove('visible');
        $('connect-section').style.display = 'none';

        if (isHost) {
            gameState = CodenamesLogic.initGame('RED');
            gameState.started = false;
            Multiplayer.sendState(gameState);
            setStatus('👑 Sei l\'host! Assegna i ruoli a tutti.', 'info');
        } else {
            setStatus('👋 Benvenuto! Aspetta che l\'host ti assegni un ruolo.', 'info');
        }

        renderRoleAssignment();
        updatePlayerList();
        updateConnectionStatus('connected', data.room);
    }

    function onStateReceived(state) {
        if (!state) return;
        gameState = state;

        if (gameState.started) {
            $('role-assignment').classList.add('hidden');
            $('game-area').classList.add('visible');
        }

        // --- CORREZIONE: entrambi i capi-spia vedono i colori ---
        if (gameState.redSpy === myPlayerId) {
            myTeam = 'RED';
            myRole = 'SPY';
            isSpyView = true;   // <-- SEMPRE TRUE per i capi-spia
        } else if (gameState.blueSpy === myPlayerId) {
            myTeam = 'BLUE';
            myRole = 'SPY';
            isSpyView = true;   // <-- SEMPRE TRUE per i capi-spia
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
        renderRoleAssignment();
        updatePlayerList();
    }

    function onPlayerJoined(player) {
        if (player && player.id) {
            playersInRoom[player.id] = player;
            renderRoleAssignment();
            updatePlayerList();
            setStatus(`👋 ${player.name || 'Anonimo'} è entrato in stanza`, 'info');
        }
    }

    function onPlayerLeft(playerId) {
        delete playersInRoom[playerId];
        delete roleAssignments[playerId];
        renderRoleAssignment();
        updatePlayerList();
        setStatus(`👋 Un giocatore ha lasciato la stanza`, 'info');
    }

    function onActionReceived(playerId, action, data) {
        if (!action || !action.startsWith('codenames:')) return;
        const cmd = action.replace('codenames:', '');

        switch(cmd) {
            case 'assignRole':
                roleAssignments[data.playerId] = data.role || null;
                renderRoleAssignment();
                break;

            case 'start':
                if (gameState && !gameState.started) {
                    const r = CodenamesLogic.startGame(gameState);
                    if (r.success) {
                        gameState = r.state;
                        $('role-assignment').classList.add('hidden');
                        $('game-area').classList.add('visible');
                        renderBoard();
                        setStatus('▶️ Partita iniziata!', 'success');
                    }
                }
                break;

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
        }
    }

    function onDisconnected() {
        updateConnectionStatus('disconnected');
        $('connect-section').style.display = 'block';
        $('role-assignment').classList.add('hidden');
        $('game-area').classList.remove('visible');
        playersInRoom = {};
        roleAssignments = {};
        renderRoleAssignment();
        updatePlayerList();
        setStatus('🔴 Disconnesso dal server', 'error');
    }

    function updateConnectionStatus(status, roomId) {
        const el = $('connection-status');
        if (!el) return;
        if (status === 'connected') {
            el.innerHTML = `🟢 Connesso alla stanza <strong>${roomId || 'default'}</strong>`;
            el.style.color = '#2ecc71';
        } else if (status === 'connecting') {
            el.innerHTML = '🟡 Connessione in corso...';
            el.style.color = '#f1c40f';
        } else {
            el.innerHTML = '🔴 Disconnesso';
            el.style.color = '#ff6b6b';
        }
    }

    // ---------- INIZIALIZZAZIONE ----------
    function init() {
        $('btn-connect').addEventListener('click', () => {
            const name = $('player-name').value.trim() || 'Anonimo';
            const room = $('room-code').value.trim() || 'default';
            const server = $('server-url').value.trim() || 'wss://anime-multiplayer-server.onrender.com';
            updateConnectionStatus('connecting');
            Multiplayer.connect({
                playerName: name,
                room: room,
                server: server
            });
        });

        $('btn-disconnect').addEventListener('click', () => {
            Multiplayer.leave();
            onDisconnected();
        });

        $('btn-start-game').addEventListener('click', onStartGame);
        $('btn-submit-clue').addEventListener('click', onSubmitClue);
        $('btn-end-turn').addEventListener('click', onEndTurn);

        $('clue-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') onSubmitClue();
        });

        Multiplayer.on('connected', onConnected);
        Multiplayer.on('disconnected', onDisconnected);
        Multiplayer.on('state', onStateReceived);
        Multiplayer.on('players', onPlayersUpdate);
        Multiplayer.on('playerJoined', onPlayerJoined);
        Multiplayer.on('playerLeft', onPlayerLeft);
        Multiplayer.on('action', onActionReceived);
        Multiplayer.on('error', (err) => {
            setStatus('❌ Errore: ' + err, 'error');
            updateConnectionStatus('error');
        });

        console.log('🎮 Codenames caricato!');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
