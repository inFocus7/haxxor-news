import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export default class Card extends React.Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        by: PropTypes.string.isRequired,
        deleted: PropTypes.bool,
        extra: PropTypes.object
    }

    badgeTypes = {
        story: 'primary',
        job: 'success',
        comment: 'secondary',
        poll: 'info',
        404: 'danger'
    }

    static defaultProps = {
        type: '404',
        date: '4/0/4',
        id: '0',
        by: 'Not Found',
        deleted: false
    }

    render() {
        return (
            <div className='card'>
                <div className='card-header'>
                    {this.props.extra.score && <div className='info-left badge badge-primary'>{this.props.extra.score.toLocaleString()}</div>}
                    <div className='info-left'>
                        <Link to={`/user/${this.props.by}`}>{this.props.by}</Link>
                    </div>
                    <div className={`info-right badge badge-${this.badgeTypes[this.props.type]}`}>{this.props.type}</div>
                </div>

                <div className='card-body'>
                    {this.props.url 
                        ? <a href={this.props.url}>{this.props.children}</a>
                        : this.props.children}
                </div>

                <div className='card-footer text-muted'>
                    <div className='info-left submission-date'>{(new Date(this.props.date * 1000)).toLocaleString()}</div>

                    {this.props.deleted && <div className='info-right badge badge-warning'>Deleted</div>}                    
                    
                    {(this.props.type === 'story')
                        && (
                        <div className='info-right'>
                            <Link 
                                to={{
                                    pathname: '/submission',
                                    search: `?id=${this.props.id}`
                                }}>
                                {this.props.extra.comments 
                                    ? `${this.props.extra.comments.toLocaleString()} comments`
                                    : `0 comments`}
                            </Link>            
                        </div>)}

                    {(this.props.type === 'comment')
                        && (
                            <div className='info-right'>
                            <Link to={{
                                    pathname: '/submission',
                                    search: `?id=${this.props.id}`
                                }}>
                                {this.props.extra.replies 
                                    ? `${this.props.extra.replies.toLocaleString()} replies`
                                    : `0 replies`}
                            </Link>            
                        </div>
                        )}

                </div>
            </div>
        )
    }
}