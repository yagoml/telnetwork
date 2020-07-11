import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'

export default function BreadCrumb({ current }) {
  return (
    <Breadcrumb>
      <li className="breadcrumb-item">
        <Link to="/">Dashboard</Link>
      </li>
      <Breadcrumb.Item active>{current}</Breadcrumb.Item>
    </Breadcrumb>
  )
}

BreadCrumb.propTypes = {
  current: PropTypes.string.isRequired
}
