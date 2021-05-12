import './App.css';
import React from 'react';
import {isEmpty} from 'lodash'
import PlaySound from './PlaySound.js'
import moment from 'moment'

const today = moment().format('DD-MM-YYYY')
class App extends React.Component{
  state = {
    centers: []
  }

  getData = () => {
    this.setState({ centers: []})
    this.fetchData(66)
    this.fetchData(68)
    this.fetchData(69)
  }

 fetchData= (distId = 66)=> {
  fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${distId}&date=${today}`, 
  {
    method: 'GET',
  }).then(res=>res.json()).then(data => {
      this.setState({ centers: [...this.state.centers, ...data.centers]})
    }).catch(err=>console.log(err))
}

  componentDidMount () {
    this.getData()
    setInterval(() => {
      console.log('Calling API');
      this.getData()
    }, 1000 * 60)
  }
  render(){
    const {centers = []} = this.state
  let data = []
  centers.forEach(c => {
      const {sessions, address, district_name, pincode} = c
      if(!isEmpty(sessions)){
        sessions.forEach(ses=>{
          const {available_capacity, min_age_limit, date } = ses
          if(min_age_limit===18 && available_capacity> 0) data.push(<li style={{color:'white', fontSize:20}}>{`${address} ${district_name} : ${date} :  ${pincode} :  ${available_capacity}`}</li>)
        })
      }
   }
)

  return (
<div id='con'>
<div className = 'logo'></div>
<div id='avai'>{data.length}</div>
<div className='refCon'>
  <p className='text'>available capacity </p>
  <div onClick = {this.getData} className='refresh'></div>
</div>
{!isEmpty(data) && 
<>
<div className='listCon'><ul className ='list'>{data}</ul></div>
 <PlaySound/>
 </>}
</div>
  );
}
}


export default App;
