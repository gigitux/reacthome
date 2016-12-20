import * as types from '../actions/actiontypes';

const initialState = {
  id_house: [1,2],
  house: [
    {
      id: 1,
      title: "Villa Montereggioni",
      description: "A Monteriggioni, raggiungibile da Siena in 10 minuti di superstrada, si respira davvero un'aria medievale. Infatti, Monteriggioni è uno dei borgHI fortificati più belli d'Italia, ed ogni anno viene visitato da 90.000 persone. ",
      photo: 'http://vignette2.wikia.nocookie.net/assassinscreed/images/6/65/Villa_Auditore_restaurata.png/revision/latest?cb=20121023063753&path-prefix=it',
      category: "Villa"
    },
    {
      id: 2,
      title: "Villa Montereggioni",
      description: "Villa molto figa",
      photo: 'http://www.villadiamante.it/html/tools/BackgroundSlideshow/images/2.jpg',
      category: "Villa blabla"
    },
  ]
};

export default function list_house (state = initialState, action) {
  switch (action.type) {
    case types.ADD_HOUSE:
    const newId = state.id_house[state.id_house.lenght -1] +1
    return {
      ...state,
      id_house: state.id_house.concat(newId),
      house: [
        ...state.house,
        {
          id: newId,
          title: action.title
        }
      ]
    }
  ;

    default:
    return state;

  }
}
