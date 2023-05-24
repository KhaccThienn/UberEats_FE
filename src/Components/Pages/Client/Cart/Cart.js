import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUserData } from '../../../../redux/reducers/users'
import * as CartService from '../../../../services/CartService'
import styles from './cart.module.css'
import Swal from 'sweetalert2'

let cx = classNames.bind(styles)

function Cart() {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false)

  const handleChangeQuantity = async (e) => {
    const newQuantity = Number(e.target.value) > 1 ? Number(e.target.value) : 1;
    const item = {
      userId: userData.user.subject,
      prodId: e.target.name,
      quantity: newQuantity
    }
    const [data, error] = await CartService.updateaCartQuantity(item);
    if (data) {
      console.log(data);
      setReload(!reload);
    }
    if (error) {
      console.log(error);
    }
  }

  const handleDeleteCart = async (cartId) => {
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
      <div className={cx('card', 'shadow-lg', 'p-3', 'rounded-0', 'px-5')}>
        <div className={cx('d-flex', 'justify-content-between', 'align-items-center', 'head-cart')}>
          <p className={cx('h2', 'text-secondary', 'font-weight-bold', 'py-3', 'text-uppercase')}>food shopping cart</p>
          <p className={cx('h5', 'text-secondary')}>3 stuffs</p>
        </div>
        <div className={cx('row', 'border-top', 'border-bottom', 'align-items-center', 'body-cart')}>
          <div className={cx('col', 'font-weight-bold')}>
            <span className={cx('ml-4')}>Image</span>
          </div>
          <div className={cx('col', 'font-weight-bold')}>Name</div>
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
                <div className={cx('col', 'text-center')}>${e.product.sale_price > 0 ? e.product.sale_price : e.product.price}</div>
                <div className={cx('col', 'text-center')}>
                  <div className={cx('form-group', 'mt-3')}>
                    <div className={cx('d-flex', 'align-items-center', 'rounded-pill', 'border-quantity', 'px-2', 'mx-4')}>
                      <button className={cx('btn', 'font-weight-bold')} name={e.product.id} onClick={() => { }}>&minus;</button>
                      <input type="number" name={e.product.id} id="" className={cx("form-control", 'rounded-0', 'input-quantity', 'text-center')} onChange={(e) => { handleChangeQuantity(e) }} min={1} value={e.quantity} />
                      <button className={cx('btn', 'font-weight-bold')} name={e.product.id} onClick={() => { }}>&#43;</button>
                    </div>
                  </div>
                </div>
                <div className={cx('col', 'text-center')}>${e.total}</div>
                <div className={cx('col-1', 'text-right')}>
                  <button className={cx('btn')} onClick={() => { handleDeleteCart(e.id) }}>&#10005;</button>
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
              <span className={cx('h2', 'text-secondary')}>${total}</span>
            </p>
          </div>
        </div>
        <div className={cx('row')}>
          <div className={cx('col-12')}>
            <Link to='/order'>
              <button className={cx('btn', 'btn-block', 'rounded-0', 'btn-order', 'btn-lg', 'font-weight-bold')} >
                <AiOutlineCreditCard />&nbsp;Order now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart