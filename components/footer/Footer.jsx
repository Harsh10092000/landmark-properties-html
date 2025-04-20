import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className="footer footer__section color-accent-2">
    <div className="container">
        <div className="contact__information--aera d-flex" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
            <div className="contact__information--email d-flex align-items-center justify-content-center">
                <span className="contact__information--email__icon"><svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_584_496)">
                    <path d="M64.766 51.0154L60.9908 40.0285C62.8106 36.3085 63.7722 32.1713 63.7787 28.0087C63.7899 20.7707 60.9896 13.927 55.8934 8.73839C50.7962 3.54879 44.004 0.627468 36.7676 0.512829C29.264 0.394254 22.211 3.24842 16.9086 8.55076C11.7956 13.6636 8.95975 20.4039 8.86999 27.6067C3.83071 31.4008 0.856317 37.3162 0.866092 43.6346C0.870789 46.5913 1.53628 49.5304 2.79731 52.1882L0.196921 59.7556C-0.250082 61.0565 0.0764421 62.469 1.04916 63.4417C1.73369 64.1264 2.6362 64.4909 3.56436 64.4909C3.95487 64.4909 4.34995 64.4264 4.73525 64.294L12.3028 61.6936C14.9606 62.9546 17.8997 63.6201 20.8564 63.6248C20.8671 63.6248 20.8772 63.6248 20.8879 63.6248C27.3003 63.6245 33.2608 60.5735 37.0411 55.4107C40.975 55.3071 44.8672 54.3548 48.386 52.6334L59.3731 56.4088C59.8308 56.5661 60.3003 56.6427 60.7643 56.6427C61.8673 56.6427 62.9398 56.2096 63.7535 55.3958C64.9092 54.2399 65.2972 52.5614 64.766 51.0154ZM20.8877 59.7558C20.8794 59.7558 20.8706 59.7558 20.8624 59.7558C18.2454 59.7518 15.6465 59.1067 13.3473 57.8902C12.8745 57.6402 12.3194 57.5969 11.8139 57.7706L4.05414 60.437L6.72055 52.6773C6.89422 52.1717 6.85105 51.6167 6.60096 51.144C5.38449 48.8446 4.73931 46.2459 4.73525 43.6287C4.72878 39.4191 6.36635 35.4291 9.23003 32.4414C10.1654 38.1436 12.8831 43.3982 17.0957 47.5359C21.2771 51.6429 26.5333 54.2579 32.2045 55.1128C29.21 58.0644 25.1733 59.7558 20.8877 59.7558ZM61.0174 52.66C60.9073 52.77 60.7768 52.8 60.63 52.7495L48.868 48.7078C48.6638 48.6376 48.4513 48.6028 48.2395 48.6028C47.9273 48.6028 47.6163 48.6783 47.3348 48.8274C43.9765 50.6039 40.1816 51.5462 36.3601 51.552C36.3475 51.552 36.3361 51.552 36.3235 51.552C23.5186 51.552 12.9418 41.1502 12.7389 28.3484C12.6367 21.901 15.0892 15.8417 19.6444 11.2865C24.1996 6.73126 30.26 4.27966 36.7064 4.38123C49.5206 4.58448 59.9295 15.1809 59.9097 28.0026C59.9037 31.8241 58.9616 35.6191 57.1851 38.9772C56.935 39.4498 56.8919 40.0049 57.0656 40.5105L61.1071 52.2725C61.1575 52.4198 61.1273 52.5501 61.0174 52.66Z" fill="currentColor"/>
                    <path d="M47.8474 17.7114H24.7978C23.7294 17.7114 22.8633 18.5776 22.8633 19.6459C22.8633 20.7144 23.7295 21.5805 24.7978 21.5805H47.8474C48.9159 21.5805 49.782 20.7143 49.782 19.6459C49.782 18.5776 48.9159 17.7114 47.8474 17.7114Z" fill="currentColor"/>
                    <path d="M47.8474 25.668H24.7978C23.7294 25.668 22.8633 26.5342 22.8633 27.6025C22.8633 28.6708 23.7295 29.537 24.7978 29.537H47.8474C48.9159 29.537 49.782 28.6708 49.782 27.6025C49.782 26.5342 48.9159 25.668 47.8474 25.668Z" fill="currentColor"/>
                    <path d="M38.9751 33.624H24.7978C23.7294 33.624 22.8633 34.4902 22.8633 35.5585C22.8633 36.627 23.7295 37.4931 24.7978 37.4931H38.9749C40.0434 37.4931 40.9095 36.6269 40.9095 35.5585C40.9095 34.4902 40.0435 33.624 38.9751 33.624Z" fill="currentColor"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_584_496">
                    <rect width="65" height="65" fill="currentColor"/>
                    </clipPath>
                    </defs>
                    </svg>
                </span>
                <p className="contact__information--email__text">Contact us at <a href="mailto:propertieslandmark07@gmail.com">propertieslandmark07@gmail.com</a> </p>
                
            </div>
            <div className="contact__information--phone d-flex align-items-center justify-content-center">
                <span className="contact__information--phone__icon"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M58.2813 31.5459C57.3995 29.5732 55.6541 27.7005 53.6359 26.4005C53.5086 16.8914 50.6359 9.50047 45.4904 5.5641C40.4177 1.68228 34.145 1.25501 28.6541 1.33683C22.1177 1.44592 16.9541 3.52774 13.3086 7.51865C9.27225 11.9368 7.2177 18.9641 8.02679 25.4641C5.32679 26.6732 2.83588 29.0459 1.7177 31.5368C0.535885 34.1641 0.38134 37.3277 1.28134 40.2187C2.19952 43.1823 5.64498 46.5732 9.12679 47.9368C10.2268 48.3732 11.2904 48.5823 12.2904 48.5823C13.3904 48.5823 14.4086 48.3186 15.3177 47.8005C15.5722 47.655 15.8086 47.4823 16.0086 47.2823C17.3177 46.0005 17.4268 34.6096 16.8722 29.9732C16.4813 26.6732 15.8359 25.8823 15.2541 25.5368C15.2086 25.5096 15.1632 25.4914 15.1177 25.4641C15.1177 25.4459 15.1268 25.4277 15.1177 25.4096C14.5541 21.1459 15.8813 16.5368 18.4995 13.6641C20.8177 11.1277 24.1359 9.80047 28.3813 9.73683C32.0359 9.67319 36.2177 9.95501 39.4722 12.4459C43.4813 15.5186 44.5541 21.0823 44.7359 25.2186C44.745 25.3186 44.7722 25.4186 44.8086 25.5005C44.7813 25.5186 44.7541 25.5277 44.7359 25.5368C44.1632 25.8823 43.5177 26.6732 43.1177 29.9732C42.5632 34.6096 42.6722 46.0005 43.9813 47.2823C44.1813 47.4823 44.4086 47.6459 44.6632 47.7914C42.8086 51.8732 39.2541 53.2096 34.8268 51.455C34.3359 51.255 33.8541 50.9368 33.345 50.5914C32.5904 50.0823 31.8086 49.5641 30.845 49.3459C28.9541 48.9368 26.7086 49.7459 25.4995 51.2732C24.5541 52.4732 24.3904 53.955 25.0632 55.3368C26.4904 58.2823 30.9177 58.655 34.1904 58.655C34.8086 58.655 35.3904 58.6459 35.8995 58.6277L36.2813 58.6187C43.9086 58.455 50.0995 54.1732 52.845 47.1459C52.8722 47.0641 52.8813 46.9823 52.8904 46.9096C55.5995 45.2459 57.9722 42.5914 58.7177 40.2096C59.6177 37.3368 59.4541 34.1732 58.2813 31.5459ZM14.7177 46.0823C14.6359 46.155 14.5359 46.2277 14.4359 46.2823C12.845 47.1914 11.0177 46.7914 9.76316 46.3005C6.52679 45.0277 3.63588 41.855 2.96316 39.7005C2.19043 37.2186 2.32679 34.5005 3.32679 32.2641C4.24498 30.2186 6.73588 27.655 9.7177 26.7096C10.2995 26.5277 11.0086 26.3732 11.7813 26.3732C12.6086 26.3732 13.4904 26.5459 14.3359 27.0459C15.7813 28.3641 15.6813 44.0368 14.7177 46.0823ZM40.545 11.055C36.8632 8.22774 32.3086 7.91865 28.3541 7.98228C23.6086 8.05501 19.8541 9.57319 17.1995 12.4914C14.4268 15.5368 12.9268 20.2732 13.2813 24.7823C12.1722 24.5368 10.9722 24.5732 9.73588 24.8823C9.10861 18.9823 10.9904 12.6914 14.6177 8.71865C17.9268 5.09137 22.6541 3.20956 28.6904 3.10956C33.8722 3.02774 39.7813 3.41865 44.4177 6.97319C50.2995 11.4823 51.645 19.9005 51.845 25.4368C51.4995 25.2914 51.1541 25.1459 50.8086 25.0368C49.2813 24.555 47.8177 24.5005 46.4813 24.8459C46.2359 20.3641 44.9904 14.4641 40.545 11.055ZM36.2541 56.8823L35.8632 56.8914C33.2632 56.9459 27.8541 57.0732 26.645 54.5914C26.2632 53.8096 26.345 53.0732 26.8813 52.3914C27.6632 51.4005 29.2359 50.8277 30.4632 51.0914C31.0995 51.2277 31.7086 51.6368 32.3541 52.0732C32.9177 52.455 33.4995 52.8459 34.1722 53.1096C39.4813 55.2186 44.0813 53.4186 46.3086 48.4368C46.7541 48.5368 47.2177 48.6005 47.6995 48.6005C48.5904 48.6005 49.5268 48.4186 50.4995 48.0823C47.7722 53.4823 42.5632 56.7459 36.2541 56.8823ZM57.0359 39.7005C56.3632 41.8641 53.4722 45.0368 50.2359 46.3005C48.9813 46.7914 47.1541 47.1914 45.5631 46.2823C45.4632 46.2277 45.3632 46.155 45.2813 46.0823C44.3177 44.0368 44.2268 28.3641 45.645 27.0641C47.3086 26.0823 49.0904 26.3277 50.2904 26.7096C53.2722 27.655 55.7631 30.2186 56.6813 32.2641C57.6722 34.5096 57.8086 37.2186 57.0359 39.7005Z" fill="#16A34A"/>
                    <path d="M8.81675 29.5911C8.17129 29.7729 7.33493 30.2275 6.61675 30.9729C5.90766 31.7184 5.48948 32.582 5.34402 33.2366C5.18948 33.8911 5.27129 34.3184 5.43493 34.3547C5.78948 34.4275 6.33493 33.0729 7.53493 31.8457C8.69857 30.5911 10.0349 29.982 9.94402 29.6275C9.88947 29.4638 9.4622 29.4093 8.81675 29.5911Z" fill="#16A34A"/>
                    <path d="M54.5285 36.6278C54.3467 36.6732 54.4013 37.2732 54.2558 38.1368C54.1285 39.0005 53.7558 40.1732 52.9104 41.1368C52.0649 42.0914 50.9467 42.6096 50.1013 42.8459C49.2558 43.0914 48.6649 43.1187 48.6376 43.3005C48.6104 43.455 49.1922 43.7641 50.2376 43.7277C51.2649 43.7005 52.7467 43.2187 53.8467 41.9732C54.9376 40.7277 55.2376 39.1914 55.1376 38.1732C55.0649 37.1187 54.6831 36.5732 54.5285 36.6278Z" fill="#16A34A"/>
                    </svg>                            
                </span>
                <div className="contact__information--phone__text">
                    <h3 className="contact__information--phone__title">PERFECT SOLUTION From <span>Land Owner</span></h3>
                    <a className="contact__information--phone__number" href="tel:+9996716787">+91 99967 16787, +91 90500 48884</a>
                </div>
            </div>
        </div>
        <div className="main__footer footer__wrapper color-offwhite">
            <div className="row ">
                <div className="col-xl-4 col-md-4">
                    <div className="footer__widget">
                        <h2 className="footer__widget--title about">About Us <button className="footer__widget--button" aria-label="footer widget button"></button>
                            <svg className="footer__widget--title__arrowdown--icon" xmlns="http://www.w3.org/2000/svg" width="12.355" height="8.394" viewBox="0 0 10.355 6.394">
                                <path d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z" transform="translate(-6 -8.59)" fill="currentColor"></path>
                            </svg>
                        </h2>
                        <div className="footer__widget--inner">
                            <div className="footer__logo">
                                <Link By className="footer__logo--link display-block" href="/">
                                <picture><img className="footer__logo--img" src="/assets/img/logo/nav-log2-white.png" alt="logo-img" /></picture>
                                </Link>
                            </div>
                            <p className="footer__widget--desc">Our trusted partner in navigating the property market with ease and confidence.</p>
                            <ul className="footer__widget--info">
                                <li className="footer__widget--info_list">
                                    <svg className="footer__widget--info__icon" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3639 0C6.97093 0 3.39844 3.86831 3.39844 8.625C3.39844 14.6036 10.5886 22.4581 10.8939 22.7901C11.024 22.9296 11.1939 23 11.3639 23C11.5338 23 11.7037 22.9296 11.8338 22.7901C12.1392 22.4581 19.3293 14.6036 19.3293 8.625C19.3293 3.86831 15.7568 0 11.3639 0ZM11.3639 21.2419C9.77874 19.4048 4.72601 13.1919 4.72601 8.625C4.72601 4.66181 7.70375 1.4375 11.3639 1.4375C15.024 1.4375 18.0017 4.66181 18.0017 8.625C18.0017 13.1876 12.949 19.4048 11.3639 21.2419Z" fill="#16A34A"/>
                                        <path d="M11.3636 4.3125C9.16777 4.3125 7.38086 6.24737 7.38086 8.625C7.38086 11.0026 9.16777 12.9375 11.3636 12.9375C13.5594 12.9375 15.3463 11.0026 15.3463 8.625C15.3463 6.24737 13.5594 4.3125 11.3636 4.3125ZM11.3636 11.5C9.89926 11.5 8.70843 10.2106 8.70843 8.625C8.70843 7.03944 9.89926 5.75 11.3636 5.75C12.8279 5.75 14.0187 7.03944 14.0187 8.625C14.0187 10.2106 12.8279 11.5 11.3636 11.5Z" fill="#16A34A"/>
                                    </svg>   
                                    <p className="footer__widget--info__text">SCO no 32 Sector 10 Kurukshetra</p>
                                </li>
                                <li className="footer__widget--info_list">                                     
                                    <svg className="footer__widget--info__icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.51763 19.6352C2.20325 19.6334 1.90222 19.4974 1.67992 19.2567C1.45762 19.016 1.33199 18.69 1.33032 18.3496V7.77586C1.332 7.07078 1.59142 6.39509 2.05186 5.89652C2.5123 5.39795 3.13632 5.11705 3.78748 5.11523H15.3749C16.0271 5.11523 16.6528 5.39533 17.1146 5.89409C17.5764 6.39286 17.8367 7.06959 17.8384 7.77586V14.8227C17.8384 15.529 17.5797 16.2065 17.1191 16.7065C16.6584 17.2066 16.0335 17.4884 15.3812 17.4902H5.71765C5.6079 17.4912 5.50123 17.5297 5.41289 17.6002L3.2351 19.3809C3.02744 19.547 2.77583 19.6362 2.51763 19.6352ZM3.78748 6.49023C3.4731 6.49204 3.17207 6.62807 2.94977 6.86878C2.72747 7.10949 2.60184 7.43545 2.60017 7.77586V18.1777L4.65098 16.5002C4.95955 16.2521 5.33329 16.1172 5.71765 16.1152H15.3749C15.6914 16.1152 15.995 15.9791 16.2189 15.7367C16.4428 15.4943 16.5685 15.1655 16.5685 14.8227V7.77586C16.5669 7.43545 16.4412 7.10949 16.2189 6.86878C15.9966 6.62807 15.6956 6.49204 15.3812 6.49023H3.78748Z" fill="currentColor"/>
                                        <path d="M12.0855 12.0522C12.436 12.0522 12.7202 11.7444 12.7202 11.3647C12.7202 10.9851 12.436 10.6772 12.0855 10.6772C11.7351 10.6772 11.4509 10.9851 11.4509 11.3647C11.4509 11.7444 11.7351 12.0522 12.0855 12.0522Z" fill="currentColor"/>
                                        <path d="M9.62168 12.0522C9.97216 12.0522 10.2563 11.7444 10.2563 11.3647C10.2563 10.9851 9.97216 10.6772 9.62168 10.6772C9.27119 10.6772 8.98706 10.9851 8.98706 11.3647C8.98706 11.7444 9.27119 12.0522 9.62168 12.0522Z" fill="currentColor"/>
                                        <path d="M7.08237 12.0522C7.43286 12.0522 7.71698 11.7444 7.71698 11.3647C7.71698 10.9851 7.43286 10.6772 7.08237 10.6772C6.73188 10.6772 6.44775 10.9851 6.44775 11.3647C6.44775 11.7444 6.73188 12.0522 7.08237 12.0522Z" fill="currentColor"/>
                                        <path d="M19.7433 12.6777C19.5749 12.6777 19.4134 12.6053 19.2944 12.4764C19.1753 12.3474 19.1084 12.1726 19.1084 11.9902V5.02586C19.1067 4.68545 18.9811 4.35949 18.7588 4.11878C18.5365 3.87807 18.2355 3.74204 17.9211 3.74023H5.14005C4.97166 3.74023 4.81016 3.6678 4.69109 3.53887C4.57202 3.40994 4.50513 3.23507 4.50513 3.05273C4.50513 2.8704 4.57202 2.69553 4.69109 2.5666C4.81016 2.43767 4.97166 2.36523 5.14005 2.36523H17.9211C18.5723 2.36705 19.1963 2.64795 19.6567 3.14652C20.1172 3.64509 20.3766 4.32078 20.3782 5.02586V11.9902C20.3782 12.1726 20.3114 12.3474 20.1923 12.4764C20.0732 12.6053 19.9117 12.6777 19.7433 12.6777Z" fill="currentColor"/>
                                    </svg>
                                    <a className="footer__widget--info__text" href="mailto:propertieslandmark07@gmail.com">propertieslandmark07@gmail.com</a>
                                </li>
                                <li className="footer__widget--info_list">
                                    <svg className="footer__widget--info__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.31 1.52371L18.6133 2.11296C18.6133 2.11296 19.2026 7.41627 13.31 13.3088C7.41748 19.2014 2.11303 18.6133 2.11303 18.6133L1.52377 13.31L5.64971 10.9529L7.71153 13.0148C7.71153 13.0148 9.18467 12.7201 10.9524 10.9524C12.7202 9.18461 13.0148 7.71147 13.0148 7.71147L10.953 5.64965L13.31 1.52371Z" stroke="currentColor" strokeWidth="2"></path>
                                    </svg>
                                    <a className="footer__widget--info__text" href="tel:+1234567898">: +91 99967 16787, +91 90500 48884</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-xl col-md">
                    <div className="footer__widget">
                        <h2 className="footer__widget--title ">Services <button className="footer__widget--button" aria-label="footer widget button"></button>
                            <svg className="footer__widget--title__arrowdown--icon" xmlns="http://www.w3.org/2000/svg" width="12.355" height="8.394" viewBox="0 0 10.355 6.394">
                                <path d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z" transform="translate(-6 -8.59)" fill="currentColor"></path>
                            </svg>
                        </h2>
                        <ul className="footer__widget--menu footer__widget--inner">
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="/properties/properties-for-sale">Property for Sale</Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="/properties/properties-for-rent">Property for Rent</Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="#">Offices for Buy</Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="#">Terms of use</Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="#">Offices for Rent</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-xl col-md">
                    <div className="footer__widget">
                        <h2 className="footer__widget--title ">Contact <button className="footer__widget--button" aria-label="footer widget button"></button>
                            <svg className="footer__widget--title__arrowdown--icon" xmlns="http://www.w3.org/2000/svg" width="12.355" height="8.394" viewBox="0 0 10.355 6.394">
                                <path d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z" transform="translate(-6 -8.59)" fill="currentColor"></path>
                            </svg>
                        </h2>
                        <ul className="footer__widget--menu footer__widget--inner">
                            
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="#">Help/FAQ</Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="#">Propert owners</Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="#">Contact Support</Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="#">Pricing Plans</Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="#">Partners</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-xl col-md">
                    <div className="footer__widget">
                        <h2 className="footer__widget--title ">Quick Links <button className="footer__widget--button" aria-label="footer widget button"></button>
                            <svg className="footer__widget--title__arrowdown--icon" xmlns="http://www.w3.org/2000/svg" width="12.355" height="8.394" viewBox="0 0 10.355 6.394">
                                <path d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z" transform="translate(-6 -8.59)" fill="currentColor"></path>
                            </svg>
                        </h2>
                        <ul className="footer__widget--menu footer__widget--inner">
                            
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="/aboutus">About Us</Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="contactus">Contact</Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="#">Services Details </Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="#">Add Listing</Link></li>
                            <li className="footer__widget--menu__list"><Link className="footer__widget--menu__text" href="allproperties">Property</Link></li>
                        </ul>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
    <div className="footer__bottom color-offwhite">
        <div className="container">
            <div className="footer__bottom--inner d-flex justify-content-between align-items-center">
                <p className="copyright__content mb-0"><span className="text__secondary">© 2025</span> Powered By <a className="copyright__content--link" target="_blank" href="#">CAL info</a> .  All Rights Reserved.</p>
                <div className="footer__payment">
                    <picture><img src="/assets/img/icon/payment-img.png" alt="payment-img" /></picture>
                </div>
                <ul className="footer__bottom--menu d-flex">
                    <li><Link href="#">Terms of Use</Link></li>
                    <li><Link href="#">Privacy Policy</Link></li>
                </ul>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer
