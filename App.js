const restaurants = [
  {
    name: "مطعم الشام",
    emoji: "🍔",
    info: "برغر ووجبات سريعة • 25-35 دقيقة",
    items: [
      ["وجبة برغر", 45000],
      ["بطاطا", 15000],
      ["مشروب", 10000]
    ]
  },
  {
    name: "بيتزا درعا",
    emoji: "🍕",
    info: "بيتزا • 30-40 دقيقة",
    items: [
      ["بيتزا خضار", 55000],
      ["بيتزا جبنة", 60000],
      ["عصير", 12000]
    ]
  },
  {
    name: "سوبر ماركت الحسن",
    emoji: "🛒",
    info: "بقالة • 20-30 دقيقة",
    items: [
      ["مياه", 10000],
      ["خبز", 8000],
      ["عصير", 12000]
    ]
  },
  {
    name: "حلويات درعا",
    emoji: "🍰",
    info: "حلويات • 25-35 دقيقة",
    items: [
      ["بوظة", 18000],
      ["كنافة", 45000],
      ["كيك", 35000]
    ]
  }
];

let cart = [];

const restaurantsEl = document.getElementById("restaurants");
const cartEl = document.getElementById("cart");

function renderRestaurants(list = restaurants) {
  restaurantsEl.innerHTML = list.map((r, i) => `
    <article class="card">
      <div class="pic">${r.emoji}</div>
      <div>
        <h3>${r.name}</h3>
        <div class="muted">⭐ 4.7 • ${r.info}</div>
        <button class="add" onclick="showMenu(${i})">
          عرض القائمة
        </button>
      </div>
    </article>
  `).join("");
}

function showMenu(index) {
  const restaurant = restaurants[index];

  restaurantsEl.innerHTML = `
    <div class="card" style="grid-column:1/-1">
      <div style="padding:18px">
        <h2>${restaurant.emoji} ${restaurant.name}</h2>
        <p class="muted">${restaurant.info}</p>

        ${restaurant.items.map((item, i) => `
          <div class="qty">
            <span>
              ${item[0]} —
              ${item[1].toLocaleString()} ل.س
            </span>

            <button onclick="addToCart(${index}, ${i})">
              + أضف
            </button>
          </div>
        `).join("")}

        <button class="primary" onclick="renderRestaurants()">
          رجوع للمطاعم
        </button>
      </div>
    </div>
  `;
}

function addToCart(restaurantIndex, itemIndex) {
  const restaurant = restaurants[restaurantIndex];
  const item = restaurant.items[itemIndex];

  cart.push({
    name: item[0],
    price: item[1]
  });

  renderCart();
  alert("تمت الإضافة إلى السلة ❤️");
}

function renderCart() {
  if (cart.length === 0) {
    cartEl.textContent = "السلة فارغة";
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  cartEl.innerHTML = `
    ${cart.map((item, i) => `
      <div class="qty">
        <span>
          ${item.name} —
          ${item.price.toLocaleString()} ل.س
        </span>

        <button onclick="removeFromCart(${i})">
          حذف
        </button>
      </div>
    `).join("")}

    <hr>

    <b>
      المجموع:
      ${total.toLocaleString()} ل.س
    </b>
  `;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

document.getElementById("search").addEventListener("input", function () {
  const search = this.value.trim();

  const results = restaurants.filter(r =>
    r.name.includes(search) ||
    r.info.includes(search)
  );

  renderRestaurants(results);
});

document.getElementById("checkout").onclick = function () {
  if (cart.length === 0) {
    alert("أضيفي منتجات إلى السلة أولاً");
    return;
  }

  alert(
    "ممتاز! الخطوة التالية هي إضافة الاسم ورقم الهاتف والعنوان وإرسال الطلب."
  );
};

renderRestaurants();
renderCart();
