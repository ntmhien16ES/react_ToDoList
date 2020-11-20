import React, { Component } from 'react';
import TaskSearchControl from '../components/TaskSearchControl';
import TaskSortControl from '../components/TaskSortControl';

class TaskControl extends Component {

    render () {
        return (
            <div className="row mt-3">
                <div className="col-8">
                    <TaskSearchControl onSearch={this.props.onSearch}/>
                </div>
                <div className="col-4">
                    <TaskSortControl 
                        onSort={this.props.onSort}
                        sortBy={this.props.sortBy}
                        sortValue={this.props.sortValue}
                    />
                </div>
            </div>
        );
    }
}

export default TaskControl;