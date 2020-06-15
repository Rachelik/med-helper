import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Form from './Form.jsx';

class Med extends React.Component {

  constructor(){
    super();

    this.state = {
        med: [],
        showEach: false,
        dateEnd: ""
    };
  }

  //show med information (Date range, duration, indication, intakes)
  clickShow = (props) => {
    event.preventDefault();
    const url = "/meds/"+this.props.medIndex+".json";
    const displayMedInfo = (response) => {
      this.setState({med: response.data});
      let date_end = moment(this.state.med.date_start).add(this.state.med.duration, 'day');
      this.setState({dateEnd: date_end.format('MMM DD, yyyy')});
      this.state.showEach ? this.setState({showEach: false}) : this.setState({showEach: true});
    }
    axios
      .get(url)
      .then(displayMedInfo)
      .catch((error)=> {console.log("error", error)});
  }

  //show individual med information on click
  showMedInfo = () => {
    let med = this.state.med;
    return(
      <div className="med-info-box" >
        <p>{moment(med.date_start).format('MMM DD, yyyy')} ~ {this.state.dateEnd}</p>
        <p>{med.duration} day(s)</p>
        <p>{med.frequency} intake(s) per day</p>
        <p>To take {med.indication.toLowerCase()}.</p>
      </div>
    )
  }

  render() {
    return (
      <div className="med" >
        <div className="med-info">
          <p><a href='#' onClick={this.clickShow} key={this.props.medIndex}>{this.props.medName}</a>, {this.props.medDosage}</p>
        </div>
        {this.state.showEach ? this.showMedInfo() : null}
      </div>
    );
  }
}

export default Med;