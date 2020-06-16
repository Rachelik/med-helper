import React from "react";
import axios from "axios";
import moment from 'moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/es/react-datepicker.css"

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      indication: props.indication,
      frequency: props.frequency,
      time: props.time,
      dosage: props.dosage,
      date_start: new Date(props.date_start),
      duration: props.duration,
      user_id: props.user_id
    };

    // this.handleSaveEdit = this.handleSaveEdit.bind(this);
    console.log(this.props.id)
    console.log(typeof this.props.id)
  }

  onChangeDate = (date) => {
    this.setState({ date_start: date })
  }

  onChangeIndicationSelect = (event) => {
    this.setState({ indication: event.target.value })
    console.log("indication    ", event.target.value)
  }

  onChangeFrequencySelect = (event) => {
    this.setState({ frequency: event.target.value })
  }

  onChangeTimeSelect = (event) => {
    this.setState({ time: event.target.value })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSaveEdit = async (event) => {
    if (this.state.name) {
      const url = "/meds/"+this.props.id+".json";

      const payload = {
        name: this.state.name,
        indication: this.state.indication,
        frequency: this.state.frequency,
        time: this.state.time,
        dosage: this.state.dosage,
        date_start: this.state.date_start,
        duration: this.state.duration
      };
      const token = document.querySelector('[name=csrf-token]').content
          axios.defaults.headers.common['X-CSRF-TOKEN'] = token

      await axios
        .put(url, payload)
        .then((response) => {
          let successMessage = document.querySelector('.success-message');
          successMessage.innerText = response.data.name + " edited successfully";
        })
        .catch((error) => {
          console.log(error);
          let successMessage = document.querySelector('.success-message');
          successMessage.innerHTML = JSON.stringify(error);
        });

    } else {
      let successMessage = document.querySelector('.success-message');
      successMessage.innerHTML = JSON.stringify('Name cannot be empty.');
    }
  }

  render() {
    const { name, indication, frequency, time, dosage, date_start, duration } = this.state;

    return (
      <div className="container-form">
        <form onSubmit = {this.handleSaveEdit}>
          <label> Name:<br/>
            <input
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </label><br/><br/>
          <label> Indication:<br/>
            <select onChange={this.onChangeIndicationSelect} defaultValue={indication}>
              <option value="">Please choose</option>
              <option value='Before food'>Before food</option>
              <option value='After food'>After food</option>
            </select>
          </label><br/><br/>
          <label> Frequency:<br/>
            <select onChange={this.onChangeFrequencySelect} defaultValue={frequency}>
              <option value="">Please choose</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>
            <span> intake(s) per day</span>
          </label><br/><br/>
          <label> Time <br/> (Choose Morning or Night, if Frequency is 1 intake per day):<br/>
            <select onChange={this.onChangeTimeSelect} defaultValue={time}>
              <option value="">Please choose</option>
              <option value='Morning'>Morning</option>
              <option value='Night'>Night</option>
            </select>
          </label><br/><br/>
          <label> Dosage:<br/>
            <input
              type="text"
              name="dosage"
              onChange={this.onChange}
              value={dosage}
            /><span> per intake</span>
          </label><br/><br/>
          <label> Date start:<br/>
            <DatePicker
              required
              selected={date_start}
              onChange={this.onChangeDate}
              className="rasta-stripes"
              placeholderText="Click to select a date."
              showTimeSelect
              dateFormat="Pp"
              isClearable
            />
          </label><br/><br/>
          <label> Duration:<br/>
            <input
              type="number"
              name="duration"
              onChange={this.onChange}
              value={duration}
            /><span> day(s)</span>
          </label><br/><br/>

          <br/>
          <div className="btn">
            <button type="submit">
              Save Edit
            </button>
          </div>
          <br/>
          <div className="success-message">
            <label></label>
          </div>
        </form>
      </div>
    );
  }
}
