import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import './ProductList.css';

// Plant data array with categories
const plantsArray = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb",
    category: "Indoor Plants",
    description: "Large tropical plant with distinctive split leaves."
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 32.50,
    image: "https://images.unsplash.com/photo-1586220742613-b731f66f7743",
    category: "Indoor Plants",
    description: "Low-maintenance plant with upright sword-like leaves."
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    price: 67.99,
    image: "https://images.unsplash.com/photo-1545241047-6083a3684597",
    category: "Indoor Plants",
    description: "Trendy plant with large, violin-shaped leaves."
  },
  {
    id: 4,
    name: "ZZ Plant",
    price: 28.75,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
    category: "Indoor Plants",
    description: "Drought-tolerant plant with glossy green leaves."
  },
  {
    id: 5,
    name: "Pothos",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85",
    category: "Indoor Plants",
    description: "Easy-to-grow trailing vine plant."
  },
  {
    id: 6,
    name: "Peace Lily",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1561212024-cb9ad0c2d61e",
    category: "Indoor Plants",
    description: "Elegant plant with white flowers and dark green leaves."
  },
  {
    id: 7,
    name: "Rose Bush",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94",
    category: "Outdoor Plants",
    description: "Classic flowering shrub with fragrant blooms."
  },
  {
    id: 8,
    name: "Lavender",
    price: 16.50,
    image: "https://images.unsplash.com/photo-1564928158-61d4b8e5e65c",
    category: "Outdoor Plants",
    description: "Fragrant herb with purple flowers and silvery foliage."
  },
  {
    id: 9,
    name: "Tomato Plant",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
    category: "Outdoor Plants",
    description: "Productive vegetable plant for home gardens."
  },
  {
    id: 10,
    name: "Hydrangea",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1566581277021-aa6d32732d85",
    category: "Outdoor Plants",
    description: "Shrub with large clusters of colorful flowers."
  },
  {
    id: 11,
    name: "Succulent Mix",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1569829674181-b6b7dd2224e1",
    category: "Succulents & Cacti",
    description: "Assortment of drought-tolerant succulent plants."
  },
  {
    id: 12,
    name: "Aloe Vera",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1549568276-33e056417e36",
    category: "Succulents & Cacti",
    description: "Medicinal plant with soothing gel in its leaves."
  },
  {
    id: 13,
    name: "Echeveria",
    price: 15.75,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
    category: "Succulents & Cacti",
    description: "Rosette-shaped succulent with colorful foliage."
  },
  {
    id: 14,
    name: "Golden Barrel Cactus",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
    category: "Succulents & Cacti",
    description: "Round cactus with golden spines and ribbed texture."
  },
  {
    id: 15,
    name: "String of Pearls",
    price: 26.50,
    image: "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6",
    category: "Succulents & Cacti",
    description: "Trailing succulent with bead-like leaves."
  },
  {
    id: 16,
    name: "Jade Plant",
    price: 23.99,
    image: "https://images.unsplash.com/photo-1565553443823-3d4bb6a5e3d6",
    category: "Succulents & Cacti",
    description: "Tree-like succulent with thick, oval leaves."
  },
  {
    id: 17,
    name: "Orchid",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1566566716750-30585c8b5c7e",
    category: "Flowering Plants",
    description: "Elegant flowering plant with exotic blooms."
  },
  {
    id: 18,
    name: "African Violet",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d",
    category: "Flowering Plants",
    description: "Compact plant with velvety leaves and colorful flowers."
  },
  {
    id: 19,
    name: "Geranium",
    price: 18.50,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
    category: "Flowering Plants",
    description: "Popular flowering plant with vibrant blooms."
  },
  {
    id: 20,
    name: "Begonia",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1574614176854-4e8c6b7f1f2c",
    category: "Flowering Plants",
    description: "Colorful plant with interesting foliage and flowers."
  },
  {
    id: 21,
    name: "Basil",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1563013541-37f5e8c90e7d",
    category: "Herbs",
    description: "Aromatic herb perfect for cooking and garnishing."
  },
  {
    id: 22,
    name: "Mint",
    price: 9.50,
    image: "https://images.unsplash.com/photo-1563013541-37f5e8c90e7d",
    category: "Herbs",
    description: "Refreshing herb for teas, cocktails, and cooking."
  },
  {
    id: 23,
    name: "Rosemary",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1563013541-37f5e8c90e7d",
    category: "Herbs",
    description: "Fragrant herb with needle-like leaves."
  },
  {
    id: 24,
    name: "Thyme",
    price: 10.25,
    image: "https://images.unsplash.com/photo-1563013541-37f5e8c90e7d",
    category: "Herbs",
    description: "Small-leaved herb with earthy flavor."
  }
];

const ProductList = () => {
  const dispatch = useDispatch();

  // Group plants by category
  const groupedPlants = plantsArray.reduce((acc, plant) => {
    if (!acc[plant.category]) {
      acc[plant.category] = [];
    }
    acc[plant.category].push(plant);
    return acc;
  }, {});

  // Handle Add to Cart button click
  const handleAddToCart = (plant) => {
    dispatch(addToCart({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      image: plant.image,
      quantity: 1
    }));
    
    // Optional: Show a toast or notification
    alert(`Added ${plant.name} to cart!`);
  };

  return (
    <div className="product-list-container">
      <h1 className="page-title">Our Plant Collection</h1>
      
      {Object.entries(groupedPlants).map(([category, plants]) => (
        <section key={category} className="plant-category">
          <h2 className="category-title">{category}</h2>
          <div className="plants-grid">
            {plants.map((plant) => (
              <div key={plant.id} className="plant-card" data-testid="plant-card">
                <div className="plant-image-container">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="plant-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1485955900006-10f4d324d411";
                    }}
                  />
                </div>
                <div className="plant-info">
                  <h3 className="plant-name">{plant.name}</h3>
                  <p className="plant-description">{plant.description}</p>
                  <div className="plant-footer">
                    <span className="plant-price">${plant.price.toFixed(2)}</span>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      aria-label={`Add ${plant.name} to cart`}
                      data-testid="add-to-cart-btn"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductList;
