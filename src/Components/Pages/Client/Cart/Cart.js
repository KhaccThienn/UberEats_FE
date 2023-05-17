import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './cart.module.css'
import food1 from '../../../../images/food1.png'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { Link } from 'react-router-dom'

let cx = classNames.bind(styles)

function Cart() {
  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(1);
  const [quantity3, setQuantity3] = useState(1);
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
        <div className={cx('row', 'border-bottom', 'align-items-center', 'body-cart')}>
          <div className={cx('col',)}>
            <img src={food1} alt='food-img' className={cx('food-img')} />
          </div>
          <div className={cx('col')}>Food name</div>
          <div className={cx('col', 'text-center')}>$00.00</div>
          <div className={cx('col', 'text-center')}>
            <div className={cx('form-group', 'mt-3')}>
              <div className={cx('d-flex', 'align-items-center', 'rounded-pill', 'border-quantity', 'px-2', 'mx-4')}>
                <button className={cx('btn', 'font-weight-bold')} name='minus' onClick={() => { quantity1 > 1 ? setQuantity1(Number(quantity1) - 1) : setQuantity1(1) }}>&minus;</button>
                <input type="number" name="" id="" className={cx("form-control", 'rounded-0', 'input-quantity', 'text-center')} value={quantity1} onChange={(e) => e.target.value ? setQuantity1(e.target.value) : setQuantity1(1)} />
                <button className={cx('btn', 'font-weight-bold')} name='plus' onClick={() => { setQuantity1(Number(quantity1) + 1) }}>&#43;</button>
              </div>
            </div>
          </div>
          <div className={cx('col', 'text-center')}>$00.00</div>
          <div className={cx('col-1', 'text-right')}>
            <button className={cx('btn')}>&#10005;</button>
          </div>
        </div>
        <div className={cx('row', 'border-bottom', 'align-items-center', 'body-cart')}>
          <div className={cx('col',)}>
            <img src={food1} alt='food-img' className={cx('food-img')} />
          </div>
          <div className={cx('col')}>Food name</div>
          <div className={cx('col', 'text-center')}>$00.00</div>
          <div className={cx('col', 'text-center')}>
            <div className={cx('form-group', 'mt-3')}>
              <div className={cx('d-flex', 'align-items-center', 'rounded-pill', 'border-quantity', 'px-2', 'mx-4')}>
                <button className={cx('btn', 'font-weight-bold')} name='minus' onClick={() => { quantity2 > 1 ? setQuantity2(Number(quantity2) - 1) : setQuantity2(1) }}>&minus;</button>
                <input type="number" name="" id="" className={cx("form-control", 'rounded-0', 'input-quantity', 'text-center')} value={quantity2} onChange={(e) => e.target.value ? setQuantity2(e.target.value) : setQuantity2(1)} />
                <button className={cx('btn', 'font-weight-bold')} name='plus' onClick={() => { setQuantity2(Number(quantity2) + 1) }}>&#43;</button>
              </div>
            </div>
          </div>
          <div className={cx('col', 'text-center')}>$00.00</div>
          <div className={cx('col-1', 'text-right')}>
            <button className={cx('btn')}>&#10005;</button>
          </div>
        </div>
        <div className={cx('row', 'border-bottom', 'align-items-center', 'body-cart')}>
          <div className={cx('col',)}>
            <img src={food1} alt='food-img' className={cx('food-img')} />
          </div>
          <div className={cx('col')}>Food name</div>
          <div className={cx('col', 'text-center')}>$00.00</div>
          <div className={cx('col', 'text-center')}>
            <div className={cx('form-group', 'mt-3')}>
              <div className={cx('d-flex', 'align-items-center', 'rounded-pill', 'border-quantity', 'px-2', 'mx-4')}>
                <button className={cx('btn', 'font-weight-bold')} name='minus' onClick={() => { quantity3 > 1 ? setQuantity3(Number(quantity3) - 1) : setQuantity3(1) }}>&minus;</button>
                <input type="number" name="" id="" className={cx("form-control", 'rounded-0', 'input-quantity', 'text-center')} value={quantity3} onChange={(e) => e.target.value ? setQuantity3(e.target.value) : setQuantity3(1)} />
                <button className={cx('btn', 'font-weight-bold')} name='plus' onClick={() => { setQuantity3(Number(quantity3) + 1) }}>&#43;</button>
              </div>
            </div>
          </div>
          <div className={cx('col', 'text-center')}>$00.00</div>
          <div className={cx('col-1', 'text-right')}>
            <button className={cx('btn')}>&#10005;</button>
          </div>
        </div>
        {/*  */}
        <div className={cx('row', 'align-items-center', 'body-cart')}>
          <div className={cx('col')}>
          </div>
          <div className={cx('col-3', 'text-right')}>
            <p className={cx('text-uppercase', 'font-size-14', 'font-weight-bold')}>
              total all&nbsp;&nbsp;&nbsp;
              <span className={cx('h2', 'text-secondary')}>$00.00</span>
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