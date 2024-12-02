document.getElementById('load-list').addEventListener('click', () => {
    const url = document.getElementById('m3u-url').value;

    if (!url) {
        alert('Por favor, insira uma URL de lista M3U');
        return;
    }

    fetch(url)
        .then(response => response.text())
        .then(data => {
            const channels = parseM3U(data);
            displayChannels(channels);
        })
        .catch(error => alert('Erro ao carregar a lista: ' + error));
});

function parseM3U(m3u) {
    const lines = m3u.split('\n');
    const channels = [];

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF')) {
            const name = lines[i].split(',')[1];
            const url = lines[i + 1];
            if (name && url) {
                channels.push({ name, url });
            }
        }
    }
    return channels;
}

function displayChannels(channels) {
    const container = document.getElementById('channels');
    container.innerHTML = '';

    channels.forEach(channel => {
        const div = document.createElement('div');
        div.className = 'channel';
        div.textContent = channel.name;
        div.onclick = () => playChannel(channel.url);
        container.appendChild(div);
    });
}

function playChannel(url) {
    const player = videojs('player');
    player.src({ src: url, type: 'application/x-mpegURL' });
    player.play();
}
