const data = {
  data: [
    {
      created_at: "2024-05-19T20:50:04.000000Z",
      description: "TEST",
      id: 11,
      laundry_shop_id: 12,
      price: "222",
      service_category: [Object],
      service_category_id: 2,
      service_name: "Wash Dish",
      updated_at: "2024-05-19T20:50:04.000000Z",
    },
    {
      created_at: "2024-05-19T20:50:12.000000Z",
      description: "XXX",
      id: 12,
      laundry_shop_id: 12,
      price: "233",
      service_category: [Object],
      service_category_id: 3,
      service_name: "Ava NievesXX",
      updated_at: "2024-05-19T20:50:12.000000Z",
    },
  ],
  selling_items: [
    {
      created_at: "2024-05-19T21:08:07.000000Z",
      id: 3,
      item_category: "Detergent",
      item_image: "01HY9AXSVBVZ93GP5MDB55KNES.jpg",
      item_name: "Item 1",
      item_price: "244",
      item_quantity: "0",
      laundry_shop_id: 12,
      unit: "ml",
      updated_at: "2024-05-19T21:08:07.000000Z",
    },
    {
      created_at: "2024-05-19T21:08:38.000000Z",
      id: 4,
      item_category: "Fabric Softener",
      item_image: "01HY9AYR6P4X8PJZCADG5NBH8R.jpg",
      item_name: "Item 2",
      item_price: "222",
      item_quantity: "0",
      laundry_shop_id: 12,
      unit: "ml",
      updated_at: "2024-05-19T21:08:38.000000Z",
    },
    {
      created_at: "2024-05-19T21:08:56.000000Z",
      id: 5,
      item_category: "Detergent",
      item_image: "01HY9AZ9QE5Z92HYNAW24VESQC.jpg",
      item_name: "Item 3",
      item_price: "500",
      item_quantity: "0",
      laundry_shop_id: 12,
      unit: "ml",
      updated_at: "2024-05-19T21:08:56.000000Z",
    },
  ],
  washing_machine: [
    {
      created_at: "2024-05-19T20:52:34.000000Z",
      id: 3,
      laundry_shop_id: 12,
      machine_name: "WM-0122",
      machine_type: "Washing Machine",
      status: "Available",
      updated_at: "2024-05-19T20:52:34.000000Z",
    },
    {
      created_at: "2024-05-19T20:52:41.000000Z",
      id: 4,
      laundry_shop_id: 12,
      machine_name: "WM-01223",
      machine_type: "Washing Machine",
      status: "Available",
      updated_at: "2024-05-19T20:52:41.000000Z",
    },
    {
      created_at: "2024-05-19T20:52:46.000000Z",
      id: 5,
      laundry_shop_id: 12,
      machine_name: "WM-0123",
      machine_type: "Washing Machine",
      status: "Available",
      updated_at: "2024-05-19T20:52:52.000000Z",
    },
    {
      created_at: "2024-05-19T21:12:13.000000Z",
      id: 6,
      laundry_shop_id: 12,
      machine_name: "DRY-2020",
      machine_type: "Drying",
      status: "Available",
      updated_at: "2024-05-19T21:12:13.000000Z",
    },
  ],
};

const test2 = [
  {
    created_at: "2024-05-19T20:50:04.000000Z",
    description: "TEST",
    id: 11,
    laundry_shop_id: 12,
    price: "222",
    service_category: {
      created_at: "2024-05-15T04:56:19.000000Z",
      id: 2,
      service_category_name: "Basic Services",
      updated_at: "2024-05-15T04:56:19.000000Z",
    },
    service_category_id: 2,
    service_name: "Wash Dish",
    updated_at: "2024-05-19T20:50:04.000000Z",
  },
  {
    created_at: "2024-05-19T20:50:12.000000Z",
    description: "XXX",
    id: 12,
    laundry_shop_id: 12,
    price: "233",
    service_category: {
      created_at: "2024-05-15T04:57:09.000000Z",
      id: 3,
      service_category_name: "Ironing",
      updated_at: "2024-05-15T04:57:09.000000Z",
    },
    service_category_id: 3,
    service_name: "Ava NievesXX",
    updated_at: "2024-05-19T20:50:12.000000Z",
  },
];

const payload = {
  customer_address: "",
  customer_id: 0,
  customer_name: "",
  customer_type: "",
  delivery_fee: 500,
  laundry_shop_id: "12",
  payment_status: "Cash",
  service_avail: [
    { quantity: 1, service: 3, service_name: "Item 1", service_price: "244" },
    { quantity: 1, service: 4, service_name: "Item 2", service_price: "222" },
    { quantity: 1, service: 5, service_name: "Item 3", service_price: "500" },
    {
      quantity: 1,
      service: 11,
      service_name: "Wash Dish",
      service_price: "222",
    },
    {
      quantity: 4,
      service: 12,
      service_name: "Ava NievesXX",
      service_price: "233",
    },
    {
      quantity: 1,
      service: 12,
      service_name: "Ava NievesXX",
      service_price: "233",
    },
    { quantity: 4, service: 13, service_name: "DryMoto", service_price: "250" },
  ],
  status: "PENDING",
  total_bill: 1421,
};
