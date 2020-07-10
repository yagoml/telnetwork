import React from 'react'
import './style.scss'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

export default function Widget({
  value,
  title,
  className = '',
  loading = false,
  uri
}) {
  return (
    <Link to={uri} className={className + ' widget'}>
      {loading ? (
        <Spinner animation="border" variant="light" />
      ) : (
        <>
          <div className="widget__value">{value}</div>
          <div className="widget__title">{title}</div>
        </>
      )}
    </Link>
  )
}

Widget.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string
}
