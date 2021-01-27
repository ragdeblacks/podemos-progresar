# Podemos Progresar - Yujules Wow!
Este proyecto es para participar por una vacante en la empresa podemos progresar

Desarrollado por Edgar Sanabria 

## Framework y Dependencias 

Proyecto esta basado en el Framework de Angular [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1

Para facilitar el manejo del grid y css usa la biblioteca de Boostrap, para instalar las dependencias necesarias uso el siguiente comando 
    - npm install bootstrap jquery @popperjs/core

Para agregar las dependencias a las directivas de angular se uso el siguiente comando
    - ng add @ng-bootstrap/ng-bootstrap

Se incluye una dependencia para iconografia para el sistema la cual se descarga e integra a las directivas con el siguiente comando:
    - npm install material-design-icons
    - ng add @angular/material

## Descarga de proyecto

El proyecto cuenta con una repositorio en github el cual puede descargarse con la siguiente URL: `https://github.com/ragdeblacks/podemos-progresar.git`
Para descargar el proyecto usar el siguiente comando:

    - git clone https://github.com/ragdeblacks/podemos-progresar.git

## Instalacion del proyecto

Una vez que se cuente con el proyecto en local, solo se necesita ejecutar 

    - npm install 

Ya descargadas las dependencias inicializar con 

    -ng serve
## Contenido del proyecto

La base se encuentra en el menu superior izquierdo, tiene tres opciones, Principal, Clientes, Grupos... 

    - Clientes y Grupos tienen un alta o edicion utilizando los endpoints proporcionados.
    - Principal es pensando en enrolar a un cliente nuevo o un cliente existente a un grupo, crearle un credito o visualizar los creditos disponibles, revisar listado de pagos y realizar pagos.

Estoy almacenando informacion en localstorage pensando que es un aplicativo que puede ser recurrente

## Detalles o problemas encontrados a lo largo de la prueba

El primer problema encontrado es un problema con las APIS, aunque llevan headers en las peticiones y al ejecutar responde un 200 en la peticion, la respuesta no se puede recuperar, busque soluciones en la web el problema esta relacionado con Access-Control-Allow-Origin, este es el error,

    - Access to XMLHttpRequest at 'http://jnovoa.pythonanywhere.com/podemos/clientes/edgar' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

Algunas recomendaciones era agregar un header con el access, pero la solucion al problema fue desabilitar la seguridad de el navegador Chrome para poder recuperar la respuesta, para mayor informacion este link fue el necesario para solucionar el problema 

    - https://stackoverflow.com/questions/35432749/disable-web-security-in-chrome-48

Para solucionarlo utilice la siguiente linea que me ayudo en mi caso a ejectar chrome deshabilitando el tema de seguridad.

    - google-chrome-stable --disable-web-security --user-data-dir=/home/edgar/Documents

Me encontre con otro problema en el siguiente endpoint tipo post responde con un 200 pero no genera una respuesta cuando se hace la peticion, en mi logica pude recuperar la informacion de otras peticiones y no fue necesario recuperar la respuesta aun queda evidencia del problema

    - POST /grupos/g_id/miembros/new  

Se usa para relacionar miembros a un grupo.



