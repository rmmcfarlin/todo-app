const idGenerator = () => {
  return Math.floor(Math.random() * 1000000000);
};

const taskId = idGenerator();

let newTask = {
  id: "",
  title: 'test',
  completed: false,
  dueDate: '2025-10-13',
  notes: '',
};
console.log(newTask);

newTask = { ...newTask, id: taskId };

console.log(taskId);
console.log(newTask);
