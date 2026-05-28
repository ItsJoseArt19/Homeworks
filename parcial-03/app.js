class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfSong = false;
    this.originalTitle = "";
  }
}

class SongTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(title) {
    let current = this.root;
    const normalizedTitle = this.normalize(title);

    for (const letter of normalizedTitle) {
      if (!current.children[letter]) {
        current.children[letter] = new TrieNode();
      }

      current = current.children[letter];
    }

    current.isEndOfSong = true;
    current.originalTitle = title;
  }

  exists(title) {
    const node = this.findNode(this.normalize(title));
    return Boolean(node && node.isEndOfSong);
  }

  suggestions(prefix) {
    const normalizedPrefix = this.normalize(prefix);
    const startNode = this.findNode(normalizedPrefix);

    if (!startNode) {
      return [];
    }

    const results = [];
    this.collectSongs(startNode, results);
    return results.slice(0, 6);
  }

  findNode(text) {
    let current = this.root;

    for (const letter of text) {
      if (!current.children[letter]) {
        return null;
      }

      current = current.children[letter];
    }

    return current;
  }

  collectSongs(node, results) {
    if (node.isEndOfSong) {
      results.push(node.originalTitle);
    }

    for (const letter in node.children) {
      this.collectSongs(node.children[letter], results);
    }
  }

  normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(song) {
    this.heap.push(song);
    this.heapifyUp();
  }

  extractMax() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return max;
  }

  getTopSongs(limit) {
    const copy = new MaxHeap();
    this.heap.forEach((song) => copy.insert(song));

    const topSongs = [];
    while (copy.heap.length > 0 && topSongs.length < limit) {
      topSongs.push(copy.extractMax());
    }

    return topSongs;
  }

  heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[parentIndex].plays >= this.heap[index].plays) {
        break;
      }

      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;

    while (true) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      let biggest = index;

      if (leftIndex < this.heap.length && this.heap[leftIndex].plays > this.heap[biggest].plays) {
        biggest = leftIndex;
      }

      if (rightIndex < this.heap.length && this.heap[rightIndex].plays > this.heap[biggest].plays) {
        biggest = rightIndex;
      }

      if (biggest === index) {
        break;
      }

      this.swap(index, biggest);
      index = biggest;
    }
  }

  swap(firstIndex, secondIndex) {
    [this.heap[firstIndex], this.heap[secondIndex]] = [this.heap[secondIndex], this.heap[firstIndex]];
  }
}

class SongGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addSong(song) {
    if (!this.adjacencyList[song]) {
      this.adjacencyList[song] = new Set();
    }
  }

  connect(firstSong, secondSong) {
    this.addSong(firstSong);
    this.addSong(secondSong);
    this.adjacencyList[firstSong].add(secondSong);
    this.adjacencyList[secondSong].add(firstSong);
  }

  getRecommendations(song) {
    return Array.from(this.adjacencyList[song] || []);
  }
}

const songs = [
  { title: "Oh Que Sera", artist: "Willie Colon", genre: "Salsa", plays: 19000 },
  { title: "Sin Sentimientos", artist: "Grupo Niche", genre: "Salsa", plays: 18400 },
  { title: "Pedro Navaja", artist: "Willie Colon", genre: "Salsa", plays: 17800 },
  { title: "Te Lo Estas Perdiendo", artist: "Pedro Conga", genre: "Salsa", plays: 16200 },
  { title: "El Dia De Mi Suerte", artist: "Willie Colon y Hector Lavoe", genre: "Salsa", plays: 17100 },
  { title: "Atrapado Entre Dos Amores", artist: "Engerberth Tapia", genre: "Salsa", plays: 14300 },
  { title: "Amarilla Se Pone", artist: "Orquesta La Fuerza", genre: "Salsa", plays: 13600 },
  { title: "Obsesion", artist: "Aventura", genre: "Bachata", plays: 18800 },
  { title: "Propuesta Indecente", artist: "Romeo Santos", genre: "Bachata", plays: 18150 },
  { title: "Bachata En Fukuoka", artist: "Juan Luis Guerra", genre: "Bachata", plays: 17600 },
  { title: "Suavemente", artist: "Elvis Crespo", genre: "Merengue", plays: 18600 },
  { title: "La Bilirrubina", artist: "Juan Luis Guerra", genre: "Merengue", plays: 17950 },
  { title: "Abusadora", artist: "Wilfrido Vargas", genre: "Merengue", plays: 15100 }
];

const trie = new SongTrie();
const rankingHeap = new MaxHeap();
const recommendationGraph = new SongGraph();

songs.forEach((song) => {
  trie.insert(song.title);
  rankingHeap.insert(song);
  recommendationGraph.addSong(song.title);
});

recommendationGraph.connect("Oh Que Sera", "El Dia De Mi Suerte");
recommendationGraph.connect("Oh Que Sera", "Pedro Navaja");
recommendationGraph.connect("Sin Sentimientos", "Te Lo Estas Perdiendo");
recommendationGraph.connect("Sin Sentimientos", "Amarilla Se Pone");
recommendationGraph.connect("Pedro Navaja", "El Dia De Mi Suerte");
recommendationGraph.connect("Te Lo Estas Perdiendo", "Atrapado Entre Dos Amores");
recommendationGraph.connect("Atrapado Entre Dos Amores", "Amarilla Se Pone");
recommendationGraph.connect("Obsesion", "Propuesta Indecente");
recommendationGraph.connect("Obsesion", "Bachata En Fukuoka");
recommendationGraph.connect("Propuesta Indecente", "Bachata En Fukuoka");
recommendationGraph.connect("Suavemente", "La Bilirrubina");
recommendationGraph.connect("Suavemente", "Abusadora");
recommendationGraph.connect("La Bilirrubina", "Abusadora");
recommendationGraph.connect("Bachata En Fukuoka", "La Bilirrubina");

const searchInput = document.querySelector("#songSearch");
const searchResult = document.querySelector("#searchResult");
const suggestionsList = document.querySelector("#suggestionsList");
const rankingList = document.querySelector("#rankingList");
const songSelect = document.querySelector("#songSelect");
const recommendationsList = document.querySelector("#recommendationsList");
const songForm = document.querySelector("#songForm");
const newTitleInput = document.querySelector("#newTitle");
const newArtistInput = document.querySelector("#newArtist");
const newGenreSelect = document.querySelector("#newGenre");
const insertMessage = document.querySelector("#insertMessage");

function renderRanking() {
  const topSongs = rankingHeap.getTopSongs(songs.length);
  rankingList.innerHTML = topSongs.map((song, index) => `
    <li>
      <span class="ranking__position">#${index + 1}</span>
      <div>
        <strong>${song.title}</strong>
        <small>${song.artist} - ${song.genre}</small>
      </div>
      <span class="ranking__plays">${song.plays.toLocaleString("es-CO")}</span>
    </li>
  `).join("");
}

function renderSuggestions() {
  const query = searchInput.value;
  const cleanQuery = query.trim();

  suggestionsList.innerHTML = "";

  if (!cleanQuery) {
    searchResult.textContent = "Empieza a escribir para ver sugerencias.";
    return;
  }

  const exists = trie.exists(cleanQuery);
  const suggestions = trie.suggestions(cleanQuery);

  searchResult.textContent = exists
    ? "La cancion existe en la plataforma."
    : "No hay coincidencia exacta. Puedes revisar estas sugerencias.";

  if (suggestions.length === 0) {
    suggestionsList.innerHTML = "<li>No se encontraron sugerencias con ese prefijo.</li>";
    return;
  }

  suggestionsList.innerHTML = suggestions
    .map((title) => `<li>${title}</li>`)
    .join("");
}

function renderSongOptions() {
  songSelect.innerHTML = songs
    .map((song) => `<option value="${song.title}">${song.title}</option>`)
    .join("");
}

function renderRecommendations() {
  const selectedSong = songSelect.value;
  const recommendations = recommendationGraph.getRecommendations(selectedSong);

  if (recommendations.length === 0) {
    recommendationsList.innerHTML = "<p>No hay recomendaciones disponibles.</p>";
    return;
  }

  recommendationsList.innerHTML = recommendations
    .map((song) => `<span>${song}</span>`)
    .join("");
}

function generateSystemPlays() {
  const minPlays = 9000;
  const maxPlays = 17000;
  return Math.floor(Math.random() * (maxPlays - minPlays + 1)) + minPlays;
}

function insertSong(event) {
  event.preventDefault();

  const title = newTitleInput.value.trim();
  const artist = newArtistInput.value.trim();
  const genre = newGenreSelect.value;
  const plays = generateSystemPlays();

  if (!title || !artist || !genre) {
    insertMessage.textContent = "Completa todos los campos con datos validos.";
    return;
  }

  if (trie.exists(title)) {
    insertMessage.textContent = "Esa cancion ya existe en la plataforma.";
    return;
  }

  const newSong = { title, artist, genre, plays };
  songs.push(newSong);
  trie.insert(title);
  rankingHeap.insert(newSong);
  recommendationGraph.addSong(title);

  renderRanking();
  renderSongOptions();
  renderSuggestions();
  songSelect.value = title;
  renderRecommendations();
  songForm.reset();
  insertMessage.textContent = `Cancion insertada correctamente. El sistema asigno ${plays.toLocaleString("es-CO")} reproducciones.`;
}

searchInput.addEventListener("input", renderSuggestions);
songSelect.addEventListener("change", renderRecommendations);
songForm.addEventListener("submit", insertSong);

renderRanking();
renderSongOptions();
renderRecommendations();
