// ============================================================
//  DATABASE DI ANIME (titolo + sinossi)
//  Puoi aggiungere, modificare o rimuovere voci liberamente.
//  Ogni voce deve avere "title" e "synopsis".
// ============================================================

const ANIME_DB = [
  {
    title: "Naruto",
    synopsis: "Un giovane ninja con un demone volpe sigillato dentro di lui sogna di diventare il capo del suo villaggio, l'Hokage. Lungo la strada, affronta nemici potenti e scopre il vero significato dell'amicizia."
  },
  {
    title: "One Piece",
    synopsis: "Monkey D. Luffy, un ragazzo con il potere della gomma, sogna di diventare il Re dei Pirati. Insieme alla sua ciurma, naviga per la Rotta Maggiore in cerca del leggendario tesoro One Piece."
  },
  {
    title: "Attack on Titan",
    synopsis: "In un mondo in cui l'umanità vive rinchiusa in gigantesche mura per proteggersi dai Titani, enormi creature divoratrici, il giovane Eren giura di sterminarli tutti dopo che la sua città viene distrutta."
  },
  {
    title: "Demon Slayer",
    synopsis: "Tanjiro Kamado, un ragazzo gentile, diventa un cacciatore di demoni per salvare sua sorella Nezuko, trasformata in demone, e vendicare la sua famiglia uccisa da un demone malvagio."
  },
  {
    title: "My Hero Academia",
    synopsis: "In un mondo dove l'80% della popolazione ha poteri speciali, il quirkless Midoriya viene scelto dal più grande eroe per ereditare i suoi poteri e diventare un eroe professionista."
  },
  {
    title: "Death Note",
    synopsis: "Un geniale studente trova un taccuino soprannaturale che uccide chiunque ne venga scritto il nome. Decide di diventare il dio di un nuovo mondo, ma un detective geniale è sulle sue tracce."
  },
  {
    title: "Fullmetal Alchemist: Brotherhood",
    synopsis: "Due fratelli alchimisti cercano la Pietra Filosofale per ripristinare i loro corpi dopo un esperimento fallito. Scoprono una cospirazione che minaccia l'intera nazione."
  },
  {
    title: "Sword Art Online",
    synopsis: "Diecimila giocatori rimangono intrappolati in un MMORPG. La morte nel gioco significa la morte nella realtà. Il protagonista Kirito deve battere il gioco per salvare tutti."
  },
  {
    title: "Tokyo Ghoul",
    synopsis: "Un giovane studente diventa un mezzo-ghoul dopo un incontro con una creatura carnivora. Deve adattarsi alla sua nuova identità, combattendo tra umani e ghoul."
  },
  {
    title: "Jujutsu Kaisen",
    synopsis: "Un ragazzo ingoia un dito maledetto per salvare i suoi amici e diventa l'ospite di una potente maledizione. Entra in una scuola per stregoni per imparare a controllare il suo potere."
  },
  {
    title: "One Punch Man",
    synopsis: "Saitama è un eroe che può sconfiggere qualsiasi nemico con un solo pugno. La sua lotta non è contro i mostri, ma contro la noia di essere troppo potente."
  },
  {
    title: "Steins;Gate",
    synopsis: "Un gruppo di scienziati dilettanti scopre per caso come inviare messaggi nel passato. Le loro azioni innescano una serie di conseguenze che alterano il corso della storia."
  },
  {
    title: "Cowboy Bebop",
    synopsis: "Un equipaggio di cacciatori di taglie viaggia per il sistema solare nel 2071. Tra inseguimenti e jazz, ognuno di loro deve fare i conti con il proprio passato."
  },
  {
    title: "Evangelion",
    synopsis: "Un ragazzo viene reclutato per pilotare un gigantesco mecha per combattere esseri alieni chiamati Angeli. La serie esplora la psicologia dei piloti e il senso dell'esistenza."
  },
  {
    title: "Dragon Ball Z",
    synopsis: "Goku, un guerriero Saiyan, protegge la Terra da nemici sempre più potenti. Con i suoi amici, affronta invasioni aliene e divinità, spingendo i suoi poteri oltre i limiti."
  },
  {
    title: "Sailor Moon",
    synopsis: "Una ragazza comune scopre di essere la reincarnazione di una principessa guerriera. Insieme ad altre guerriere Sailor, protegge la Terra dalle forze del male."
  },
  {
    title: "Hunter x Hunter",
    synopsis: "Un ragazzo parte per diventare un Hunter, un cacciatore di tesori e mostri, per ritrovare il padre scomparso. Lungo la strada, stringe amicizie e affronta pericoli mortali."
  },
  {
    title: "Fairy Tail",
    synopsis: "Lucy, una maga celestial, si unisce al famoso ed esuberante guild dei maghi Fairy Tail. Insieme a Natsu, un mago del fuoco, vivono avventure piene di magia e cameratismo."
  },
  {
    title: "Gintama",
    synopsis: "In un Giappone alternativo invaso dagli alieni, un samurai vagabondo, Gintoki, accetta qualsiasi lavoro per guadagnare da vivere, tra battaglie, risate e parodie."
  },
  {
    title: "Mob Psycho 100",
    synopsis: "Un ragazzo con immensi poteri psichici cerca di vivere una vita normale, ma le sue emozioni represse minacciano di scatenarsi. Il suo mentore, un truffatore, cerca di insegnargli il controllo."
  },
  {
    title: "Bleach",
    synopsis: "Un adolescente diventa un Soul Reaper dopo aver incontrato una mietitrice ferita. Deve proteggere la città dagli spiriti malvagi e combattere per il destino dell'umanità."
  },
  {
    title: "Black Clover",
    synopsis: "In un mondo di magia, un ragazzo senza poteri sogna di diventare il Re Stregone. Grazie alla sua determinazione e a un grimorio misterioso, sfida ogni avversità."
  },
  {
    title: "Chainsaw Man",
    synopsis: "Un ragazzo povero si fonde con un demone motosega e diventa un cacciatore di diavoli per pagare i debiti. La sua vita prende una piega sanguinosa e imprevedibile."
  },
  {
    title: "Spy x Family",
    synopsis: "Una spia deve creare una famiglia fittizia per una missione. Adotta una bambina con poteri telepatici e sposa una donna che in realtà è una sicaria. Una commedia spionistica."
  },
  {
    title: "Vinland Saga",
    synopsis: "Un giovane guerriero vichingo cerca vendetta contro il capo che ha ucciso suo padre. Ambientato nell'epoca delle invasioni norrene, è un epico viaggio tra guerra e redenzione."
  },
  {
    title: "Berserk",
    synopsis: "Un guerriero solitario dal passato tragico combatte con una spada enorme in un mondo medievale oscuro. La sua lotta contro le forze demoniache e il destino è leggendaria."
  },
  {
    title: "Code Geass",
    synopsis: "Un principe esiliato ottiene il potere di controllare le persone e guida una ribellione contro un impero che ha conquistato il Giappone. Un mecha politico e strategico."
  },
  {
    title: "Gurren Lagann",
    synopsis: "Un ragazzo cresciuto in un villaggio sotterraneo scopre un piccolo mecha e decide di perforare il cielo per raggiungere la superficie. Un'esplosione di energia e determinazione."
  },
  {
    title: "Fate/stay night: UBW",
    synopsis: "Un ragazzo viene coinvolto in una guerra segreta tra maghi, dove sette servitori leggendari combattono per il Santo Graal. Il destino dell'umanità è in gioco."
  },
  {
    title: "Haikyu!!",
    synopsis: "Un ragazzo basso ma determinato sogna di diventare il miglior giocatore di pallavolo. La sua rivalità e amicizia con un genio della pallavolo lo spingono a dare il massimo."
  }
];