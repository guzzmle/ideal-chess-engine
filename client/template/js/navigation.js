/*******************************************************************************
Navigation
*******************************************************************************/

//#region Data

$(document).ready(function () {
  //#region Dashboard
  api.content.navigate(
    "#nav-link-dashboard",
    "entity/dashboard/",
    "#nav-link-dashboard"
  );
  //#endregion


  // Set language dropdown
  app.navigation.language.ajax.read();
});
