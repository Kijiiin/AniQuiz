// ============================================================
//  LOGICA DI GIOCO – NON MODIFICARE SE NON SAI COSA FARE
//  Usa l'API di YouTube per cercare le opening
// ============================================================

(function() {
    // 🔑 INSERISCI QUI LA TUA API KEY DI YOUTUBE
    // (prendila dalla console Google Cloud, come nel tuo altro progetto)
    const YOUTUBE_API_KEY = "AIzaSyCXsFDpO4dYRiwlTPA4s5rbaIpCG4_7EB4";

    // Decodifica Base64 (opzionale)
    function encodeBase64(str) {
        return btoa(str);
    }

    function decodeBase64(str) {
        return atob(str);
    }

    // Prepara le domande: converte in Base64 per offuscare
    function prepareQuestions(data) {
        return data.map(q => ({
            opening: q.opening,
            anime: q.anime,
            options: q.options.map(opt => encodeBase64(opt)),
            correct: encodeBase64(q.correct)
        }));
    }

    // Stati del gioco
    let questions = prepareQuestions(questionsData);
    let currentIndex = 0;
    let score = 0;
    let answered = false;
    let totalQuestions = questions.length;

    // DOM elements
    const youtubePlayer = document.getElementById('youtubePlayer');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const totalDisplay = document.getElementById('totalDisplay');
    const questionCounter = document.getElementById('questionCounter');
    const optionsContainer = document.getElementById('optionsContainer');
    const nextBtn = document.getElementById('nextBtn');
    const questionArea = document.getElementById('questionArea');
    const finalScreen = document.getElementById('finalScreen');
    const finalScore = document.getElementById('finalScore');
    const finalMessage = document.getElementById('finalMessage');
    const restartBtn = document.getElementById('restartBtn');

    // Elementi UI audio
    const audioIcon = document.getElementById('audioIcon');
    const audioStatus = document.getElementById('audioStatus');

    // Utility: mescola array
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Decodifica un array di opzioni
    function decodeOptions(encodedOptions) {
        return encodedOptions.map(enc => decodeBase64(enc));
    }

    // 🔍 CERCA UN VIDEO SU YOUTUBE
    async function searchYouTubeVideo(query) {
        try {
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&type=video`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                return data.items[0].id.videoId;
            }
            return null;
        } catch (error) {
            console.error("Errore ricerca YouTube:", error);
            return null;
        }
    }

    // Carica una domanda
    async function loadQuestion(index) {
        if (index >= totalQuestions) {
            showFinalScreen();
            return;
        }

        const q = questions[index];
        questionCounter.textContent = `Domanda ${index + 1} / ${totalQuestions}`;

        const openingName = q.opening;
        const animeName = q.anime;
        
        // Aggiorna UI audio: caricamento
        audioStatus.textContent = `🔍 Cerco "${openingName}"...`;
        audioStatus.className = 'audio-status loading';
        audioIcon.textContent = '⏳';

        // Cerca il video su YouTube
        const searchQuery = `${openingName} ${animeName} opening`;
        let videoId = await searchYouTubeVideo(searchQuery);

        // Se non trova, prova con solo il nome dell'opening
        if (!videoId) {
            videoId = await searchYouTubeVideo(`${openingName} opening`);
        }

        if (videoId) {
            // Carica il video con autoplay e muto (per superare i blocchi browser)
            youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&mute=1`;
            questionCounter.textContent = `Domanda ${index + 1} / ${totalQuestions}`;
            
            // UI audio: in riproduzione
            audioStatus.textContent = `🎵 In riproduzione...`;
            audioStatus.className = 'audio-status playing';
            audioIcon.textContent = '🎵';

            // Forza la riproduzione dopo il caricamento (se l'autoplay non parte)
            setTimeout(() => {
                try {
                    youtubePlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                } catch (e) { /* ignora */ }
            }, 1000);
        } else {
            // Fallback: mostra errore
            questionCounter.textContent = `Domanda ${index + 1} / ${totalQuestions}`;
            audioStatus.textContent = `⚠️ Video non trovato per "${openingName}"`;
            audioStatus.className = 'audio-status error';
            audioIcon.textContent = '❌';
            youtubePlayer.src = "";
        }

        // Decodifica e mescola le opzioni
        const decodedOptions = decodeOptions(q.options);
        const correctDecoded = decodeBase64(q.correct);
        const shuffled = shuffleArray([...decodedOptions]);
        const correctIndex = shuffled.indexOf(correctDecoded);

        optionsContainer.dataset.correctIndex = correctIndex;
        optionsContainer.dataset.answered = 'false';

        optionsContainer.innerHTML = '';
        shuffled.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.dataset.index = i;
            btn.addEventListener('click', () => handleOptionClick(i));
            optionsContainer.appendChild(btn);
        });

        answered = false;
        nextBtn.disabled = true;
        document.querySelectorAll('.option-btn').forEach(b => {
            b.classList.remove('correct', 'wrong', 'disabled');
        });

        questionArea.style.display = 'block';
        finalScreen.style.display = 'none';
    }

    // Gestione click su opzione
    function handleOptionClick(selectedIndex) {
        if (answered) return;
        const container = optionsContainer;
        const correctIndex = parseInt(container.dataset.correctIndex);
        const buttons = container.querySelectorAll('.option-btn');

        buttons.forEach(b => b.classList.add('disabled'));

        buttons.forEach((btn, i) => {
            if (i === correctIndex) {
                btn.classList.add('correct');
            } else if (i === selectedIndex && i !== correctIndex) {
                btn.classList.add('wrong');
            }
        });

        if (selectedIndex === correctIndex) {
            score++;
            scoreDisplay.textContent = score;
        }

        answered = true;
        nextBtn.disabled = false;
        container.dataset.answered = 'true';
    }

    // Vai alla prossima domanda
    function goToNext() {
        if (!answered) return;
        currentIndex++;
        if (currentIndex < totalQuestions) {
            loadQuestion(currentIndex);
        } else {
            showFinalScreen();
        }
    }

    // Schermata finale
    function showFinalScreen() {
        questionArea.style.display = 'none';
        finalScreen.style.display = 'block';
        finalScore.textContent = `${score} / ${totalQuestions}`;

        let msg = '';
        const perc = score / totalQuestions;
        if (perc === 1) msg = '🎊 Perfetto! Sei un vero otaku!';
        else if (perc >= 0.8) msg = '🌟 Ottimo! Conosci molte opening!';
        else if (perc >= 0.6) msg = '👍 Buon lavoro! Continua così!';
        else if (perc >= 0.4) msg = '📺 Hai ancora qualche lacuna, ma puoi migliorare!';
        else msg = '😅 Forse è ora di rivedere qualche anime!';
        finalMessage.textContent = msg;

        // Resetta UI audio
        audioStatus.textContent = '🎬 Quiz terminato!';
        audioStatus.className = 'audio-status';
        audioIcon.textContent = '🏆';
        youtubePlayer.src = '';
    }

    // Riavvio
    function restartGame() {
        currentIndex = 0;
        score = 0;
        scoreDisplay.textContent = '0';
        answered = false;
        shuffleArray(questions);
        totalQuestions = questions.length;
        totalDisplay.textContent = totalQuestions;
        loadQuestion(0);
    }

    // Event listeners
    nextBtn.addEventListener('click', goToNext);
    restartBtn.addEventListener('click', restartGame);

    // Avvio
    totalDisplay.textContent = totalQuestions;
    scoreDisplay.textContent = '0';
    shuffleArray(questions);
    loadQuestion(0);
    console.log('🎮 Gioco avviato con', totalQuestions, 'domande');
})();
