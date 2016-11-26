import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from './Content';
import { startSearch } from './actions'

export class App extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(this.props.startSearch, 250, event.target.value);
  }

  render() {
    return (
      <div>
        <input onInput={this.onChange} />
        <Content {...this.props} />
      </div>
    );
  }
}
const mapStateToProps = (state) => state;

const mapDispatchToProps = dispatch => ({ startSearch: (term) => dispatch(startSearch(term)) });

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
