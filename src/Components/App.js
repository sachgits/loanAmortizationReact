import React, { Component } from 'react';
import LoanDetails from './LoanDetails'
import Table from './Table'
import {validateInputs, calcPayment, createAmortizationSchedule, calcPaid} from './helpers'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleRadio = this.handleRadio.bind(this)
    this.state = {
      disabled: false,
      loanAmount: 0,
      interestRate: 0,
      loanLength: 0,
      monthlyPayment: 0,
      amortizationSchedule: [],
      totalPaid: 0,
      totalInterestPaid: 0,
      term: 'months'
    }  
  }

  handleBlur(e) {
    console.log(e.target.value)
  }

  handleChange(e) {
    e.preventDefault()

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick() {
    let {loanAmount, loanLength, interestRate, term} = this.state

    if (term === 'years') {
      loanLength *= 12
    }

    if (validateInputs(loanAmount, loanLength, interestRate)) {
      const monthlyPayment = calcPayment(loanAmount, loanLength, interestRate)
      const amortizationSchedule = createAmortizationSchedule(loanAmount, loanLength, interestRate, monthlyPayment)
      const totalPaid = calcPaid(amortizationSchedule, 'amount')
      const totalInterestPaid = calcPaid(amortizationSchedule, 'interest')
      
      this.setState({
        monthlyPayment,
        amortizationSchedule,
        totalPaid,
        totalInterestPaid
      })
    }
  }

  handleRadio(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <LoanDetails
          handleBlur={this.handleBlur}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleRadio={this.handleRadio}
        />
        <h2>Amortization Schedule</h2>
        <hr/>
        <Table amortizationSchedule={this.state.amortizationSchedule}/>
      </div>
    )
  }
}

export default App