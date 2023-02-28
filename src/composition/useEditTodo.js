import { ref, computed } from "vue";

export default function useEditTodo(todosRef) {
    // 当前修改的是哪一个 todo
    const editingTodoRef = ref(null);
    // 保留修改之前的 title 值
    let title = '';
    // 修改当前项
    const editTodo = (todo) => {
        title = todo.title;
        editingTodoRef.value = todo;
    }

    // 完成修改
    const finishEditingTodo = () => {
        editingTodoRef.value = null;
    }

    // 取消修改
    const cancelEditingTodo = (todo) => {
        editingTodoRef.value = null;
        todo.title = title;
    }

    // 设置所有任务状态
    const allDoneRef = computed({
        get() {
            return todosRef.value.filter(item => !item.completed).length === 0;
        },
        set(checked) {
            todosRef.value.forEach(item => item.completed = checked)
        }
    })
    return {
        editingTodoRef,
        editTodo,
        finishEditingTodo,
        cancelEditingTodo,
        allDoneRef
    }
}