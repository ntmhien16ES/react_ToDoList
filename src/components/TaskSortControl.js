import React, { Component } from 'react';

class TaskSortControl extends Component {

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps)
    // }

    onClick = (sortBy, sortValue) => {
        this.props.onSort(sortBy, sortValue)
    }

    render () {
        var {sortBy, sortValue} = this.props
        return (
            <div className="dropdown">
                <a className="btn btn-primary dropdown-toggle" role="button" id="sortItem" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="">
                    Sắp xếp
                </a>
                <ul className="dropdown-menu" aria-labelledby="sortItem">
                    <li 
                        className="dropdown-item" 
                        
                        onClick = { () => { this.onClick('name' , 1) }}
                    >
                        <span className="fa fa-sort-alpha-down" />
                        Tên A-Z
                        {(sortBy === 'name' && sortValue === 1) ? <span className="fa fa-check ml-5" /> : ''}
                    </li>

                    <li 
                        className="dropdown-item" 
                        
                        onClick = { () => { this.onClick('name', -1)} }
                    >
                        <span className="fa fa-sort-alpha-up" />
                        Tên Z-A
                        {(sortBy === 'name' && sortValue === -1) ? <span className="fa fa-check ml-5" /> : ''}
                    </li>

                    <hr />

                    <li 
                        className="dropdown-item" 
                        
                        onClick = { () => { this.onClick('status', 1) } }
                    >
                        Trạng thái kích hoạt
                        {(sortBy === 'status' && sortValue === 1) ? <span className="fa fa-check ml-5" /> : ''}
                    </li>

                    <li 
                        className="dropdown-item" 
                        
                        onClick = { () => { this.onClick('status', -1) } }
                    >
                        Trạng thái ẩn
                        {(sortBy === 'status' && sortValue === -1) ? <span className="fa fa-check ml-5" /> : ''}
                    </li>
                </ul>
            </div>
        );
    }
}

export default TaskSortControl;