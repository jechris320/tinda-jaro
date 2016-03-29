import { Component } from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';

import TabbedForm from './components/TabbedForm';

@ReactMixin.decorate(ReactMeteorData)
export default class MainApp extends Component {

getMeteorData() {
  return {};
}

  render() { 
    return (
        <div>


        </div>
    );
  }
  
};