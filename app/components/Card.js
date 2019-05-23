import React from 'react'
import PropTypes from 'prop-types'

export default class Card extends React.Component {
    
    static propTypes = {
        type: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        by: PropTypes.string.isRequired,
        deleted: PropTypes.bool,
        extra: PropTypes.object
    }

    render() {
        return (
            <div className='card'>
                <div className='card-header'>
                    {this.props.extra.score && <div className='info-left badge badge-light'>{this.props.extra.score.toLocaleString()}</div>}
                    <div className='info-left'>{this.props.by}</div>
                    <div className='info-right badge badge-info'>{this.props.type }</div>
                </div>

                <div className='card-body'>
                    {this.props.children}
                </div>

                <div className='card-footer text-muted'>
                    <div className='info-left'>{(new Date(this.props.date * 1000)).toLocaleString()}</div>

                    {this.props.deleted && <div className='info-right badge badge-warning'>Deleted</div>}
                    {this.props.type == 'story' && <div className='info-right'>{this.props.extra.comments ? this.props.extra.comments.toLocaleString() : 0} comments</div>}
                </div>

            </div>
        )
    }
}

/* Idea

// OP                  Type
//        Content
//        Content
//        Content
//       Extra Info

*/