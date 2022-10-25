/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap(): void {
  // const map = new google.maps.Map(
  //   document.getElementById("map") as HTMLElement,
  //   {
  //     zoom: 13,
  //     mapTypeControl: false,
  //   }
  // );
  let bound = { east: 120, west: 110, north: 35, south: 30 };
  const input = document.getElementById("pac-input") as HTMLInputElement;
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: true,
    bounds:bound,
    types: ["establishment"],
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  // const marker = new google.maps.Marker({
  //   map,
  //   anchorPoint: new google.maps.Point(0, -29),
  // });
  let boundMessage ='';
  for(let key in bound){
    boundMessage += ` ${key}:${bound[key]} `;
  }
  autocomplete.addListener("place_changed", () => {
    // marker.setVisible(false);
    const place = autocomplete.getPlace();
    if( place.geometry&&place.geometry.location) {
      // console.log('获取选择的地址 la',place.geometry.location.lat());
      // console.log('获取选择的地址 long',place.geometry.location.lng());
      let info = document.getElementsByClassName('info-container')[0];
      info.innerHTML = '获取选择的地址'+'<br/>'+'的latitude:' + place.geometry.location.lat()+'<br/>'
       + '的longitude:' + place.geometry.location.lng() +'<br/>'
       + '在范围' + boundMessage +'内';
    }
    
    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    // if (place.geometry.viewport) {
    //   map.fitBounds(place.geometry.viewport);
    // } else {
    //   map.setCenter(place.geometry.location);
    //   map.setZoom(17);
    // }

    // marker.setPosition(place.geometry.location);
    // marker.setVisible(true);

  });


}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
