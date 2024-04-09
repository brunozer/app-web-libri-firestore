db.collection('app-libre-bruno')
    .get()
    .then((snapshot) => {
        snapshot.docs.forEach((element) => {
            console.log(element.data());
        });
    });
