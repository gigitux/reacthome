import React, {Component} from 'react';
/*Import Redux Stuff */
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';



class Fetchcomments extends Component {


  componentWillMount() {
    console.log(this.props.idhouse)
    this.props.fetchcomments(this.props.idhouse)
  }

  render() {
    if (this.props.comments == null) {
      return null
    }
    else {
      console.log(this.props.comments)
      const list_comments=this.props.comments.map((comments) =>
      <div key={comments._id}>
        {comments.comment}
      </div>
      )
      return(
        <div>
          {list_comments}
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    comments: state.list_house.fetch_comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchcomments: (id) => {
      dispatch(Actions.fetchcomments(id))
    },
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Fetchcomments)
