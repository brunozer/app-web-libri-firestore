const livrolist = document.querySelector('#book-list')
 
function renderBook(doc) {
    //criaçao elementos html
    let li = document.createElement('li')
    let titulo = document.createElement('span')
    let autor = document.createElement('span')
    let excluir = document.createElement('div')
    
    excluir.textContent = 'x'
    //carrega os dados nos elementos html
 
li.setAttribute('data-id', doc.id)
    titulo.textContent = doc.data().titulo
    autor.textContent = doc.data().autor
 
    //adicionando dados de autor e titulo na tag li
    li.appendChild(titulo)
    li.appendChild(autor)
    li.appendChild(excluir)
 
    //Trava açao no click do botao x pra exclusao do arquivo
    excluir.addEventListener('click', (event)=>{
        event.stopPropagation();
        let id = event.target.parentElement.getAttribute('data-id');
        // alert(id)
        db.collection('libri-data').doc(id).delete()
            .then(()=>{window.location.reload()});
    }
)
    //adicionando o li na tag ul
    livrolist.appendChild(li)
    
}
 
 
 
db.collection('libri-data')
    .get()
    .then(
        (snapshot) => {
// console.log(snapshot.docs)
snapshot.docs.forEach(doc => {
                console.log(doc.data())
                renderBook(doc)      
            });
        }
    )
 
 
    //insert de livros e autores
    const form = document.querySelector('#add-book-form')
 
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        db.collection('libri-data').add({
            autor: form.autor.value,
            titulo: form.titulo.value
        })
        .then(()=>{
            form.autor.value = '';
            form.titulo.value = '';
            window.location.reload();
        })
    });
 
 