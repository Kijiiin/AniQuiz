const ANIME_DB = [
  {
    title: "Naruto",
    aliases: ["naruto", "naruto shippuden", "naruto shipuden"],
    synopsis: "Un ragazzo che non sa stare da solo e insegue un amico che scappa, mentre cerca di farsi accettare da persone che all'inizio lo odiavano. E ha un problema di controllo della rabbia."
  },
  {
    title: "One Piece",
    aliases: ["one piece", "onepiece"],
    synopsis: "Una persona che non sa nuotare ma vuole attraversare gli oceani. Più cerca la libertà, più si carica di responsabilità e amici che lo seguono senza capire perché."
  },
  {
    title: "Attack on Titan",
    aliases: ["attack on titan", "shingeki no kyojin", "aot", "l'attacco dei giganti", "attacco dei giganti"],
    synopsis: "Un ragazzo che non può uscire di casa perché fuori c'è gente più grande di lui che vuole mangiarlo. Decide che l'unica soluzione è ucciderli tutti, ma poi scopre di essere come loro."
  },
  {
    title: "Demon Slayer",
    aliases: ["demon slayer", "kimetsu no yaiba", "cacciatore di demoni", "demoni", "demon slayer: kimetsu no yaiba"],
    synopsis: "Un venditore di carbone che diventa un cacciatore notturno perché qualcuno ha trasformato sua sorella. Passa il tempo a respirare in modi strani e a fare amicizia con i suoi nemici."
  },
  {
    title: "My Hero Academia",
    aliases: ["my hero academia", "boku no hero academia", "bnha", "mha", "heroaca"],
    synopsis: "Un ragazzo che è nato senza nulla in un mondo dove tutti hanno qualcosa. Un tipo muscoloso gli regala il suo dono e ora deve imparare a non rompersi le ossa facendo il giusto."
  },
  {
    title: "Death Note",
    aliases: ["death note", "deathnote", "quaderno della morte", "deathenote"],
    synopsis: "Uno studente che si annoia troppo e decide di scrivere i nomi delle persone su un taccuino. Il problema è che quando scrive, succedono cose. Forse doveva comprare un'agenda normale."
  },
  {
    title: "Fullmetal Alchemist: Brotherhood",
    aliases: ["fullmetal alchemist", "fullmetal alchemist brotherhood", "fma", "fma:b", "alchimista d'acciaio", "full metal alchemist", "fma brotherhood"],
    synopsis: "Due fratelli che volevano tanto la mamma da fare un casino e hanno perso pezzi del loro corpo. Ora cercano un sasso per riparare i danni, ma scoprono che la verità è peggio di quello che pensavano."
  },
  {
    title: "Sword Art Online",
    aliases: ["sword art online", "sao", "sa", "sword art online alicization"],
    synopsis: "Una persona che ama i videogiochi più della realtà. Un giorno il gioco non lo fa più uscire e se muore dentro, muore fuori. Per sopravvivere deve battere il capo, ma preferisce fare amicizia."
  },
  {
    title: "Tokyo Ghoul",
    aliases: ["tokyo ghoul", "tokyoghoul", "tokyo gul", "ghoul"],
    synopsis: "Un ragazzo che esce con una ragazza che si rivela essere un mostro che mangia persone. Dopo un incidente, diventa mezzo mostro e passa la vita a non capire se vuole essere umano o bestia."
  },
  {
    title: "Jujutsu Kaisen",
    aliases: ["jujutsu kaisen", "jjk", "jujutsukaisen", "sorcery fight"],
    synopsis: "Un ragazzo che ingoia qualcosa che non doveva ingoiare e ora ha un inquilino indesiderato dentro di sé. Per gestire la situazione, va a studiare in una scuola dove insegnano a combattere l'impossibile."
  },
  {
    title: "One Punch Man",
    aliases: ["one punch man", "onepunchman", "opm", "un pugno", "saitama"],
    synopsis: "Un tizio che si è allenato tanto da diventare troppo forte. Ora è annoiato perché vince sempre. Passa il tempo a cercare qualcuno che gli faccia un bel combattimento, ma nessuno regge un colpo."
  },
  {
    title: "Steins;Gate",
    aliases: ["steins gate", "steinsgate", "stein gate"],
    synopsis: "Un gruppo di improvvisati scienziati scopre che il forno a microonde può mandare messaggi al passato. Le conseguenze sono disastrose e ora devono aggiustare i casini che loro stessi hanno creato."
  },
  {
    title: "Cowboy Bebop",
    aliases: ["cowboy bebop", "bebop"],
    synopsis: "Un uomo che vive nel passato e viaggia nello spazio per dimenticare. Con un equipaggio di persone che scappano dai propri fantasmi, cerca un criminale che forse è meglio non trovare."
  },
  {
    title: "Evangelion",
    aliases: ["evangelion", "neon genesis evangelion", "nge"],
    synopsis: "Un ragazzo che non ha mai avuto una famiglia normale viene costretto a guidare un robot per salvare il mondo. Ma il mondo è l'ultimo dei suoi problemi, perché dentro ha un vuoto che nemmeno i robot riempiono."
  },
  {
    title: "Dragon Ball Z",
    aliases: ["dragon ball z", "dbz", "dragonball z", "dragonball"],
    synopsis: "Un uomo che viene da un altro pianeta e passa la vita a combattere contro altri alieni sempre più forti. Ogni volta che muore, resuscita. Ogni volta che vince, c'è un nemico più grande."
  },
  {
    title: "Sailor Moon",
    aliases: ["sailor moon", "pretty guardian sailor moon", "bishoujo senshi sailor moon"],
    synopsis: "Una ragazza normale scopre di essere una principessa guerriera e deve salvare il mondo. Più cerca di vivere una vita normale, più il destino la chiama a combattere contro il male."
  },
  {
    title: "Hunter x Hunter",
    aliases: ["hunter x hunter", "hunterxhunter", "hxh"],
    synopsis: "Un bambino che non ha mai conosciuto suo padre decide di diventare un cacciatore per trovarlo. Scopre che il mondo è più grande e pericoloso di quanto pensasse, e che crescere è più difficile che uccidere."
  },
  {
    title: "Fairy Tail",
    aliases: ["fairy tail", "fairytail", "ft"],
    synopsis: "Una ragazza con un sacco di chiavi entra in un club di maghi esagerati. Più litigano, più diventano forti. Il potere dell'amicizia è reale e funziona, anche quando non dovrebbe."
  },
  {
    title: "Gintama",
    aliases: ["gintama"],
    synopsis: "Un samurai che vive in un Giappone invaso da alieni e non ha un lavoro fisso. Per pagare l'affitto fa qualsiasi cosa, anche le cose più umilianti. Ma ha un codice d'onore che lo guida."
  },
  {
    title: "Mob Psycho 100",
    aliases: ["mob psycho", "mob psycho 100", "mobpsycho"],
    synopsis: "Un ragazzo che ha un potere immenso ma non sa cosa farne. Cerca di vivere una vita normale, ma il mondo continua a metterlo alla prova e la sua rabbia potrebbe distruggere tutto."
  },
  {
    title: "Bleach",
    aliases: ["bleach"],
    synopsis: "Un ragazzo che vede cose che gli altri non vedono. Un giorno incontra una donna in nero che cambia la sua vita e ora deve combattere contro le ombre che minacciano il mondo."
  },
  {
    title: "Black Clover",
    aliases: ["black clover", "blackclover"],
    synopsis: "Un ragazzo che è nato senza magia in un mondo dove tutti ne hanno. Non si arrende mai e grida tanto. Il suo grido è così potente che forse non ha bisogno di magia."
  },
  {
    title: "Chainsaw Man",
    aliases: ["chainsaw man", "chainsawman", "csm"],
    synopsis: "Un ragazzo che ha un debito enorme e si fonde con il suo cane per diventare un'arma. Ora uccide demoni per soldi e scopre che la felicità è più difficile da ottenere di quanto pensasse."
  },
  {
    title: "Spy x Family",
    aliases: ["spy x family", "spy family", "spyxfamily"],
    synopsis: "Un uomo che mente per lavoro deve crearsi una famiglia finta. La moglie mente, la figlia legge i pensieri, e il cane sa cose. Insieme fanno una famiglia quasi normale, ma solo quasi."
  },
  {
    title: "Vinland Saga",
    aliases: ["vinland saga", "vinlandsaga"],
    synopsis: "Un ragazzo che vuole vendetta viaggia attraverso mari e guerre. Più avanza, più capisce che la vendetta non risolve niente e che forse c'è un modo diverso di vivere."
  },
  {
    title: "Berserk",
    aliases: ["berserk"],
    synopsis: "Un uomo con una spada più grande di lui e un passato pieno di cicatrici combatte contro un destino che sembra volerlo distruggere. La sua vita è una serie di sconfitte, ma continua a camminare."
  },
  {
    title: "Code Geass",
    aliases: ["code geass", "codegeass", "code geass: lelouch of the rebellion"],
    synopsis: "Un principe che tutti credono morto ottiene un potere che gli permette di comandare gli altri. Dalla sua sedia a rotelle, muove le pedine di una guerra che potrebbe cambiare il mondo."
  },
  {
    title: "Gurren Lagann",
    aliases: ["gurren lagann", "tengen toppa gurren lagann", "ttgl"],
    synopsis: "Un ragazzo che ha sempre vissuto sottoterra decide di bucare il cielo per vedere cosa c'è sopra. Ogni volta che arriva in cima, scopre che c'è un altro soffitto da bucare."
  },
  {
    title: "Fate/stay night: UBW",
    aliases: ["fate stay night", "fate/stay night", "fate", "fate unlimited blade works", "ubw"],
    synopsis: "Un ragazzo che vuole essere un eroe di giustizia viene coinvolto in una lotteria dove il premio è il potere assoluto. Per vincerla, deve combattere eroi del passato resuscitati."
  },
  {
    title: "Haikyu!!",
    aliases: ["haikyu", "haikyuu", "haikyu!!"],
    synopsis: "Un ragazzo che non è alto ma salta come se lo fosse. Insieme a un genio che non si allena mai, insegue il sogno di toccare il cielo con un pallone."
  },
  {
    title: "Kuroko no Basket",
    aliases: ["kuroko no basket", "kuroko's basketball", "kuroko", "kuroko no baske"],
    synopsis: "Un ragazzo che non si nota mai gioca a basket. La sua forza è essere invisibile e passare la palla agli altri. Insieme ai suoi compagni, cerca di dimostrare che la squadra batte l'individualismo."
  },
  {
    title: "Inuyasha",
    aliases: ["inuyasha"],
    synopsis: "Una ragazza che viene dal futuro cade in un pozzo e si ritrova nel passato con un mezzo demone che ha le orecchie da cane. Insieme cercano pezzi di una sfera che dà potere."
  },
  {
    title: "Yu Yu Hakusho",
    aliases: ["yu yu hakusho", "yuyuhakusho"],
    synopsis: "Un ragazzo con la faccia da duro muore e diventa un investigatore del mondo degli spiriti. La sua vita dopo la morte è più attiva di quella da vivo."
  },
  {
    title: "Ranma ½",
    aliases: ["ranma", "ranma 1/2", "ranma mezzo"],
    synopsis: "Un ragazzo che si trasforma in ragazza quando lo bagnano con acqua fredda. È fidanzato con una ragazza che lo picchia e deve gestire una vita sentimentale complicatissima."
  },
  {
    title: "Trigun",
    aliases: ["trigun"],
    synopsis: "Un uomo con una taglia enorme sulla testa cerca di vivere in pace, ma tutti vogliono ucciderlo. Il suo passato è violento, ma ha deciso che non ucciderà mai più."
  },
  {
    title: "Samurai Champloo",
    aliases: ["samurai champloo"],
    synopsis: "Due samurai con stili diversi e una ragazza in cerca di un uomo che odora di girasoli viaggiano per il Giappone. Nel tragitto, scoprono che la vita è più strana di quanto pensassero."
  },
  {
    title: "FLCL",
    aliases: ["flcl", "fooly cooly"],
    synopsis: "Un ragazzo viene investito da una motociclista aliena e da quel momento gli escono robot dalla testa. È una storia che non si capisce, ma forse non deve essere capita."
  },
  {
    title: "Akira",
    aliases: ["akira"],
    synopsis: "In una città futura distrutta, un ragazzo sviluppa poteri che non sa controllare. Il governo lo vuole studiare, un gruppo di ribelli lo vuole salvare, e tutti vogliono il suo potere."
  },
  {
    title: "Ghost in the Shell",
    aliases: ["ghost in the shell", "gis", "kōkaku kidōtai"],
    synopsis: "In un mondo dove il corpo è solo un contenitore, una donna caccia un hacker che ruba le identità delle persone. La sua ricerca la porta a chiedersi cosa significhi essere umani."
  },
  {
    title: "Paprika",
    aliases: ["paprika"],
    synopsis: "Una donna può entrare nei sogni della gente per curarli. Quando la sua macchina viene rubata, i sogni iniziano a invadere la realtà e i confini tra immaginazione e mondo reale si confondono."
  },
  {
    title: "Perfect Blue",
    aliases: ["perfect blue"],
    synopsis: "Una cantante che vuole diventare attrice inizia a perdere il contatto con la realtà. La sua vita diventa un film in cui lei è al tempo stesso spettatrice e protagonista."
  },
  {
    title: "Your Lie in April",
    aliases: ["your lie in april", "shigatsu wa kimi no uso", "la tua bugia ad aprile"],
    synopsis: "Un ragazzo che suona il piano ma non sente più la musica incontra una ragazza che suona il violino come se ballasse. Lei lo aiuta a riscoprire il suono della sua anima."
  },
  {
    title: "Anohana",
    aliases: ["anohana", "the flower we saw that day", "ano hi mita hana no namae o bokutachi wa mada shiranai"],
    synopsis: "Un gruppo di amici d'infanzia si riunisce quando il fantasma di un'amica scomparsa appare a uno di loro. Devono capire cosa lei vuole prima che sia troppo tardi."
  },
  {
    title: "Clannad: After Story",
    aliases: ["clannad", "clannad after story"],
    synopsis: "Un ragazzo che ha sempre vissuto nell'ombra scopre la luce attraverso l'amore, ma la vita gli insegna che la luce può anche spegnersi. Un viaggio attraverso le gioie e i dolori dell'esistenza."
  },
  {
    title: "Toradora!",
    aliases: ["toradora"],
    synopsis: "Un ragazzo dall'aria minacciosa e una ragazza piccola e violenta si aiutano a conquistare i loro migliori amici. Ma l'amore non si sceglie, e il cuore non ascolta la ragione."
  },
  {
    title: "Kaguya-sama: Love Is War",
    aliases: ["kaguya sama", "kaguya-sama", "love is war", "kaguya-sama: love is war"],
    synopsis: "Due persone che si amano ma non vogliono confessare trasformano il corteggiamento in una guerra psicologica. L'intelligenza è la loro arma, ma l'amore è il loro campo di battaglia."
  },
  {
    title: "Mushoku Tensei",
    aliases: ["mushoku tensei", "jobless reincarnation", "mushoku tensei: jobless reincarnation"],
    synopsis: "Un uomo che ha fallito nella sua prima vita ottiene una seconda possibilità in un mondo di magia. Con il ricordo del suo fallimento, cerca di vivere senza rimpianti questa nuova esistenza."
  },
  {
    title: "Re:Zero",
    aliases: ["re:zero", "re zero", "rezero", "starting life in another world"],
    synopsis: "Un ragazzo che viene trascinato in un mondo fantasy scopre di avere il potere di tornare indietro nel tempo quando muore. Ogni morte è una lezione, e ogni lezione è un passo verso la salvezza."
  },
  {
    title: "Konosuba",
    aliases: ["konosuba", "kono subarashii sekai ni shukufuku wo", "god's blessing on this wonderful world"],
    synopsis: "Un ragazzo che muore in modo imbarazzante viene reincarnato in un mondo fantasy con una dea inutile al seguito. Invece di salvare il mondo, cerca solo di sopravvivere ai suoi compagni pazzi."
  },
  {
    title: "Overlord",
    aliases: ["overlord"],
    synopsis: "Un giocatore che si è affezionato troppo al suo personaggio si ritrova intrappolato in un gioco. Non vuole essere l'eroe, vuole dominare tutto e tutti."
  },
  {
    title: "That Time I Got Reincarnated as a Slime",
    aliases: ["tensei shitara slime datta ken", "slime", "that time i got reincarnated as a slime", "tensura"],
    synopsis: "Un uomo che muore e si reincarna in una gelatina blu. Ma non è una gelatina qualsiasi: è una gelatina che può mangiare qualsiasi cosa e diventare più forte. In pochi anni diventa il capo di un'intera nazione."
  },
  {
    title: "The Rising of the Shield Hero",
    aliases: ["shield hero", "the rising of the shield hero", "tate no yuusha no nariagari"],
    synopsis: "Un ragazzo che viene tradito il primo giorno della sua nuova vita in un mondo fantasy deve lottare da solo contro un sistema che lo ha condannato ingiustamente."
  },
  {
    title: "No Game No Life",
    aliases: ["no game no life", "nogamenolife", "ngnl"],
    synopsis: "Due fratelli che hanno passato la vita a giocare ai videogiochi vengono trasportati in un mondo dove tutto si decide con le partite. Il loro obiettivo è sfidare il dio locale e vincere."
  },
  {
    title: "Classroom of the Elite",
    aliases: ["classroom of the elite", "youkoso jitsuryoku shijou shugi no kyoushitsu e", "cote"],
    synopsis: "Un ragazzo che sembra normale in una scuola d'élite dove solo i migliori sopravvivono. In realtà è un genio manipolatore che gioca a scacchi con la vita degli altri."
  },
  {
    title: "Assassination Classroom",
    aliases: ["assassination classroom", "ansatsu kyoushitsu"],
    synopsis: "Un alieno che ha distrutto la Luna decide di insegnare in una classe di studenti che lo devono uccidere entro un anno. Diventa il loro miglior insegnante e il loro peggior incubo."
  },
  {
    title: "Great Teacher Onizuka",
    aliases: ["great teacher onizuka", "gto"],
    synopsis: "Un ex motociclista senza titoli di studio diventa insegnante di una classe di ragazzi difficili. Invece di insegnare matematica, insegna la vita."
  },
  {
    title: "Dragon Ball",
    aliases: ["dragon ball", "dragonball"],
    synopsis: "Un ragazzo con una coda di scimmia e una forza incredibile cerca delle palle magiche per esprimere un desiderio. Lungo la strada, scopre che il vero tesoro è l'amicizia."
  },
  {
    title: "Pokemon",
    aliases: ["pokemon", "pocket monsters", "pokémon"],
    synopsis: "Un ragazzo di dieci anni lascia casa per catturare creature che vivono in palle. Invece di studiare, va in giro per il mondo a collezionare mostri e fare amicizia."
  },
  {
    title: "Digimon Adventure",
    aliases: ["digimon", "digimon adventure"],
    synopsis: "Un gruppo di bambini che viene risucchiato nel computer. Insieme a creature digitali che si trasformano, cercano di salvare entrambi i mondi, reale e virtuale."
  },
  {
    title: "Yu-Gi-Oh!",
    aliases: ["yu gi oh", "yu-gi-oh", "yugioh"],
    synopsis: "Un ragazzo che risolve un puzzle antico diventa il re di un gioco di carte. Le sue partite decidono il destino di chi perde, e a volte anche di chi vince."
  },
  {
    title: "Cardcaptor Sakura",
    aliases: ["cardcaptor sakura", "sakura card captor"],
    synopsis: "Una bambina che apre un libro magico e libera delle carte che scappano. Ora deve catturarle tutte prima che causino guai, con l'aiuto di un orso parlante."
  },
  {
    title: "Madoka Magica",
    aliases: ["madoka magica", "puella magi madoka magica", "madoka"],
    synopsis: "Un gruppo di ragazze che fanno un patto per diventare magiche e realizzare un desiderio. Ma il prezzo da pagare è più alto di quanto immaginassero e la felicità è solo un'illusione."
  },
  {
    title: "Soul Eater",
    aliases: ["soul eater"],
    synopsis: "In una scuola dove alcuni studenti possono trasformarsi in armi, un ragazzo e la sua partner devono raccogliere anime per creare l'arma più potente del mondo."
  },
  {
    title: "Fire Force",
    aliases: ["fire force", "en'en no shouboutai"],
    synopsis: "In un mondo dove la gente si trasforma in fiamme viventi, una squadra di pompieri speciali combatte il fuoco usando il fuoco stesso."
  },
  {
    title: "Dr. Stone",
    aliases: ["dr stone", "dr. stone"],
    synopsis: "Tutta l'umanità viene pietrificata per millenni. Un genio della scienza si risveglia e deve ricostruire la civiltà usando la conoscenza contro l'ignoranza."
  },
  {
    title: "The Promised Neverland",
    aliases: ["the promised neverland", "yakusoku no neverland"],
    synopsis: "Dei bambini che vivono in un orfanotrofio scoprono di essere allevati come cibo per mostri. Devono fuggire prima che sia troppo tardi."
  },
  {
    title: "Made in Abyss",
    aliases: ["made in abyss"],
    synopsis: "Una bambina e un robot scendono in un buco senza fondo per cercare la madre scomparsa. Più vanno in profondità, più la risalita diventa impossibile."
  },
  {
    title: "Erased",
    aliases: ["erased", "boku dake ga inai machi", "the town where only i am missing"],
    synopsis: "Un uomo che può tornare indietro nel tempo per prevenire disastri. Viene rispedito alla sua infanzia per fermare un serial killer."
  },
  {
    title: "Parasyte: The Maxim",
    aliases: ["parasyte", "parasyte the maxim", "kiseijuu"],
    synopsis: "Un parassita alieno che cerca di mangiare il cervello del protagonista finisce nella sua mano. Ora devono convivere e combattere insieme contro altri parassiti."
  },
  {
    title: "Mirai Nikki",
    aliases: ["mirai nikki", "future diary"],
    synopsis: "Undici persone che ricevono un diario che predice il futuro devono combattere fino alla morte per diventare il nuovo dio."
  },
  {
    title: "Akame ga Kill!",
    aliases: ["akame ga kill", "akame ga kill!"],
    synopsis: "Un ragazzo che si unisce a un gruppo di assassini per rovesciare un governo corrotto. Scopre che la rivoluzione ha un costo alto e che ogni vittoria ha un prezzo."
  },
  {
    title: "Kill la Kill",
    aliases: ["kill la kill"],
    synopsis: "Una ragazza che cerca l'assassino di suo padre combatte contro un sistema scolastico tirannico. I suoi vestiti le danno potere e la sua determinazione è la sua arma più forte."
  },
  {
    title: "Little Witch Academia",
    aliases: ["little witch academia"],
    synopsis: "Una ragazza senza talento magico entra in una scuola di streghe. Con l'aiuto dell'amicizia e della determinazione, dimostra che la magia è più che talento."
  },
  {
    title: "Baccano!",
    aliases: ["baccano"],
    synopsis: "Una storia piena di gangster, alchimisti e immortali. Le linee temporali si intrecciano e tutto è più confuso di quanto sembri."
  },
  {
    title: "Durarara!!",
    aliases: ["durarara", "durarara!!"],
    synopsis: "A Ikebukuro, una città piena di voci e leggende, una motociclista senza testa e una gang violenta si intrecciano nella vita di una ragazza che cerca il suo posto nel mondo."
  },
  {
    title: "Bungo Stray Dogs",
    aliases: ["bungo stray dogs", "bsd"],
    synopsis: "Un'agenzia di detective con poteri basati su autori famosi risolve casi soprannaturali. I loro nomi sono quelli dei tuoi scrittori preferiti e le loro abilità sono le loro opere."
  },
  {
    title: "Noragami",
    aliases: ["noragami"],
    synopsis: "Un dio senza tempio e senza soldi cerca di farsi conoscere. La sua arma è un ragazzo che si trasforma in spada. Il suo sogno è avere un santuario tutto suo."
  },
  {
    title: "Blue Exorcist",
    aliases: ["blue exorcist", "ao no exorcist"],
    synopsis: "Un ragazzo che scopre di essere figlio del diavolo decide di diventare un esorcista per combattere suo padre."
  },
  {
    title: "Rurouni Kenshin",
    aliases: ["rurouni kenshin", "samurai x"],
    synopsis: "Un ex assassino che giura di non uccidere mai più viaggia per il Giappone dell'Ottocento con una spada che non taglia. Il suo passato lo insegue e la redenzione è la sua unica speranza."
  },
  {
    title: "Beck",
    aliases: ["beck", "beck: mongolian chop squad"],
    synopsis: "Un ragazzo che scopre il rock e forma una band con gli amici. Insieme, cercano di emergere nel mondo della musica."
  },
  {
    title: "K-ON!",
    aliases: ["k-on", "k-on!"],
    synopsis: "Un gruppo di ragazze che forma un club di musica leggera. Invece di suonare, passano il tempo a mangiare dolci e bere tè. La vera musica è l'amicizia."
  },
  {
    title: "Hyouka",
    aliases: ["hyouka"],
    synopsis: "Un ragazzo con una mente brillante ma svogliato risolve misteri scolastici insieme a una ragazza curiosa. I casi non sono omicidi, ma piccoli enigmi di tutti i giorni."
  },
  {
    title: "Oregairu",
    aliases: ["oregairu", "my youth romantic comedy is wrong as i expected"],
    synopsis: "Un ragazzo cinico e solitario viene costretto a unirsi a un club di volontariato. Insegna agli altri l'ipocrisia, ma impara a essere sincero."
  },
  {
    title: "Rascal Does Not Dream of Bunny Girl Senpai",
    aliases: ["rascal does not dream of bunny girl senpai", "bunny girl senpai", "seishun buta yarou"],
    synopsis: "Un ragazzo che incontra una ragazza vestita da coniglio che nessuno vede. Insieme affrontano fenomeni soprannaturali che minacciano la loro realtà."
  },
  {
    title: "The Quintessential Quintuplets",
    aliases: ["the quintessential quintuplets", "gotoubun no hanayome", "5-toubun no hanayome"],
    synopsis: "Un ragazzo povero diventa il tutor di cinque sorelle gemelle. La sua vita diventa una commedia romantica con scelte impossibili."
  },
  {
    title: "Rent-a-Girlfriend",
    aliases: ["rent a girlfriend", "kanojo okarishimasu"],
    synopsis: "Un ragazzo che noleggia una fidanzata si ritrova con una vita sentimentale complicata. Le bugie si accumulano e la verità è sempre più difficile da dire."
  },
  {
    title: "Komi Can't Communicate",
    aliases: ["komi can't communicate", "komi san wa komyushou desu"],
    synopsis: "Una ragazza bellissima e timida che vuole fare cento amici trova aiuto in un ragazzo normale. Insieme, affrontano la scuola e le sue sfide sociali."
  },
  {
    title: "Teasing Master Takagi-san",
    aliases: ["teasing master takagi-san", "karakai jouzu no takagi-san"],
    synopsis: "Una ragazza che prende in giro il suo compagno di classe ogni giorno. Lui cerca di vendicarsi, ma lei è sempre un passo avanti."
  },
  {
    title: "Love, Chunibyo & Other Delusions",
    aliases: ["love chunibyo and other delusions", "chunibyo demo koi ga shitai"],
    synopsis: "Un ragazzo che ha superato la sua fase da supereroe incontra una ragazza che ci crede ancora. La loro storia è un viaggio tra fantasia e realtà."
  },
  {
    title: "Higurashi: When They Cry",
    aliases: ["higurashi", "higurashi when they cry"],
    synopsis: "Un ragazzo che si trasferisce in un villaggio dove ogni anno succedono cose brutte. La storia si ripete in cicli e la verità è più oscura di quanto sembri."
  },
  {
    title: "Another",
    aliases: ["another"],
    synopsis: "Un ragazzo che si trasferisce in una classe maledetta dove gli studenti muoiono in modi atroci. Una ragazza con una benda sull'occhio è la chiave del mistero."
  },
  {
    title: "Shiki",
    aliases: ["shiki"],
    synopsis: "Un villaggio remoto dove la gente muore misteriosamente. I vampiri stanno infestando la zona e i vivi devono combattere i morti."
  },
  {
    title: "Danganronpa",
    aliases: ["danganronpa"],
    synopsis: "Un gruppo di studenti superdotati intrappolati in una scuola. Per uscire, devono uccidere un compagno e non farsi scoprire."
  },
  {
    title: "Sakura Quest",
    aliases: ["sakura quest"],
    synopsis: "Una ragazza che diventa la regina di un villaggio in declino. Il suo compito è rivitalizzare il posto e dare nuova vita a una comunità dimenticata."
  },
  {
    title: "Hanasaku Iroha",
    aliases: ["hanasaku iroha"],
    synopsis: "Una ragazza che viene mandata a lavorare in una locanda tradizionale dalla nonna severa. Attraverso il lavoro duro, impara il valore dell'ospitalità."
  },
  {
    title: "Shirobako",
    aliases: ["shirobako"],
    synopsis: "Cinque ragazze che lavorano nell'industria dell'animazione. La serie segue i loro sogni, le loro difficoltà e la loro passione per gli anime."
  },
  {
    title: "Bakuman",
    aliases: ["bakuman"],
    synopsis: "Due ragazzi che decidono di diventare mangaka. La loro vita è una corsa contro il tempo e la concorrenza per realizzare il sogno di pubblicare un fumetto."
  },
  {
    title: "Kekkai Sensen",
    aliases: ["kekkai sensen", "blood blockade battlefront"],
    synopsis: "New York è stata distrutta da un portale che ha mescolato il mondo umano con quello dei mostri. Un gruppo di pazzi cerca di mantenere l'ordine in una città caotica."
  },
  {
    title: "Blood Blockade Battlefront",
    aliases: ["blood blockade battlefront", "kekkai sensen"],
    synopsis: "Una città dove umani e mostri vivono insieme. Un'organizzazione segreta protegge l'equilibrio tra i due mondi in una lotta per la sopravvivenza."
  },
  {
    title: "Panty & Stocking with Garterbelt",
    aliases: ["panty and stocking", "panty & stocking with garterbelt"],
    synopsis: "Due angeli caduti e un prete si trasformano in armi per combattere fantasmi. Ogni episodio è una parodia di tutto, con umorismo volgare e assurdo."
  },
  {
    title: "Deadman Wonderland",
    aliases: ["deadman wonderland"],
    synopsis: "Un ragazzo condannato a morte per un crimine che non ha commesso viene mandato in un carcere-gioco dove i detenuti combattono per la sopravvivenza."
  },
  {
    title: "The Devil is a Part-Timer!",
    aliases: ["the devil is a part timer", "hataraku maou sama", "maou-sama"],
    synopsis: "Il signore dei demoni viene sconfitto e scappa in un mondo parallelo: il Giappone moderno. Senza poteri, deve farsi assumere al McDonald's per sopravvivere."
  },
  {
    title: "Kabaneri of the Iron Fortress",
    aliases: ["kabaneri of the iron fortress", "kabaneri"],
    synopsis: "In un Giappone steampunk invaso da mostri, un ragazzo cerca di salvare l'umanità con una tecnologia che mescola ferro e sangue."
  },
  {
    title: "Seraph of the End",
    aliases: ["seraph of the end", "owari no seraph"],
    synopsis: "Un virus stermina gli adulti e i vampiri emergono per schiavizzare i bambini sopravvissuti. Un ragazzo giura vendetta e si unisce a un'unità di cacciatori di vampiri."
  },
  {
    title: "Owari no Seraph",
    aliases: ["owari no seraph", "seraph of the end"],
    synopsis: "Un ragazzo che perde tutto a causa dei vampiri si unisce a un esercito per distruggerli. Il suo unico scopo è la vendetta, ma il destino lo porterà a fare scelte difficili."
  },
  {
    title: "A Certain Magical Index",
    aliases: ["a certain magical index", "toaru majutsu no index"],
    synopsis: "In una città di studenti con poteri psichici, un ragazzo che può cancellare qualsiasi abilità soprannaturale viene coinvolto in una guerra tra magia e scienza."
  },
  {
    title: "A Certain Scientific Railgun",
    aliases: ["a certain scientific railgun", "toaru kagaku no railgun"],
    synopsis: "Una ragazza con poteri elettrici è la più forte della sua scuola. Usa la sua abilità per proteggere gli altri e combattere gli abusi del potere."
  },
  {
    title: "Fate/Zero",
    aliases: ["fate zero", "fate/zero"],
    synopsis: "Un prequel di Fate/stay night che racconta la guerra del Santo Graal quattro generazioni prima. Maghi e servitori combattono per un oggetto che esaudisce ogni desiderio."
  },
  {
    title: "Fate/Apocrypha",
    aliases: ["fate apocrypha", "fate/apocrypha"],
    synopsis: "Una guerra del Santo Graal divisa in due fazioni: sette contro sette. Un ragazzo senza identità diventa il centro di una battaglia epica."
  },
  {
    title: "Soul Eater Not!",
    aliases: ["soul eater not"],
    synopsis: "Un spin-off di Soul Eater che segue tre ragazze che studiano per diventare armi. Con meno violenza e più commedia."
  },
  {
    title: "Kuroko's Basketball",
    aliases: ["kurokos basketball", "kuroko no basket", "kuroko no basuke"],
    synopsis: "Un ragazzo che passa inosservato gioca a basket come un'ombra. La sua squadra è piena di fenomeni che cercano di dimostrare di essere i migliori."
  },
  {
    title: "Free!",
    aliases: ["free"],
    synopsis: "Un ragazzo che ha sempre amato l'acqua e il nuoto cerca di ritrovare la passione per il suo sport. Insieme ai suoi compagni, affronta le sfide della competizione e dell'amicizia."
  },
  {
    title: "Yuri on Ice",
    aliases: ["yuri on ice", "yuri on ice"],
    synopsis: "Un pattinatore che ha perso la fiducia in sé stesso trova un allenatore che lo riporta in pista. La loro relazione lo aiuta a ritrovare la gioia di gareggiare."
  },
  {
    title: "Sk8 the Infinity",
    aliases: ["sk8", "sk8 the infinity"],
    synopsis: "Un ragazzo che ama lo skateboard e un ragazzo che lo odia si sfidano in una gara estrema. La competizione li porterà a superare i loro limiti."
  },
  {
    title: "Banana Fish",
    aliases: ["banana fish"],
    synopsis: "Un ragazzo che è il capo di una gang di New York cerca un misterioso farmaco chiamato Banana Fish. La sua ricerca lo porta a scoprire il suo passato."
  },
  {
    title: "Given",
    aliases: ["given"],
    synopsis: "Un ragazzo che suona la chitarra in una band incontra un ragazzo che ha perso il suo amore per la musica. Insieme, scoprono il potere della musica di guarire le ferite."
  },
  {
    title: "Yuri!!! on ICE",
    aliases: ["yuri on ice", "yuri!!! on ice"],
    synopsis: "Un pattinatore sul ghiaccio che ha perso la sua passione trova un allenatore che lo riporta alla vittoria. Tra competizioni e sentimenti, la sua vita cambia completamente."
  },
  {
    title: "Carole & Tuesday",
    aliases: ["carole and tuesday", "carole & tuesday"],
    synopsis: "Due ragazze in un mondo dove la musica è fatta dall'IA si incontrano e decidono di suonare insieme. La loro amicizia e la loro musica sfidano il sistema."
  },
  {
    title: "Beck: Mongolian Chop Squad",
    aliases: ["beck mongolian chop squad", "beck"],
    synopsis: "Un ragazzo che impara a suonare la chitarra e scopre la musica rock. Insieme ai suoi amici, forma una band e cerca di emergere nella scena musicale giapponese."
  },
  {
    title: "Nana",
    aliases: ["nana"],
    synopsis: "Due ragazze che si chiamano Nana si incontrano su un treno per Tokyo. La loro amicizia e le loro storie d'amore si intrecciano in un dramma musicale."
  },
  {
    title: "Kids on the Slope",
    aliases: ["kids on the slope", "sakamichi no apollon"],
    synopsis: "Due ragazzi che suonano il jazz in una città del Giappone degli anni '60. La musica li unisce e li aiuta ad affrontare le sfide della vita."
  }
];