import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      classColor,
      classColorItem,
      classIsSP,
    } = this.props;

    /* classTrunfo = () => {
      if (cardTrunfo === true) {
        return 'sP';
      }
    }; */

    const classCard = `classCard ${classColor} ${classIsSP}`;
    const rareCardd = `rareCardd ${classColorItem}`;

    return (

      <div className={ classCard }>

        <p className="name-card" data-testid="name-card">{ cardName }</p>
        <img
          className="img-card"
          src={ cardImage }
          alt={ cardName }
          data-testid="image-card"
        />

        <p
          className="description-card"
          data-testid="description-card"
        >
          { cardDescription }

        </p>

        <p className="attr-card1 attr-card" data-testid="attr1-card">
          <span>Ataque:</span>
          { cardAttr1 }
        </p>

        <p className="attr-card2 attr-card" data-testid="attr2-card">
          <span>Meio de Campo:</span>
          { cardAttr2 }
        </p>

        <p className="attr-card3 attr-card" data-testid="attr3-card">
          <span>Defesa:</span>
          <span>{ cardAttr3 }</span>
        </p>

        <p className={ rareCardd } data-testid="rare-card">{ cardRare }</p>

        {
          cardTrunfo
          && <p className="trunfo-card" data-testid="trunfo-card">Super Trunfo</p>
        }
      </div>

    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  classColor: PropTypes.string.isRequired,
  classColorItem: PropTypes.string.isRequired,
  classIsSP: PropTypes.string.isRequired,
};

export default Card;
