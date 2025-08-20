"use client";
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 col-lg-4 mb-5">
          <Link
            href="/properties/properties-for-sale" 
            className="property-link"
            style={{
              display: 'block',
              padding: '16px 8px 14px 22px',
              borderRadius: '7px',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              fontSize: '21px',
              fontWeight: '600',
              textDecoration: 'none',
              color: '#333',
              backgroundColor: '#fff',
              transition: 'all 0.3s ease'
            }}
          >
            Properties for Sale
          </Link>
        </div>
        
        <div className="col-md-6 col-lg-4 mb-5">
          <Link
            href="/properties/properties-for-rent" 
            className="property-link"
            style={{
              display: 'block',
              padding: '16px 8px 14px 22px',
              borderRadius: '7px',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              fontSize: '21px',
              fontWeight: '600',
              textDecoration: 'none',
              color: '#333',
              backgroundColor: '#fff',
              transition: 'all 0.3s ease'
            }}
          >
            Properties for Rent
          </Link>
        </div>
        
        <div className="col-md-6 col-lg-4 mb-5">
          <Link
            href="/properties/residential-properties" 
            className="property-link"
            style={{
              display: 'block',
              padding: '16px 8px 14px 22px',
              borderRadius: '7px',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              fontSize: '21px',
              fontWeight: '600',
              textDecoration: 'none',
              color: '#333',
              backgroundColor: '#fff',
              transition: 'all 0.3s ease'
            }}
          >
            Residential Properties
          </Link>
        </div>
        
        <div className="col-md-6 col-lg-4 mb-5">
          <Link
            href="/properties/commercial-properties" 
            className="property-link"
            style={{
              display: 'block',
              padding: '16px 8px 14px 22px',
              borderRadius: '7px',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              fontSize: '21px',
              fontWeight: '600',
              textDecoration: 'none',
              color: '#333',
              backgroundColor: '#fff',
              transition: 'all 0.3s ease'
            }}
          >
            Commercial Properties
          </Link>
        </div>
        
        <div className="col-md-6 col-lg-4 mb-5">
          <Link
            href="/properties/land-properties" 
            className="property-link"
            style={{
              display: 'block',
              padding: '16px 8px 14px 22px',
              borderRadius: '7px',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              fontSize: '21px',
              fontWeight: '600',
              textDecoration: 'none',
              color: '#333',
              backgroundColor: '#fff',
              transition: 'all 0.3s ease'
            }}
          >
            Land Properties
          </Link>
        </div>
        
       
      </div>

      <style jsx>{`
        .property-link:hover {
          transform: translateY(-2px);
          box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 8px;
        }
      `}</style>
    </div>
  )
}

export default page