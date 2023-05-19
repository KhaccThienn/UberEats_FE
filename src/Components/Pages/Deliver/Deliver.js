/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react'
import styles from './deliver.module.css'
import classNames from 'classnames/bind'

let cx = classNames.bind(styles)

function Deliver() {
    const [status, setStatus] = useState(1)
    const [statusBtn, setStatusBtn] = useState(2)
    return (
        <div className={cx('container-fluid', 'px-5', 'py-5')}>
            <div className={cx('row', 'justify-content-around')}>
                <div className={cx('col-6')}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.7782450228!2d2.264634263777884!3d48.85893843503861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2zUGEgcmksIFBow6Fw!5e0!3m2!1svi!2s!4v1684468304857!5m2!1svi!2s"
                        width="100%" height="450" className={cx('border-0')}
                        allowFullScreen="yes" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className={cx('col-6')}>
                    {status === 0 &&
                        <div className={cx('text-center', 'py-3')}>
                            <p className={cx('h1', 'font-weight-bold')}>No order yet...</p>
                        </div>
                    }
                    {status === 1 &&
                        <div className={cx('text-left')}>
                            <p className={cx('h1', 'font-weight-bold','text-center')}>New cooked order</p>
                            <div className={cx('row', 'font-weight-bold', 'align-items-center')}>
                                <div className={cx('text-black', 'col-auto')}>#</div>
                                <div className={cx('text-black', 'col-3')}>From</div>
                                <div className={cx('text-black', 'col-3')}>To</div>
                                <div className={cx('text-black', 'col-2')}>Total</div>
                                <div className={cx('text-black', 'col')}></div>
                            </div>
                            {/* map items order cooked */}
                            <div className={cx('row', 'align-items-center','my-2')}>
                                <div className={cx('col-auto')}>1</div>
                                <div className={cx('col-3')}>London, England</div>
                                <div className={cx('col-3')}>Paris, France</div>
                                <div className={cx('col-2')}>$00.00</div>
                                <div className={cx('col')}>
                                    <button className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')} onClick={() => setStatus(2)}>
                                        Accept challenge &rarr;
                                    </button>
                                </div>
                            </div>
                            {/*  */}
                            {/* map items order cooked */}
                            <div className={cx('row', 'align-items-center','my-2')}>
                                <div className={cx('col-auto')}>2</div>
                                <div className={cx('col-3')}>London, England</div>
                                <div className={cx('col-3')}>Paris, France</div>
                                <div className={cx('col-2')}>$00.00</div>
                                <div className={cx('col')}>
                                    <button className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')} onClick={() => setStatus(2)}>
                                        Accept challenge &rarr;
                                    </button>
                                </div>
                            </div>
                            {/*  */}
                            {/* map items order cooked */}
                            <div className={cx('row', 'align-items-center','my-2')}>
                                <div className={cx('col-auto')}>3</div>
                                <div className={cx('col-3')}>London, England</div>
                                <div className={cx('col-3')}>Paris, France</div>
                                <div className={cx('col-2')}>$00.00</div>
                                <div className={cx('col')}>
                                    <button className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')} onClick={() => setStatus(2)}>
                                        Accept challenge &rarr;
                                    </button>
                                </div>
                            </div>
                            {/*  */}
                            {/* map items order cooked */}
                            <div className={cx('row', 'align-items-center','my-2')}>
                                <div className={cx('col-auto')}>4</div>
                                <div className={cx('col-3')}>London, England</div>
                                <div className={cx('col-3')}>Paris, France</div>
                                <div className={cx('col-2')}>$00.00</div>
                                <div className={cx('col')}>
                                    <button className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')} onClick={() => setStatus(2)}>
                                        Accept challenge &rarr;
                                    </button>
                                </div>
                            </div>
                            {/*  */}
                            {/* map items order cooked */}
                            <div className={cx('row', 'align-items-center','my-2')}>
                                <div className={cx('col-auto')}>5</div>
                                <div className={cx('col-3')}>London, England</div>
                                <div className={cx('col-3')}>Paris, France</div>
                                <div className={cx('col-2')}>$00.00</div>
                                <div className={cx('col')}>
                                    <button className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')} onClick={() => setStatus(2)}>
                                        Accept challenge &rarr;
                                    </button>
                                </div>
                            </div>
                            {/*  */}
                            {/* map items order cooked */}
                            <div className={cx('row', 'align-items-center','my-2')}>
                                <div className={cx('col-auto')}>6</div>
                                <div className={cx('col-3')}>London, England</div>
                                <div className={cx('col-3')}>Paris, France</div>
                                <div className={cx('col-2')}>$00.00</div>
                                <div className={cx('col')}>
                                    <button className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')} onClick={() => setStatus(2)}>
                                        Accept challenge &rarr;
                                    </button>
                                </div>
                            </div>
                            {/*  */}
                        </div>
                    }
                    {status === 2 &&
                        <div className={cx('row', 'py-3')}>
                            <div className={cx('col-12', 'text-center', 'bg-order')}>
                                <p className={cx('h2', 'font-weight-bold', 'm-0', 'py-2')}>Order #id</p>
                            </div>
                            <div className={cx('col-12', 'text-center', 'py-4')}>
                                <p className={cx('h2')}>$00.00</p>
                                <hr />
                            </div>
                            <div className={cx('col-12', 'text-left')}>
                                <p className={cx('h5')}>Prepare by: Restaurant name</p>
                                <hr />
                                <div className={cx('d-flex', 'justify-content-between')}>
                                    <p className={cx('h5')}>Deliver to: Customer name</p>
                                    <p className={cx('h5')}>Phone: 0368986689</p>
                                </div>
                                <hr />
                                <div className={cx('d-flex', 'justify-content-between')}>
                                    <p className={cx('h5')}>Deliver by: Deliver name</p>
                                    <p className={cx('h5')}>Phone: 0363863863</p>
                                </div>
                                <hr />
                                <div className={cx('d-flex', 'justify-content-between')}>
                                    <p className={cx('h5')}>From: Cau Giay, Ha Noi</p>
                                    <p className={cx('h5')}>To: Thanh Xuan, Ha Noi</p>
                                </div>
                                <hr />

                            </div>
                            <div className={cx('col-12', 'text-center')}>
                                {statusBtn === 2 &&
                                    <button className={cx('btn', 'btn-success', 'rounded-0', 'btn-block', 'btn-lg')} onClick={() => setStatusBtn(3)}>Picked up</button>
                                }
                                {statusBtn === 3 &&
                                    <button className={cx('btn', 'btn-success', 'rounded-0', 'btn-block', 'btn-lg')} onClick={() => setStatusBtn(4)}>Order delivered</button>
                                }
                                {statusBtn === 4 &&
                                    <>
                                        <p className={cx('h3', 'text-success', 'font-weight-bold')}>Thank for using Uber Eats</p>
                                        <hr />
                                    </>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Deliver