const Task = require("../model/Task")
const taskController = {}

taskController.createTask = async (req, res) =>{
  try{
  const {task, isComplete} = req.body;
  const newTask = new Task({ task, isComplete})
  await newTask.save()
  res.status(200).json({status:'ok',data:newTask})
} catch (err){
  res.status(400).json({status:'fail',error:err})
}
}

taskController.getTask = async (req, res) =>{
  try{
  const taskList = await Task.find({}).select("-__v");
  res.status(200).json({status:'ok',data:taskList})
} catch (err){
  res.status(400).json({status:'fail',error:err})
}
}

taskController.updateTask = async (req, res) => {
  try {
   const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { new: true,runValidators: true } //req.body에 스키마 검증을 적용
    );
    if (!updatedTask) {
     return res.status(404).json({ message: "Task not found" });
    }
     
    res.status(200).json({ status: "success", data: updatedTask });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const deleteItem = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: deleteItem });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};



module.exports = taskController
