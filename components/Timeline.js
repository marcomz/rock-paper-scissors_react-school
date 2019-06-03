import React, { Component } from 'react';

class Timeline extends Component {
    render() {
        const images = {
            rock: 'mini-r.png',
            paper: 'mini-p.png',
            scissors: 'mini-s.png',
        };
        return (
            <div id='timeline'>
                    {
                        this.props.timeline.map((el, index) => {
                            return (
                                <div key={'timeline_element_'+index} className='timeline_element'>
                                    <div className='timeline_element_img'><img src={'/assets/images/'+images[el.user]} /></div>
                                    <div id='hr_container'><hr id='hr' /></div>
                                    <div className='timeline_element_img'><img src={'/assets/images/'+images[el.cpu]} /></div>
                                </div>
                            )
                        })
                    }
            </div>
        )
    }
}

export default Timeline;