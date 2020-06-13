import React from 'react';

class Med extends React.Component {

  render() {

    return (
      <div className="med" key={this.props.medIndex}>
        <div className="med-info">
          <p>{this.props.medName}, {this.props.medDosage}</p>
        </div>
      </div>
    );
  }
}

export default Med;