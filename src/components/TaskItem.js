import React, { Component } from 'react';

class TaskItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    onChangeStatus = () => {
        this.props.onChagneStatus(this.props.task.id)
    }
    onDelete = () => {
        this.props.onDelete(this.props.task.id)
    }
    onEdit = () => {
        this.props.onEdit(this.props.task.id)
    }
    render () {
        var {index, task} = this.props
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>
                    <button 
                        className={task.status? "btn btn-success btn-sm" : "btn btn-danger btn-sm"}
                        onClick={this.onChangeStatus}
                    >
                        {task.status? "Kích hoạt" : "Ẩn"}
                    </button>
                </td>
                <td>
                    <button 
                        className="btn btn-warning btn-sm mr-2"
                        onClick = {this.onEdit}
                    >
                        <span className="fa fa-pen mr-1" />
                        Sửa
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick = {this.onDelete}
                    >
                        <span className="fa fa-trash-alt mr-1" />
                        Xoá
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;