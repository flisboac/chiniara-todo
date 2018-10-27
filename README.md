# Yet-another-TODO

Antes de mais nada, instale o Java 8+.

Este projeto tem apenas uma entidade (JPA) e um repositório (Spring Data). O acesso ao
banco de dados é feito via Spring Data JPA. A API REST é exposta com base nos seus 
repositórios de entidades -- via bruxaria do Spring Data REST.

O código-fonte Java está em [`src/main/java`](src/main/java). O _entrypoint_ (_"main"_)
da aplicação está em [`src/main/java/chiniara/WebappApplication.java`](src/main/java/chiniara/WebappApplication.java).

Para iniciar o projeto, execute na linha de comando:

```sh
# Execução normal
./mvnw spring-boot:run

# Opcionalmente, em modo debug
./mvnw spring-boot:run -Ddebug=true

# Para Windows, use `./mvnw.bat`, ou apenas `mvnw`
```

Vide [`src/main/resources/static/js/todo.js`](src/main/resources/static/js/todo.js) para ver como acessar
a API no frontend. Você pode (e **deve**) jogar toda a pasta 
[`src/main/resources/static`](src/main/resources/static) fora e fazer o frontend do 
jeito que você quiser. (até pq este é apenas um projeto de exemplo) :)

Se quiser usar React, Angular ou algum outro framework/biblioteca frontend que exija alguma etapa de
transpilação, aconselho que vc configure o [`frontend-maven-plugin`](https://github.com/eirslett/frontend-maven-plugin).

Também é possível usar JSF, ou JSP. Talvez seja mais fácil de usar do que o `frontend-maven-plugin`,
já que não vai exigir usar um segundo sistema de build (i.e. `npm`, `tsc`, `webpack`, etc)

Se quiser ajuda, é só falar!

P.S.: Configurar o SQLite em projeto Spring é muito chato. Ao invés disso, se quiser gravar seus dados em 
um banco de dados em arquivo, vá no [`src/main/resources/application.properties`](src/main/resources/application.properties)
e descomente a linha contendo `spring.datasource.url=jdbc:h2:./todo-data`
(mais informações: http://www.h2database.com/html/faq.html#database_files).
