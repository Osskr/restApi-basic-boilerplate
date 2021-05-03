# WebServer + Rest Server
Este repo contiene un repositorio que sirve de boilerplate para un servidor Web Rest, es un CRUD para usuarios y productos, maneja Roles, autenticación propia y con Google usando JWT, permite la cargar de archivos y usa Cloudinary como servicio de alojamiento de imagenes. 

### Instalacion

Utilizar ``` npm install ``` para reconstruir los modulos de Node

Crear un archivo ``` .env ``` en la raiz del proyecto y configurar las variables de entorno

```
PORT=
MONGO_CNN=
SECRETORPRIVATEKEY=
GOOGLE_CLIENT_ID=
GOOGLE_SECRET_ID=
CLOUDINARY_URL=

```

### Ejemplos de uso

Se puede encontrar una version desplegada en heroku en  [https://restapinode2021.herokuapp.com/](https://restapinode2021.herokuapp.com/)


### EndPoints Básicos

#### Auth
|Metodo| Endpoint | Descripción | Parametros|
|-----| ------ | ----------- |--------------|
|`post`| /api/auth/login  | Ruta para loguearse al servidor  |` email, password `|
|`post`| /api/auth/google| Ruta para loguearse mediante google sign-in |` id_token `|


#### Buscar
|Metodo| Endpoint | Descripción |
|-----| ------ | ----------- |
|`get`| /api/buscar/productos/product-name  |Devuelve una lista de productos que coincidan con la busqueda | |


#### Cargar Archivos
|Metodo| Endpoint | Descripción | Parametros|
|-----| ------ | ----------- |--------------|
|`post`|/api/uploads/| Permite la carga de un archivo al servidor | `archivo`|
|`get`|/api/uploads/productos/ |  devuelve la imagen de un producto. ||
|`put`| /api/uploads/usuarios/user-id| Actualiza la foto de perfil de un usuario |`archivo`|
|`get`| /api/uploads/productos/product-id |  |

#### Categorias
|Metodo| Endpoint | Descripción | Parametros|
|-----| ------ | ----------- |--------------|
|`get`|/api/categorias/| path to data files to supply the data that will be passed into templates.|
|`get`|/api/categorias/product-id  ||
|`delete`| /api/categorias/categoria-id| path to data files to supply the data that will be passed into templates. |
|`post`| /api/categorias/ | path to data files to supply the data that will be passed into templates. |

#### Productos
|Metodo| Endpoint | Descripción | Parametros|
|-----| ------ | ----------- |--------------|
|`get`|/api/productos/| devuelve el listado de productos paginado|`limite, desde`|
|`get`|api/productos/product-id||
|`post`| /api/productos/ |ruta para crear productos|`x-token`|
|`put`| /api/productos/product-id |actualiza la informacion de un producto|`x-token`|
|`delete`| /api/productos/product-id |elimina un producto |`x-token`|

#### Usuarios
|Metodo| Endpoint | Descripción | Parametros|
|-----| ------ | ----------- |--------------|
|`get`|/api/usuarios/| devuelve el listado de usuarios paginado|`limite, desde`|
|`post`|api/usuarios|ruta para crear usuarios|
|`put`| /api/usuarios/ |actualiza la informacion de usuario|`x-token`|
|`delete`| /api/productos/product-id |elimina un usuario |`x-token`|




