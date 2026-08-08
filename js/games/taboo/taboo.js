/* Taboo multiplayer: lo stato è aggiornato dall'host della stanza. */
(function () {
  'use strict';

  const TURN_DURATION_MS = 60_000;
  const TEAM = Object.freeze({
    BLUE: 'BLUE',
    PINK: 'PINK',
    SPECTATOR: 'SPECTATOR'
  });
  const PHASE = Object.freeze({
    LOBBY: 'LOBBY',
    READY: 'READY',
    PLAYING: 'PLAYING',
    FINISHED: 'FINISHED'
  });
  const ACTION = Object.freeze({
    ASSIGN_TEAM: 'taboo:assignTeam',
    CHANGE_TARGET: 'taboo:changeTarget',
    START_GAME: 'taboo:startGame',
    START_TURN: 'taboo:startTurn',
    CARD_RESULT: 'taboo:cardResult',
    TIME_EXPIRED: 'taboo:timeExpired',
    END_GAME: 'taboo:endGame'
  });

  const CARD_DECK = [
    ['ANIME', ['cartone', 'giapponese', 'serie', 'episodio', 'manga']],
    ['NARUTO', ['ninja', 'volpe', 'Sasuke', 'Konoha', 'chakra']],
    ['ONE PIECE', ['pirata', 'Luffy', 'cappello', 'mare', 'tesoro']],
    ['DRAGON BALL', ['Goku', 'sfere', 'Saiyan', 'Vegeta', 'Super']],
    ['ATTACK ON TITAN', ['gigante', 'mura', 'Eren', 'Mikasa', 'titano']],
    ['DEATH NOTE', ['quaderno', 'Kira', 'Light', 'Ryuk', 'uccidere']],
    ['DEMON SLAYER', ['demone', 'Tanjiro', 'spada', 'Nezuko', 'respiro']],
    ['POKÉMON', ['Pikachu', 'allenatore', 'catturare', 'Poké Ball', 'tipo']],
    ['STUDIO GHIBLI', ['Miyazaki', 'film', 'Totoro', 'giapponese', 'animazione']],
    ['TOTORO', ['Ghibli', 'ombrello', 'gatto', 'spirito', 'Miyazaki']],
    ['EVANGELION', ['robot', 'Shinji', 'mecha', 'Angelo', 'Tokyo']],
    ['JUJUTSU KAISEN', ['maledizione', 'Gojo', 'Yuji', 'stregone', 'energia']],
    ['MY HERO ACADEMIA', ['eroe', 'quirk', 'Deku', 'scuola', 'superpotere']],
    ['SAILOR MOON', ['Luna', 'magia', 'guerriera', 'cristallo', 'Marte']],
    ['BLEACH', ['shinigami', 'Ichigo', 'spada', 'anima', 'Hollow']],
    ['FULLMETAL ALCHEMIST', ['Edward', 'alchimia', 'fratello', 'acciaio', 'equivalente']],
    ['SPIRITED AWAY', ['Chihiro', 'bagno', 'spiriti', 'Ghibli', 'Haku']],
    ['HUNTER X HUNTER', ['Gon', 'cacciatore', 'Nen', 'Killua', 'esame']],
    ['NINTENDO', ['videogioco', 'Switch', 'Mario', 'console', 'azienda']],
    ['MARIO', ['idraulico', 'Nintendo', 'fungo', 'Luigi', 'principessa']],
    ['NETFLIX', ['streaming', 'serie', 'film', 'abbonamento', 'televisione']],
    ['COSPLAY', ['costume', 'personaggio', 'fiera', 'travestimento', 'anime']],
    ['KARAOKE', ['cantare', 'microfono', 'canzone', 'musica', 'testo']],
    ['PIZZA', ['forno', 'italiana', 'mozzarella', 'margherita', 'fetta']],
    ['VACANZA', ['viaggio', 'mare', 'hotel', 'estate', 'partire']],
    ['TELEFONO', ['chiamare', 'cellulare', 'schermo', 'messaggio', 'app']],
    ['FESTA', ['amici', 'musica', 'ballare', 'compleanno', 'divertimento']],
    ['GATTO', ['miao', 'felino', 'animale', 'baffi', 'cane']],
    ['CINEMA', ['film', 'sala', 'popcorn', 'schermo', 'attore']],
    ['CALCIO', ['pallone', 'gol', 'squadra', 'stadio', 'partita']]
  ];

  const $ = id => document.getElementById(id);
  let myId = null;
  let players = {};
  let state = null;
  let deadlineTimer = null;

  function shuffle(values) {
    const result = [...values];

    for (let index = result.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }

    return result;
  }

  function createLobby(hostId) {
    return {
      game: 'TABOO',
      hostId,
      phase: PHASE.LOBBY,
      targetScore: 20,
      teams: { [hostId]: TEAM.BLUE },
      scores: { [TEAM.BLUE]: 0, [TEAM.PINK]: 0 },
      activeTeam: TEAM.BLUE,
      descriptorId: null,
      descriptorCursor: { [TEAM.BLUE]: 0, [TEAM.PINK]: 0 },
      cardOrder: [],
      cardIndex: 0,
      turn: null,
      lastRound: null,
      winner: null
    };
  }

  function isHost() {
    return Boolean(state && state.hostId === myId);
  }

  function playerName(playerId) {
    return players[playerId]?.name || 'Giocatore';
  }

  function teamName(team) {
    return team === TEAM.BLUE ? 'Squadra blu' : team === TEAM.PINK ? 'Squadra rosa' : 'Spettatore';
  }

  function otherTeam(team) {
    return team === TEAM.BLUE ? TEAM.PINK : TEAM.BLUE;
  }

  function teamFor(playerId) {
    return state?.teams?.[playerId] || TEAM.SPECTATOR;
  }

  function teamPlayers(team) {
    return Object.keys(players).filter(playerId => teamFor(playerId) === team);
  }

  function hasTwoTeams() {
    return teamPlayers(TEAM.BLUE).length > 0 && teamPlayers(TEAM.PINK).length > 0;
  }

  function currentCard() {
    if (!state?.cardOrder?.length) return null;
    return CARD_DECK[state.cardOrder[state.cardIndex]];
  }

  function formatTime(milliseconds) {
    const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  }

  function setMessage(id, message, style = '') {
    const element = $(id);
    element.textContent = message;
    element.className = style;
  }

  function renderForbidden(words, hidden) {
    const container = $('forbidden');
    container.replaceChildren();

    const displayWords = hidden ? Array(5).fill('RISERVATO') : words;
    displayWords.forEach(word => {
      const item = document.createElement('span');
      item.textContent = word;
      container.appendChild(item);
    });
  }

  function cardVisibility() {
    if (!state || state.phase !== PHASE.PLAYING) return 'HIDDEN';
    if (myId === state.descriptorId) return 'DESCRIBER';
    if (teamFor(myId) === otherTeam(state.activeTeam)) return 'REFEREE';
    if (teamFor(myId) === state.activeTeam) return 'TEAMMATE';
    return 'SPECTATOR';
  }

  function renderCard() {
    const card = currentCard();
    const visibility = cardVisibility();
    const canSeeCard = visibility === 'DESCRIBER' || visibility === 'REFEREE';
    const cardElement = $('card');

    cardElement.classList.toggle('is-hidden', !canSeeCard);

    if (!card || !canSeeCard) {
      $('card-label').textContent = 'CARTA RISERVATA';
      $('word').textContent = state?.phase === PHASE.FINISHED ? 'FINE' : '•••••';
      renderForbidden([], true);
    } else {
      $('card-label').textContent = visibility === 'DESCRIBER'
        ? 'SEI IL DESCRITTORE'
        : 'CONTROLLA LA CARTA AVVERSARIA';
      $('word').textContent = card[0];
      renderForbidden(card[1], false);
    }

    const messages = {
      DESCRIBER: 'Fai indovinare la parola senza usare le cinque parole vietate.',
      REFEREE: 'Controlla la carta: se il descrittore infrange una regola, premi TABOO.',
      TEAMMATE: 'La carta è nascosta alla tua squadra: ascolta gli indizi e prova a indovinare.',
      SPECTATOR: 'Stai osservando: la carta resta nascosta finché non sei assegnato a una squadra.',
      HIDDEN: 'Il prossimo turno non è ancora iniziato.'
    };

    $('visibility-message').textContent = messages[visibility];
    $('correct-button').classList.toggle('hidden', visibility !== 'DESCRIBER');
    $('skip-button').classList.toggle('hidden', visibility !== 'DESCRIBER');
    $('taboo-button').classList.toggle('hidden', visibility !== 'REFEREE');
  }

  function renderPlayers() {
    const list = $('players');
    list.replaceChildren();

    const playerIds = Object.keys(players);
    playerIds.forEach(playerId => {
      const row = document.createElement('div');
      row.className = 'player-row';

      const name = document.createElement('div');
      name.className = 'player-name';
      const hostLabel = playerId === state?.hostId ? ' · host' : '';
      const selfLabel = playerId === myId ? ' · tu' : '';
      name.textContent = `${playerName(playerId)}${hostLabel}${selfLabel}`;

      const select = document.createElement('select');
      select.disabled = !isHost() || state?.phase !== PHASE.LOBBY;
      [
        [TEAM.BLUE, 'Squadra blu'],
        [TEAM.PINK, 'Squadra rosa'],
        [TEAM.SPECTATOR, 'Spettatore']
      ].forEach(([value, label]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        option.selected = teamFor(playerId) === value;
        select.appendChild(option);
      });

      select.addEventListener('change', () => {
        requestAction(ACTION.ASSIGN_TEAM, { playerId, team: select.value });
      });

      row.append(name, select);
      list.appendChild(row);
    });
  }

  function renderLobby() {
    const visible = state && state.phase === PHASE.LOBBY;
    $('lobby').classList.toggle('hidden', !visible);
    if (!visible) return;

    renderPlayers();
    $('target-score').value = state.targetScore;
    $('target-score').disabled = !isHost();
    $('start-button').disabled = !isHost() || !hasTwoTeams();

    if (isHost()) {
      setMessage(
        'lobby-status',
        hasTwoTeams()
          ? 'Squadre pronte. Puoi avviare la partita.'
          : 'Assegna almeno un giocatore alla squadra blu e uno alla squadra rosa.'
      );
    } else {
      setMessage('lobby-status', 'Aspetta che l’host assegni le squadre e avvii la partita.');
    }
  }

  function renderReport() {
    const report = $('report');
    if (!state?.lastRound) {
      report.classList.add('hidden');
      return;
    }

    const { team, correct, skipped, taboo, points } = state.lastRound;
    report.classList.remove('hidden');
    report.innerHTML = `<strong>${teamName(team)}: ${points >= 0 ? '+' : ''}${points} punti</strong><br>${correct} indovinate · ${skipped} passate · ${taboo} Taboo.`;
  }

  function renderGame() {
    const visible = state && state.phase !== PHASE.LOBBY;
    $('game').classList.toggle('hidden', !visible);
    if (!visible) return;

    $('score-blue').textContent = `Squadra blu · ${state.scores[TEAM.BLUE]}`;
    $('score-pink').textContent = `Squadra rosa · ${state.scores[TEAM.PINK]}`;

    const descriptor = state.descriptorId ? playerName(state.descriptorId) : '—';
    if (state.phase === PHASE.FINISHED) {
      $('turn-text').textContent = state.winner
        ? `🏆 Vince ${teamName(state.winner)}!`
        : 'Partita terminata dall’host.';
    } else if (state.phase === PHASE.READY) {
      $('turn-text').textContent = `Prossimo turno: ${teamName(state.activeTeam)}. Descrittore: ${descriptor}.`;
    } else {
      $('turn-text').textContent = `${teamName(state.activeTeam)} gioca. Descrittore: ${descriptor}.`;
    }

    renderCard();
    renderReport();

    const hostCanStart = isHost() && state.phase === PHASE.READY;
    $('begin-turn-button').classList.toggle('hidden', !hostCanStart);
    $('end-game-button').classList.toggle('hidden', !isHost() || state.phase === PHASE.FINISHED);
    setMessage(
      'game-status',
      isHost() && state.phase === PHASE.READY
        ? 'Quando tutti sono pronti, avvia il turno.'
        : state.phase === PHASE.PLAYING
          ? 'Il turno termina per tutti allo scadere del timer.'
          : ''
    );

    updateTimer();
  }

  function updateTimer() {
    if (!state) return;
    const milliseconds = state.phase === PHASE.PLAYING
      ? state.turn.endsAt - Date.now()
      : TURN_DURATION_MS;
    $('timer').textContent = formatTime(milliseconds);
  }

  function render() {
    $('connection').classList.toggle('hidden', Boolean(myId));
    renderLobby();
    renderGame();
  }

  function syncState() {
    Multiplayer.sendState(state);
    render();
    scheduleDeadline();
  }

  function scheduleDeadline() {
    clearTimeout(deadlineTimer);
    deadlineTimer = null;

    if (!isHost() || state?.phase !== PHASE.PLAYING) return;
    const delay = Math.max(0, state.turn.endsAt - Date.now()) + 30;
    deadlineTimer = setTimeout(() => {
      applyHostAction(myId, ACTION.TIME_EXPIRED);
    }, delay);
  }

  function chooseNextDescriptor(team) {
    const members = teamPlayers(team);
    if (!members.length) return null;

    const cursor = state.descriptorCursor[team] || 0;
    state.descriptorId = members[cursor % members.length];
    state.descriptorCursor[team] = (cursor + 1) % members.length;
    return state.descriptorId;
  }

  function drawNextCard() {
    state.cardIndex += 1;
    if (state.cardIndex < state.cardOrder.length) return;

    state.cardOrder = shuffle([...CARD_DECK.keys()]);
    state.cardIndex = 0;
  }

  function finishTurn() {
    if (state.phase !== PHASE.PLAYING) return;

    const { correct, skipped, taboo } = state.turn;
    const points = correct - skipped - taboo;
    const team = state.activeTeam;
    state.scores[team] = Math.max(0, state.scores[team] + points);
    state.lastRound = { team, correct, skipped, taboo, points };
    state.turn = null;

    if (state.scores[team] >= state.targetScore) {
      state.phase = PHASE.FINISHED;
      state.winner = team;
      return;
    }

    state.activeTeam = otherTeam(team);
    if (!chooseNextDescriptor(state.activeTeam)) {
      state.phase = PHASE.FINISHED;
      state.winner = null;
      return;
    }

    state.phase = PHASE.READY;
  }

  function validTeam(team) {
    return Object.values(TEAM).includes(team);
  }

  function applyHostAction(senderId, action, data = {}) {
    if (!isHost() || !state) return;

    if (action === ACTION.ASSIGN_TEAM) {
      if (senderId !== state.hostId || state.phase !== PHASE.LOBBY || !players[data.playerId] || !validTeam(data.team)) return;
      state.teams[data.playerId] = data.team;
      syncState();
      return;
    }

    if (action === ACTION.CHANGE_TARGET) {
      if (senderId !== state.hostId || state.phase !== PHASE.LOBBY) return;
      state.targetScore = Math.max(3, Math.min(99, Number(data.targetScore) || 20));
      syncState();
      return;
    }

    if (action === ACTION.START_GAME) {
      if (senderId !== state.hostId || state.phase !== PHASE.LOBBY || !hasTwoTeams()) return;
      state.scores = { [TEAM.BLUE]: 0, [TEAM.PINK]: 0 };
      state.activeTeam = TEAM.BLUE;
      state.descriptorCursor = { [TEAM.BLUE]: 0, [TEAM.PINK]: 0 };
      state.cardOrder = shuffle([...CARD_DECK.keys()]);
      state.cardIndex = 0;
      state.turn = null;
      state.lastRound = null;
      state.winner = null;
      chooseNextDescriptor(TEAM.BLUE);
      state.phase = PHASE.READY;
      syncState();
      return;
    }

    if (action === ACTION.START_TURN) {
      if (senderId !== state.hostId || state.phase !== PHASE.READY || !state.descriptorId) return;
      state.lastRound = null;
      state.turn = { correct: 0, skipped: 0, taboo: 0, endsAt: Date.now() + TURN_DURATION_MS };
      state.phase = PHASE.PLAYING;
      syncState();
      return;
    }

    if (action === ACTION.CARD_RESULT) {
      if (state.phase !== PHASE.PLAYING || !['correct', 'skipped', 'taboo'].includes(data.result)) return;
      const senderTeam = teamFor(senderId);
      const isDescriber = senderId === state.descriptorId;
      const isOpponent = senderTeam === otherTeam(state.activeTeam);
      const allowed = (data.result === 'taboo' && isOpponent) || (data.result !== 'taboo' && isDescriber);
      if (!allowed) return;

      state.turn[data.result] += 1;
      drawNextCard();
      syncState();
      return;
    }

    if (action === ACTION.TIME_EXPIRED) {
      if (state.phase !== PHASE.PLAYING || (senderId !== state.hostId && Date.now() < state.turn.endsAt)) return;
      finishTurn();
      syncState();
      return;
    }

    if (action === ACTION.END_GAME && senderId === state.hostId) {
      state.phase = PHASE.FINISHED;
      state.winner = null;
      state.turn = null;
      syncState();
    }
  }

  function requestAction(action, data = {}) {
    if (!state) return;

    if (isHost()) applyHostAction(myId, action, data);
    Multiplayer.sendAction(action, data);
  }

  function onConnected(data) {
    myId = data.playerId;
    players = data.players || {};
    setMessage('connection-status', `Connesso alla stanza ${data.room || ''}.`, 'success');

    if (Object.keys(players).length === 1) {
      state = createLobby(myId);
      syncState();
    }

    render();
  }

  function onState(nextState) {
    if (!nextState || nextState.game !== 'TABOO') return;
    state = nextState;
    render();
    scheduleDeadline();
  }

  function onPlayers(nextPlayers) {
    players = nextPlayers || {};
    if (isHost() && state?.phase === PHASE.LOBBY) {
      Object.keys(players).forEach(playerId => {
        if (!state.teams[playerId]) state.teams[playerId] = TEAM.SPECTATOR;
      });
      syncState();
      return;
    }
    render();
  }

  function onPlayerJoined(player) {
    if (player?.id) players[player.id] = player;
    onPlayers(players);
  }

  function onPlayerLeft(playerId) {
    delete players[playerId];
    if (state?.hostId === playerId) {
      state.hostId = Object.keys(players).sort()[0] || null;
    }

    if (!isHost()) {
      render();
      return;
    }

    delete state.teams[playerId];
    if (state.descriptorId === playerId && state.phase !== PHASE.LOBBY) {
      if (state.phase === PHASE.PLAYING) finishTurn();
      else chooseNextDescriptor(state.activeTeam);
    }
    syncState();
  }

  function onAction(senderId, action, data) {
    if (!action?.startsWith('taboo:') || senderId === myId) return;
    applyHostAction(senderId, action, data);
  }

  function onDisconnected() {
    clearTimeout(deadlineTimer);
    deadlineTimer = null;
    myId = null;
    players = {};
    state = null;
    setMessage('connection-status', 'Non connesso');
    render();
  }

  function connect() {
    const playerName = $('player-name').value.trim() || 'Anonimo';
    const room = $('room-code').value.trim() || 'taboo';
    const server = $('server-url').value.trim() || 'wss://anime-multiplayer-server.onrender.com';
    setMessage('connection-status', 'Connessione in corso…');
    Multiplayer.connect({ playerName, room, server });
  }

  function leave() {
    Multiplayer.leave();
  }

  function init() {
    $('connect-button').addEventListener('click', connect);
    $('leave-button').addEventListener('click', leave);
    $('leave-game-button').addEventListener('click', leave);
    $('start-button').addEventListener('click', () => requestAction(ACTION.START_GAME));
    $('begin-turn-button').addEventListener('click', () => requestAction(ACTION.START_TURN));
    $('correct-button').addEventListener('click', () => requestAction(ACTION.CARD_RESULT, { result: 'correct' }));
    $('skip-button').addEventListener('click', () => requestAction(ACTION.CARD_RESULT, { result: 'skipped' }));
    $('taboo-button').addEventListener('click', () => requestAction(ACTION.CARD_RESULT, { result: 'taboo' }));
    $('end-game-button').addEventListener('click', () => requestAction(ACTION.END_GAME));
    $('target-score').addEventListener('change', event => requestAction(ACTION.CHANGE_TARGET, { targetScore: event.target.value }));

    Multiplayer.on('connected', onConnected);
    Multiplayer.on('state', onState);
    Multiplayer.on('players', onPlayers);
    Multiplayer.on('playerJoined', onPlayerJoined);
    Multiplayer.on('playerLeft', onPlayerLeft);
    Multiplayer.on('action', onAction);
    Multiplayer.on('disconnected', onDisconnected);
    Multiplayer.on('error', error => setMessage('connection-status', `Errore: ${error}`, 'error'));

    setInterval(updateTimer, 250);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
