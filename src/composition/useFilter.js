import { ref, onMounted, onUnmounted, computed } from 'vue'
import { filter } from '../utils/todoStorage'
// 三种状态筛选条件
const validHash = ['all', 'active', 'completed'];
/**
 * 
 * @param {*} todosRef 任务列表
 * @returns 
 */
export default function useFilter(todosRef) {
    const visibilityRef = ref('all');

    const onHashChange = () => {
        // 根据 hash 值判断筛选条件
        const hash = location.hash.replace(/#\/?/, '');
        if (validHash.includes(hash)) {
            // 有效 hash
            visibilityRef.value = hash;
        } else {
            location.hash = '';
            visibilityRef.value = 'all';
        }
    }

    // 1. 组件挂载完成的生命周期函数
    onMounted(() => {
        window.addEventListener('hashchange', onHashChange)
    })

    // 2. 组件销毁过后的生命周期函数
    onUnmounted(() => {

    }, onHashChange)

    // 得到筛选过后的 todo 列表
    const filteredTodosRef = computed(() => {
        return filter(todosRef.value, visibilityRef.value)
    })

    // 剩余未完成的 todo 的个数
    const remainingRef = computed(() => {
        return filter(todosRef.value, 'active').length;
    })

    // 是否显示清空完成按钮
    const completedRef = computed(() => {
        return filter(todosRef.value, 'completed').length;
    })

    return {
        visibilityRef,
        filteredTodosRef,
        remainingRef,
        completedRef
    }
}