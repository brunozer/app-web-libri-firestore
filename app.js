let livrosList = document.querySelector('#book-list');
function renderbook(doc) {
    let li = document.createElement('li');
    let titulo = document.createElement('span');
    let autor = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    titulo.textContent = doc.data().titulo;
    autor.textContent = doc.data().autor;

    //adicionando dos dados de autor e titulo na tag

    li.appendChild(titulo);
    li.appendChild(autor);
    livrosList.appendChild(li);
}

const form = document.querySelector('#add-book-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('app-libre-bruno')
        .add({
            autor: form.autor.value,
            titulo: form.titulo.value,
        })
        .then(() => {
            form.autor.value = '';
            form.titulo.value = '';
            window.location.reload();
        });
});

db.collection('app-libre-bruno')
    .get()
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            console.log(doc.data);
            renderbook(doc);
        });
    });
