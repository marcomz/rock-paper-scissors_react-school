import React, { Component } from 'react';

class Options extends Component {
    render() {
        return (
	        <div>
	            <div className='options'>
	                <img src='/assets/images/rock.png' onClick={this.props.optionClicked.bind(this,'rock')} />
	                <img src='/assets/images/paper.png' onClick={this.props.optionClicked.bind(this,'paper')} />
	                <img src='/assets/images/scissors.png' onClick={this.props.optionClicked.bind(this,'scissors')} />
	            </div>
	        </div>
        )
    }
}

export default Options;