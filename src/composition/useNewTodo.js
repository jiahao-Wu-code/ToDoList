import { ref } from 'vue';
import { genarateId } from '../utils/todoStorage';
export default function useNewTodo(todosRef) {
    const newTodoRef = ref(''); // 新任务的标题
    const addTodo = () => {
        // 新增一个任务
        const value = newTodoRef.value && newTodoRef.value.trim();
        if(!value){
            return;
        }
        // 生成一个任务对象，将其加入到任务列表中
        const todo = {
            id: genarateId(),
            title: value,
            completed: false,
        }
        console.log("17",todosRef)
        todosRef.value.push(todo);
        console.log(todo);
    }
    return {
        newTodoRef,
        addTodo
    }
}