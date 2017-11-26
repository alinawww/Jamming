const clientId = '9e1f9066ec97451cae929b4912a502bf'
// const redirectUri = 'http://jamalina.surge.sh/'
const redirectUri = 'http://localhost:3000/'

let accessToken
let expiresIn

const redirectUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`
const apiSpotifyUrl = 'https://api.spotify.com/v1'

const Spotify = {
    getAccessToken() {
        if (accessToken) new Promise(resolve => resolve(accessToken))

        const accessTokenUrl = window.location.href.match(/access_token=([^&]*)/)
        const expiresInUrl = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenUrl && expiresInUrl) {
            // Get accessToken and expirationTime from the URL
            accessToken = accessTokenUrl[1]
            expiresIn = expiresInUrl[1]
            window.setTimeout(() => accessToken = '', expiresIn * 1000)
            window.history.pushState('Access Token', null, '/')
        }
        else {
            // If there's no access token, redirect user to Authorization screen
            window.location = redirectUrl
        }
        return accessToken
    },

    search(searchTerm) {
        const headers = {Authorization: `Bearer ${accessToken}`}
        const searchUrl = `${apiSpotifyUrl}/search?type=track&q=${searchTerm.replace(' ', '%20')}`

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
                    uri: track.uri,
                    previewUrl: track.preview_url
                }
            })
        })
        .catch(error => {
            console.error('Error when getting the tracks information:', error)
        })
    },

    savePlaylist(playlistName, trackUris) {
        accessToken =  this.getAccessToken()
        if (!playlistName || !trackUris) return
        const userUrl = `${apiSpotifyUrl}/me`
        const headers = {Authorization: `Bearer ${accessToken}`}

        let userId = undefined
        let playlistId = undefined

        // Retrieve spotify user
        return fetch(userUrl, {headers})
        .then(response => response.json())
        .then(jsonResponse => userId = jsonResponse.id)

        // create new playlist for the current user
        .then(() => {
            const createPlaylistUrl = `${apiSpotifyUrl}/users/${userId}/playlists`
            fetch(createPlaylistUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({name: playlistName})
            })
            .then(response => response.json())
            .then(jsonResponse => playlistId = jsonResponse.id)

            // add tracks to the newly created playlist
            .then(() => {
                const addPlaylistTracksUrl = `${apiSpotifyUrl}/users/${userId}/playlists/${playlistId}/tracks`
                fetch(addPlaylistTracksUrl, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({uris: trackUris})
                })
            })
            .catch(error => {
                console.error('Error when adding the selected tracks to the playlist:', error)
            })
        })
        .catch(error => {
            console.error('Error when creating new playlist:', error)
        })


    }
}

export default Spotify
