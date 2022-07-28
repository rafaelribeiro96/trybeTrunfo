import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (

      <form>

        <h1>Criar nova carta</h1>

        <label htmlFor="name">
          Nome da carta:
          <input
            type="text"
            name="cardName"
            id="cardName"
            data-testid="name-input"
            placeholder="Digite o nome da carta:"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardDescription">
          Descrição da carta:
          <textarea
            type="textarea"
            name="cardDescription"
            id="cardDescription"
            data-testid="description-input"
            placeholder="Digite a descrição da carta: (máximo 71 carácteres)"
            cols="20"
            rows="2"
            maxLength={ 71 }
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardAttr1">
          Atributo de Ataque:
          <input
            type="number"
            name="cardAttr1"
            id="cardAttr1"
            data-testid="attr1-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardAttr2">
          Atributo de Meio de Campo:
          <input
            type="number"
            name="cardAttr2"
            id="cardAttr2"
            data-testid="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardAttr3">
          Atributo de Defesa:
          <input
            type="number"
            name="cardAttr3"
            id="cardAttr3"
            data-testid="attr3-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardImage">
          Imagem da carta:
          <input
            type="text"
            name="cardImage"
            id="cardImage"
            data-testid="image-input"
            placeholder="Cole aqui a URL da imagem desejada"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardRare">
          Raridade da carta:
          <select
            name="cardRare"
            id="cardRare"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">Normal</option>
            <option value="raro" className="class-raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>

        { hasTrunfo ? (
          <p>Você já tem um Super Trunfo em seu baralho</p>
        ) : (
          <label htmlFor="cardTrunfo">
            É uma carta Super Trunfo:
            <input
              type="checkbox"
              className="checkboxClass"
              name="cardTrunfo"
              id="cardTrunfo"
              data-testid="trunfo-input"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />
          </label>)}

        <button
          type="reset"
          name="bttSave"
          id="bttSave"
          className="bttSave"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>

      </form>

    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
