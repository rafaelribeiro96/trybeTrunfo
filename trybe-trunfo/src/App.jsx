import React, { Component } from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';
import data from './components/Data';

const initialState = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  savedCards: data, /* [], */
  filterName: '',
  filterRare: 'todas',
  filterTf: false,
};
class App extends Component {
    state = initialState;

    selectColorCard = (rarecard) => {
      let color;
      if (rarecard === 'normal') {
        color = 'class-normal';
      } else if (rarecard === 'raro') {
        color = 'class-raro';
      } else {
        color = 'class-muito-raro';
      }
      return color;
    }

    selectColorItem = (rarecard) => {
      let colorItem;
      if (rarecard === 'normal') {
        colorItem = 'class-normal-item';
      } else if (rarecard === 'raro') {
        colorItem = 'class-raro-item';
      } else {
        colorItem = 'class-muito-raro-item';
      }
      return colorItem;
    }

    isTrunfo = (cardtrunfo) => {
      let cardIsTrunfo;
      if (cardtrunfo === true) {
        cardIsTrunfo = 'sP';
      } else {
        cardIsTrunfo = '';
      }
      return cardIsTrunfo;
    }

    onInputChange = ({ target }) => {
      const { name } = target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
        [name]: value }, () => {
        this.formValidate();
      });
    };

    formValidate = () => {
      const {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
      } = this.state;
      const textValidate = cardName.length > 0
      && cardImage.length > 0
      && cardDescription.length > 0;
      const n1 = Number(cardAttr1);
      const n2 = Number(cardAttr2);
      const n3 = Number(cardAttr3);
      const maxAtbPower = 90;
      const maxAllAtbPower = 210;
      const atbValidate = n1 >= 0 && n1 <= maxAtbPower
      && n2 >= 0 && n2 <= maxAtbPower
      && n3 >= 0 && n3 <= maxAtbPower
      && (n1 + n1 + n3) <= maxAllAtbPower;
      if ((n1 + n1 + n3)
      > maxAllAtbPower) alert('A soma dos atributos não podem ultrapassar 210');
      const isValidate = textValidate && atbValidate;
      this.setState({
        isSaveButtonDisabled: !isValidate,
      });
    }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const {
      cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, savedCards } = this.state;
    const createCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    this.setState({
      savedCards: [...savedCards, createCard] },
    () => {
      this.hasTrunfo();
      this.setState({
        cardName: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardImage: '',
        cardRare: 'normal',
        cardTrunfo: false,
        isSaveButtonDisabled: true,
      });
    });
  };

  hasTrunfo = () => {
    const { savedCards } = this.state;
    const hasTrunfo = savedCards.some((card) => card.cardTrunfo);
    this.setState({ hasTrunfo });
  };

  removeCard = (card) => {
    const { savedCards } = this.state;
    this.setState({
      savedCards: savedCards.filter((obj, index) => index !== card),
    }, () => { this.hasTrunfo(); });
  }

  filteredCard = (typeFilter, value) => (
    this.setState({
      [typeFilter]: value,
    }));

  render() {
    const { cardRare, cardTrunfo, savedCards,
      filterName, filterRare, filterTf } = this.state;

    const filteredSavedCards = savedCards
      .filter((card) => card.cardName.includes(filterName)
      && (card.cardRare === filterRare || filterRare === 'todas')
      && (filterTf === false || card.cardTrunfo === true));

    const renderCardList = filteredSavedCards.map((card, index) => {
      const { ...states } = card;
      return (
        <div key={ index }>
          <Card
            { ...states }
            classColor={ this.selectColorCard(card.cardRare) }
            classColorItem={ this.selectColorItem(card.cardRare) }
            classIsSP={ this.isTrunfo(card.cardTrunfo) }
          />
          <button
            type="submit"
            className="button-remove"
            data-testid="delete-button"
            onClick={ () => this.removeCard(index) }
          >
            Excluir
          </button>
        </div>
      );
    });

    return (
      <main>
        <header className="tittle-page">
          <img src="https://atletico.com.br/wp-content/uploads/2022/01/atletico.svg" alt="" className="tittle-img" />
          <h1 className="tittle-trunfo">Trunfo do Galo</h1>
          <div />
        </header>

        <div className="classCreateCard">
          <div className="classFormDiv">
            <Form
              { ... this.state }
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.onSaveButtonClick }
            />
          </div>

          <div className="classCardsDiv">
            <h1>Prévia da carta</h1>
            <Card
              { ... this.state }
              classColor={ this.selectColorCard(cardRare) }
              classColorItem={ this.selectColorItem(cardRare) }
              classIsSP={ this.isTrunfo(cardTrunfo) }
            />
          </div>
        </div>

        <div className="classFilter">
          <input
            type="text"
            onChange={ (event) => this.filteredCard('filterName', event.target.value) }
            disabled={ filterTf }
            placeholder="Filtre pelo nome da carta:"
            data-testid="name-filter"
          />

          <select
            data-testid="rare-filter"
            onChange={ (event) => this.filteredCard('filterRare', event.target.value) }
            disabled={ filterTf }
          >
            <option value="todas">Todas Raridades</option>
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>

          <label htmlFor="filterSuperTrunfo" className="filterSuperTrunfo">
            Super Trunfo
            <input
              type="checkbox"
              name="filterSuperTrunfo"
              id="filterSuperTrunfo"
              data-testid="trunfo-filter"
              onChange={ (event) => this.filteredCard('filterTf', event.target.checked) }
            />
          </label>
        </div>

        <div className="classSavedCardDiv">
          <h1>Cartas criadas</h1>
          <div className="classSavedCardContent">
            { renderCardList }
          </div>
        </div>
      </main>
    );
  }
}
export default App;
