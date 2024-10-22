import './index.css'
import {IoLogoFacebook} from 'react-icons/io'
import {TbBrandPicsart} from 'react-icons/tb'
import {FaInstagram, FaTwitter} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-container">
    <div>
      <h1 className="footer-heading">
        For any queries, contact +91-9876543210 or mail us help@nxtmart.co.in
      </h1>
      <ul className="footer-icon-list">
        <li className="footer-icon-item">
          <IoLogoFacebook color="#ffffff" size="20" />
        </li>
        <li className="footer-icon-item">
          <TbBrandPicsart color="#ffffff" size="20" />
        </li>
        <li className="footer-icon-item">
          <FaTwitter color="#ffffff" size="20" />
        </li>
        <li className="footer-icon-item">
          <FaInstagram color="#ffffff" size="20" />
        </li>
      </ul>
    </div>
    <p className="footer-text">
      Copyright © 2023 NxtMart Grocery Supplies Pvt Ltd
    </p>
  </div>
)

export default Footer
