# Subir Archivos a Firebase
Este tutorial se enfoca en un ejemplo sencillo de como subir archivos al storage de firebase, guardar documentos en la base de datos firestore de firebase. Y obtener estos datos.

## Interfaz
![Subir imagenes firebase](../../img/archivosFB.png)

## Recursos
* Cuenta en Firebase
    * Crear un proyecto 
    * Crear una base de datos
    * Dar permiso de escritura tanto en la base de datos como en el storage
* Editor de texto
    * En este caso se utilizo visual studio code
* Archivo index.html
* Archivos style.css
    * Además de este se utilizó bootstrap para dar estilo a la página
* Archivo script.js para consumir los servicios de firebase y mostrar las imagenes.
## Flujo
###  Mostrar imagenes
La aplicación primero va y obtiene las rutas de todas las imagenes que se encuentran en la base de datos, estan se encuentran en la colección 'files' para leugo ir a la carpeta imagenes del bucket del storage y descargar las imagenes, para asi mostrarlas en la interfaz.
### Subir Imagen
Para subir una imagen, hay un input de tipo file, con este se selecciona la imagen deseada, hay un event listener en el boton de subir archivo, el cual llama al metodo publish.
publish llama al método 'upload' para asi guardar la imagen en el bucket, y luego llama al método 'addDoc' para asi guardar la ruta en la base de datos.

De igual manera en el metodo 'queryImages' se utiliza el método de firebase 'snapshot.docChanges()' para asi obtener en tiempo real la imagen recien subida.

## Link del tutorial
[Clase gratis: Subir archivos con Firebase](https://www.youtube.com/watch?v=u7xAIgOQajM)
