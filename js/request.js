function ranking() {
    fetch("http://twserver.alunos.dcc.fc.up.pt:8008/ranking", {
        method: 'POST',
        body: '{}'
    })
        .then(response => response.json())
        .then(process)
        .catch(console.log);
}

function process(response) {
    console.log(response);
}