import React from 'react'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Form from './Form.jsx'
import Med from './Med.jsx'

class MedList extends React.Component {

  constructor(){
    super();

    this.state = {
        meds: [],
        bf_breakfast: [],
        aft_breakfast: [],
        bf_lunch: [],
        aft_lunch: [],
        bf_dinner: [],
        aft_dinner: [],
        selectedDate: new Date(),
        showForm: false
    };
  }

  //sort meds fn to its category
  sortDataFn = (medsJsonData) => {
    medsJsonData.forEach(med => {
      let date_end = moment(med.date_start).add(med.duration, 'day')
      console.log(med.name, date_end.format(), med.frequency, med.indication)

      //this.state.selectedDate (choose time to see what medicine to eat)
      // med.date_start is to start date set by user form input.
      if(this.state.selectedDate >= moment(med.date_start) && this.state.selectedDate < date_end){
        //check for breakfast
        if((med.frequency === 1 && med.time === 'Morning') || med.frequency === 2 || med.frequency === 3) {
          if (med.indication === 'Before food') {
            let medsBfBreakfast = [med, ...this.state.bf_breakfast];
            this.setState({bf_breakfast: medsBfBreakfast})
          } else if (med.indication === 'After food') {
            let medsAftBreakfast = [med, ...this.state.aft_breakfast];
            this.setState({aft_breakfast: medsAftBreakfast})
          }
        }
        //check for dinner
        if ((med.frequency === 1 && med.time === 'Night') || med.frequency === 2 || med.frequency === 3) {
          if (med.indication === 'Before food') {
            let medsBfDinner = [med, ...this.state.bf_dinner];
            this.setState({bf_dinner: medsBfDinner})
          } else if (med.indication === 'After food') {
            let medsAftDinner = [med, ...this.state.aft_dinner];
            this.setState({aft_dinner: medsAftDinner})
          }
        }
        //check for lunch
        if (med.frequency === 3) {
          if (med.indication === 'Before food') {
            let medsBfLunch = [med, ...this.state.bf_lunch];
            this.setState({bf_lunch: medsBfLunch})
          } else if (med.indication === 'After food') {
            let medsAftLunch = [med, ...this.state.aft_lunch];
            this.setState({aft_lunch: medsAftLunch})
          }
        }
      }
    })
  };

  //display today on refresh
  componentDidMount() {
    const runWhenDone = (response) => {
      let allData = response.data;
      this.setState({meds: allData})
      this.sortDataFn(allData)
    }
    axios.get('/meds.json').then(runWhenDone).catch((error) => {
      console.log("error", error)
    });
  };

  handleChange = date => {
    this.setState({
      meds: [],
      bf_breakfast: [],
      aft_breakfast: [],
      bf_lunch: [],
      aft_lunch: [],
      bf_dinner: [],
      aft_dinner: [],
      selectedDate: date,
      showForm: false,
      showAll: false
    });

    const runWhenDoneSelect = (response) => {
      let allData = response.data;
      this.setState({meds: allData})
      this.sortDataFn(allData)
    }
    axios.get('/meds.json').then(runWhenDoneSelect).catch((error) => {
      console.log("error", error)
    });
  };

  //when click, will alternate showForm to false or true.
  handleClick = (event) => {
    this.state.showForm ? this.setState({showForm: false}) : this.setState({showForm: true});
  }

  showAllClick = (event) => {
    this.state.showAll ? this.setState({showAll: false}) : this.setState({showAll: true});
  }

  showForm = () => {
    return (
      <Form />
    )
  }

  render() {

    let showAllList = this.state.meds.map((med) => {
      return (
        <div key={med.id}>
          <p>{med.name}</p>
        </div>
      )
    })

    let bfBreakfast = this.state.bf_breakfast
      .map((med)=>{
        return (
          <Med medIndex={med.id} medName={med.name} medDosage={med.dosage} />
        );
    });

    let aftBreakfast = this.state.aft_breakfast
      .map((med)=>{
        return (
          <Med medIndex={med.id} medName={med.name} medDosage={med.dosage} />
        );
    });

    let bfLunch = this.state.bf_lunch
      .map((med)=>{
        return (
          <Med medIndex={med.id} medName={med.name} medDosage={med.dosage} />
        );
    });

    let aftLunch = this.state.aft_lunch
      .map((med)=>{
        return (
          <Med medIndex={med.id} medName={med.name} medDosage={med.dosage} />
        );
    });

    let bfDinner = this.state.bf_dinner
      .map((med)=>{
        return (
          <Med medIndex={med.id} medName={med.name} medDosage={med.dosage} />
        );
    });

    let aftDinner = this.state.aft_dinner
      .map((med)=>{
        return (
          <Med medIndex={med.id} medName={med.name} medDosage={med.dosage} />
        );
    });

    return (
        <div className="container">
          <div className="datePicker">
            <DatePicker
              selected={this.state.selectedDate}
              onChange={this.handleChange}
              className="rasta-stripes"
              placeholderText="Click to select a date."
              dateFormat="MMMM dd, yyyy"
              isClearable
            />
          </div>
          <div className="section breakfast-section">
            <div className="med-list">
              {bfBreakfast}
            </div>
            <div className="section-title">
              <h3>Breakfast</h3>
            </div>
            <div className="med-list">
              {aftBreakfast}
            </div>
          </div>

          <div className="section lunch-section">
            <div className="med-list">
              {bfLunch}
            </div>
            <div className="section-title">
              <h3>Lunch</h3>
            </div>
            <div className="med-list">
              {aftLunch}
            </div>
          </div>

          <div className="section dinner-section">
            <div className="med-list">
              {bfDinner}
            </div>
            <div className="section-title">
              <h3>Dinner</h3>
            </div>
            <div className="med-list">
              {aftDinner}
            </div>
          </div>

          <div className="btn">
            <button onClick={this.handleClick}>Add New</button>
          </div>

          <button onClick={this.showAllClick}>Show All</button>




          {this.state.showForm ? this.showForm() : null}
          <div>
            {this.state.showAll ? showAllList : null}
          </div>
        </div>
    );
  }
}

export default MedList;