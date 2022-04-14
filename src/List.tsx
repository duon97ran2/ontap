import { Button, Popconfirm, Space, Table } from 'antd';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ProductType } from './ProductType';

type Props = {}

const List = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get("http://localhost:3001/products");
      setProducts(data);
    }
    getProducts();
  }, []);
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Images',
      dataIndex: 'img',
      key: 'img',
    },
    {
      title: 'Desc',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: any) =>
        <Space>
          <Button type='primary' onClick={() => { navigate(`/products/${record.id}/edit`) }} >Edit</Button>
          <Popconfirm placement='top' title="remove this item?" onConfirm={() => { removeItem(record.id) }}>
            <Button type='primary' danger >Remove</Button>
          </Popconfirm>
        </Space >
    },
  ];
  const removeItem = async (id: string) => {
    const data = await axios.delete(`http://localhost:3001/products/${id}`);
    setProducts(products.filter(item => item.id !== id));
  }
  const tableData = products.map(((item, index) => {
    return {
      key: index + 1,
      id: item.id,
      name: item.name,
      img: item.img,
      price: item.price,
      desc: item.desc
    }
  }));
  return (
    <>
      <Table columns={columns} dataSource={tableData} />
    </>
  )
}

export default List