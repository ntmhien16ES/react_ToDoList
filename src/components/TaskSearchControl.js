import React, { Component } from 'react';


class TaskSearchControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
        }
    }

    onChange = (event) => {
        var keyword = event.target.value;
        
        this.setState({ keyword: keyword });
        
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSearch(this.state.keyword)
    }

    render () {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="input-group mb-3">         
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nhập từ khoá" 
                        aria-label="Recipient's username" 
                        aria-describedby="button-addon2" 
                        value={this.state.keyword}
                        onChange={this.onChange}
                    />
                    <div className="input-group-append">
                        <button 
                            type="submit"
                            className="btn btn-primary" 
                            id="button-addon2"
                        >
                            <span className="fa fa-search mr-1" />
                            Search
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default TaskSearchControl;