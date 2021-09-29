// upload({file:File})
const upload = async ({ file }) => {
    // 1. Referencia al espacio en el bucket donde se subira el archivo
    let storageRef = firebase.storage().ref().child(`imagenes/${file.name}`);
    // 2. Subir el archivo
    await storageRef.put(file);
    // 3. Retornar la referencia
    console.log(storageRef);
    return storageRef;
};

// addDoc({ collection: 'files', data: { fileName: '' }})
const addDoc = async ({ collection, data }) => {
    let document = {
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    /* necesito esto para subir datos a una base de datos en firebase*/
    // 1. Una collection
    let colletionRef = firebase.firestore().collection(collection);
    // 2. Guardar el documento
    console.log(colletionRef);
    return colletionRef.add(document);
};

const publish = async ({ file }) => {
    //return upload({file: file}) --maneras diferentes de usar
    // return upload({file}).then(storageRef => {
    //     return addDoc({collection: 'files', data: { path: storageRef.fullPath }})
    // });
    let storageRef = await upload({ file });
    return addDoc({ collection: "files", data: { path: storageRef.fullPath } });
};

const queryImages = async () => {
    // 1. Collection
    let collection = firebase
        .firestore()
        .collection("files")
        .orderBy("createdAt", "desc");
    // 2. escuchar evento onSanpchot los cambimos en los documentos
    collection.onSnapshot((snapshot) => {
        //esta es la forma para visualizar los datos en tiempo real
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added" ) {
                showImage(change.doc.data());
            }
        });
    });
};

const showImage = async (docData) => {
    let node = document.createElement("div");
    node.classList.add("col-lg-4");
    node.classList.add("mt-3");
    let url = await firebase.storage().ref(docData.path).getDownloadURL();
    node.innerHTML = `
    <img class = "image"  src='${url}'/>
    </div>
    `;
    let container = document.querySelector("#images");
    container.append(node);

    //Descargar archivo
    // let url = await firebase.storage().ref(docData.path).getDownloadURL();
    // let img = node.querySelector('img');
    // img.src = url;


};

async function main() {
    const firebaseConfig = {
        //poner aqui mis credenciales del proyecto de firebae
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: "",
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);

    let form = document.querySelector("#uploader");
    form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        let fileInput = form.querySelector("#file");
        let file = fileInput.files[0];

        publish({
            file
        });
        
    });

    queryImages();
}

main();
