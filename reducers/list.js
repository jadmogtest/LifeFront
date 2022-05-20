export default function (listHealthCare = [], action) {
  if (action.type == "addHealthCare") {
    var listHealthCareCopy = [...listHealthCare];
    listHealthCareCopy.push(action.healthCare);
    return listHealthCareCopy;
  } else if (action.type == "deleteHealthCare") {
    console.log(action);
    var tempo = listHealthCare.filter(
      (element) => element.healthCare !== action.healthCare.newHealthCare
    );
    return tempo;
  } else {
    return listHealthCare;
  }
}
