import React from 'react';

class Med extends React.Component {

  render() {

    return (
      <div className="container">
        <h3>Med</h3>
        <div>
          {this.props.med}
        </div>
      </div>

    );
  }
}

export default Med;