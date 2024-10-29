/** @format */

// React
import React, {Component} from 'react'
import Highlight from './Highlight'
import Accordion from './Accordion'
import Table from './Table'
import {getAccessToken} from '../services/useSpotifyAccountsApi'
import {slugify} from '../helpers'

const calculateUrlFromSpec = ({url, queryParams}) =>
  url.split('?')[0] +
  (queryParams && queryParams.length > 0
    ? '?' + queryParams.map(queryParam => queryParam.name + '={' + queryParam.type + '}').join('&')
    : '')

const calculateRest = ({spec: {request}}) => `${request.method} ${request.url}`
const calculateCurl = ({spec: {request}}, accessToken) =>
  [
    `$ curl -X ${request.method}`,
    `       -H "Authorization: ${getAccessToken() ? `Bearer ${getAccessToken()}` : '[access_token]'}"`,
    `       -H "Accept: application/json"`,
    `       -H "Content-Type: application/json"`,
    `       ${calculateUrlFromSpec(request)} | jq '.' `,
  ].join(' \\\n')

const getRequestInfo = ({spec: {request}}) => (
  <React.Fragment>
    <h6>Headers</h6>

    <Table columns={['Header', 'Type', 'Required']} data={(request.headers || []).map(header => [
      <React.Fragment>
        <code style={{ fontSize: "17px" }}>{header.name}</code><br />
        <small>{header.description}</small>
      </React.Fragment>,
      header.type,
      header.required == true ? <strong>Required</strong> : <em>Not Required</em>
    ])} />

    <h6>Path Parameters</h6>

    <Table columns={['Path Parameter', 'Type', 'Required']} data={(request.pathParams || []).map(pathParam => [
      <React.Fragment>
        <code style={{ fontSize: "17px" }}>{pathParam.name}</code><br />
        <small>{pathParam.description}</small>
      </React.Fragment>,
      pathParam.type,
      pathParam.required == true ? <strong>Required</strong> : <em>Not Required</em>
    ])} />

    <h6>Query Parameters</h6>

    <Table columns={['Path Parameter', 'Type', 'Required']} data={(request.queryParams || []).map(queryParam => [
      <React.Fragment>
        <code style={{ fontSize: "17px" }}>{queryParam.name}</code><br />
        <small>{queryParam.description}</small>
      </React.Fragment>,
      queryParam.type,
      queryParam.required == true ? <strong>Required</strong> : <em>Not Required</em>
    ])} />

    <h6>Body Parameters</h6>

    <Table columns={['Path Parameter', 'Type', 'Required']} data={(request.bodyParams || []).map(bodyParam => [
      <React.Fragment>
        <code style={{ fontSize: "17px" }}>{bodyParam.name}</code><br />
        <small>{bodyParam.description}</small>
      </React.Fragment>,
      bodyParam.type,
      bodyParam.required == true ? <strong>Required</strong> : <em>Not Required</em>
    ])} />
  </React.Fragment>
)

export default class CategoryComponent extends Component {
  render() {
    const {categorySlug, categoryName, categoryEndpoints} = this.props

    return (
      <div className="apiCategory">
        <h1 id={categorySlug}>
          <a href={'#' + categorySlug}>{categoryName} API</a>
        </h1>

        {categoryEndpoints.map(endpoint => (
          <div key={endpoint.name} className="apiCategoryEndpoint">
            <h2>
              <a href={'#' + slugify(endpoint.name)}>
                {endpoint.name} <span className="fa fa-anchor" />
              </a>
            </h2>
            <p>{endpoint.description}</p>

            <Highlight
              endpointName={endpoint.name}
              options={[
                {
                  language: 'plain',
                  legend: 'Endpoint',
                  active: true,
                  codeString: calculateRest(endpoint),
                },
                {
                  language: 'shell',
                  legend: 'cURL',
                  codeString: calculateCurl(endpoint),
                },
              ]}
            />

            <Accordion
              endpointName={endpoint.name}
              options={[
                {
                  legend: 'Request',
                  active: true,
                  textString: getRequestInfo(endpoint),
                },
                {
                  legend: 'Response',
                  active: true,
                  textString: `Hello world 2.`,
                },
              ]}
            />

            <p>{JSON.stringify(endpoint.spec.request)}</p>
          </div>
        ))}
      </div>
    )
  }
}
