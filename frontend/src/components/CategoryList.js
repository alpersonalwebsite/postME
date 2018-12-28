import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories }) => {

  function renderCatList() {
    return categories.map((category) => {

      const { name, path } = category;

      return (
        <div key={ name }><Link to={ `/${path}` }>{ name }</Link></div>
      );
    });
  }

    return (
      <div>
        <div className="full-row-header">
          <i style={{ color: '#fff' }}>Current categories:</i> { renderCatList() }
        </div>
      </div>
    );
  }

export default CategoryList;
