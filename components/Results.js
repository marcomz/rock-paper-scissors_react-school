import React, { Component } from 'react';

class Results extends Component {
    render() {
        return (
            <div id='results'>
                <div className='marcador'>
                    <div className='marcador_player'>ME</div>
                    <div className='marcador_value'>{this.props.score.user}</div>
                    <div className='result_gif_container'>
                    	{
                    		this.props.gifs.user ? 
	                    		<img className='result_gif' src={this.props.gifs.user} alt='user_gif' /> :
	                    		null
                    	}
                    </div>
                </div>
                <div className='marcador'>
                    <div className='marcador_player'>CPU</div>
                    <div className='marcador_value'>{this.props.score.cpu}</div>
                    <div className='result_gif_container'>
                    	{
                    		this.props.gifs.cpu ?
                    			<img className='result_gif' src={this.props.gifs.cpu} alt='cpu_gif' /> :
                    			null
                    	}
                    </div>
                </div>
            </div>
        )
    }
}

export default Results;