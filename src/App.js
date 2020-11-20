import React, { Component } from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isTaskFormActive: false,
            tasks: [],
            taskEdit: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1
        }
    }

    onToggleForm = () => {
        var { isTaskFormActive } = this.state;
        this.setState({
            isTaskFormActive : isTaskFormActive ? true : true,
            taskEdit : null
        })
    }
    
    onCloseForm = () => {
        this.setState({
            isTaskFormActive: false,
            taskEdit: null
        })
    }

    onOpenForm = () => {
        this.setState({
            isTaskFormActive: true
        })
    }

    onSubmit = (data) => {
        var {tasks} = this.state;
        if(data.id =="") {
            data.id = this.generateID();
            
            tasks.push(data);
        } else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks: tasks,
            taskEdit: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onCloseForm();
    }

    onChagneStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if( index !== -1 ) {
            tasks[index].status = !tasks[index].status;
        }
        this.setState({ tasks: tasks });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if( index !== -1 ) {
            tasks.splice(index, 1); 
        }
        this.setState({ tasks: tasks });
        this.onCloseForm();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onEdit = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);

        var taskEdit = tasks[index];
        this.setState({ taskEdit: taskEdit });
        this.onOpenForm();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    onFilter = (name, status) => {
        this.setState({
            filter: {
                name: name.toLowerCase(),
                status: +status
            }
        })
        console.log(name, status);
    }

    onSearch = (keyword) => {
        this.setState({
            keyword
        })
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy,
            sortValue
        })
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if(task.id === id) {
                return result = index;
            }
        })
        return result;
    }

    componentWillMount() {
        if(localStorage && localStorage.getItem('tasks')){
            this.setState({
                tasks: JSON.parse(localStorage.getItem('tasks'))
            })
        }
    }

    removeAccents(str) {
        return str.normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    s4() {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID() {
        return this.s4() + this.s4() + "-" + this.s4() + this.s4() + "-" + this.s4() + this.s4()
    }

    render () {
        var { tasks, isTaskFormActive, taskEdit, filter, keyword, sortBy, sortValue } = this.state
        if(filter) {
            if(filter.name) {
                var filterName = this.removeAccents(filter.name)
                tasks = tasks.filter( task => this.removeAccents(task.name.toLowerCase()).indexOf(filterName) !== -1)
            }
            tasks = tasks.filter(task => {
                if(filter.status === -1) {
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false);
                }
            })
        }

        if(keyword) {
            var keywordNormal = this.removeAccents(keyword)
            tasks = tasks.filter( task => this.removeAccents(task.name.toLowerCase()).indexOf(keywordNormal) !== -1)
        }

        if(sortBy == 'name') {
            tasks.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return sortValue
                else if(a.name.toLowerCase() < b.name.toLowerCase()) return -sortValue
                else return 0
            })
        } else {
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sortValue
                else if(a.status < b.status) return sortValue
                else return 0
            })
        }

        return (
            <div className="container">
                <h2 className="display-4 text-center my-5">To do list</h2>
                <div className="row">
                    <div className={isTaskFormActive? "col-4" : ""}>
                        {isTaskFormActive? <TaskForm 
                                                onCloseForm={this.onCloseForm}
                                                onSubmit={this.onSubmit}
                                                taskEdit={taskEdit}
                                            /> : ''
                        }
                        
                    </div>
                    <div className={isTaskFormActive? "col-8" : "col-12"}>
                        <button 
                            className="btn btn-primary" 
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-1" />
                            Thêm công việc
                        </button>
                        <TaskControl 
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                        />
                        <TaskList 
                            tasks={tasks}
                            onChagneStatus={this.onChagneStatus}
                            onDelete={this.onDelete}
                            onEdit={this.onEdit}
                            onFilter={this.onFilter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
