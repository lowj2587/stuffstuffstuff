// React
import React, { Component } from 'react';
import { slugify } from "../helpers";

export default class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: (props.options.findIndex(option => option.active) || 0)
    }
  }

  render() {
    const option = this.props.options[this.state.index];

    const renderChildren = option.textString === "string" ?
      <div style={{ padding: "2px 5px" }} dangerouslySetInnerHTML={{ __html: option.textString }} />
    : option.textString;


    return (
      <div className="accordionTabs">
        <ul>
          {this.props.options.map(option => option.legend).map((legend, index) => (
            <li className={this.state.index === index ? "active" : ""} onClick={() => this.setState({ index })}>
              <a href={slugify(`${this.props.endpointName} ${legend}`)} onClick={e => e.preventDefault()}>{legend}</a>
            </li>
          ))}
        </ul>
        
        {renderChildren}
      </div>
    )
  }
}