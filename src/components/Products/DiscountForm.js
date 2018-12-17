import React, { Component, Fragment } from 'react'
import { addDiscount, getDiscounts } from '../../utils'
import { mergeAll, zipObj } from 'ramda'

const parseFieldsToJson = fields => mergeAll(
  fields.map(field => zipObj([field.productCategory], [field.discountCategory])),
)

class DiscountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      medicineDiscount: 'NO',
      cosmeticDiscount: 'NO',
      foodDiscount: 'NO',
      hygieneDiscount: 'NO',
    }
  }

  componentDidMount = () => {
    getDiscounts().then(response => {
      if (response.status === 200) {
        response.json().then(discounts => {
          const obj = parseFieldsToJson(discounts)
          this.setState({
            medicineDiscount: obj.MEDICINE,
            foodDiscount: obj.FOOD,
            cosmeticDiscount: obj.COSMETIC,
            hygieneDiscount: obj.HYGIENE,
          })
        })
      }
    })
  }

  handleCosmeticDiscountChange = e => this.setState({ cosmeticDiscount: e.target.value })
  handleFoodChange = e => this.setState({ foodDiscount: e.target.value })
  handleHygieneDiscountChange = e => this.setState({ hygieneDiscount: e.target.value })
  handleMedicineDiscountChange = e => this.setState({ medicineDiscount: e.target.value })

  handleAddDiscounts = e => {
    const { medicineDiscount, cosmeticDiscount, hygieneDiscount, foodDiscount } = this.state
    e.preventDefault()
    const medicineDiscountPromise = addDiscount({
      discountCategory: medicineDiscount,
      productCategory: 'MEDICINE'
    })
    const cosmeticDiscountPromise = addDiscount({
      discountCategory: cosmeticDiscount,
      productCategory: 'COSMETIC'
    })
    const hygieneDiscountPromise = addDiscount({
      discountCategory: hygieneDiscount,
      productCategory: 'HYGIENE'
    })
    const foodDiscountPromise = addDiscount({
      discountCategory: foodDiscount,
      productCategory: 'FOOD'
    })
    Promise.all([medicineDiscountPromise, foodDiscountPromise, cosmeticDiscountPromise, hygieneDiscountPromise])
      .then(response => {
        this.props.onSuccess()
      })
  }

  render() {
    const { medicineDiscount, cosmeticDiscount, hygieneDiscount, foodDiscount } = this.state
    return (
      <Fragment>
        <div className="">
          <form>
            <div id="discountContainer">
              <span>Medicamento</span>
              <select value={medicineDiscount} onChange={e => this.handleMedicineDiscountChange(e)}>
                <option value="NO">Sem desconto</option>
                <option value="GOOD">Bom desconto</option>
                <option value="GREAT">Ótimo desconto</option>
                <option value="SUPER">Super desconto</option>
              </select>
              <span>Cosmético</span>
              <select value={cosmeticDiscount} onChange={e => this.handleCosmeticDiscountChange(e)}>
                <option value="NO">Sem desconto</option>
                <option value="GOOD">Bom desconto</option>
                <option value="GREAT">Ótimo desconto</option>
                <option value="SUPER">Super desconto</option>
              </select>
              <span>Higiene</span>
              <select value={hygieneDiscount} onChange={e => this.handleHygieneDiscountChange(e)}>
                <option value="NO">Sem desconto</option>
                <option value="GOOD">Bom desconto</option>
                <option value="GREAT">Ótimo desconto</option>
                <option value="SUPER">Super desconto</option>
              </select>
              <span>Alimento</span>
              <select value={foodDiscount} onChange={e => this.handleFoodChange(e)}>
                <option value="NO">Sem desconto</option>
                <option value="GOOD">Bom desconto</option>
                <option value="GREAT">Ótimo desconto</option>
                <option value="SUPER">Super desconto</option>
              </select>
            </div>
            <input type="submit" value="CONCLUIR" onClick={e => this.handleAddDiscounts(e)} />
            <input type="button" onClick={e => this.props.onCancel(e)} value="Cancelar" />
          </form>
        </div>
      </Fragment>
    )
  }
}

export default DiscountForm