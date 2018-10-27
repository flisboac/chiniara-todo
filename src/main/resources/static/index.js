"use strict";

// O código que segue é horrível.
// Se possível, evite dores de cabeça e configure o frontend-maven-plugin!
// (se estiver interessado, posso ajudar!)

const Handlers = {

    handleCriarTodo(event) {
        if (event.keyCode === 13) {
            Handlers.criarTodo().then(() => $('input[name=descricao]').val(''));
        }
    },

    criarTodo() {
        const descricao = $('input[name=descricao]').val();
        let todo = new Todo({ descricao });
        return TodoResource.criar(todo).then(Handlers.listarTodos);
    },

    listarTodos() {
        return TodoResource.listar().then((todos) => {
            const container = document.getElementById('content-data');
            Helpers.removeChildren(container);

            todos.forEach(todo => {
                Helpers.criarTodoContainer(container, todo);
            });
        });
    }
};


const Helpers = {

    removeChildren(container) {

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    },

    criarTodoContainer(container, todo) {

        const todoId = `todo-${todo.id}`;
        const textoFinalizado = todo.finalizado ? `Finalizado em ${todo.dataTermino}` : "Pendente";
        const textoCriado = `Criado em ${todo.dataCriacao}`;

        const todoContainer = document.createElement("div");
        const chkFinalizado = document.createElement("input");
        const btnExcluir = document.createElement("button");
        const lblDescricao = document.createElement("label");

        const divHeader = document.createElement("div");
        const divCriado = document.createElement("div");
        const divFinalizado = document.createElement("div");

        btnExcluir.innerText = "X";
        btnExcluir.addEventListener('click', (event) => {
            TodoResource.excluir(todo).then(Handlers.listarTodos);
        });

        chkFinalizado.type = "checkbox";
        chkFinalizado.name = todoId;
        chkFinalizado.checked = todo.finalizado;
        chkFinalizado.addEventListener('change', (event) => {
            const finalizado = event.target.checked;
            if (finalizado) {
                todo.finalizar();
            } else {
                todo.reiniciar();
            }
            TodoResource.salvar(todo).then(Handlers.listarTodos);
        });

        lblDescricao.htmlFor = todoId;
        lblDescricao.textContent = todo.descricao;

        divFinalizado.className = "content-todo-info";
        divFinalizado.textContent = textoFinalizado;

        divCriado.className = "content-todo-info";
        divCriado.textContent = textoCriado;

        todoContainer.className = "content-todo-header";
        divHeader.appendChild(btnExcluir);
        divHeader.appendChild(chkFinalizado);
        divHeader.appendChild(lblDescricao);

        todoContainer.className = "content-todo";
        todoContainer.appendChild(divHeader);
        todoContainer.appendChild(divCriado);
        todoContainer.appendChild(divFinalizado);

        container.appendChild(todoContainer);
    }
};

$(() => {
    $('#content-form').on('keydown', Handlers.handleCriarTodo);
    Handlers.listarTodos();
});