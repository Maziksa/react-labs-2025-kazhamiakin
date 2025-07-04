import styled from 'styled-components';

export const HomePageMain = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    background-image: var(--home-bg-image);
    background-color: var(--main-bg);
    background-size: cover;
    height: 820px;
    align-items: center;
`;

export const HomePageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rem 0;
    max-width: 1200px;
    margin: 0;
    gap: 2rem;
`;

export const TextContent = styled.div`
    flex: 1;
    max-width: 610px;
`;

export const Title = styled.h1`
    font-size: 3.5rem;
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: var(--text-primary);

    span {
        color: var(--accent-primary);
    }
`;

export const Description = styled.p`
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 2rem;
`;

export const OrderButton = styled.button`
    background-color: var(--accent-primary);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        opacity: 0.9;
    }
`;

export const TrustpilotSection = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
`;

export const TrustpilotLogo = styled.div`
    img {
        width: 110px;
        display: block;
    }
`;

export const TrustpilotRating = styled.p`
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0;
    span {
        color: var(--accent-primary);
    }
`;

export const ImageContent = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    img.hero-image {
        width: 100%;
        max-width: 550px;
        border-radius: 20px;
    }
`;
