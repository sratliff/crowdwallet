Customer = new Meteor.Collection("customers");

 var calc = 0, calcBillOne = 0, calcBillTwo = 0, calcBillThree =0;
if (Meteor.isClient) {
  Session.set("calc", 0);
  Session.set("averageBillOne", 0);
  Session.set("averageBillTwo", 0);
  Session.set("averageBillThree", 0);
  
  Template.custForm.events({
  
  'click button': function (event) { 
		  Customer.insert({name: $('#inputName').val(), income: $('#inputGrossIncome').val(),
		  bill1: $('#inputBillOne').val(),bill2: $('#inputBillTwo').val(), bill3: $('#inputBillThree').val() });
	  }
  });
  var totalIncome = 0;
  var count =0, billOneCount =0, billTwoCount =0, billThreeCount = 0;
  var totalBillOne = 0;
  var totalBillTwo = 0;
  var totalBillThree = 0;
  
  Template.createReport.events({
  
  'click #report' : function (event) {
  			var tempCollection = Customer.find();
		  
		  tempCollection.forEach(function(data){
		  		if ((!isNaN(parseFloat(data.income))) && data.income != "NaN"){
					totalIncome += parseFloat(data.income);
					count += 1;
					
		  		}
		  		if ((!isNaN(parseFloat(data.bill1))) && data.bill1 != "NaN"){
					totalBillOne += parseFloat(data.bill1);
					billOneCount += 1;
					
		  		}
		  		if ((!isNaN(parseFloat(data.bill2))) && data.bill2 != "NaN"){
					totalBillTwo += parseFloat(data.bill2);
					billTwoCount += 1;
					
		  		}
		  		if ((!isNaN(parseFloat(data.bill3))) && data.bill3 != "NaN"){
					totalBillThree += parseFloat(data.bill3);
					billThreeCount += 1;
					
		  		}
			});
			calc = totalIncome / count;
			Session.set("calc",calc);
			
			calcBillOne = totalBillOne / billOneCount;
			Session.set("averageBillOne",calcBillOne);
			
			calcBillTwo = totalBillTwo / billTwoCount;
			Session.set("averageBillTwo",calcBillTwo);
			
			calcBillThree = totalBillThree / billThreeCount;
			Session.set("averageBillThree",calcBillThree);
			
			
  }, 
  
  'click .remove' : function (event) {
  Meteor.call('removeAllPosts');
  }
		  
	  
  });
  
  Template.createReport.helpers({
  averageIncome: function () {
  return Session.get("calc");
  },
  
  customers : function () {
  return Customer.find();
  },
  
  averageBill1 : function () {
  return Session.get("averageBillOne");
  },
  
  averageBill2 : function () {
  return Session.get("averageBillTwo");
  },
  
  averageBill3 : function () {
  return Session.get("averageBillThree");
  }
  });
  
  
}

if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

      removeAllPosts: function() {

        return Customer.remove({});

      }

    });

  });

}
