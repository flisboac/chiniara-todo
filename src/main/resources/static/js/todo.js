"use strict";

class Todo {

    static endpoint(id) {
        let endpoint = `${Config.endpoint}/todos`;
        if (id) endpoint = `${endpoint}/${id}`;
        return endpoint;
    }

    constructor(dados) {
        this.dados = dados || {};
    }

    get id() { return this.dados.uriId; }
    get endpoint() { return Todo.endpoint(this.id); }
    get dataCriacao() { return new Date(this.dados.dataCriacao); }
    get dataTermino() { return this.dados.dataTermino ? new Date(this.dados.dataTermino) : null; }
    get finalizado() { return !!this.dataTermino; }
    get descricao() { return this.dados.descricao; }

    finalizar() { this.dados.dataTermino = new Date().toISOString(); }
    reiniciar() { this.dados.dataTermino = null; }
}

class TodoResource {

    static listar() {

        return $.ajax({
            method: 'GET',
            isArray: true,
            url: Todo.endpoint()
        }).then(data => {
            return Promise.resolve(data._embedded.todos.map(todo => new Todo(todo)));
        }).catch(err => {
            console.log(err);
        })
    }

    static obter(id) {

        return $.ajax({
            method: 'GET',
            url: Todo.endpoint(id)
        }).then(data => {
            return Promise.resolve(data._embedded.todos.map(todo => new Todo(todo)));
        }).catch(err => {
            console.log(err);
        })
    }

    static criar(todo) {

        console.log("Criando todo", todo);

        return $.ajax({
            method: 'POST',
            url: Todo.endpoint(),
            contentType: 'application/json',
            data: JSON.stringify(todo.dados)
        }).catch(err => {
            console.log("Erro ao salvar todo!", err);
        });
    }

    static salvar(todo) {

        console.log("Salvando todo", todo);

        return $.ajax({
            method: 'PUT',
            url: todo.endpoint,
            data: JSON.stringify(todo.dados),
            contentType: 'application/json'
        }).catch(err => {
            console.log(err);
        })
    }

    static excluir(todo) {

        console.log("Excluindo todo", todo);

        return $.ajax({
            method: 'DELETE',
            url: todo.endpoint,
            contentType: 'application/json'
        }).catch(err => {
            console.log(err);
        })
    }
}
