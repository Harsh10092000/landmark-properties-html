import Link from 'next/link';
import React from 'react'
import { moreProLinks } from "@/components/moreProLinks/MoreProLinks";
const MoreProperties = () => {
    
    
  return (

    <div class="services__widget">
                            <div class="services__widget--step">
                                <ul class="services__widget--categories">
                                    {moreProLinks.map((item, index) => (
                                        <li class="services__categories--items">
                                        <Link class="services__categories--link d-flex align-items-center justify-content-between" href={item.link}>
                                            <span class="services__categories--text">{item.name}</span>
                                            <span class="services__categories--arrow__icon"><svg width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.6963 4.93435C22.696 4.93408 22.6958 4.93377 22.6955 4.9335L18.146 0.261622C17.8052 -0.0883642 17.2539 -0.0870618 16.9146 0.264676C16.5754 0.61637 16.5767 1.18522 16.9176 1.53525L19.9721 4.67187H1.5328C1.05192 4.67187 0.662109 5.0741 0.662109 5.57031C0.662109 6.06652 1.05192 6.46875 1.5328 6.46875H19.9721L16.9176 9.60537C16.5768 9.9554 16.5755 10.5242 16.9147 10.8759C17.254 11.2277 17.8053 11.2289 18.1461 10.879L22.6956 6.20712C22.6958 6.20685 22.696 6.20654 22.6964 6.20627C23.0374 5.85507 23.0363 5.28438 22.6963 4.93435Z" fill="currentColor"/>
                                                </svg>
                                            </span>
                                        </Link>
                                    </li>
                                    ))}
                                    
                                  
                                </ul>
                            </div>
                           
                        </div>
  )
}

export default MoreProperties
