import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { selectUserData } from '../../../../redux/reducers/users'
import * as CartService from '../../../../services/CartService'
import * as OrderService from '../../../../services/OrderService'
import * as UserService from '../../../../services/UserService'
import * as VoucherService from '../../../../services/VoucherService'
import styles from './order.module.css'
import io from "socket.io-client";

let cx = classNames.bind(styles);
const socket = io("http://localhost:8000");

function OrderFix() {
     const formatPrice = (price) => {
          return price.toLocaleString('en-US', {
               style: 'currency',
               currency: 'USD',
               minimumFractionDigits: 2,
          });
     };
     const initProfileState = {
          userName: "",
          phone: "",
          address: "",
     };
     const initPostCheckout = {
          userName: "",
          address: "",
          phone: "",
          note: '',
          vouchersId: ''
     }
     const userData = useSelector(selectUserData);
     const [total, setTotal] = useState(0);
     const [currentTotal, setCurrentTotal] = useState(0);
     const [products, setProducts] = useState([]);
     const [userProfile, setUserProfile] = useState(initProfileState);
     const [resId, setResId] = useState(0);
     const [vouchers, setVouchers] = useState([]);
     const [postData, setPostData] = useState(initPostCheckout)
     const navigate = useNavigate();

     const handlePostCheckout = async () => {
          const createOrder = {
               delivered_user: postData.userName ? postData.userName : userProfile.userName,
               delivered_address: postData.address ? postData.address : userProfile.address,
               delivered_phone: postData.phone ? postData.phone : userProfile.phone,
               note: postData.note,
               status: 0,
               carts: products,
               userId: userData.user.subject,
               vouchersId: postData.vouchersId,
               total_price: currentTotal,
               restaurantId: resId
          }
          console.log(createOrder);

          const [data, error] = await OrderService.postCheckoutData(createOrder);
          if (data) {
               const [res, rej] = await CartService.removeAllDataCartByUserID(userData.user.subject);
               if (res) {
                    socket.emit("createOrder", res);
                    Swal.fire({
                         title: "Checkout Successful",
                         position: 'top-right',
                         timer: 1500,
                         icon: "success",
                         timerProgressBar: true,
                         showConfirmButton: false
                    });
                    console.log("Checkout Success", data);
                    navigate('/list_orderded');
               }
               if (rej) {
                    console.log(rej);
                    Swal.fire({
                         title: "Having Some Error When Post Checkout Data",
                         position: 'top-right',
                         timer: 1500,
                         icon: "warning",
                         timerProgressBar: true,
                         showConfirmButton: false
                    });
                    return;
               }
          }
          if (error) {
               console.log(error);
               Swal.fire({
                    title: "Please Fill Out All Required Fields",
                    position: 'top-right',
                    timer: 1500,
                    icon: "warning",
                    timerProgressBar: true,
                    showConfirmButton: false
               });
               return;
          }
     }

     const handleChangeProfile = (e) => {
          const { name, value } = e.target;
          setPostData({ ...postData, [name]: value })
     }

     const handleChangeVoucher = async (e) => {
          const { name, value } = e.target;
          setPostData({ ...postData, [name]: value });
          if (e.target.value > 0) {
               const [voucher, error] = await VoucherService.getVoucherByID(e.target.value);
               if (voucher) {
                    console.log(voucher);
                    const discounted = Number(total) - (Number(total) * Number(voucher.discount) / 100);
                    setCurrentTotal(discounted);
               }
               if (error) {
                    console.log(error);
               }
          } else {
               setCurrentTotal(total);
          }

     }


     useEffect(() => {
          const getCartFromAPI = async () => {
               const [data, error] = await CartService.getAllCartByUser(userData.user.subject);
               if (data) {
                    console.log(data.carts);
                    setProducts(data.carts);
                    setTotal(data.result.total);
                    setCurrentTotal(data.result.total);
                    setResId(data.carts[0].product.restaurant.id);
               }
               if (error) {
                    console.log(error);
               }
          }
          const getClientData = async () => {
               const [data, error] = await UserService.getUserProfile(userData.user.subject);
               if (data) {
                    setUserProfile(data)
               }
               if (error) {
                    console.log(error);
               }
          }
          const getListVouchers = async (resId) => {
               const [data, error] = await VoucherService.getVoucherByRestaurantId(resId);
               if (data) {
                    setVouchers(data)
               }
               if (error) {
                    console.log(error);
               }
          }
          getClientData();
          getCartFromAPI();
          getListVouchers(resId)
     }, [userData.user.subject, resId]);


     return (
          <div className={cx('container-fluid', 'px-5')}>
               <div className={cx('row', 'justify-content-center')}>
                    <div className={cx('col-lg-10')}>
                         <p className={cx('h1', 'font-weight-bold', 'text-center', 'text-uppercase', 'my-2', 'text-shadow')}>
                              checkout
                         </p>
                         <div className={cx('row')}>
                              <div className={cx('col-6')}>
                                   <form method='POST'>
                                        <div className={cx("card border-0")}>
                                             <div className={cx("card-header bg-transparent pl-0")}>
                                                  <p className={cx("card-text", "text-black", "mb-2 text-uppercase h3", 'font-weight-bold text-center')}>
                                                       payment details
                                                  </p>
                                             </div>
                                             <div className={cx("card-body p-0 pt-3")}>
                                                  <div className={cx("form-group")}>
                                                       <label htmlFor="" className={cx("h5 text-black mb-1")}>Name<span className='text-danger'>(*)</span>: </label>
                                                       <input type="text"
                                                            defaultValue={userProfile.userName}
                                                            onChange={handleChangeProfile}
                                                            className={cx("form-control rounded-0 mt-1")}
                                                            name="userName" placeholder="Enter name..." />
                                                  </div>
                                                  <div className={cx("form-group")}>
                                                       <label htmlFor="" className={cx("h5 text-black mb-1")}>Address<span className='text-danger'>(*)</span>: </label>
                                                       <input type="text"
                                                            onChange={handleChangeProfile}
                                                            defaultValue={userProfile.address}
                                                            className={cx("form-control rounded-0 mt-1")}
                                                            name="address" placeholder="Enter address..." />
                                                  </div>
                                                  <div className={cx("form-group")}>
                                                       <label htmlFor="" className={cx("h5 text-black mb-1")}>Phone number<span className='text-danger'>(*)</span>: </label>
                                                       <input type="text"
                                                            onChange={handleChangeProfile}
                                                            defaultValue={userProfile.phone}
                                                            className={cx("form-control rounded-0 mt-1")}
                                                            name="phone" placeholder="Enter phone number..." />
                                                  </div>
                                                  <div className={cx("form-group")}>
                                                       <label htmlFor="" className={cx("h5 text-black mb-1")}>Note<span className='text-danger'>(*)</span>:</label>
                                                       <textarea className={cx("form-control rounded-0 mt-1")} onChange={handleChangeProfile} name="note" rows="3" placeholder='note'></textarea>
                                                  </div>
                                             </div>
                                        </div>
                                   </form>
                              </div>
                              <div className={cx('col-6', 'p-0')}>
                                   <div className={cx("card border-0")}>
                                        <div className={cx("card-header bg-transparent")}>
                                             <p className={cx("card-text text-black mb-2 pl-0 text-uppercase h3 text-center")}>
                                                  <b>your order</b>
                                             </p>
                                        </div>

                                        <table className="table table-hover">
                                             <tbody>
                                                  <tr>
                                                       <th>Image</th>
                                                       <th>Name</th>
                                                       <th>Quantity</th>
                                                       <th>Total</th>
                                                  </tr>
                                                  {
                                                       products.length > 0 ? products.map((e, i) => {
                                                            return (
                                                                 <tr key={i}>
                                                                      <td className='w-25'>
                                                                           <img className='card-img' alt={e.product.name} src={e.product.image} />
                                                                      </td>
                                                                      <td>{e.product.name}</td>
                                                                      <td>{e.quantity}</td>
                                                                      <td>{formatPrice(e.total)}</td>
                                                                 </tr>
                                                            )
                                                       }) :
                                                            <>
                                                                 Nothing to display
                                                            </>
                                                  }
                                                  <tr>
                                                       <td>Choose Voucher</td>
                                                       <td colSpan={3}>
                                                            {
                                                                 vouchers.length > 0 ?

                                                                      <select className='custom-select custom-select-sm' name='vouchersId' onChange={handleChangeVoucher}>
                                                                           <option value={0}>Choose Voucher</option>
                                                                           {
                                                                                vouchers.map((e, i) => {
                                                                                     return (
                                                                                          <option value={e.id} key={i}>{e.name} ({e.discount}% discount)</option>
                                                                                     )
                                                                                })
                                                                           }
                                                                      </select>
                                                                      :
                                                                      <p>0 Voucher To Show</p>
                                                            }
                                                       </td>
                                                  </tr>
                                                  <tr>
                                                       <td colSpan={3} className='text-uppercase font-weight-bold h5 text-right'>SubTotal: </td>
                                                       <td>${total === currentTotal ? formatPrice(total) : formatPrice(currentTotal)}</td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <div className={cx('row', 'px-5', 'my-3', 'justify-content-center')}>
                    <div className={cx('col-8')}>
                         <button className={cx('btn btn-block', 'btn-lg', 'btn-order', 'rounded-0')} onClick={() => handlePostCheckout()}>
                              <b>
                                   <AiOutlineCreditCard />&nbsp;Order instantly
                              </b>
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default OrderFix