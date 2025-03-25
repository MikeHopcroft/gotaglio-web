import React from 'react';
import { useParams } from 'react-router-dom';

function SuitePage() {
  const { id } = useParams(); // id is a string

  return <h1>Suite ID: {id}</h1>;
}

export default SuitePage;
