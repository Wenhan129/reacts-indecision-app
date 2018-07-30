import React from 'react';


export default class Action extends React.Component {
    render() {
        return (
            <div>
                <button className="big-button"
                    onClick={this.props.handlePick}
                    disabled={!this.props.hasOptions}
                >What should I do?</button>
            </div>
        );
    }
}