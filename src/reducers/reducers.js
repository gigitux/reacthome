import * as types from '../actions/actiontypes';

const initialState = {
  // id_house: [1,2],
  // house: [
  //   {
  //     id: 1,
  //     title: "gg Montereggioni",
  //     description: "A Monteriggioni, raggiungibile da Siena in 10 minuti di superstrada, si respira davvero un'aria medievale. Infatti, Monteriggioni è uno dei borgHI fortificati più belli d'Italia, ed ogni anno viene visitato da 90.000 persone. ",
  //     photo: 'http://www.santulivieri.it/Foto/Dintorni/Luoghi-Culturali/Monteriggioni/monteriggioni-cinta-muraria.jpg',
  //     category: "Villa"
  //   },
  //   {
  //     id: 2,
  //     title: "Villa Montereggioni",
  //     description: "Villa molto figa",
  //     photo: 'https://cdn1.matrimonio.com/emp/videos/7/4/7/16027b_23747-villa-diamante-mgarcia.jpg',
  //     category: "Villa blabla",
  //     location: {
  //       lat: 43.3901353,
  //       long: 11.223386300000016
  //     }
  //   }
  // ]
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
    };
    case types.FETCHHOUSE_SUCCESS:
    return {
      house: action.payload
    };
    case types.POSTHOUSE_SUCCESS:
    return {
      ...state
    };
    case types.FETCHONEHOUSE_SUCCESS:
    return {
      ...state,
      fetchHouse: action.payload
    };
    case types.LOGIN:
    console.log(action.payload.id)
    sessionStorage.setItem('user', JSON.stringify(action.payload));
    location.reload();
    return {
      ...state,
      user:action.payload.id
    }
    case types.PRENOTATIONHOUSE_REQUEST:
    location.reload()
    return {
      ...state,
      prenotation_house: action.payload
    };
    case 'FAILURE':
    alert("Password o email sbagliate")
    return {
      ...state
    };
    case types.HOUSEPRENOTATE_SUCCESS:
    return {
      ...state,
      prenotate_house: action.payload
    }
    case types.ADDCOMMENT_SUCCESS:
    location.reload();
    break;
    case types.FETCHCOMMENT_SUCCESS:
    return {
      ...state,
      fetch_comments: action.payload
    }
    case types.ACCEPT_SUCCESS:
    location.reload();
    return {
      ...state,
    };
    case types.REFUSE_SUCCESS:
    location.reload();
    case types.DELETEHOUSE_REQUEST:
    location.reload()
    return {
      ...state
    }
    break;
    default:
    return state;
  }
}
