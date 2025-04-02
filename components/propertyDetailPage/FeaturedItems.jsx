import React from 'react'

const FeaturedItems = () => {
  return (
    <div className="widget__step">
    <h2 className="widget__step--title">Featured Items</h2>
    <div className="widget__featured">
        <div className="widget__featured--items d-flex">
            <div className="widget__featured--thumb">
                <a className="widget__featured--thumb__link" href="listing-details.html"><img className="widget__featured--media" src="assets/img/property/featured1.jpg" alt="img" /></a>
            </div>
            <div className="widget__featured--content">
                <h3 className="widget__featured--title"><a href="listing-details.html">am tempus turpis at
                    metus</a></h3>
                <span className="widget__featured--price">$2,745 /mo</span>
            </div>
        </div>
        <div className="widget__featured--items d-flex">
            <div className="widget__featured--thumb">
                <a className="widget__featured--thumb__link" href="listing-details.html"><img className="widget__featured--media" src="assets/img/property/featured2.jpg" alt="img" /></a>
            </div>
            <div className="widget__featured--content">
                <h3 className="widget__featured--title"><a href="listing-details.html">tos lobortis des mollis ut risus</a></h3>
                <span className="widget__featured--price">$4,749 /mo</span>
            </div>
        </div>
        <div className="widget__featured--items d-flex">
            <div className="widget__featured--thumb">
                <a className="widget__featured--thumb__link" href="listing-details.html"><img className="widget__featured--media" src="assets/img/property/featured3.jpg" alt="img" /></a>
            </div>
            <div className="widget__featured--content">
                <h3 className="widget__featured--title"><a href="listing-details.html">ut labore et dolore magna aliqua.</a></h3>
                <span className="widget__featured--price">$2,745 /mo</span>
            </div>
        </div>
    </div>
</div>
  )
}

export default FeaturedItems
