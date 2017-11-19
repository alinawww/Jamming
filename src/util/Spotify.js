const clientId = '9e1f9066ec97451cae929b4912a502bf'
const redirectUri = 'http://localhost:3000/'

let accessToken = undefined
let expiresIn = undefined
const redirectUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`

const Spotify = {
    getAccessToken() {
        if (accessToken) new Promise(resolve => resolve(accessToken))
        const accessTokenUrl = window.location.href.match(/access_token=([^&]*)/)
        const expiresInUrl = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenUrl && expiresInUrl) {
            accessToken = accessTokenUrl[1]
            expiresIn = expiresInUrl[1]
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState('Access Token', null, '/')
        }
        else {
            window.location = redirectUrl
        }
    },
    search(searchTerm) {
        const headers = {Authorization: `Bearer ${accessToken}`}
        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${searchTerm.replace(' ', '%20')}`

        return fetch(searchUrl, {headers})
        .then(response => response.json())
        .then(jsonResponse => {
            if (!jsonResponse.tracks) return []
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            })
        })
    },
    savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris) return

        const userUrl = 'https://api.spotify.com/v1/me'
        const headers = {Authorization: `Bearer ${accessToken}`}

        let userId = undefined
        let playlistId = undefined

        return fetch(userUrl, {headers})
        .then(response => response.json())
        .then(jsonResponse => userId = jsonResponse.id)
        .then(() => {
            const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`
            fetch(createPlaylistUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({name: playlistName})
            })
            .then(response => response.json())
            .then(jsonResponse => playlistId = jsonResponse.id)
            .then(() => {
                const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`
                fetch(addPlaylistTracksUrl, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })

    }
}

export default Spotify
