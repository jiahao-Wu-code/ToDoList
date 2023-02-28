export default function useRemoveTodo(todosRef) {
    // 删除某一个任务
    const removeOne = (todo) => {
        todosRef.value.splice(todosRef.value.indexOf(todo), 1)
    }

    // 清空所有完成的任务
    const removeCompleted = () => {
        todosRef.value = todosRef.value.filter(item => !item.completed)
    }
    return {
        removeOne,
        removeCompleted
    }
}