function TaskStorage(storage){
		this.storage = storage;
	}
	TaskStorage.prototype.getAll = function(){
		var result = [];
		for(var i=0, storageLength = this.storage.length; i<storageLength; i++){
			var taskId = this.storage.key(i);
			var task = JSON.parse(this.storage.getItem(taskId));
			task.id = taskId;
			result.push(task);
		}
		return result;
	};
	TaskStorage.prototype.save = function(task){
		this.storage.setItem(task.id, JSON.stringify(task));
	}
	TaskStorage.prototype.remove = function(taskId){
		this.storage.removeItem(taskId);
	}