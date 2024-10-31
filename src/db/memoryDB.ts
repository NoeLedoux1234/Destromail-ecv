interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }
  
  class MemoryDb {
    private tasks: Task[] = [];
  
    create(task: Task): Task {
      this.tasks.push(task);
      return task;
    }
  
    readAll(): Task[] {
      return this.tasks;
    }
  
    readById(id: string): Task | undefined {
      return this.tasks.find(task => task.id === id);
    }
  
    update(id: string, updatedTask: Partial<Task>): Task | undefined {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
        return this.tasks[taskIndex];
      }
      return undefined;
    }
  
    delete(id: string): boolean {
      const initialLength = this.tasks.length;
      this.tasks = this.tasks.filter(task => task.id !== id);
      return this.tasks.length < initialLength;
    }
  }
  
  export default new MemoryDb();
  