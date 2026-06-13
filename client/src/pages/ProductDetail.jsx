import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../utils/api';
import ProductDetail1 from '../components/ProductDetail1'; // Advanced UI (Little Wonders)
import ProductDetail2 from '../components/ProductDetail2'; // Simple UI (Normal Shop)

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getById(id)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error("Failed to fetch product", err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="spinner" style={{paddingTop: 120}}><div className="spinner-ring" /></div>;
  }

  if (!product) {
    return <div style={{paddingTop: 120, textAlign: 'center'}}>Product not found</div>;
  }

  const isLittleWonders = product.isLittleWonders === true || product.category === 'little-wonders';

  return isLittleWonders 
    ? <ProductDetail1 initialProduct={product} /> 
    : <ProductDetail2 initialProduct={product} />;
}