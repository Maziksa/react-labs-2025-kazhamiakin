import React from 'react';
import { Link } from 'react-router-dom'; // ИЗМЕНЕНО: Импортируем Link
import {
    HomePageMain,
    HomePageContainer,
    TextContent,
    Title,
    Description,
    OrderButton,
    TrustpilotSection,
    TrustpilotLogo,
    TrustpilotRating,
    ImageContent
} from './HomePage.styles';

import heroImage from '../../assets/images/hero/heroimg.png';
import trustpilotLogo from '../../assets/icons/trustpilot.png';

const HomePage: React.FC = () => {
    return (
        <HomePageMain>
            <HomePageContainer>
                <TextContent>
                    <Title>
                        Beautiful food & takeaway, <span>delivered</span> to your door.
                    </Title>
                    <Description>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </Description>
                    <Link to="/menu" style={{ textDecoration: 'none' }}>
                        <OrderButton>Place an Order</OrderButton>
                    </Link>
                    <TrustpilotSection>
                        <TrustpilotLogo>
                            <img src={trustpilotLogo} alt="Trustpilot logo"/>
                        </TrustpilotLogo>
                        <TrustpilotRating>
                            <span>4.8 out of 5</span> based on 2000+ reviews
                        </TrustpilotRating>
                    </TrustpilotSection>
                </TextContent>
                <ImageContent>
                    <img src={heroImage} alt="Delicious food" className="hero-image" />
                </ImageContent>
            </HomePageContainer>
        </HomePageMain>
    );
}

export default HomePage;
