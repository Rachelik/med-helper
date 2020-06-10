import React from 'react'
import axios from 'axios'
import Med from './Med.jsx'
import moment from 'moment'

class MedList extends React.Component {

  constructor(){
    super();

    this.state = {
        meds: [],
        before_food: [],
        after_food: [],
        date_end: null
    };
  }
  async componentDidMount() {
    const url = '/meds.json';
    const runWhenDone = (response) => {
       const dataB = response.data.filter(med => med.indication.includes('Before food'))
       const dataA = response.data.filter(med => med.indication.includes('After food'))
       this.setState({ before_food: dataB, after_food: dataA })
    }
    const whenError = (error) => {
      console.log("error", error)
    }
    await axios.get(url).then(runWhenDone).catch(whenError);
  }

//when clicked, it will be able to show one of the meds only
//want to change this to be able to edit.
  clickedHandler=(event) =>{
    console.log("name clicked!!!! " + event.target.innerText)
  //   let med = this.state.meds.filter(med => med.name.includes(event.target.innerText))
  //   let date_end = med.date_start + med.duration
  //   console.log(moment(med[0].date_start).add(med[0].duration, 'day').format('DD MMM YYYY hh:mm'))
  //   this.setState({
  //     meds: med
  //   })
  }

  render() {
    let before_food = this.state.before_food
      .map((med, index)=>{
        return (
          <div className="med" key={med.id}>
            <div className="med-info">
             {/*<a href="#" onClick={this.clickedHandler}><h4>{med.name}</h4></a>*/}
              <p>{med.name}, {med.dosage}</p>
              <p>{moment(med.date_start).format()}</p>
            </div>
          </div>
        );
    });

    let after_food = this.state.after_food
      .map((med, index)=>{
        return (
          <div className="med" key={med.id}>
            <div className="med-info">
              <p>{med.name}, {med.dosage}</p>
            </div>
          </div>
        );
    });

    // let med = this.state.meds
    //   .filter(med => med.name.includes(this.state.click))
    //   .map((med, index)=>{
    //     return (
    //       <div className="med" key={med.id}>
    //         <div className="med-info">
    //           <a href="#" onClick={this.clickedHandler}><h4>{med.name}</h4></a>
    //           <p>{med.indication}</p>
    //           <p>{med.dosage}</p>
    //           <p>{med.date_start}</p>
    //           <p>{med.frequency}</p>
    //         </div>
    //       </div>
    //     );
    // });

    return (
        <div className="container">
          <div className="med-list">
              {before_food}
          </div>
          <div>
            <hr/>
              <h4>Meals</h4>
            <hr/>
          </div>
          <div className="med-list">
              {after_food}
          </div>
        </div>
    );
  }
}

export default MedList;