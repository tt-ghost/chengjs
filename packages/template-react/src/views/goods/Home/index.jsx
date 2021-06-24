import React from 'react';
import { Link } from 'react-router-dom'

export default function GoodsHome (props) {
  return <div>
    <h3>goods home page</h3>
    <Link to='/goods/detail' >去 商品详情</Link>
    {props.children}
  </div>
}