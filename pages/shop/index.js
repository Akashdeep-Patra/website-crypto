import { connect } from 'react-redux';
import Link from 'next/link';
import { ShopCard } from '../../components/shoplist-card';
import { getShopListCount } from '../../redux/selector';
import {
  addCartItem,
  delCartItem,
  addShopListItem,
  delShopListItem,
} from '../../redux/action';
// import Header from '../../components/header';
import { Footer } from '../../components/footer';
import products from '../../mock/products.json';

const Shop = (props) => {
  const { addCartItem, addShopListItem } = props;
  const { delCartItem, delShopListItem } = props;
  return (
    <div className="main-container">
      <div className="content">
        {/* <Header /> */}
        <div className="take-to-cart">
          <button>
            <Link href="/cart">Take me to cart</Link>
          </button>
        </div>
        <div className="shoppinglist-container">
          {products.map((product) => {
            const { id } = product;
            return (
              <ShopCard
                key={id}
                product={product}
                quantity={props.shopListItemsCount[id] || 0}
                add={{ addCartItem, addShopListItem }}
                del={{ delCartItem, delShopListItem }}
                link={{ href: '/shop/[product]', as: `/shop/${id}` }}
              />
            );
          })}
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .take-to-cart {
          text-align: center;
          padding-top: 10px;
        }
        .take-to-cart button {
          background: #540075;
          color: white;
          border: 1px solid #540075;
          border-radius: 5px;
          padding: 0.5rem 2rem;
          font: inherit;
          cursor: pointer;
        }
        .shoppinglist-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: stretch;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state) => {
  const shopListItemsCount = getShopListCount(state);
  return { shopListItemsCount };
};

export default connect(mapStateToProps, {
  addCartItem,
  delCartItem,
  addShopListItem,
  delShopListItem,
})(Shop);
