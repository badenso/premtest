let bans = 0;
const maps = document.querySelectorAll('.map');

// Load stored selections
function loadSelections() {
    const storedBans = JSON.parse(localStorage.getItem('bannedMaps')) || [];
    const storedPick = localStorage.getItem('pickedMap');
    
    storedBans.forEach(mapName => {
        const map = [...maps].find(m => m.textContent === mapName);
        if (map) map.classList.add('banned');
    });
    
    if (storedPick) {
        const pickedMap = [...maps].find(m => m.textContent === storedPick);
        if (pickedMap) pickedMap.classList.add('picked');
    }
    
    bans = storedBans.length;
}

// Update localStorage and sync across tabs
function banPick(map) {
    if (!map.classList.contains('banned') && !map.classList.contains('picked')) {
        if (bans < 6) {
            map.classList.add('banned');
            bans++;
            saveSelections();
        } else {
            map.classList.add('picked');
            saveSelections();
        }
    }
}

// Save selections to localStorage
function saveSelections() {
    const bannedMaps = [...document.querySelectorAll('.banned')].map(m => m.textContent);
    const pickedMap = document.querySelector('.picked')?.textContent || '';
    
    localStorage.setItem('bannedMaps', JSON.stringify(bannedMaps));
    localStorage.setItem('pickedMap', pickedMap);
}

// Sync changes across open tabs
window.addEventListener('storage', loadSelections);

document.addEventListener('DOMContentLoaded', loadSelections);
