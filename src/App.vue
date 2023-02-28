<template>
    <div id="app">
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input class="new-todo" autofocus="" autocomplete="off" placeholder="What needs to be done?"
                    v-model="newTodoRef" @keyup.enter="addTodo" />
            </header>
            <section class="main">
                <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDoneRef" />
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list">
                    <li class="todo" v-for="todo in filteredTodosRef" :key="todo.id"
                        :class="{ completed: todo.completed, editing: todo === editingTodoRef }">
                        <div class="view">
                            <input class="toggle" type="checkbox" v-model="todo.completed" />
                            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
                            <button class="destroy" @click="removeOne(todo)"></button>
                        </div>
                        <input class="edit" type="text" v-model="todo.title" @blur="finishEditingTodo(todo)"
                            @keyup.enter="finishEditingTodo(todo)" @keyup.esc="cancelEditingTodo(todo)" />
                    </li>
                </ul>
            </section>
            <footer class="footer" v-if="showFilter">
                <span class="todo-count">
                    <strong>{{ remainingRef }}</strong>
                    <span> item{{ remainingRef <= 1 ? '' : 's' }} left</span>
                    </span>
                    <ul class="filters">
                        <li><a href="#/all" :class="visibilityRef === 'all' ? 'selected' : ''">All</a></li>
                        <li><a href="#/active" :class="visibilityRef === 'active' ? 'selected' : ''">Active</a></li>
                        <li><a href="#/completed" :class="visibilityRef === 'completed' ? 'selected' : ''">Completed</a>
                        </li>
                    </ul>
                    <button class="clear-completed" v-show="completedRef" @click="removeCompleted">
                        Clear completed
                    </button>
            </footer>
        </section>
    </div>
</template>

<script>
import useTodoList from './composition/useTodoList';
import useNewTodo from './composition/useNewTodo';
import useFilter from './composition/useFilter';
import useEditTodo from './composition/useEditTodo';
import useRemoveTodo from './composition/useRemoveTodo';
import { computed } from 'vue'
export default {
    setup() {
        const { todosRef } = useTodoList();
        const showFilter = computed(() => {
            return todosRef.value.length
        })
        return {
            ...useNewTodo(todosRef),
            ...useFilter(todosRef),
            ...useEditTodo(todosRef),
            ...useRemoveTodo(todosRef),
            showFilter
        }
    }
}
</script>

