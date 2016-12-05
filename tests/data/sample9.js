var customer = {
  customerId: {
    type: 'string',
    size: 7
  },
  contactName: {
    type: 'string',
    size: 10
  },
  $key: ['customerId']
};

var orders = {
  orderId: {
    type: 'string',
    size: 5
  },
  customerId: customer.customerId, //foreign key reference
  shippingAddress: {
    type:'string',
    size: 150
  },
  freightCharges: {
    type: 'double'
  }
};
