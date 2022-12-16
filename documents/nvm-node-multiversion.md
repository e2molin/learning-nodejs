# Gestionando varias versiones de Node.JS

Si trabajamos con **NodeJS**, lo normal es tener una versión instalada en nuestro entorno de desarrollo. El problema ocurre cuando un determinado proyecto necesita una versión específica de NodeJS, ¿que herramientas tenemos pa que en un mismo ordenador podamos trabajar con Varias versiones de Node.JS, sin tener que desinstalar una para instalar otra?

Lo primero a tener en cuenta es que NodeJS utiliza [versionamiento semántico](https://semver.org/) para cada uno de sus releases.

## 🏷 nvm

El software **nvm** permite instalar y gestionar distintas versiones de NodeJS en un ordenador, lo que facilita el trabajo con proyectos que requieren versiones distintas. nvm es un software que podemos instalar para contar con varias versiones distintas de NodeJS en un mismo ordenador. El creador de nvm es [Tim Caswell](https://github.com/creationix).

> Para Windows instalaremos [nvm-windows](https://github.com/coreybutler/nvm-windows), proyecto mantenido por **Corey Butler**

![](img/nvm-1.1.8-screenshot.jpg)

Desde su página de desarrollo [podemos descargar la última versión disponible](https://github.com/coreybutler/nvm-windows/releases). En este caso no nos complicamos y usamos el instalador de Windows. Para un funcionamiento correcto es importante instalarlo con perfil de Administrador de la máquina, para que no de problemas, e instalarlo previamente a cualquier versión de NodeJS en nuestra máquina.

Una vez instalado, arrancamos la consola en modo Administrador. Dispondremos de varios comandos:

### 🔸 ```nvm list```

Lista las versiones instaladas de NodeJS en nuestro equipo. Al principio no debería haber ninguna.

### 🔸 ```nvm install```

Instala la versión de NodeJS que le indiquemos. Para instalar la versión 8.17.0 que utilizan en Mapea-Lite, usaremos.

```bash
nvm install 8.17.0
```

Veremos cómo se descarga la versión indicada y después se instala. Al terminar podemos ejecutar un ```nvm list``` para ver que se ha instalado. Pero veremos que no está activa, esto es, tiene un asterisco a la izquierda. Si queremos activarla, usaremos el comando.

### 🔸 ```nvm use```

Indicamos qué versión de las disponibles queremos dejar como activa en la computadora. Para dejar como activa la que acabamos de instalar:

```bash
nvm use 8.17.0
```

Y veremos que si seguidamente ejecutamos un ```nvm list```, la versión aparecerá marcada con un asterisco a la izquierda. 

Seguidamente podemos seguir instalando más versiones con ```nvm install Major.minor.patch``` que se añadirán a las existentes, pudiendo cambiar entre ellas con ```nvm use Major.minor.patch```.

> 👀‼❗️ Importante: cuando utilizamos ```nvm ```lo hagamos con permiso de **Administrador** de la máquina, sino uede dar errores a la hora de intercambiar versiones.

### 🔸 ```nvm uninstall```

Desinstala la versión de NodeJS que le indiquemos.

```bash
nvm uninstall 8.17.0
```


### 🔸 Trasladando paquetes de una versión a otra

Si ya tenemos una versión instalada, la 8.17.1, y además tenemos algunos paquetes globales asociados a esa versión de NodeJS, que hemos instalado usando

```bash
npm install -g grunt-cli
npm install -g bower
(etc...)
```

Si ahora instalamos la versión nueva 10.12.1 de NodeJS, puede ser interesante que también se instalen los paquetes globales correspondientes a la nueva versión, sin que tengamos que hacerlo manualmente. Esto lo podemos automatizar con el siguiente comando

```bash
nvm install 10.12.1 --reinstall-packages-from=8.17.1
```

Y de esta manera, además de instalar la nueva versión, nos dejará instalados lo paquetes globales que teníamos instalados con la antigua.


## ⛲️ Fuentes

* [🎬 Múltiples versiones de Nodejs con NVM](https://www.youtube.com/watch?v=iG4u1MK7N3I)
* [Comandos de manejo de npm](https://www.sitepoint.com/npm-guide/)
* [Installing Multiple Versions of Node.js Using nvm](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/)
