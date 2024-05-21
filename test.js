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

const payload = { [{"created_at": "2024-06-15T10:42:17.000000Z", "customer_address": "asdada", "customer_id": 7, "customer_name": "asdsad", "customer_type": "Walk In", "delivery_date": "2024-05-20", "delivery_fee": 200, "id": 2, "laundry_shop_id": 2, "machine_id": 1, "payment_method": "G-CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object]], "service_id": null, "service_type": "", "status": "COMPLETED", "total_bill": 900, "updated_at": "2024-05-21T15:41:58.000000Z"}, {"created_at": "2024-05-18T20:38:37.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-22", "delivery_fee": 0, "id": 13, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "", "status": "COMPLETED", "total_bill": 605, "updated_at": "2024-05-21T15:41:56.000000Z"}, {"created_at": "2024-05-19T07:06:16.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": 
"Customer", "delivery_date": "2024-05-22", "delivery_fee": 0, "id": 14, "laundry_shop_id": 2, "machine_id": 1, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object]], "service_id": null, "service_type": "", "status": "COMPLETED", "total_bill": 529, "updated_at": "2024-05-21T15:41:57.000000Z"}, {"created_at": "2024-05-19T07:09:37.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-22", "delivery_fee": 0, "id": 15, "laundry_shop_id": 2, "machine_id": 1, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object]], "service_id": null, "service_type": "", "status": "COMPLETED", "total_bill": 529, "updated_at": "2024-05-21T15:41:59.000000Z"}, {"created_at": "2024-05-19T07:09:40.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-22", "delivery_fee": 0, "id": 
16, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object]], "service_id": null, "service_type": "", "status": "COMPLETED", "total_bill": 529, "updated_at": "2024-05-20T04:38:24.000000Z"}, {"created_at": "2024-05-19T07:10:46.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 
7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-22", "delivery_fee": 0, "id": 17, "laundry_shop_id": 2, "machine_id": 1, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, 
"service_avail": [[Object], [Object], [Object]], "service_id": null, "service_type": "pickup_and_delivery", "status": "COMPLETED", "total_bill": 529, "updated_at": "2024-05-20T04:38:18.000000Z"}, {"created_at": "2024-05-20T04:40:50.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-20", "delivery_fee": 0, "id": 18, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_service", "status": "COMPLETED", "total_bill": 1342, "updated_at": "2024-05-21T15:42:38.000000Z"}, {"created_at": "2024-05-20T04:40:56.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-20", "delivery_fee": 0, "id": 19, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_service", "status": "COMPLETED", "total_bill": 1342, "updated_at": "2024-05-21T15:42:42.000000Z"}, {"created_at": "2024-05-20T04:42:06.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": 
"Customer", "delivery_date": "2024-05-20", "delivery_fee": 0, "id": 20, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_service", "status": "COMPLETED", "total_bill": 1342, "updated_at": "2024-05-21T10:38:52.000000Z"}, {"created_at": "2024-05-20T04:42:26.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-20", "delivery_fee": 0, "id": 21, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", 
"payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_service", "status": "COMPLETED", "total_bill": 1342, "updated_at": "2024-05-21T10:38:54.000000Z"}, {"created_at": "2024-05-20T04:42:54.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-20", "delivery_fee": 0, "id": 22, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_service", "status": "COMPLETED", "total_bill": 1342, "updated_at": "2024-05-21T15:42:06.000000Z"}, {"created_at": "2024-05-21T15:54:18.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-24", "delivery_fee": 0, "id": 28, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "pickup", "status": "COMPLETED", "total_bill": 806, "updated_at": "2024-05-21T15:55:13.000000Z"}, {"created_at": "2024-05-21T16:49:41.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 29, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T16:49:41.000000Z"}, {"created_at": "2024-05-21T17:01:48.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 30, 
"laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": null, "total_bill": 466, "updated_at": "2024-05-21T17:01:48.000000Z"}, {"created_at": "2024-05-21T17:02:10.000000Z", "customer_address": "N/A", "customer_id": 
7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 31, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": null, "total_bill": 466, "updated_at": 
"2024-05-21T17:02:10.000000Z"}, {"created_at": "2024-05-21T17:03:06.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 32, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:03:06.000000Z"}, {"created_at": "2024-05-21T17:03:11.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 33, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": 
null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": 
null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:03:11.000000Z"}, {"created_at": "2024-05-21T17:14:28.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 34, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:14:28.000000Z"}, {"created_at": "2024-05-21T17:14:45.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 35, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:14:45.000000Z"}, {"created_at": "2024-05-21T17:15:21.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 36, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": null, "total_bill": 466, "updated_at": "2024-05-21T17:15:21.000000Z"}, {"created_at": "2024-05-21T17:15:48.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla 
Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 37, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:15:48.000000Z"}, {"created_at": "2024-05-21T17:21:31.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 38, "laundry_shop_id": 2, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": "[
    {
     quantity: 1,
     service: 3,
     service_name: \"Item 1\",
     service_price: \"244\" },
    {
      quantity: 0,
      service: 11,
      service_name: \"Wash Dish\",
      service_price: \"222\",
    },
    {
      quantity: 1,
      service: 3,
      service_name: \"Washing Machine\",
      service_price: \"N/A\",
    },
    {
      quantity: 1,
      service: 6,
      service_name: \"Washing Machine\",
      service_price: \"N/A\",
    },
  ]", "service_id": null, "service_type": "self_serivce", "status": "PENDING", 
"total_bill": 466, "updated_at": "2024-05-21T17:21:31.000000Z"}, {"created_at": "2024-05-21T17:22:11.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 39, "laundry_shop_id": 2, "machine_id": 3, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": "[
    {
     quantity: 1,
     service: 3,
     service_name: \"Item 1\",
     service_price: \"244\" },
    {
      quantity: 0,
      service: 11,
      service_name: \"Wash Dish\",
      service_price: \"222\",
    },
    {
      quantity: 1,
      service: 3,
      service_name: \"Washing Machine\",
      service_price: \"N/A\",
    },
    {
      quantity: 1,
      service: 6,
      service_name: \"Washing Machine\",
      service_price: \"N/A\",
    },
  ]", "service_id": null, "service_type": "self_serivce", "status": "PENDING", 
"total_bill": 466, "updated_at": "2024-05-21T17:22:11.000000Z"}, {"created_at": "2024-05-21T17:36:21.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 42, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:36:21.000000Z"}, {"created_at": "2024-05-21T17:37:23.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 43, "laundry_shop_id": 12, "machine_id": 2, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:37:23.000000Z"}, {"created_at": "2024-05-21T17:40:46.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 44, "laundry_shop_id": 12, "machine_id": 2, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:40:46.000000Z"}]
 LOG  [{"created_at": "2024-06-15T10:42:17.000000Z", "customer_address": "asdada", "customer_id": 7, "customer_name": "asdsad", "customer_type": "Walk In", "delivery_date": "2024-05-20", "delivery_fee": 200, "id": 2, "laundry_shop_id": 2, "machine_id": 1, "payment_method": "G-CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object]], "service_id": null, "service_type": "", "status": "COMPLETED", "total_bill": 900, "updated_at": "2024-05-21T15:41:58.000000Z"}, {"created_at": "2024-05-18T20:38:37.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-22", "delivery_fee": 0, "id": 13, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "", "status": "COMPLETED", "total_bill": 605, "updated_at": "2024-05-21T15:41:56.000000Z"}, {"created_at": "2024-05-19T07:06:16.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": 
"Customer", "delivery_date": "2024-05-22", "delivery_fee": 0, "id": 14, "laundry_shop_id": 2, "machine_id": 1, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object]], "service_id": null, "service_type": "", "status": "COMPLETED", "total_bill": 529, "updated_at": "2024-05-21T15:41:57.000000Z"}, {"created_at": "2024-05-19T07:09:37.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-22", "delivery_fee": 0, "id": 15, "laundry_shop_id": 2, "machine_id": 1, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object]], "service_id": null, "service_type": "", "status": "COMPLETED", "total_bill": 529, "updated_at": "2024-05-21T15:41:59.000000Z"}, {"created_at": "2024-05-19T07:09:40.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-22", "delivery_fee": 0, "id": 
16, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object]], "service_id": null, "service_type": "", "status": "COMPLETED", "total_bill": 529, "updated_at": "2024-05-20T04:38:24.000000Z"}, {"created_at": "2024-05-19T07:10:46.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 
7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-22", "delivery_fee": 0, "id": 17, "laundry_shop_id": 2, "machine_id": 1, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, 
"service_avail": [[Object], [Object], [Object]], "service_id": null, "service_type": "pickup_and_delivery", "status": "COMPLETED", "total_bill": 529, "updated_at": "2024-05-20T04:38:18.000000Z"}, {"created_at": "2024-05-20T04:40:50.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-20", "delivery_fee": 0, "id": 18, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_service", "status": "COMPLETED", "total_bill": 1342, "updated_at": "2024-05-21T15:42:38.000000Z"}, {"created_at": "2024-05-20T04:40:56.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-20", "delivery_fee": 0, "id": 19, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_service", "status": "COMPLETED", "total_bill": 1342, "updated_at": "2024-05-21T15:42:42.000000Z"}, {"created_at": "2024-05-20T04:42:06.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": 
"Customer", "delivery_date": "2024-05-20", "delivery_fee": 0, "id": 20, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_service", "status": "COMPLETED", "total_bill": 1342, "updated_at": "2024-05-21T10:38:52.000000Z"}, {"created_at": "2024-05-20T04:42:26.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-20", "delivery_fee": 0, "id": 21, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", 
"payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_service", "status": "COMPLETED", "total_bill": 1342, "updated_at": "2024-05-21T10:38:54.000000Z"}, {"created_at": "2024-05-20T04:42:54.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-20", "delivery_fee": 0, "id": 22, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_service", "status": "COMPLETED", "total_bill": 1342, "updated_at": "2024-05-21T15:42:06.000000Z"}, {"created_at": "2024-05-21T15:54:18.000000Z", "customer_address": "Excepturi sed offici", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-24", "delivery_fee": 0, "id": 28, "laundry_shop_id": 2, "machine_id": 2, "payment_method": "CASH", "payment_status": "PAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object], [Object], [Object]], "service_id": null, "service_type": "pickup", "status": "COMPLETED", "total_bill": 806, "updated_at": "2024-05-21T15:55:13.000000Z"}, {"created_at": "2024-05-21T16:49:41.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 29, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T16:49:41.000000Z"}, {"created_at": "2024-05-21T17:01:48.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 30, 
"laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": null, "total_bill": 466, "updated_at": "2024-05-21T17:01:48.000000Z"}, {"created_at": "2024-05-21T17:02:10.000000Z", "customer_address": "N/A", "customer_id": 
7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 31, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": null, "total_bill": 466, "updated_at": 
"2024-05-21T17:02:10.000000Z"}, {"created_at": "2024-05-21T17:03:06.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 32, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:03:06.000000Z"}, {"created_at": "2024-05-21T17:03:11.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 33, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": 
null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": 
null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:03:11.000000Z"}, {"created_at": "2024-05-21T17:14:28.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 34, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:14:28.000000Z"}, {"created_at": "2024-05-21T17:14:45.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 35, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:14:45.000000Z"}, {"created_at": "2024-05-21T17:15:21.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 36, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": null, "total_bill": 466, "updated_at": "2024-05-21T17:15:21.000000Z"}, {"created_at": "2024-05-21T17:15:48.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla 
Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 37, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:15:48.000000Z"}, {"created_at": "2024-05-21T17:21:31.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 38, "laundry_shop_id": 2, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": "[
    {
     quantity: 1,
     service: 3,
     service_name: \"Item 1\",
     service_price: \"244\" },
    {
      quantity: 0,
      service: 11,
      service_name: \"Wash Dish\",
      service_price: \"222\",
    },
    {
      quantity: 1,
      service: 3,
      service_name: \"Washing Machine\",
      service_price: \"N/A\",
    },
    {
      quantity: 1,
      service: 6,
      service_name: \"Washing Machine\",
      service_price: \"N/A\",
    },
  ]", "service_id": null, "service_type": "self_serivce", "status": "PENDING", 
"total_bill": 466, "updated_at": "2024-05-21T17:21:31.000000Z"}, {"created_at": "2024-05-21T17:22:11.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": null, "delivery_fee": 0, "id": 39, "laundry_shop_id": 2, "machine_id": 3, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": "[
    {
     quantity: 1,
     service: 3,
     service_name: \"Item 1\",
     service_price: \"244\" },
    {
      quantity: 0,
      service: 11,
      service_name: \"Wash Dish\",
      service_price: \"222\",
    },
    {
      quantity: 1,
      service: 3,
      service_name: \"Washing Machine\",
      service_price: \"N/A\",
    },
    {
      quantity: 1,
      service: 6,
      service_name: \"Washing Machine\",
      service_price: \"N/A\",
    },
  ]", "service_id": null, "service_type": "self_serivce", "status": "PENDING", 
"total_bill": 466, "updated_at": "2024-05-21T17:22:11.000000Z"}, {"created_at": "2024-05-21T17:36:21.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 42, "laundry_shop_id": 12, "machine_id": null, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:36:21.000000Z"}, {"created_at": "2024-05-21T17:37:23.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 43, "laundry_shop_id": 12, "machine_id": 2, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:37:23.000000Z"}, {"created_at": "2024-05-21T17:40:46.000000Z", "customer_address": "N/A", "customer_id": 7, "customer_name": "Orla Mclaughlin", "customer_type": "Customer", "delivery_date": "2024-05-21", "delivery_fee": 0, "id": 44, "laundry_shop_id": 12, "machine_id": 2, "payment_method": "CASH", "payment_status": "UNPAID", "rider_id": null, "service_avail": [[Object], [Object], [Object], [Object]], "service_id": null, "service_type": "self_serivce", "status": "PENDING", "total_bill": 466, "updated_at": "2024-05-21T17:40:46.000000Z"}]