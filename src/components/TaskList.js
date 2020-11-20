import React, { Component } from 'react';
import TaskItem from '../components/TaskItem';

class TaskList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            status: -1, // -1: all, 1: active, 0: disabled
        }
    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.props.onFilter(
            name === 'name' ? value : this.state.name,
            name === 'status' ? value : this.state.status
        );
        this.setState({
            [name] : value
        })

    }
    render () {
        var {tasks, onChagneStatus, onDelete, onEdit} = this.props
        var {name, status} = this.state
        var elements = tasks.map((task, index) => {
            return <TaskItem 
                        key={task.id} 
                        index={index} 
                        task={task}
                        onChagneStatus={onChagneStatus}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
        })
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td />
                        <td>
                            <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                aria-describedby="helpId" 
                                name='name'
                                value = {name}
                                onChange={this.onChange}
                            />
                            </div>
                        </td>
                        <td>
                            <div className="form-group">
                                <select 
                                    className="form-control"
                                    name='status'
                                    value={status}
                                    onChange={this.onChange}
                                >
                                    <option value={-1}>Tất cả</option>
                                    <option value={1}>Kích hoạt</option>
                                    <option value={0}>Ẩn</option>
                                </select>
                            </div>
                        </td>
                        <td />
                    </tr>
                    {elements}
                </tbody>
            </table>
        );
    }
}

export default TaskList;