import React from "react";
import styles from "./Footer.module.css";
import MainLogo from "../../assets/icons/logo.svg";
import instagramLogo from "../../assets/icons/socials/instagram.svg";
import twitterLogo from "../../assets/icons/socials/twitter.svg";
import youtubeLogo from "../../assets/icons/socials/youtube.svg";

const Footer: React.FC = () => {
    const googleUrl = "https://www.google.com/";
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <section className={styles.footerSectionTop}>
                    <div className={styles.footerBrandArea}>
                        <a href="#">
                            <img src={MainLogo} alt="logo" className={styles.footerLogoImage}/>
                        </a>
                        <p className={styles.footerSlogan}>Takeaway & Delivery template for small - medium businesses.</p>
                    </div>
                    <div className={styles.footerLinksColumn}>
                        <h4 className={styles.footerColumnTitle}>COMPANY</h4>
                        <ul className={styles.footerLinkList}>
                            <li><a href="#" className={styles.footerLink}>Home</a></li>
                            <li><a href="#" className={styles.footerLink}>Order</a></li>
                            <li><a href="#" className={styles.footerLink}>FAQ</a></li>
                            <li><a href="#" className={styles.footerLink}>Contact</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerLinksColumn}>
                        <h4 className={styles.footerColumnTitle}>TEMPLATE</h4>
                        <ul className={styles.footerLinkList}>
                            <li><a href={googleUrl} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Style Guide</a></li>
                            <li><a href={googleUrl} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Changelog</a></li>
                            <li><a href={googleUrl} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Licence</a></li>
                            <li><a href={googleUrl} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Webflow University</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerLinksColumn}>
                        <h4 className={styles.footerColumnTitle}>FLOWBASE</h4>
                        <ul className={styles.footerLinkList}>
                            <li><a href="#" className={styles.footerLink}>More Cloneables</a></li>
                        </ul>
                    </div>
                </section>
                <hr className={styles.footerDivider}/>
                <section className={styles.footerSectionBottom}>
                    <div>
                        <p className={styles.footerBrandSection}>
                            Built by <span className={styles.footerBrandName}>Flowbase</span> · Powered by <span className={styles.footerBrandName}>Webflow</span>
                        </p>
                    </div>
                    <div className={styles.footerSocials}>
                        <a href="#"><img src={instagramLogo} alt="instagram" className={styles.footerSocialIcon}/></a>
                        <a href="#"><img src={twitterLogo} alt="twitter" className={styles.footerSocialIcon}/></a>
                        <a href="#"><img src={youtubeLogo} alt="youtube" className={styles.footerSocialIcon}/></a>
                    </div>
                </section>
            </div>
        </footer>
    );
}

export default Footer;
