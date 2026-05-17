import { useState, useEffect, useMemo } from 'react';

/* ── Fallback catalogue (used when all API URLs fail) ── */
const MOCK_PRODUCTS = [
  // ── Electronics ──
  { id:1,  title:"Apple iPhone 15 Pro 256GB",                   price:999.99,  category:"electronics",      description:"The most powerful iPhone ever with A17 Pro chip, titanium frame, and a 48MP main camera system for stunning photos and videos.",      image:"https://fakestoreapi.com/img/81fAn3d5b4L._AC_SL1500_.jpg",        rating:{rate:4.8,count:1240} },
  { id:2,  title:"Sony WH-1000XM5 Headphones",                  price:349.99,  category:"electronics",      description:"Industry-leading noise cancellation with 30-hour battery life and crystal-clear hands-free call quality. Best-in-class wireless audio.", image:"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_FMwebp_QL65_.jpg", rating:{rate:4.9,count:3120} },
  { id:3,  title:"MacBook Air 15\" M3 Chip 512GB",              price:1299.00, category:"electronics",      description:"Supercharged by Apple M3. Fanless design, up to 18-hour battery, and a stunning Liquid Retina display. The world's best consumer laptop.", image:"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",          rating:{rate:4.7,count:674}  },
  { id:4,  title:"Samsung 4K Smart TV 55\"",                    price:699.99,  category:"electronics",      description:"Brilliant QLED Quantum Dot colours with built-in Alexa, 120Hz refresh rate, and multiple HDMI 2.1 ports for gaming and streaming.",     image:"https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",          rating:{rate:4.6,count:892}  },
  { id:5,  title:"Apple Watch Series 9 – 45mm GPS",             price:429.99,  category:"electronics",      description:"The most capable Apple Watch with the new Double Tap gesture, brighter always-on display, and advanced health sensors.",                 image:"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",          rating:{rate:4.7,count:891}  },
  { id:6,  title:"Canon EOS R50 Mirrorless Camera",             price:679.99,  category:"electronics",      description:"24.2MP APS-C sensor, 4K video, Dual Pixel CMOS AF II, and a lightweight body. Perfect for vloggers and photo enthusiasts alike.",       image:"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_FMwebp_QL65_.jpg", rating:{rate:4.5,count:342} },
  // ── Jewellery ──
  { id:7,  title:"18K Gold Diamond Solitaire Ring",             price:899.00,  category:"jewelery",         description:"Handcrafted 18-karat gold ring set with a brilliant 0.5ct round-cut diamond. A timeless piece for anniversaries and engagements.",       image:"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg", rating:{rate:4.9,count:230} },
  { id:8,  title:"Freshwater Pearl & Gold Necklace",            price:249.99,  category:"jewelery",         description:"Lustrous freshwater cultured pearls strung on a delicate 14K gold chain. Refined everyday luxury that pairs with anything.",             image:"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_FMwebp_QL65_.jpg", rating:{rate:4.7,count:187} },
  { id:9,  title:"Rose Gold Emerald Bracelet",                  price:399.00,  category:"jewelery",         description:"Genuine emerald stones channel-set in 14K rose gold. A vivid, eye-catching statement bracelet for special occasions.",                   image:"https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_FMwebp_QL65_.jpg", rating:{rate:4.6,count:145} },
  { id:10, title:"Sterling Silver Hoop Earrings Set",           price:89.99,   category:"jewelery",         description:"Set of 6 graduated sterling silver hoops. Minimalist, modern, and hypoallergenic — mix and match for any look.",                        image:"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_FMwebp_QL65_.jpg", rating:{rate:4.4,count:520} },
  // ── Men's Clothing ──
  { id:11, title:"Slim-Fit Merino Wool Suit – Navy",            price:549.00,  category:"men's clothing",   description:"Italian-cut slim-fit suit in premium merino wool blend. Notch lapel, two-button front, and fully lined for a polished, modern look.",    image:"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",           rating:{rate:4.7,count:312}  },
  { id:12, title:"Oxford Button-Down Shirt – White",            price:89.99,   category:"men's clothing",   description:"Classic Oxford weave in 100% supima cotton. Tailored fit with a spread collar. A versatile wardrobe essential for work or weekend.",     image:"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", rating:{rate:4.5,count:780} },
  { id:13, title:"Slim Chino Trousers – Khaki",                 price:74.99,   category:"men's clothing",   description:"Four-way stretch twill for all-day comfort. Slim through the thigh, tapered leg, and a clean no-iron finish. Perfect for every occasion.", image:"https://fakestoreapi.com/img/81fAn3d5b4L._AC_SL1500_.jpg",          rating:{rate:4.3,count:460}  },
  { id:14, title:"Leather Bomber Jacket – Brown",               price:299.99,  category:"men's clothing",   description:"Genuine lambskin leather with a vintage washed finish. Ribbed collar, cuffs and hem with a YKK zipper. A forever classic silhouette.",   image:"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",           rating:{rate:4.8,count:215}  },
  { id:15, title:"Cashmere Crewneck Sweater – Camel",           price:189.00,  category:"men's clothing",   description:"100% grade-A Mongolian cashmere. Relaxed fit with ribbed neck, cuffs and hem. Lightweight yet incredibly warm. Dry-clean recommended.", image:"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg", rating:{rate:4.6,count:390} },
  // ── Women's Clothing ──
  { id:16, title:"Wrap Midi Dress – Floral Print",              price:119.99,  category:"women's clothing", description:"Floaty crepe fabric with a universally flattering wrap silhouette. V-neckline, long sleeves, and a graceful midi length for any season.",  image:"https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",           rating:{rate:4.7,count:634}  },
  { id:17, title:"High-Rise Straight Leg Jeans",                price:94.99,   category:"women's clothing", description:"Premium stretch denim with a high-rise waist and a straight leg cut. Effortlessly cool, comfortable, and endlessly versatile.",          image:"https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",           rating:{rate:4.5,count:920}  },
  { id:18, title:"Classic Double-Breasted Trench Coat",         price:379.00,  category:"women's clothing", description:"Water-resistant cotton gabardine trench in a timeless camel tone. Double-breasted front with storm shield and adjustable belt.",          image:"https://fakestoreapi.com/img/71HblAHs1xL._AC_UY879_-2.jpg",        rating:{rate:4.8,count:278}  },
  { id:19, title:"Mulberry Silk Blouse – Ivory",                price:149.00,  category:"women's clothing", description:"100% mulberry silk with a relaxed, softly draped fit. Hidden button placket. Understated luxury for the office or an evening out.",      image:"https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",           rating:{rate:4.6,count:411}  },
  { id:20, title:"Fine-Knit Turtleneck Dress – Burgundy",       price:134.99,  category:"women's clothing", description:"Fine-knit viscose blend with a fitted turtleneck and long sleeves. Form-flattering and chic — perfect for autumn and winter evenings.",  image:"https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",           rating:{rate:4.4,count:356}  },
];

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const URLS = [
      'https://fakestoreapi.com/products',
      'https://api.allorigins.win/raw?url=https%3A%2F%2Ffakestoreapi.com%2Fproducts',
      'https://corsproxy.io/?https://fakestoreapi.com/products',
    ];

    const tryFetch = async () => {
      for (const url of URLS) {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 6000);
          const r = await fetch(url, { signal: controller.signal });
          clearTimeout(timer);
          if (!r.ok) continue;
          const data = await r.json();
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data);
            setLoading(false);
            return;
          }
        } catch {}
      }
      // All URLs failed → show built-in catalogue
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    };

    tryFetch();
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return ['all', ...cats];
  }, [products]);

  return { products, loading, error, categories };
}

export function useFilteredProducts(products, { search, category, sort }) {
  return useMemo(() => {
    let list = [...products];

    if (category && category !== 'all') {
      list = list.filter(p => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'price-asc':   list.sort((a, b) => a.price - b.price); break;
      case 'price-desc':  list.sort((a, b) => b.price - a.price); break;
      case 'rating-desc': list.sort((a, b) => b.rating.rate - a.rating.rate); break;
      case 'name-asc':    list.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: break;
    }

    return list;
  }, [products, search, category, sort]);
}
