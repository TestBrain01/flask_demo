from flask import Blueprint, jsonify, request

api_bp = Blueprint('api', __name__)

# 模拟数据
tasks = [
    {"id": 1, "title": "学习Flask", "completed": False},
    {"id": 2, "title": "学习Vue", "completed": True}
]

# 获取所有任务
@api_bp.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# 添加新任务
@api_bp.route('/tasks', methods=['POST'])
def add_task():
    new_task = request.json
    tasks.append(new_task)
    return jsonify(new_task), 201

# 更新任务状态
@api_bp.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = next((t for t in tasks if t["id"] == task_id), None)
    if task:
        task.update(request.json)
        return jsonify(task)
    return jsonify({"message": "Task not found"}), 404

# 删除任务
@api_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return jsonify({"message": "Task deleted"})