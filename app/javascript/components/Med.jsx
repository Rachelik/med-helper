import React from 'react';

class Med extends React.Component {

  render() {

    return (
      <div>
        <h3>Med</h3>
        <div>
          {this.props.med}
        </div>
      </div>

    );
  }
}

export default Med;