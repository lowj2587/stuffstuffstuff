/** @format */
import React, {Component} from 'react'

export default function Table({columns, data}) {
  return (
    <table width="80%">
      <thead>
        <tr>
          {columns.map(column => (
            <th>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr>
            {row.map(item => typeof item === "string" ? (
              <td dangerouslySetInnerHTML={{__html: item}} />
            ) : item)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
