var customer = {
	customerId: {
		type: 'string',
		size: 10
	},
  contactName: {
		type: 'string',
		size: 10
	},
  contactDesig: {
		type: 'string',
		size: 10
	},
  $key: ['customerId']
};

var employees = {
  employeeId: {
		type: 'int',
		autoincrement: true
	}
};

employees.employeeName = {
  type: 'string',
  size: 10
};

employees.division = {
  type: 'string',
  size: 10
};

employees.reportsTo = employees.employeeId;

employees.$key = ['employeeId'];

var orders = {
  orderId: {
		type: 'string',
		size: 10
	},
  customerId: customer.customerId,
  shipAddress : {
    type: 'string',
    size: 25
  },
  billAddress: {
		type: 'string',
		size: 25
	},

}

var northWind = [customer];
