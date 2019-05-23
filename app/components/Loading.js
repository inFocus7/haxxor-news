import React from 'react'
import ReactLoader from 'react-loading'

// Little wrapper for loading to show text as part of it. 
export default class Loader extends React.Component {
    render() {
        return (
            <div>
                <ReactLoader 
                    className='loading'
                    type={this.props.type} 
                    color={this.props.color} 
                    height={this.props.height} 
                    width={this.props.width}/>

                <h5 className='text-center loading'>{this.props.text}</h5>
            </div>
        )
    }
}
Loader.defaultProps = {
    type: 'bubbles',
    width: 150,
    height: 115,
    color: 'rgb(14, 145, 206)',
    text: 'Loading'
}