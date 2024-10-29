// React
import React, { Component } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneSpace } from 'react-syntax-highlighter/dist/styles/prism';
import { slugify } from "../helpers";

export default class Highlight extends Component {
  constructor(props) {
    super(props);

    this.stylingCss = { ...duotoneSpace };
    this.stylingCss["code[class*=\"language-\"]"] = {
      ...this.stylingCss["code[class*=\"language-\"]"],
      fontFamily: "Source Code Pro, Consolas, Inconsolata, Monaco, monospace",
      fontSize: "15px"
    }

    this.state = {
      index: (props.options.findIndex(option => option.active) || 0)
    }
  }

  render() {
    const option = this.props.options[this.state.index];

    return (
      <div className="syntaxHighlighting">
        <ul>
          {this.props.options.map(option => option.legend).map((legend, index) => (
            <li className={this.state.index === index ? "active" : ""} onClick={() => this.setState({ index })}>
              <a href={slugify(`${this.props.endpointName} ${legend}`)} onClick={e => e.preventDefault()}>{legend}</a>
            </li>
          ))}
        </ul>

        <SyntaxHighlighter language={option.language || 'javascript'} style={this.stylingCss}>
          {option.codeString}
        </SyntaxHighlighter>
      </div>
    )
  }
}