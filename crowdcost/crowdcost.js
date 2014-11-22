CrowdCostCust = new Meteor.Collection("crowdCostCustomer");

if (Meteor.isClient) {
  
  Template.customerForm.events({
  
  'click button': function (event) { 
  
  });
  
  Template.createReport.events({
  
  'click #report' : function (event) {}, 
  
  'click .remove' : function (event) {
  
  }
		  
	  
  });
  
  Template.createReport.helpers();
  
  
}

if (Meteor.isServer) {

  Meteor.startup(function() {
  
  });

}
