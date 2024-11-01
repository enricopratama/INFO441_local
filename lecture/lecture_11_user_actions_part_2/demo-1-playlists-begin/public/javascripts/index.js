// Client Side Code

async function addUser(){
    let name = document.getElementById("name_input").value

    await fetch("/api/v1/users", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: name})
    })
}

async function loadUsers(){
    document.getElementById("allusersdiv").innerText = "loading..."

    let response = await fetch("/api/v1/users")
    let usersJson = await response.json()

    // WARNING: XSS VULNERABILITIES HERE
    // To distinguish between the different users, we can use the user's _id for the id of title and songs 
    let usersHTML = usersJson.map(userInfo => {
        return `
        <hr>
        <div>
            <h3>Username: ${userInfo.username}</h3>
            <button onclick="deleteUser('${userInfo._id}')">Delete</button>
            <strong>Favorite Bands:</strong>${userInfo.favorite_bands.join(", ")}<br>
            <strong>Add Band:</strong>
            <input type="text" id="add_band_text_${userInfo._id}" /> <br>
            <button onclick="addBand('${userInfo._id}')">Add Band</button>

            <h3> Playlists </h3>
            
            <div id="playlist_div_${userInfo._id}">Loading playlists...</div>

            <h3>Add Playlist </h3>
            <strong>Title:</strong> <input type="text" id="add_playlist_title_text_${userInfo._id}" /> <br> 
            <strong>Songs:</strong> <input type="text" id="add_song_title_text_${userInfo._id}" /> <br>  
            <button onclick="addPlaylist('${userInfo._id}')">Add Playlist</button>
        </div>
        `
    }).join("")
    document.getElementById("allusersdiv").innerHTML = usersHTML 

    usersJson.forEach(userInfo => {
        loadPlaylistsForUser(userInfo._id)
    })
}

async function loadPlaylistsForUser(userId) {
    let response = await fetch("/api/v1/playlists?userId=" + userId)
    let playlistJSON = await response.json()

    let playlistHTML = playlistJSON.map(playlistInfo => {
        return `
        <div>
            <h4>Playlist: ${playlistInfo.title}</h4>
            <strong>Songs:</strong> ${playlistInfo.songs}
        </div>
        `
    }).join("")

    // Ensure the element exists before setting its innerHTML
    let playlistDiv = document.getElementById("playlist_div_" + userId)
    if (playlistDiv) {
        playlistDiv.innerHTML = playlistHTML
    } else {
        console.error(`Element with ID playlist_div_${userId} not found`)
    }
}


async function addPlaylist(user_id) {
    let title = document.getElementById("add_playlist_title_text_" + user_id).value
    let songs = document.getElementById("add_song_title_text_" + user_id).value
    await fetch("/api/v1/playlists", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: title,
            songs: songs,
            userId: user_id
        })
    })
}

async function addBand(id){
    let bandToAdd = document.getElementById("add_band_text_" + id).value
    
    await fetch("/api/v1/users/bands", {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({
            userId: id, 
            band: bandToAdd
        })
    })
}

async function deleteUser(id){
    await fetch("/api/v1/users", {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: id
        })
    })
}