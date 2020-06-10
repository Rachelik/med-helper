import React from 'react'
import axios from 'axios'
import Med from './Med.jsx'

class MedList extends React.Component {

  constructor(){
    super();

    this.state = {
        meds:[]
    };
  }
  async componentDidMount() {
    const url = '/meds.json';
    const runWhenDone = (response) => {
       const data = response.data
       this.setState({ meds: data })
    }
    const whenError = (error) => {
      console.log("error", error)
    }
    await axios.get(url).then(runWhenDone).catch(whenError);
  }

//when clicked, it will be able to show one of the item
  clickedHandler=(event) =>{
    console.log("name clicked!!!!" + event.target.innerText)
    this.setState({
      click: event.target.innerText,
      meds: this.state.meds.filter(med => med.name.includes(event.target.innerText))
    })
  }

  render() {
    let meds = this.state.meds
      .map((med, index)=>{
        return (
          <div className="med" key={med.id}>
            <div className="med-info">
              <a href="#" onClick={this.clickedHandler}><h4>{med.name}</h4></a>
              <p>{med.date_end}</p>
              <p>{med.indication}</p>
              <p>{med.dosage}</p>
              <p>{med.time}</p>
              <p>{med.duration}</p>
              <p>{med.date_start}</p>
              <p>{med.frequency}</p>
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
      <div className="app-content">
        <div className="container">
          <h3>Meds</h3>
          <div>
              {meds}
          </div>
        </div>
      </div>
    );
  }
}

export default MedList;