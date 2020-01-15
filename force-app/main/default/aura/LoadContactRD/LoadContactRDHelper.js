({
	processHandleLoadedRecord : function(component) {
		let loadadContactWithRDEvent = component.getEvent("loadadContactWithRD");
        loadadContactWithRDEvent.setParams({"targetContact":component.get("v.targetRecord")});
        loadadContactWithRDEvent.fire();
	}
})