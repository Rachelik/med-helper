import React from 'react'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Form from './Form.jsx'
import Med from './Med.jsx'
import EditForm from './Edit.jsx'

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
      let dateStart = moment(med.date_start).startOf('day').format()
      let datetimeEnd = moment(med.date_start).add(med.duration, 'day')
      let dateEnd = moment(datetimeEnd).startOf('day').format()
      let dateSelected = moment(this.state.selectedDate).startOf('day').format()
      console.log(med.name, dateEnd, med.frequency, med.indication)

      //this.state.selectedDate (choose time to see what medicine to eat)
      console.log("date_selected    ", dateSelected)
      console.log("date_start    ", dateStart)
      console.log("date_end    ", dateEnd)
      // med.date_start is to start date set by user form input.
      if(dateSelected >= dateStart && dateSelected <= dateEnd){
        //check for breakfast
        let timeMedStart = moment(med.date_start).format('HH:mm')
        let lunchStart = moment("10:00", "HH:mm").format("HH:mm")
        let dinnerStart = moment("16:00", "HH:mm").format("HH:mm")
        console.log("time to eat med", timeMedStart)
        console.log("med for breakfast cut-off time", lunchStart)
        console.log("med for lunch cut-off time", dinnerStart)
        if((med.frequency === 1 && med.time === 'Morning') || ((dateSelected === dateStart && timeMedStart <= lunchStart) && (med.frequency === 2 || med.frequency === 3)) || (dateSelected > dateStart && dateSelected <= dateEnd && (med.frequency === 2 || med.frequency === 3))) {
          if (med.indication === 'Before food') {
            let medsBfBreakfast = [med, ...this.state.bf_breakfast];
            this.setState({bf_breakfast: medsBfBreakfast})
          } else if (med.indication === 'After food') {
            let medsAftBreakfast = [med, ...this.state.aft_breakfast];
            this.setState({aft_breakfast: medsAftBreakfast})
          }
        }

        //med for lunch cut off at 4pm (upper limit), lower limit is breakfastCutOff
        //check for dinner
        if ((med.frequency === 1 && med.time === 'Night') || ((dateSelected === dateStart && timeMedStart <= dinnerStart) && (med.frequency === 2 || med.frequency === 3)) || ((dateSelected > dateStart && dateSelected <= dateEnd) && (med.frequency === 2 || med.frequency === 3))) {
          if (med.indication === 'Before food') {
            let medsBfDinner = [med, ...this.state.bf_dinner];
            this.setState({bf_dinner: medsBfDinner})
          } else if (med.indication === 'After food') {
            let medsAftDinner = [med, ...this.state.aft_dinner];
            this.setState({aft_dinner: medsAftDinner})
          }
        }

        //check for lunch (cut off is > breakfastCutOff at 10am and <= lunchCutOff at 4pm)
        if ((med.frequency === 3 && dateSelected === dateStart && ((timeMedStart > lunchStart && timeMedStart < dinnerStart) || (timeMedStart < lunchStart))) || (med.frequency === 3 && dateSelected > dateStart && dateSelected <= dateEnd)) {
          if (med.indication === 'Before food'){
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

  //when selected date change, this will reset previous data and reassign.
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
      showAll: false,
      beingEdited: false,
      med: []
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

  //when Edit button in Index clicked, get data and trigger edit form
  editClickHandler = (event) => {
    const url = "/meds/"+event.target.value+'.json';
    const runWhenEdit = (response) => {
      let medBfEditData = response.data
      this.setState({med: medBfEditData})
      this.state.beingEdited ? this.setState({beingEdited: false}) : this.setState({beingEdited: true});
      this.setState({showAll: false})
    }
    axios.get(url).then(runWhenEdit).catch((error) => {
      console.log("error", error)
    });
  }

  showEditForm = () => {
    const { id, name, indication, frequency, time, dosage, date_start, duration, user_id } = this.state.med;
    // console.log(this.state.med)

    return (
      <EditForm id={id} name={name} indication={indication} frequency={frequency} time={time} dosage={dosage} date_start={date_start} duration={duration} user_id={user_id} />
    )
  }

  deleteClickHandler = async (event) => {
    const sure = window.confirm('Are you sure?');
    if(sure) {
      const url = "/meds/"+event.target.value
      const token = document.querySelector('[name=csrf-token]').content
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token
      await axios
        .delete(url)
        .then((response) => {
          console.log(response.data)
        })
      }
    }


  showAllList = () => {
    let showAllList = this.state.meds.map((med) => {
      if(med.frequency === 1) {
        return (
          <div className="card" key={med.id}>
            <h4>{med.name}</h4>
            <div className="card-info">
              <p>Indication: {med.indication}</p>
              <p>Frequency: {med.frequency} intake(s) per day</p>
              <p>Time: {med.time}</p>
              <p>Dosage: {med.dosage}</p>
              <p>Date start: {moment(med.date_start).format('LLL')}</p>
              <p>Duration: {med.duration} day(s)</p>
              <button onClick={this.editClickHandler} value={med.id}>Edit</button>
              <button onClick={this.deleteClickHandler} value={med.id}>Delete</button>
            </div>
          </div>
        )
      } else {
        return (
          <div className="card" key={med.id}>
            <h4>{med.name}</h4>
            <div className="card-info">
              <p>Indication: {med.indication}</p>
              <p>Frequency: {med.frequency} intake(s) per day</p>
              <p>Dosage: {med.dosage}</p>
              <p>Date start: {moment(med.date_start).format('LLL')}</p>
              <p>Duration: {med.duration} day(s)</p>
              <button onClick={this.editClickHandler} value={med.id}>Edit</button>
              <button onClick={this.deleteClickHandler} value={med.id}>Delete</button>
            </div>
          </div>
        )
      }
    })
    return (
      <div className="section index-section">
        {showAllList}
      </div>
    )
  }

  render() {

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

          {this.state.showForm ? this.showForm() : null}

          <button onClick={this.showAllClick}>Index</button>

          {this.state.showAll ? this.showAllList() : null}

          {this.state.beingEdited ? this.showEditForm() : null}


        </div>
    );
  }
}

export default MedList;