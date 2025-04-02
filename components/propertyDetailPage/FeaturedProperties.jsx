import React from 'react'

const FeaturedProperties = () => {
  return (
    <div className="widget__step mb-30">
                                <h2 className="widget__step--title">Featured Properties</h2>
                                <div className="widget__featured--properties">
                                    <div className="widget__featured--properties__thumbnail position-relative">
                                        <img src="assets/img/property/property-sidebar.png" alt="img" />
                                        <div className="featured__badge">
                                            <span className="badge__field">Featured</span>
                                        </div>
                                    </div>
                                    <div className="widget__featured--properties__content">
                                        <div className="widget__featured--properties__content--top d-flex align-items-center justify-content-between">
                                            <div className="widget__featured--properties__author">
                                                <img src="assets/img/property/properties-author2.png" alt="img" />
                                            </div>
                                            <ul className="widget__featured--properties__share d-flex">
                                                <li className="widget__featured--properties__share--list position-relative">
                                                  <a className="widget__featured--properties__share--btn" href="#" aria-label="share button"  aria-expanded="false" data-bs-toggle="dropdown"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M12.5111 11.2118C11.5684 11.2118 10.7529 11.6195 10.1923 12.282L5.86064 10.0396C6.06451 9.63191 6.16636 9.17334 6.16636 8.68916C6.16636 8.20498 6.03892 7.74642 5.86064 7.33868L10.1923 5.09633C10.7529 5.75879 11.5938 6.16652 12.5111 6.16652C14.1929 6.16652 15.5944 4.79065 15.5944 3.08326C15.5944 1.40149 14.2185 0 12.5111 0C10.8038 0.000355502 9.42786 1.45268 9.42786 3.13445C9.42786 3.54218 9.50429 3.89892 9.63173 4.25565L5.2236 6.52344C4.66302 5.96286 3.89856 5.63152 3.05765 5.63152C1.40149 5.63152 0 7.03301 0 8.71478C0 10.3966 1.37587 11.798 3.08326 11.798C3.92413 11.798 4.6886 11.4667 5.24922 10.9061L9.65734 13.1739C9.5299 13.5306 9.45347 13.8874 9.45347 14.2951C9.45347 15.9769 10.8293 17.3784 12.5367 17.3784C14.2439 17.3784 15.62 16.0025 15.62 14.2951C15.6196 12.5879 14.1928 11.2118 12.5112 11.2118L12.5111 11.2118ZM12.5111 1.09595C13.6323 1.09595 14.575 2.01325 14.575 3.15984C14.575 4.28104 13.6577 5.22374 12.5111 5.22374C11.3644 5.22391 10.447 4.28099 10.447 3.13441C10.447 2.01321 11.3644 1.0959 12.5111 1.0959V1.09595ZM3.08324 10.7786C1.96204 10.7786 1.01934 9.86132 1.01934 8.71474C1.01934 7.59354 1.93665 6.65084 3.08324 6.65084C4.20444 6.65084 5.14714 7.56815 5.14714 8.71474C5.14731 9.83593 4.20439 10.7786 3.08324 10.7786ZM12.5111 16.3334C11.3899 16.3334 10.4472 15.4161 10.4472 14.2695C10.4472 13.123 11.3645 12.2056 12.5111 12.2056C13.6577 12.2056 14.575 13.123 14.575 14.2695C14.575 15.4161 13.6321 16.3334 12.5111 16.3334Z" fill="currentColor"></path>
                                                  </svg>
                                                  <span className="visually-hidden">Share</span>
                                                  </a>
                                                  <ul className="dropdown-menu share__dropdown--menu" style={{margin: "0px;"}}>
                                                      <li className="social__share--list"><a className="social__share--link" data-bs-toggle="modal" href="https://www.facebook.com/"><span>Facebook</span> <svg width="8" height="15" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <path d="M6.52148 5.07812L6.29297 7.3125H4.49023V13.8125H1.82422V7.3125H0.478516V5.07812H1.79883V3.73242C1.79883 3.27539 1.84115 2.86914 1.92578 2.51367C2.02734 2.14128 2.19661 1.83659 2.43359 1.59961C2.67057 1.3457 2.9668 1.15104 3.32227 1.01562C3.69466 0.880208 4.15169 0.8125 4.69336 0.8125H6.49609V3.04688H5.37891C5.15885 3.04688 4.98958 3.07227 4.87109 3.12305C4.7526 3.1569 4.65951 3.21615 4.5918 3.30078C4.54102 3.36849 4.50716 3.46159 4.49023 3.58008C4.47331 3.68164 4.46484 3.80859 4.46484 3.96094V5.07812H6.49609H6.52148Z" fill="currentColor" fill-opacity="1"></path>
                                                          </svg>
                                                          </a>
                                                      </li>
                                                      <li className="social__share--list"><a className="social__share--link" data-bs-toggle="modal" href="#modalToggle3"><span>Twitter</span> <svg width="15" height="12" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <path d="M12.375 2.67188C12.375 2.70573 12.375 2.73958 12.375 2.77344C12.3919 2.79036 12.3919 2.81576 12.375 2.84961C12.375 2.88346 12.375 2.91732 12.375 2.95117C12.3919 2.9681 12.3919 2.99349 12.375 3.02734C12.3919 3.89062 12.2311 4.7793 11.8926 5.69336C11.554 6.60742 11.0632 7.42839 10.4199 8.15625C9.79362 8.86719 9.00651 9.45964 8.05859 9.93359C7.11068 10.3906 6.02734 10.6107 4.80859 10.5938C4.41927 10.6107 4.04688 10.5938 3.69141 10.543C3.33594 10.4753 2.98047 10.3991 2.625 10.3145C2.26953 10.2129 1.93099 10.0859 1.60938 9.93359C1.30469 9.76432 1 9.59505 0.695312 9.42578C0.763021 9.40885 0.813802 9.40885 0.847656 9.42578C0.898438 9.44271 0.957682 9.45117 1.02539 9.45117C1.0931 9.43424 1.14388 9.43424 1.17773 9.45117C1.22852 9.45117 1.28776 9.44271 1.35547 9.42578C1.66016 9.44271 1.96484 9.42578 2.26953 9.375C2.57422 9.30729 2.86198 9.23112 3.13281 9.14648C3.40365 9.06185 3.66602 8.94336 3.91992 8.79102C4.19076 8.63867 4.4362 8.47786 4.65625 8.30859C4.36849 8.29167 4.08919 8.24089 3.81836 8.15625C3.54753 8.07161 3.30208 7.94466 3.08203 7.77539C2.87891 7.58919 2.69271 7.39453 2.52344 7.19141C2.37109 6.97135 2.26107 6.71745 2.19336 6.42969C2.21029 6.46354 2.24414 6.48047 2.29492 6.48047C2.3457 6.46354 2.38802 6.46354 2.42188 6.48047C2.45573 6.4974 2.49805 6.50586 2.54883 6.50586C2.59961 6.48893 2.63346 6.48893 2.65039 6.50586C2.73503 6.48893 2.80273 6.48893 2.85352 6.50586C2.9043 6.50586 2.96354 6.4974 3.03125 6.48047C3.09896 6.46354 3.1582 6.45508 3.20898 6.45508C3.25977 6.43815 3.31901 6.42122 3.38672 6.4043C3.0651 6.35352 2.77734 6.24349 2.52344 6.07422C2.26953 5.90495 2.04102 5.71029 1.83789 5.49023C1.65169 5.27018 1.50781 5.01628 1.40625 4.72852C1.30469 4.42383 1.24544 4.11914 1.22852 3.81445C1.24544 3.7806 1.24544 3.77214 1.22852 3.78906C1.24544 3.77214 1.24544 3.76367 1.22852 3.76367C1.22852 3.76367 1.23698 3.75521 1.25391 3.73828C1.32161 3.80599 1.40625 3.85677 1.50781 3.89062C1.60938 3.92448 1.70247 3.95833 1.78711 3.99219C1.88867 4.02604 1.9987 4.05143 2.11719 4.06836C2.23568 4.06836 2.33724 4.08529 2.42188 4.11914C2.26953 3.98372 2.10872 3.83984 1.93945 3.6875C1.78711 3.53516 1.66016 3.35742 1.55859 3.1543C1.47396 2.95117 1.39779 2.74805 1.33008 2.54492C1.26237 2.3418 1.23698 2.11328 1.25391 1.85938C1.23698 1.75781 1.23698 1.64779 1.25391 1.5293C1.28776 1.39388 1.31315 1.27539 1.33008 1.17383C1.36393 1.07227 1.40625 0.96224 1.45703 0.84375C1.50781 0.72526 1.55859 0.623698 1.60938 0.539062C1.94792 0.928385 2.31185 1.29232 2.70117 1.63086C3.10742 1.9694 3.54753 2.25716 4.02148 2.49414C4.49544 2.73112 4.98633 2.92578 5.49414 3.07812C6.00195 3.21354 6.54362 3.28971 7.11914 3.30664C7.08529 3.27279 7.06836 3.23047 7.06836 3.17969C7.08529 3.11198 7.08529 3.0612 7.06836 3.02734C7.05143 2.97656 7.04297 2.92578 7.04297 2.875C7.04297 2.80729 7.03451 2.75651 7.01758 2.72266C7.03451 2.33333 7.11068 1.98633 7.24609 1.68164C7.38151 1.36003 7.56771 1.08073 7.80469 0.84375C8.05859 0.589844 8.34635 0.395182 8.66797 0.259766C8.98958 0.124349 9.33659 0.0481771 9.70898 0.03125C9.89518 0.0481771 10.0814 0.0735677 10.2676 0.107422C10.4538 0.141276 10.623 0.200521 10.7754 0.285156C10.9447 0.352865 11.1055 0.4375 11.2578 0.539062C11.4102 0.640625 11.5371 0.759115 11.6387 0.894531C11.8079 0.860677 11.9603 0.826823 12.0957 0.792969C12.2311 0.759115 12.375 0.708333 12.5273 0.640625C12.6797 0.572917 12.8151 0.513672 12.9336 0.462891C13.069 0.395182 13.2129 0.31901 13.3652 0.234375C13.2975 0.403646 13.2298 0.55599 13.1621 0.691406C13.0944 0.826823 13.0013 0.96224 12.8828 1.09766C12.7812 1.21615 12.6712 1.32617 12.5527 1.42773C12.4512 1.5293 12.3242 1.63086 12.1719 1.73242C12.3073 1.69857 12.4342 1.67318 12.5527 1.65625C12.6882 1.63932 12.8236 1.61393 12.959 1.58008C13.0944 1.5293 13.2214 1.48698 13.3398 1.45312C13.4583 1.41927 13.5853 1.36003 13.7207 1.27539C13.6191 1.42773 13.5176 1.56315 13.416 1.68164C13.3314 1.80013 13.2214 1.92708 13.0859 2.0625C12.9674 2.18099 12.849 2.29102 12.7305 2.39258C12.6289 2.47721 12.502 2.57878 12.3496 2.69727L12.375 2.67188Z" fill="currentColor"></path>
                                                          </svg>
                                                          </a>
                                                      </li>
                                                      <li className="social__share--list"><a className="social__share--link" data-bs-toggle="modal" href="https://www.instagram.com/"><span>Instagram</span> <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <path d="M8.27881 4.20703C10.4937 4.20703 12.3218 6.03516 12.3218 8.25C12.3218 10.5 10.4937 12.293 8.27881 12.293C6.02881 12.293 4.23584 10.5 4.23584 8.25C4.23584 6.03516 6.02881 4.20703 8.27881 4.20703ZM8.27881 10.8867C9.72021 10.8867 10.8804 9.72656 10.8804 8.25C10.8804 6.80859 9.72021 5.64844 8.27881 5.64844C6.80225 5.64844 5.64209 6.80859 5.64209 8.25C5.64209 9.72656 6.8374 10.8867 8.27881 10.8867ZM13.4116 4.06641C13.4116 4.59375 12.9897 5.01562 12.4624 5.01562C11.9351 5.01562 11.5132 4.59375 11.5132 4.06641C11.5132 3.53906 11.9351 3.11719 12.4624 3.11719C12.9897 3.11719 13.4116 3.53906 13.4116 4.06641ZM16.0835 5.01562C16.1538 6.31641 16.1538 10.2188 16.0835 11.5195C16.0132 12.7852 15.7319 13.875 14.8179 14.8242C13.9038 15.7383 12.7788 16.0195 11.5132 16.0898C10.2124 16.1602 6.31006 16.1602 5.00928 16.0898C3.74365 16.0195 2.65381 15.7383 1.70459 14.8242C0.790527 13.875 0.509277 12.7852 0.438965 11.5195C0.368652 10.2188 0.368652 6.31641 0.438965 5.01562C0.509277 3.75 0.790527 2.625 1.70459 1.71094C2.65381 0.796875 3.74365 0.515625 5.00928 0.445312C6.31006 0.375 10.2124 0.375 11.5132 0.445312C12.7788 0.515625 13.9038 0.796875 14.8179 1.71094C15.7319 2.625 16.0132 3.75 16.0835 5.01562ZM14.396 12.8906C14.8179 11.8711 14.7124 9.41016 14.7124 8.25C14.7124 7.125 14.8179 4.66406 14.396 3.60938C14.1147 2.94141 13.5874 2.37891 12.9194 2.13281C11.8647 1.71094 9.40381 1.81641 8.27881 1.81641C7.11865 1.81641 4.65771 1.71094 3.63818 2.13281C2.93506 2.41406 2.40771 2.94141 2.12646 3.60938C1.70459 4.66406 1.81006 7.125 1.81006 8.25C1.81006 9.41016 1.70459 11.8711 2.12646 12.8906C2.40771 13.5938 2.93506 14.1211 3.63818 14.4023C4.65771 14.8242 7.11865 14.7188 8.27881 14.7188C9.40381 14.7188 11.8647 14.8242 12.9194 14.4023C13.5874 14.1211 14.1499 13.5938 14.396 12.8906Z" fill="currentColor"></path>
                                                          </svg>                                                        
                                                          </a>
                                                      </li>
                                                      <li className="social__share--list"><a className="social__share--link" data-bs-toggle="modal" href="https://www.pinterest.com/"><span>Pinterest</span> <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <path d="M10.502 4.56055C10.502 5.28841 10.4004 5.96549 10.1973 6.5918C10.0111 7.2181 9.74023 7.75977 9.38477 8.2168C9.0293 8.6569 8.60612 9.01237 8.11523 9.2832C7.62435 9.53711 7.08268 9.6556 6.49023 9.63867C6.28711 9.6556 6.08398 9.63867 5.88086 9.58789C5.69466 9.52018 5.51693 9.45247 5.34766 9.38477C5.19531 9.30013 5.0599 9.19857 4.94141 9.08008C4.82292 8.96159 4.72982 8.85156 4.66211 8.75C4.56055 9.15625 4.47591 9.49479 4.4082 9.76562C4.34049 10.0365 4.28125 10.248 4.23047 10.4004C4.19661 10.5358 4.17122 10.6374 4.1543 10.7051C4.1543 10.7559 4.1543 10.7728 4.1543 10.7559C4.10352 10.9082 4.05273 11.0521 4.00195 11.1875C3.95117 11.3229 3.89193 11.4668 3.82422 11.6191C3.75651 11.7546 3.68034 11.8815 3.5957 12C3.52799 12.1185 3.46029 12.237 3.39258 12.3555C3.18945 12.4909 3.02865 12.5501 2.91016 12.5332C2.80859 12.5332 2.72396 12.4909 2.65625 12.4062C2.60547 12.3216 2.57161 12.237 2.55469 12.1523C2.53776 12.0846 2.5293 12.0423 2.5293 12.0254C2.51237 11.9069 2.50391 11.7799 2.50391 11.6445C2.50391 11.4922 2.50391 11.3483 2.50391 11.2129C2.52083 11.0605 2.53776 10.9082 2.55469 10.7559C2.58854 10.6035 2.6224 10.4681 2.65625 10.3496C2.65625 10.3327 2.66471 10.2819 2.68164 10.1973C2.71549 10.0957 2.76628 9.90104 2.83398 9.61328C2.90169 9.30859 2.99479 8.89388 3.11328 8.36914C3.23177 7.8444 3.39258 7.15039 3.5957 6.28711C3.54492 6.18555 3.5026 6.05859 3.46875 5.90625C3.4349 5.75391 3.40951 5.62695 3.39258 5.52539C3.37565 5.4069 3.36719 5.30534 3.36719 5.2207C3.36719 5.13607 3.36719 5.10221 3.36719 5.11914C3.36719 4.83138 3.40104 4.57747 3.46875 4.35742C3.55339 4.12044 3.65495 3.91732 3.77344 3.74805C3.90885 3.56185 4.0612 3.42643 4.23047 3.3418C4.41667 3.24023 4.60286 3.18099 4.78906 3.16406C4.95833 3.18099 5.10221 3.21484 5.2207 3.26562C5.35612 3.31641 5.46615 3.40104 5.55078 3.51953C5.63542 3.63802 5.69466 3.76497 5.72852 3.90039C5.7793 4.01888 5.80469 4.16276 5.80469 4.33203C5.80469 4.48438 5.7793 4.67057 5.72852 4.89062C5.67773 5.09375 5.61849 5.30534 5.55078 5.52539C5.48307 5.74544 5.4069 5.98242 5.32227 6.23633C5.25456 6.47331 5.19531 6.70182 5.14453 6.92188C5.09375 7.14193 5.08529 7.33659 5.11914 7.50586C5.16992 7.6582 5.24609 7.81055 5.34766 7.96289C5.46615 8.09831 5.61003 8.19987 5.7793 8.26758C5.94857 8.33529 6.1263 8.3776 6.3125 8.39453C6.66797 8.3776 6.98958 8.26758 7.27734 8.06445C7.5651 7.86133 7.81055 7.57357 8.01367 7.20117C8.23372 6.82878 8.39453 6.41406 8.49609 5.95703C8.61458 5.48307 8.67383 4.9668 8.67383 4.4082C8.67383 4.01888 8.60612 3.64648 8.4707 3.29102C8.33529 2.93555 8.13216 2.63932 7.86133 2.40234C7.60742 2.14844 7.28581 1.94531 6.89648 1.79297C6.52409 1.64062 6.08398 1.57292 5.57617 1.58984C5.01758 1.57292 4.50977 1.66602 4.05273 1.86914C3.61263 2.07227 3.23177 2.33464 2.91016 2.65625C2.58854 2.97786 2.3431 3.35872 2.17383 3.79883C2.00456 4.22201 1.91992 4.66211 1.91992 5.11914C1.91992 5.30534 1.92839 5.46615 1.94531 5.60156C1.97917 5.72005 2.01302 5.84701 2.04688 5.98242C2.09766 6.10091 2.14844 6.21094 2.19922 6.3125C2.26693 6.39714 2.3431 6.4987 2.42773 6.61719C2.46159 6.63411 2.48698 6.66797 2.50391 6.71875C2.52083 6.7526 2.5293 6.77799 2.5293 6.79492C2.54622 6.81185 2.55469 6.8457 2.55469 6.89648C2.55469 6.93034 2.54622 6.96419 2.5293 6.99805C2.51237 7.04883 2.49544 7.09961 2.47852 7.15039C2.47852 7.18424 2.47005 7.23503 2.45312 7.30273C2.4362 7.37044 2.41927 7.42969 2.40234 7.48047C2.38542 7.51432 2.37695 7.55664 2.37695 7.60742C2.36003 7.64128 2.33464 7.68359 2.30078 7.73438C2.28385 7.76823 2.25846 7.79362 2.22461 7.81055C2.19076 7.81055 2.1569 7.81901 2.12305 7.83594C2.08919 7.83594 2.04688 7.81901 1.99609 7.78516C1.74219 7.68359 1.51367 7.53971 1.31055 7.35352C1.12435 7.15039 0.972005 6.93034 0.853516 6.69336C0.735026 6.45638 0.641927 6.18555 0.574219 5.88086C0.50651 5.57617 0.472656 5.27148 0.472656 4.9668C0.472656 4.42513 0.582682 3.88346 0.802734 3.3418C1.03971 2.80013 1.37826 2.30078 1.81836 1.84375C2.25846 1.38672 2.80859 1.02279 3.46875 0.751953C4.12891 0.464193 4.89909 0.311849 5.7793 0.294922C6.49023 0.311849 7.13346 0.438802 7.70898 0.675781C8.30143 0.895833 8.80078 1.20898 9.20703 1.61523C9.61328 2.02148 9.92643 2.47852 10.1465 2.98633C10.3835 3.47721 10.502 4.00195 10.502 4.56055Z" fill="currentColor"></path>
                                                          </svg>                                                                                                                
                                                          </a>
                                                      </li>
                                                  </ul>
                                                </li>
                                                <li className="widget__featured--properties__share--list">
                                                  <a className="widget__featured--properties__share--btn" href="listing.html">
                                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <path d="M7.855 0C5.77166 0 3.77371 0.82758 2.30076 2.30076C0.82758 3.77375 0 5.77171 0 7.855C0 9.9383 0.82758 11.9363 2.30076 13.4092C3.77375 14.8824 5.7717 15.71 7.855 15.71C9.9383 15.71 11.9363 14.8824 13.4092 13.4092C14.8824 11.9363 15.71 9.9383 15.71 7.855C15.7073 5.77252 14.8789 3.77621 13.4062 2.30395C11.9338 0.831315 9.93743 0.00286936 7.85518 0.000182413L7.855 0ZM7.855 14.1388C6.18845 14.1388 4.59008 13.4767 3.41151 12.2983C2.23313 11.1197 1.571 9.52132 1.571 7.85482C1.571 6.18832 2.23313 4.5899 3.41151 3.41133C4.59008 2.23295 6.1885 1.57082 7.855 1.57082C9.5215 1.57082 11.1199 2.23295 12.2985 3.41133C13.4769 4.5899 14.139 6.18832 14.139 7.85482C14.1376 9.521 13.4751 11.1187 12.2969 12.2967C11.1189 13.4749 9.52118 14.1374 7.855 14.1388Z" fill="currentColor"></path>
                                                          <path d="M11.5835 7.06853H8.64034V4.12541C8.64034 3.84469 8.49072 3.58552 8.24772 3.44511C8.00471 3.30475 7.70514 3.30475 7.46213 3.44511C7.21912 3.58547 7.06951 3.84467 7.06951 4.12541V7.06853H4.12639C3.84567 7.06853 3.58649 7.21815 3.44609 7.46115C3.30573 7.70416 3.30573 8.00373 3.44609 8.24674C3.58645 8.48975 3.84564 8.63936 4.12639 8.63936H7.06951V11.5825C7.06951 11.8632 7.21912 12.1224 7.46213 12.2628C7.70513 12.4031 8.00471 12.4031 8.24772 12.2628C8.49072 12.1224 8.64034 11.8632 8.64034 11.5825V8.63936H11.5835C11.8642 8.63936 12.1234 8.48975 12.2638 8.24674C12.4041 8.00374 12.4041 7.70416 12.2638 7.46115C12.1234 7.21815 11.8642 7.06853 11.5835 7.06853Z" fill="currentColor"></path>
                                                      </svg>                                                   
                                                      <span className="visually-hidden">listing</span>
                                                  </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className="widget__featured--properties__desc"><svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.48287 0C2.45013 0 0 2.4501 0 5.48288C0 5.85982 0.0343013 6.21958 0.102785 6.57945C0.514031 9.69783 4.42055 11.9767 5.51712 16.4144C6.5966 12.0452 11 8.824 11 5.48288H10.9657C10.9657 2.45013 8.51548 0 5.48282 0H5.48287ZM5.48287 2.17592C7.21338 2.17592 8.61839 3.58097 8.61839 5.31144C8.61839 7.04191 7.21335 8.44696 5.48287 8.44696C3.7524 8.44696 2.34736 7.04191 2.34736 5.31144C2.34736 3.58097 3.75228 2.17592 5.48287 2.17592Z" fill="#F23B3B"></path>
                                            </svg>
                                             1421 San Pedro St, Los Angeles, CA</p>
                                        <h3 className="widget__featured--properties__title">Single Family Home</h3>
                                        <div className="widget__featured--propertie__price d-flex">
                                            <span className="new__price">$13000</span>
                                            <span className="old__price">$16000</span>
                                        </div>    
                                    </div>
                                </div>
                            </div>
  )
}

export default FeaturedProperties
