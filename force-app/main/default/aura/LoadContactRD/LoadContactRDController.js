({
	handleLoadedRecord : function(component, event, helper) {
		let loadadContactWithRDEvent = component.getEvent("loadadContactWithRD");
        loadadContactWithRDEvent.setParams({"targetContact":component.get("v.targetRecord")});
        loadadContactWithRDEvent.fire();
	}
})