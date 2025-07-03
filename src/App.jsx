import React from "react";
import Layout from "./components/Layout/Layout.jsx";
import MenuPage from './pages/MenuPage/MenuPage.jsx';

class App extends React.Component {
    state = {
        cartCount: 0,
    };

    handleAddToCart = (quantity) => {
        this.setState(prevState => ({
            cartCount: prevState.cartCount + quantity
        }));
    };

    render() {
        return (
            <Layout cartCount={this.state.cartCount}>
                <MenuPage onAddToCart={this.handleAddToCart} />
            </Layout>
        );
    }
}

export default App;