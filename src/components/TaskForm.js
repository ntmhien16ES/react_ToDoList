import React, { Component } from 'react';


class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name: '',
            status: false,
        }
    }

    componentWillMount() {
        if(this.props.taskEdit) {
            this.setState({
                id: this.props.taskEdit.id,
                name: this.props.taskEdit.name,
                status: this.props.taskEdit.status,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.taskEdit) {
            this.setState({
                id: nextProps.taskEdit.id,
                name: nextProps.taskEdit.name,
                status: nextProps.taskEdit.status,
            })
        } else {
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        if(name == 'status') {
            value = value ==='true' ? true : false;
        }
        this.setState({
            [name]: value,
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.name !== "") {
            this.props.onSubmit(this.state);
        }
        this.onClear();
    }
    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false,
        })
    }
    updateTaskEdit = (taskEdit) => {
        this.setState({
            name: taskEdit.name,
            status: taskEdit.status
        })
    }
    render () {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-10">
                            {this.state.id == "" ? 'Thêm công việc' : 'Cập nhật công việc'}
                        </div>
                        <div className="col-2">
                            <span 
                                className="fa fa-times"
                                onClick = {this.onCloseForm}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="nameJob">Tên</label>
                            <input 
                                type="text" 
                                id="nameJob" 
                                className="form-control" 
                                aria-describedby="helpId"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            <label htmlFor="status" className="mt-3">Trạng thái</label>
                            <select 
                                className="form-control" 
                                name="status" 
                                id="status"
                                value={this.state.status}
                                onChange={this.onChange}
                            >
                                <option value={false}>Ẩn</option>
                                <option value={true}>Kích hoạt</option>
                            </select>
                            <div className="text-center mt-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-info mr-2"
                                >
                                    <span className="fa fa-plus mr-1" />
                                    Lưu lại
                                </button>
                                <button 
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={this.onClear}
                                >
                                    <span className="fa fa-times mr-1" />
                                    Huỷ bỏ
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;