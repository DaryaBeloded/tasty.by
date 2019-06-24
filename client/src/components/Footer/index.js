import React, { Fragment } from 'react';

const Footer = () => {
    return (
        <Fragment>
            <div className="footer">
                <div className="first-column-rus">
                    <span>
                        Tasty.by<br />
                        Гайчук, Полешко, Ходунов<br />
                        +375 (29) 275-15-29 МТС<br />
                    </span>
                </div>
                <div className="second-column-social">
                    <a className="social-vk" href="https://vk.com"><i className="fab fa-vk"></i></a>
                    <a className="social-instagram" href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                    <a className="social-facebook" href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
                    <a className="social-twitter" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                </div>
                <div className="third-column-eng">
                    <span>
                        Tasty.by<br />
                        Gaichyk, Poleshko, Hodynov<br />
                        +375 (29) 275-15-29 МТС<br />
                    </span>
                </div>
            </div>
            <div className="container-succesfull">
                <div className="image-succesfull">
                    <i className="fa fa-check" aria-hidden="true"></i>
                </div>
                <div className="text-succesfull">
                    <span>Товар успешно добавлен в корзину!</span>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer;