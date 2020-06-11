import React from 'react'
import axios from 'axios'
import Med from './Med.jsx'
import moment from 'moment'

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
        aft_dinner: []
    };
  }

  async componentDidMount() {
    const runWhenDone = (response) => {
      let allData = response.data;
      console.log(allData)
      allData.forEach(med => {
        let date_end = moment(med.date_start).add(med.duration, 'day')
        console.log(moment(Date.now()) < date_end)
        if(moment(Date.now()) >= moment(med.date_start) && moment(Date.now()) < date_end){
          //check for breakfast
          if((med.frequency === 1 && med.time === 'Morning') || med.frequency === 2 || med.frequency === 3) {
            if (med.indication === 'Before food') {
              const medsBfBreakfast = [med, ...this.state.bf_breakfast];
              this.setState({bf_breakfast: medsBfBreakfast})
            } else if (med.indication === 'After food') {
              const medsAftBreakfast = [med, ...this.state.aft_breakfast];
              this.setState({aft_breakfast: medsAftBreakfast})
            }
          }
          //check for dinner
          if ((med.frequency === 1 && med.time === 'Night') || med.frequency === 2 || med.frequency === 3) {
            if (med.indication === 'Before food') {
              const medsBfDinner = [med, ...this.state.bf_dinner];
              this.setState({bf_dinner: medsBfDinner})
            } else if (med.indication === 'After food') {
              const medsAftDinner = [med, ...this.state.aft_dinner];
              this.setState({aft_dinner: medsAftDinner})
            }
          }
          //check for lunch
          if (med.frequency === 3) {
            if (med.indication === 'Before food') {
              const medsBfLunch = [med, ...this.state.bf_lunch];
              this.setState({bf_lunch: medsBfLunch})
            } else if (med.indication === 'After food') {
              const medsAftLunch = [med, ...this.state.aft_lunch];
              this.setState({aft_lunch: medsAftLunch})
            }
          }
        }
      })
    }
    await axios.get('/meds.json').then(runWhenDone).catch((error) => {
      console.log("error", error)
    });
  }

  render() {
    let bfBreakfast = this.state.bf_breakfast
      .map((med, index)=>{
        return (
          <div className="med" key={med.id}>
            <div className="med-info">
              <p>{med.name}, {med.dosage}, {med.indication}, {med.time}, {med.frequency}</p>
            </div>
          </div>
        );
    });

    let aftBreakfast = this.state.aft_breakfast
      .map((med, index)=>{
        return (
          <div className="med" key={med.id}>
            <div className="med-info">
              <p>{med.name}, {med.dosage}, {med.indication}, {med.time}, {med.frequency}</p>
            </div>
          </div>
        );
    });

    let bfLunch = this.state.bf_lunch
      .map((med, index)=>{
        return (
          <div className="med" key={med.id}>
            <div className="med-info">
              <p>{med.name}, {med.dosage}, {med.indication}, {med.time}, {med.frequency}</p>
            </div>
          </div>
        );
    });

    let aftLunch = this.state.aft_lunch
      .map((med, index)=>{
        return (
          <div className="med" key={med.id}>
            <div className="med-info">
              <p>{med.name}, {med.dosage}, {med.indication}, {med.time}, {med.frequency}</p>
            </div>
          </div>
        );
    });

    let bfDinner = this.state.bf_dinner
      .map((med, index)=>{
        return (
          <div className="med" key={med.id}>
            <div className="med-info">
              <p>{med.name}, {med.dosage}, {med.indication}, {med.time}, {med.frequency}</p>
            </div>
          </div>
        );
    });

    let aftDinner = this.state.aft_dinner
      .map((med, index)=>{
        return (
          <div className="med" key={med.id}>
            <div className="med-info">
              <p>{med.name}, {med.dosage}, {med.indication}, {med.time}, {med.frequency}</p>
            </div>
          </div>
        );
    });

    return (
        <div className="container">
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
        </div>
    );
  }
}

export default MedList;