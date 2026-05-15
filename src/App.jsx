import { useEffect, useState } from 'react'

const API_URL =
  'https://script.google.com/macros/s/AKfycbzs_JXhE542RByGs1IRUONoKBZrN4XakANxqrUNfGrQBSc4068gzmAGQf_xqGeY94kp/exec'

export default function App() {

  const [products, setProducts] = useState([])

  const loadProducts = () => {

    fetch(
      `${API_URL}?action=products`
    )
      .then(res => res.json())
      .then(data => {

        console.log(data)

        setProducts(data.data)

      })

  }

  useEffect(() => {

    loadProducts()

  }, [])

  const getStatus = (
    stock,
    min
  ) => {

    if (stock === 0) {
      return 'หมด'
    }

    if (stock <= min) {
      return 'ใกล้หมด'
    }

    return 'ปกติ'

  }

  const stockIn = (item) => {

    const qty = prompt(
      `รับเข้า ${item.name}`
    )

    if (!qty) return

    fetch(
      API_URL,
      {
        method: 'POST',

        body: JSON.stringify({

          action: 'stockIn',

          productId: item.id,

          qty: Number(qty),

          user: 'โม',

          note: 'รับเข้า'

        })

      }
    )
      .then(res => res.json())
      .then(data => {

        console.log(data)

        loadProducts()

      })

  }

  const stockOut = (item) => {

    const qty = prompt(
      `เบิกสินค้า ${item.name}`
    )

    if (!qty) return

    fetch(
      API_URL,
      {
        method: 'POST',

        body: JSON.stringify({

          action: 'stockOut',

          productId: item.id,

          qty: Number(qty),

          user: 'โม',

          note: 'เบิกสินค้า'

        })

      }
    )
      .then(res => res.json())
      .then(data => {

        console.log(data)

        loadProducts()

      })

  }

  return (

    <div
      style={{
        minHeight: '100vh',
        background: '#f1f5f9',
        padding: 20,
        fontFamily: 'sans-serif'
      }}
    >

      <h1
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 20
        }}
      >
        PAYI STOCK SYSTEM
      </h1>

      <div
        style={{
          display: 'grid',
          gap: 20
        }}
      >

        {products.map((item, index) => (

          <div
            key={index}
            style={{
              background: 'white',
              borderRadius: 20,
              padding: 20,
              boxShadow:
                '0 2px 10px rgba(0,0,0,0.05)'
            }}
          >

            <h2
              style={{
                fontSize: 24,
                marginBottom: 10
              }}
            >
              {item.name}
            </h2>

            <p
              style={{
                fontSize: 18
              }}
            >
              คงเหลือ:
              <b>
                {' '}
                {item.stock}
                {' '}
              </b>

              {item.unit}
            </p>

            <p
              style={{
                marginTop: 10
              }}
            >
              สถานะ:

              <b>
                {' '}
                {getStatus(
                  item.stock,
                  item.min_stock
                )}
              </b>

            </p>

            <div
              style={{
                display: 'flex',
                gap: 10,
                marginTop: 20
              }}
            >

              <button
                onClick={() =>
                  stockIn(item)
                }
                style={{
                  background: '#22c55e',
                  color: 'white',
                  border: 'none',
                  padding:
                    '10px 20px',
                  borderRadius: 10,
                  cursor: 'pointer'
                }}
              >
                รับเข้า
              </button>

              <button
                onClick={() =>
                  stockOut(item)
                }
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding:
                    '10px 20px',
                  borderRadius: 10,
                  cursor: 'pointer'
                }}
              >
                เบิกสินค้า
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}
