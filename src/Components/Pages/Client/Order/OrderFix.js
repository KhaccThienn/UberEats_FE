import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import dateFormat from 'dateformat'
import * as Yup from 'yup';
import { useFormik } from "formik";
import io from "socket.io-client";
import { selectUserData } from '../../../../redux/reducers/users'
import * as CartService from '../../../../services/CartService'
import * as OrderService from '../../../../services/OrderService'
import * as UserService from '../../../../services/UserService'
import * as VoucherService from '../../../../services/VoucherService'
import styles from './order.module.css'

let cx = classNames.bind(styles);
const socket = io(process.env.REACT_APP_URL_API);

function OrderFix() {
     const formatPrice = (price) => {
          return price?.toLocaleString('en-US', {
               style: 'currency',
               currency: 'USD',
               minimumFractionDigits: 2,
          });
     };

     const currentDate = () => {
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();

          const hour = date.getHours() + 7;
          const minute = date.getMinutes();
          const second = date.getSeconds();

          return `${year}-${month}-${day} ${hour}:${minute}:${second}`
     }

     const initProfileState = {
          userName: "",
          address: "",
          phone: "",
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

     const handlePostCheckout = async (e) => {
          const createOrder = {
               delivered_user: postData.userName ? postData.userName : userProfile.userName,
               delivered_address: postData.address ? postData.address : userProfile.address,
               delivered_phone: postData.phone ? postData.phone : userProfile.phone,
               created_at: currentDate(),
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
                    socket.emit("createOrder", {
                         createOrder, date: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss", false, true)
                    });
                    Swal.fire({
                         title: "Checkout Successful",
                         position: 'top-right',
                         timer: 1500,
                         icon: "success",
                         timerProgressBar: true,
                         showConfirmButton: false
                    });
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

     const validationSchema = Yup.object().shape({
          userName: Yup.string().required("Please enter your user name"),
          address: Yup.string().required("Please enter your address"),
          phone: Yup.string().required('Please enter your phone number').matches((/(84|0[3|5|7|8|9])+([0-9]{8})\b/g), 'Invalid phone number')
     })
     const formik = useFormik({
          initialValues: initPostCheckout,
          validationSchema,
          onSubmit: async (e) => {
               await handlePostCheckout(e)
          },
     })


     const handleChangeProfile = (e) => {
          const { name, value } = e.target;
          formik.values[name] = value
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
                    formik.setValues(data)
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
                                   <form method='POST' onSubmit={(e) => formik.handleSubmit(e)}>
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
                                                            onChange={(e) => { handleChangeProfile(e); formik.handleChange(e) }}
                                                            className={cx("form-control rounded-0 mt-1")}
                                                            name="userName" placeholder="Enter name..." />
                                                       {formik.errors.userName && <small id="helpId" className="text-danger">{formik.errors.userName}</small>}
                                                  </div>
                                                  <div className={cx("form-group")}>
                                                       <label htmlFor="" className={cx("h5 text-black mb-1")}>Address<span className='text-danger'>(*)</span>: </label>
                                                       <input type="text"
                                                            onChange={(e) => { handleChangeProfile(e); formik.handleChange(e) }}
                                                            defaultValue={userProfile.address}
                                                            className={cx("form-control rounded-0 mt-1")}
                                                            name="address" placeholder="Enter address..." />
                                                       {formik.errors.address && <small id="helpId" className="text-danger">{formik.errors.address}</small>}
                                                  </div>
                                                  <div className={cx("form-group")}>
                                                       <label htmlFor="" className={cx("h5 text-black mb-1")}>Phone number<span className='text-danger'>(*)</span>: </label>
                                                       <input type="text"
                                                            onChange={(e) => { handleChangeProfile(e); formik.handleChange(e) }}
                                                            defaultValue={userProfile.phone}
                                                            className={cx("form-control rounded-0 mt-1")}
                                                            name="phone" placeholder="Enter phone number..." />
                                                       {formik.errors.phone && <small id="helpId" className="text-danger">{formik.errors.phone}</small>}
                                                  </div>
                                                  <div className={cx("form-group")}>
                                                       <label htmlFor="" className={cx("h5 text-black mb-1")}>Note:</label>
                                                       <textarea className={cx("form-control rounded-0 mt-1")} onChange={handleChangeProfile} name="note" rows="3" placeholder='note'></textarea>
                                                  </div>
                                             </div>
                                        </div>
                                        <button className={cx('btn btn-block', 'btn-lg', 'btn-order', 'rounded-0')} type='submit'>
                                             <AiOutlineCreditCard />&nbsp;Order instantly
                                        </button>
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
                                                       <td>{total === currentTotal ? formatPrice(total) : formatPrice(currentTotal)}</td>
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

                    </div>
               </div>
          </div>
     )
}

export default OrderFix