function initBingoCompletionSingleModal() {
  const KEY = 'bingo-complete-map';

  // Load saved state
  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { state = {}; }

  // Elements inside the modal
  const modalEl = document.getElementById('bingoModal');
  const titleEl = document.getElementById('bingoModalTitle');
  const descEl  = document.getElementById('bingoModalDesc');
  const linkEl  = document.getElementById('bingoModalLink');
  const toggleEl = document.getElementById('bingoModalToggle');

  if (!modalEl || !titleEl || !descEl || !linkEl || !toggleEl) return;

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function applyTile(tileId) {
    const isComplete = state[tileId] === true;
    document.querySelectorAll(`.bingo-tile-btn[data-tile="${tileId}"]`)
      .forEach(btn => btn.classList.toggle('bingo-complete', isComplete));
  }

  // On load: apply to all tiles
  document.querySelectorAll('.bingo-tile-btn[data-tile]').forEach(btn => {
    applyTile(btn.dataset.tile);
  });

  // When modal is about to open, fill it based on the clicked tile
  modalEl.addEventListener('show.bs.modal', (event) => {
    const btn = event.relatedTarget; // the tile button that triggered the modal
    if (!btn) return;

    const tileId = btn.dataset.tile;

    // Fill modal content
    titleEl.textContent = btn.dataset.title || 'Bingo Tile';
    descEl.textContent  = btn.dataset.desc || '';
    const link = btn.dataset.link || '#';
    linkEl.href = link;
    linkEl.style.display = (link && link !== '#') ? '' : 'none';

    // Set toggle state + store which tile this modal is editing
    toggleEl.dataset.tile = tileId;
    toggleEl.checked = state[tileId] === true;
  });

  // When user changes toggle, save + update tile UI
  toggleEl.addEventListener('change', (e) => {
    const tileId = e.target.dataset.tile;
    if (!tileId) return;

    state[tileId] = e.target.checked;
    save();
    applyTile(tileId);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initBingoCompletionSingleModal();
});
