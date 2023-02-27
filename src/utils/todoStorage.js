const LOCAL_KEY = 'todomvc';

/**
 * 获取目前所有的任务
 */

export function fetch() {
    const result = localStorage.getItem(LOCAL_KEY);
    if (result) {
        return JSON.parse(result);
    }
    return [];
}

/**
 * 保存所有任务
 * @param {*} todos 任务列表
 */
export function save(todos) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}

/**
 * 生成任务的唯一编号
 */

export function genarateId() {
    return Date.now() + Math.random().toString(16).substring(2,4);
}