import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { selectUserData } from '../../../../redux/reducers/users'
import * as CartService from '../../../../services/CartService'
import styles from './cart.module.css'
import { removeItem } from '../../../../redux/reducers/cart'

let cx = classNames.bind(styles)

function Cart() {
  const formatPrice = (price) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  };
  const userData = useSelector(selectUserData);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false)
  const dispatch = useDispatch()

  const handleButtonChangeQuantity = async (e, prodId) => {
    const { name, value } = e.target;
    var quantity = Number(value);
    if (name === "minus") {
      quantity = quantity <= 1 ? 1 : quantity - 1;
      console.log(quantity);
    } else {
      quantity = quantity + 1;
      console.log(quantity);

    }

    const item = {
      userId: userData.user.subject,
      prodId: prodId,
      quantity: Number(quantity),
    };

    const [data, error] = await CartService.updateaCartQuantity(item);
    if (data) {
      console.log(data);
      setReload(!reload);
    }
    if (error) {
      console.log(error);
    }
  }

  const handleDeleteCart = async (cartId, items) => {
    const choose = await Swal.fire({
      title: "Do you want to delete this product ?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    });
    console.log(choose.isConfirmed);
    if (choose.isConfirmed) {
      const [data, error] = await CartService.removeFromCart(cartId);
      if (data) {
        console.log(data);
        setReload(!reload);
      }
      if (error) {
        console.log(error);
      }
    }

  }

  useEffect(() => {
    const getCartFromAPI = async () => {
      const [data, error] = await CartService.getAllCartByUser(userData.user.subject);
      if (data) {
        console.log(data);
        setProducts(data.carts);
        setTotal(data.result.total)
      }
      if (error) {
        console.log(error);
      }
    }
    getCartFromAPI();
  }, [userData.user.subject, reload]);

  return (
    <div className={cx('container-fluid', 'px-5', 'py-5')}>
      <Link to={"/list_orderded"} className={cx('btn', 'rounded-0', 'btn-order', 'font-weight-bold')}>Your History Ordered</Link>
      <div className={cx('card', 'shadow-lg', 'p-3', 'rounded-0', 'px-5')}>
        <div className={cx('d-flex', 'justify-content-between', 'align-items-center', 'head-cart')}>
          <p className={cx('h2', 'text-secondary', 'font-weight-bold', 'py-3', 'text-uppercase')}>food shopping cart</p>
          <p className={cx('h5', 'text-secondary')}>{products.length} stuffs</p>
        </div>
        <div className={cx('row', 'border-top', 'border-bottom', 'align-items-center', 'body-cart')}>
          <div className={cx('col', 'font-weight-bold')}>
            <span className={cx('ml-4')}>Image</span>
          </div>
          <div className={cx('col', 'font-weight-bold')}>Name</div>
          <div className={cx('col', 'font-weight-bold')}>Restaurant</div>
          <div className={cx('col', 'font-weight-bold', 'text-center')}>Cost</div>
          <div className={cx('col', 'font-weight-bold', 'text-center')}>Quantity</div>
          <div className={cx('col', 'font-weight-bold', 'text-center')}>Total</div>
          <div className={cx('col-1', 'font-weight-bold')}></div>
        </div>
        {/* map cart items */}
        {
          products.length > 0 ? products.map((e, i) => {
            return (
              <div className={cx('row', 'border-bottom', 'align-items-center', 'body-cart')} key={i}>
                <div className={cx('col')}>
                  <img src={e.product.image} alt='food-img' className={cx('food-img')} />
                </div>
                <div className={cx('col')}>{e.product.name}</div>
                <div className={cx('col')}>{e.product.restaurant.name}</div>
                <div className={cx('col', 'text-center')}>{e.product.sale_price > 0 ? formatPrice(e.product.sale_price) : formatPrice(e.product.price)}</div>
                <div className={cx('col', 'text-center')}>
                  <div className={cx('form-group', 'mt-3')}>
                    <div className={cx('d-flex', 'align-items-center', 'rounded-pill', 'border-quantity', 'px-2', 'mx-4')}>
                      <button className={cx('btn', 'font-weight-bold')} value={e.quantity} name="minus" onClick={(event) => { handleButtonChangeQuantity(event, e.product.id) }}>&minus;</button>

                      <input type="number" name={e.product.id} id="" className={cx("form-control", 'rounded-0', 'input-quantity', 'text-center')} disabled min={1} value={e.quantity} />
                      <button className={cx('btn', 'font-weight-bold')} value={e.quantity} name="plus" onClick={(event) => { handleButtonChangeQuantity(event, e.product.id) }}>&#43;</button>
                    </div>
                  </div>
                </div>
                <div className={cx('col', 'text-center')}>{formatPrice(e.total)}</div>
                <div className={cx('col-1', 'text-right')}>
                  <button className={cx('btn')} onClick={() => { handleDeleteCart(e.id, e) }}>&#10005;</button>
                </div>
              </div>
            )
          }) : <>Nothing to show</>
        }
        {/*  */}
        <div className={cx('row', 'align-items-center', 'body-cart')}>
          <div className={cx('col')}>
          </div>
          <div className={cx('col-3', 'text-right')}>
            <p className={cx('text-uppercase', 'font-size-14', 'font-weight-bold')}>
              total all&nbsp;&nbsp;&nbsp;
              <span className={cx('h2', 'text-secondary')}>{total && formatPrice(total)}</span>
            </p>
          </div>
        </div>
        <div className={cx('row')}>
          <div className={cx('col-12')}>
            {
              products.length > 0 ? <Link to='/order'>
                <button className={cx('btn', 'btn-block', 'rounded-0', 'btn-order', 'btn-lg', 'font-weight-bold')} >
                  <AiOutlineCreditCard />&nbsp;Order now
                </button>
              </Link> : ""
            }

          </div>
        </div>
      </div>
    </div >
  )
}

export default Cart