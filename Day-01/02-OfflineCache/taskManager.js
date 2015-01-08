
	var taskStorage = new TaskStorage(window.localStorage);

	window.addEventListener("DOMContentLoaded", init);
	window.addEventListener("storage", onStorageChange);
	function onStorageChange(storageEvt){
		loadTasksFromStorage();
	}
	function init(){
		document.getElementById("btnAddTask").addEventListener("click", onBtnAddTaskClick);
		document.getElementById("btnRemoveCompleted").addEventListener("click", onBtnRemoveCompletedClick);
		loadTasksFromStorage();
	}
	function loadTasksFromStorage(){
		var tasks = taskStorage.getAll();
		document.getElementById("olTaskList").innerHTML = "";
		for(var i=0;  i < tasks.length; i++){
			addTaskToList(tasks[i]);
		}
	}
	function onBtnAddTaskClick(){
		var taskName = document.getElementById("txtTask").value;
		var taskId = new Date().valueOf().toString();
		var newTask = {
			id : taskId,
			name : taskName,
			isCompleted : false
		};
		taskStorage.save(newTask);
		addTaskToList(newTask);
		
	}
	function addTaskToList(task){
		var newTask = document.createElement("li");
		newTask.innerHTML = task.name;
		if (task.isCompleted){
			newTask.classList.add("completed");
		}
		newTask.setAttribute("taskId", task.id);
		newTask.addEventListener("click", onTaskItemClick);
		document.getElementById("olTaskList").appendChild(newTask);
	}
	function onTaskItemClick(){
		this.classList.toggle("completed");
		var taskId = this.getAttribute("taskId");
		var taskName = this.innerHTML;
		var isCompleted = this.classList.contains("completed");
		taskStorage.save({
			id : taskId,
			name : taskName,
			isCompleted : isCompleted
		});
		
	}
	function onBtnRemoveCompletedClick(){
		var taskList = document.getElementById("olTaskList").children;
		for(var i=taskList.length-1;i>=0;i--){
			if (taskList[i].classList.contains("completed")){
				var taskId = taskList[i].getAttribute("taskId");
				taskStorage.remove(taskId);
				taskList[i].remove();
			}
		}
	}